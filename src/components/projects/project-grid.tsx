"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { ProjectCard } from "./project-card";

interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  github?: string;
  live?: string;
  featured?: boolean;
  status?: "beta" | "coming-soon";
}

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <AnimatedSection key={project.slug} delay={0.1 * (index + 1)}>
          <ProjectCard
            title={project.title}
            description={project.description}
            tags={project.tags}
            href={`/projects/${project.slug}`}
            github={project.github}
            live={project.live}
            featured={project.featured}
            status={project.status}
          />
        </AnimatedSection>
      ))}
    </div>
  );
}
