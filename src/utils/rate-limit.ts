import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

// Define rate limit rules for different actions
const RATE_LIMIT_RULES = {
  project_create: { maxRequests: 5, windowSeconds: 3600 },
  project_update: { maxRequests: 20, windowSeconds: 3600 },
  project_delete: { maxRequests: 5, windowSeconds: 3600 },
  api_request: { maxRequests: 100, windowSeconds: 60 },
  message_submit: { maxRequests: 2, windowSeconds: 3600 },
};

type RateLimitAction = keyof typeof RATE_LIMIT_RULES;

export async function checkRateLimit(
  action: RateLimitAction,
  userId?: string
): Promise<{
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
}> {
  const supabase = await createClient(); // Don't use await here
  
  try {
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    
    // Skip rate limiting for authenticated users
    if (user) {
      console.log("User is authenticated, skipping rate limit check.");
      return { allowed: true, remaining: 999, resetInSeconds: 0 };
    }
  } catch (err) {
    console.error("Error checking authentication:", err);
    // Continue with rate limiting
  }

  // Get the current timestamp
  const now = new Date();

  // Get rule for this action
  const rule = RATE_LIMIT_RULES[action];
  if (!rule) {
    console.warn(`No rate limit rule defined for action: ${action}`);
    return { allowed: true, remaining: 999, resetInSeconds: 0 };
  }

  // Calculate the start of the current window
  const windowStart = new Date(now.getTime() - rule.windowSeconds * 1000);

  // Get client IP if userId is not provided
  let clientIdentifier = userId;
  if (!clientIdentifier) {
    try {
      // Get headers synchronously - wrap in try/catch to handle dynamic route errors
      const headersList = await headers();
      const forwardedFor = headersList.get("x-forwarded-for") || "unknown";
      clientIdentifier = `ip:${forwardedFor.split(",")[0].trim()}`;
    } catch (err) {
      console.error("Error getting client IP:", err);
      clientIdentifier = "unknown";
    }
  }

  // First, clean up old rate limit entries
  try {
    await supabase
      .from("rate_limits")
      .delete()
      .lt("timestamp", windowStart.toISOString())
      .match({
        identifier: clientIdentifier,
        action: action,
      });
  } catch (err) {
    console.error("Error cleaning up old rate limits:", err);
    // Continue even if cleanup fails
  }

  // Count existing requests in the current window
  let currentCount = 0;
  try {
    const { count, error: countError } = await supabase
      .from("rate_limits")
      .select("*", { count: "exact", head: false })
      .match({
        identifier: clientIdentifier,
        action: action,
      })
      .gte("timestamp", windowStart.toISOString());

    if (countError) throw countError;
    currentCount = count || 0;
  } catch (err) {
    console.error("Error checking rate limit:", err);
    // Be lenient if we can't check the rate limit
    return { allowed: true, remaining: rule.maxRequests, resetInSeconds: 0 };
  }

  // Check if user has exceeded rate limit
  const allowed = currentCount < rule.maxRequests;
  const remaining = Math.max(0, rule.maxRequests - currentCount - (allowed ? 1 : 0));

  // If allowed, record this request
  if (allowed) {
    try {
      // Insert a new record for this request
      const { error: insertError } = await supabase.from("rate_limits").insert({
        identifier: clientIdentifier,
        action: action,
        timestamp: now.toISOString(),
        ip_address: clientIdentifier.startsWith("ip:") ? clientIdentifier.substring(3) : null,
      });

      if (insertError) throw insertError;
    } catch (err) {
      console.error("Error recording rate limit usage:", err);
    }
  }

  // Calculate when the rate limit will reset
  let resetInSeconds = rule.windowSeconds;
  try {
    const { data: oldestRecord, error: oldestError } = await supabase
      .from("rate_limits")
      .select("timestamp")
      .match({
        identifier: clientIdentifier,
        action: action,
      })
      .order("timestamp", { ascending: true })
      .limit(1);

    if (!oldestError && oldestRecord && oldestRecord.length > 0) {
      const oldestTimestamp = new Date(oldestRecord[0].timestamp);
      const resetTime = new Date(oldestTimestamp.getTime() + rule.windowSeconds * 1000);
      resetInSeconds = Math.max(0, Math.floor((resetTime.getTime() - now.getTime()) / 1000));
    }
  } catch (err) {
    console.error("Error calculating rate limit reset time:", err);
  }

  return {
    allowed,
    remaining,
    resetInSeconds,
  };
}