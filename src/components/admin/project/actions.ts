"use server";

import { Project } from "@/utils/supabase/projects/definitions";
import { createProject } from "@/utils/supabase/projects/project-actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { projectFormSchema, State } from "./schema";

export async function handleSubmitProject(currentState: State, data: FormData) {
  const validated = projectFormSchema.safeParse(data);
  console.log("a test run")

  if (!validated.success) {
    return {
      message: "Please check the form for errors",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const projectData: Project = {
    data: validated.data.data,
    slug: validated.data.slug,
  };
  try {
    await createProject(projectData);
  } catch {
    return {
      message: "There was an error creating the project",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard")
}
