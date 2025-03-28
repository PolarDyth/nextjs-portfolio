"use server";

import { createClient } from "@/utils/supabase/server";
import { UUID } from "crypto";
import { revalidatePath } from "next/cache";

export async function markAsRead(messageId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("user_messages")
    .update({ read: true })
    .eq("id", messageId);

  if (error) {
    console.error("Error marking message as read:", error);
    throw new Error("Failed to mark message as read");
  }

  revalidatePath("/dashboard/messages");
}

export async function deleteMessage(messageId: UUID) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("user_messages")
    .delete()
    .eq("id", messageId);

  if (error) {
    console.error("Error deleting message:", error);
    throw new Error("Failed to delete message");
  }

  revalidatePath("/dashboard/messages");
}

export async function markAllAsRead() {
  const supabase = await createClient();

  const { error } = await supabase
    .from("user_messages")
    .update({ read: true })
    .eq("read", false);

  if (error) {
    console.error("Error marking all messages as read:", error);
    throw new Error("Failed to mark all messages as read");
  }

  revalidatePath("/dashboard/messages");
}

export async function getUnreadMessagesCount() {
  const supabase = await createClient();
  
  const { count, error } = await supabase
    .from("user_messages")
    .select("*", { count: "exact", head: true })
    .eq("read", false);
    
  if (error) {
    console.error("Error fetching unread message count:", error);
    return 0;
  }
  
  return count || 0;
}