import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProjectCard from "../ui/ProjectCard";

export default function Projects() {

  const projects = [
    {
      slug: "portfolio-website",
      data: {
        title: "Portfolio Website",
        description: "A modern portfolio website built with Next.js, TypeScript, and Tailwind CSS.",
        skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        github: "https://github.com/username/portfolio",
        liveLink: "https://yourportfolio.com",
        images: [{ src: "/projects/portfolio.jpg", alt: "Portfolio Website Screenshot" }]
      }
    },
    {
      slug: "e-commerce-platform",
      data: {
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce application with product management, cart functionality, and payment processing.",
        skills: ["React", "Node.js", "MongoDB", "Stripe API"],
        github: "https://github.com/username/ecommerce",
        liveLink: "https://your-ecommerce.com",
        images: [{ src: "/projects/ecommerce.jpg", alt: "E-Commerce Platform Screenshot" }]
      }
    },
    {
      slug: "ai-image-generator",
      data: {
        title: "AI Image Generator",
        description: "An application that generates images using AI models based on text prompts.",
        skills: ["Python", "TensorFlow", "React", "Flask"],
        github: "https://github.com/username/ai-image-gen",
        liveLink: "https://ai-image-gen.com",
        images: [{ src: "/projects/ai-generator.jpg", alt: "AI Image Generator Screenshot" }]
      }
    }
  ];

  return (
    <section className="py-20 animate-fade-in">
      <div className="text-left flex flex-col">
        <h2 className="text-4xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Featured Projects
        </h2>
        <div
          className="flex items-center justify-between animate-slide-up"
          style={{ animationDelay: "100ms" }}
        >
          <p className="text-muted-foreground">
            A collection of my recent work showcasing my skills and expertise.
          </p>

          <Link href="/projects" className="p-0">
            <Button variant="link" className="cursor-pointer p-0 group">
              View All{" "}
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
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
    </section>
  );
}
