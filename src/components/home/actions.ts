"use server";

import { checkRateLimit } from "@/utils/rate-limit";
import { z } from "zod";
import { headers } from "next/headers";
import { Message } from "@/utils/supabase/user_messages/definitions";
import { createUserMessage } from "@/utils/supabase/user_messages/message.action";

// Define contact form schema
const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    body: z.string().min(10, "Message must be at least 10 characters"),
  });

type ContactFormValues = z.infer<typeof contactFormSchema>;
type SubmitResponse = { success: boolean; message?: string };

export async function submitContactForm(
  formData: ContactFormValues
): Promise<SubmitResponse> {
  try {
    // Validate the form data
    const validationResult = contactFormSchema.safeParse(formData);
    if (!validationResult.success) {
      return {
        success: false,
        message: "Invalid form data. Please check your inputs.",
      };
    }

    // Get IP for rate limiting
    const ip = (await headers()).get("x-forwarded-for") || "unknown";
    const identifier = `ip:${ip}`;

    // Check rate limit (max 5 messages per hour)
    const rateLimit = await checkRateLimit("message_submit", identifier);

    if (!rateLimit.allowed) {
      return {
        success: false,
        message: `Rate limit exceeded. Please try again in ${Math.ceil(
          rateLimit.resetInSeconds / 60
        )} minutes.`,
      };
    }

    // Create Supabase client and insert the message

    const messageData: Message = {
      data: validationResult.data,
      read: false,
    };

    try {
      await createUserMessage(messageData);
      return {
        success: true,
        message: "Message sent successfully!",
      }
    } catch (error) {
      console.error("Error inserting message:", error);
      return {
        success: false,
        message: "Failed to send message. Please try again later.",
      };
    }
  } catch (error) {
    console.error("Error in submitContactForm:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
