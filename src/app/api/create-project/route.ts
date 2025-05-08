import { projectFormSchema } from "@/components/dashboard/project/schema";
import { Project, ProjectData } from "@/utils/supabase/projects/definitions";
import { createProject } from "@/utils/supabase/projects/project-actions";

export async function POST(request: Request) {
  const body: ProjectData = await request.json();

  const validated = projectFormSchema.safeParse(body);
  if (!validated.success) {
    console.log("Validation error:", validated.error.format());
    return new Response(
      JSON.stringify({
        success: false,
        message: "Please check the form for errors",
        errors: validated.error.format(),
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const projectData: Project = {
    data: validated.data.data,
    slug: validated.data.slug,
  };

  try {
    await createProject(projectData);
    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to create project",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}