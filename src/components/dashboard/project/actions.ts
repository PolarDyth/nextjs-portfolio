"use server";

import { Project, ProjectData } from "@/utils/supabase/projects/definitions";
import { createProject, updateProject } from "@/utils/supabase/projects/project-actions";
import { projectFormSchema } from "./schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";

type FormValues = z.infer<typeof projectFormSchema>;

// Define a proper response type
type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | { _errors: string[] }>;
};

export async function handleSubmitProject(data: FormValues): Promise<ActionResponse> {
  const validatedFields = projectFormSchema.safeParse(data);

  if (!validatedFields.success) {
    console.log("Validation error:", validatedFields.error.format());
    return {
      success: false,
      message: "Please check the form for errors",
      errors: validatedFields.error.format(),
    };
  }


  const projectData: Project = {
    data: validatedFields.data.data,
    slug: validatedFields.data.slug,
  };

  try {
    await createProject(projectData);
    return { 
      success: true,
      message: "Project created successfully" 
    };
  } catch(error) {
    console.error("Error creating project:", error);
    return { 
      success: false,
      message: "An error occurred while creating the project" 
    };
  }
}

export async function handleUpdateProject(projectId: number, data: FormValues): Promise<ActionResponse> {
  const validatedFields = projectFormSchema.safeParse(data);
  console.log("The id is", projectId)

  if (!validatedFields.success) {
    console.log("Validation error:", validatedFields.error.format());
    return {
      success: false,
      message: "Please check the form for errors",
      errors: validatedFields.error.format(),
    };
  }

  const projectData: ProjectData = {
    data: validatedFields.data.data,
    slug: validatedFields.data.slug,
  };

  try {
    await updateProject(projectId, projectData);
    // Revalidate paths for showing projects
    revalidatePath('/projects');
    revalidatePath(`/projects/${projectData.slug}`);
    revalidatePath('/dashboard/projects');
    revalidatePath(`/dashboard/projects/${projectId}`);
    
    return { 
      success: true,
      message: "Project updated successfully" 
    };
  } catch(error) {
    console.error("Error updating project:", error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Unknown error occurred";
      
    return { 
      success: false,
      message: `Failed to update project: ${errorMessage}` 
    };
  }
}
