"use server";

import { createClient } from "../server";
import { Message } from "./definitions";

export async function getUserMessages(): Promise<Message[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("user_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase select error:", error);
      throw new Error(`Database error: ${error.message}`);
    }

    return data as Message[];
  } catch (error) {
    console.error("Error in getUserMessages:", error);
    throw error; // Re-throw to be handled by the caller
  }
}