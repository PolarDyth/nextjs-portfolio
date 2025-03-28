import { notFound } from "next/navigation";
import { createClient } from "../client";
import { ProjectData } from "./definitions";

export async function getProjects() {
  const { data, error } = await createClient().from("projects").select("*");
  if (error) {
    throw error;
  }

  return data as ProjectData[];
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await createClient()
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) {
    throw error;
  }

  return data as ProjectData;
}

export async function getProjectById(id: string) {
  const { data, error } = await createClient()
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
    if (error) {
      // Check for PostgreSQL or Supabase "not found" error codes
      if (error.code === 'PGRST116' || error.message.includes('not found')) {
        // Return null for not found instead of throwing an error
        notFound();
      }
      // For all other errors, throw normally
      throw error;
    }

  return data as ProjectData;
}