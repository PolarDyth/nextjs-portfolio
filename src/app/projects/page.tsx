"use client";

import ProjectCard from "@/components/ui/ProjectCard";
import { ProjectData } from "@/utils/supabase/projects/definitions";
import { getProjects } from "@/utils/supabase/projects/projects-data";
import { useEffect, useState } from "react";

export default function ProjectPage() {
   const [projects, setProjects] = useState<ProjectData[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
 
   useEffect(() => {
     const fetchProjects = async () => {
       try {
         const projectData = await getProjects();
         setProjects(projectData);
       } catch (error) {
         console.error("Failed to fetch projects:", error);
       } finally {
         setLoading(false);
       }
     };
     fetchProjects();
   }, []);

  return (
    <>
      <div className="flex flex-col py-20 gap-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            My Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Explore my portfolio of projects spanning web development, data
            science, and more. Each project represents a unique challenge and
            learning opportunity.
          </p>
        </div>

        {loading ? (
          <div className="relative flex justify-center items-center min-h-screen">
            <div className="absolute animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4">
            {projects.map((project: ProjectData, index: number) => (
              <ProjectCard
                key={index}
                image={project.data.images[0]}
                title={project.data.title}
                description={project.data.description}
                skills={project.data.skills}
                github={project.data.github}
                demo={project.data.liveLink}
                slug={project.slug}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl">No projects found</p>
          </div>
        )}
      </div>
    </>
  );
}
