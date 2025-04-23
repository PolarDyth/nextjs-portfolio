import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProjectCard from "../ui/ProjectCard";
import { getProjects } from "@/utils/supabase/projects/projects-data";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 animate-fade-in">
      <div className="text-left flex flex-col mb-6 sm:mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Featured Projects
        </h2>
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 animate-slide-up"
          style={{ animationDelay: "100ms" }}
        >
          <p className="text-muted-foreground text-sm sm:text-base max-w-md">
            A collection of my recent work showcasing my skills and expertise.
          </p>

          <Link href="/projects" className="sm:p-0 self-start sm:self-auto">
            <Button variant="link" className="cursor-pointer p-0 group">
              View All{" "}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {projects.slice(0, 2).map((project, index) => (
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
      
      {/* Mobile only - Show third project */}
      <div className="block md:hidden mt-6 sm:mt-8">
        {projects.slice(2, 3).map((project, index) => (
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
      
      <div className="flex justify-center mt-8 sm:mt-10 md:hidden">
        <Button asChild variant="outline" size="sm" className="group">
          <Link href="/projects">
            See All Projects
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}