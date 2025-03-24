import { createClient } from "../client";
import { Project } from "./definitions";

export async function getProjects() {
  const { data, error } = await createClient().from("projects").select("*");
  if (error) {
    throw error;
  }

  return data as Project[];
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

  return data as Project;
}