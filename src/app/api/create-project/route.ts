import { projectFormSchema } from "@/components/dashboard/project/schema";
import { Project, ProjectData } from "@/utils/supabase/projects/definitions";
import { createProject } from "@/utils/supabase/projects/project-actions";

export async function POST(request: Request) {
  const body: ProjectData = await request.json();

  const validatedFields = projectFormSchema.safeParse(body);

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
  } catch (error) {
    console.error("Error creating project:", error);
  }

  return new Response(
    JSON.stringify({ success: true }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
