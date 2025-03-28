"use server";

import { createClient } from "../server";
import { Project, ProjectData } from "./definitions";

export async function createProject(project: Project): Promise<void> {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from("projects")
      .insert({ 
        data: project.data, 
        slug: project.slug 
      });
      
    if (error) {
      console.error("Supabase insert error:", error);
      throw new Error(`Database error: ${error.message}`);
    }
  } catch (error) {
    console.error("Error in createProject:", error);
    throw error; // Re-throw to be handled by the caller
  }
}

export async function updateProject(id:number, project: ProjectData): Promise<void> {
  if (!id) {
    throw new Error("Project ID is required for update operations");
  }
  
  try {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from("projects")
      .update({
        data: project.data,
        slug: project.slug,
        updated_at: new Date().toISOString() // Add a timestamp for the update
      })
      .match({ id: id });
      
    if (error) {
      console.error("Error updating project:", error);
      throw new Error(`Database error: ${error.message}`);
    }
  } catch (error) {
    console.error("Error in updateProject:", error);
    throw error;
  }
}

export async function deleteProject(id: number): Promise<void> {
  const supabase = await createClient();
  
  const { error } = await supabase.from("projects").delete().match({ id });
  if (error) {
    console.log(error)
    throw error;
  }
}