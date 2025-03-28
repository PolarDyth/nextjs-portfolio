"use server";

import { createClient } from "../server";
import { Message } from "./definitions";

export async function createUserMessage(message: Message): Promise<void> {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("user_messages")
      .insert({ data: message.data, read: false });
   
    if (error) {
      console.error("Supabase insert error:", error);
      throw new Error(`Database error: ${error.message}`);
    }
  } catch (error) {
    console.error("Error in createUserMessage:", error);
    throw error; // Re-throw to be handled by the caller
  }
}