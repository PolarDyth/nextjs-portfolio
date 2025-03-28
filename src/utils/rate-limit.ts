import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

// Define rate limit rules for different actions
const RATE_LIMIT_RULES = {
  'project_create': { maxRequests: 5, windowSeconds: 3600 },  // 5 creates per hour
  'project_update': { maxRequests: 20, windowSeconds: 3600 }, // 20 updates per hour
  'project_delete': { maxRequests: 5, windowSeconds: 3600 },  // 5 deletions per hour
  'api_request': { maxRequests: 100, windowSeconds: 60 },     // 100 requests per minute
  'user_message': { maxRequests: 2, windowSeconds: 3600 },  // 2 messages per hour
};

type RateLimitAction = keyof typeof RATE_LIMIT_RULES;

/**
 * Checks if a request should be rate limited
 */
export async function checkRateLimit(
  action: RateLimitAction, 
  userId?: string
): Promise<{ 
  allowed: boolean; 
  remaining: number;
  resetInSeconds: number;
}> {
  const supabase = await createClient();
  
  // Get the current timestamp
  const now = new Date();
  
  // Get rule for this action
  const rule = RATE_LIMIT_RULES[action];
  if (!rule) {
    console.warn(`No rate limit rule defined for action: ${action}`);
    return { allowed: true, remaining: 999, resetInSeconds: 0 };
  }
  
  // Calculate the start of the current window
  const windowStart = new Date(now.getTime() - (rule.windowSeconds * 1000));
  
  // Get client IP if userId is not provided
  let clientIdentifier = userId;
  if (!clientIdentifier) {
    const forwardedFor = (await headers()).get('x-forwarded-for') || 'unknown';
    clientIdentifier = `ip:${forwardedFor.split(',')[0].trim()}`;
  }
  
  // First, clean up old rate limit entries for this user/action (optional)
  await supabase
    .from('rate_limits')
    .delete()
    .lt('timestamp', windowStart.toISOString())
    .match({ 
      identifier: clientIdentifier,
      action: action
    });
  
  // Count existing requests in the current window
  const { count, error: countError } = await supabase
    .from('rate_limits')
    .select('*', { count: 'exact', head: false })
    .match({ 
      identifier: clientIdentifier,
      action: action
    })
    .gte('timestamp', windowStart.toISOString());
  
  if (countError) {
    console.error('Error checking rate limit:', countError);
    // Be lenient if we can't check the rate limit
    return { allowed: true, remaining: rule.maxRequests, resetInSeconds: 0 };
  }
  
  // Check if user has exceeded rate limit
  const currentCount = count || 0;
  const allowed = currentCount < rule.maxRequests;
  const remaining = Math.max(0, rule.maxRequests - currentCount - (allowed ? 1 : 0));
  
  // If allowed, record this request
  if (allowed) {
    // Insert a new record for this request
    const { error: insertError } = await supabase
      .from('rate_limits')
      .insert({
        identifier: clientIdentifier,
        action: action,
        timestamp: now.toISOString(),
        ip_address: clientIdentifier.startsWith('ip:') ? clientIdentifier.substring(3) : null
      });
    
    if (insertError) {
      console.error('Error recording rate limit usage:', insertError);
    }
  }
  
  // Get the oldest record to calculate reset time
  const { data: oldestRecord, error: oldestError } = await supabase
    .from('rate_limits')
    .select('timestamp')
    .match({ 
      identifier: clientIdentifier,
      action: action
    })
    .order('timestamp', { ascending: true })
    .limit(1);
  
  // Calculate when the rate limit will reset
  let resetInSeconds = rule.windowSeconds;
  
  if (!oldestError && oldestRecord && oldestRecord.length > 0) {
    const oldestTimestamp = new Date(oldestRecord[0].timestamp);
    const resetTime = new Date(oldestTimestamp.getTime() + (rule.windowSeconds * 1000));
    resetInSeconds = Math.max(0, Math.floor((resetTime.getTime() - now.getTime()) / 1000));
  }
  
  return {
    allowed,
    remaining,
    resetInSeconds
  };
}