import ProjectEditForm from "@/components/admin/project/edit-form";
import { ProjectData } from "@/utils/supabase/projects/definitions";
import { getProjectById } from "@/utils/supabase/projects/projects-data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{id: string}>}) {
  const params = await props.params;
  const id = params.id;
  console.log("ID:", id)

    const project: ProjectData = await getProjectById(id);

    if (!project) {
      notFound();
    }

  return (
    <main className="flex justify-center items-center w-full">
      <ProjectEditForm project={project} id={id} />
    </main>
  )
}