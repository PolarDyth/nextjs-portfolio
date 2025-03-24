"use server";

import { createClient } from "../server";
import { Project } from "./definitions";

export async function createProject(project: Project): Promise<void> {
  const supabase = await createClient();
  
  const { error } = await supabase.from("projects").insert([project]);
  if (error) {
    throw error;
  }
  
}

export async function deleteProject(id: number): Promise<void> {
  const supabase = await createClient();
  
  const { error } = await supabase.from("projects").delete().match({ id });
  if (error) {
    throw error;
  }
}