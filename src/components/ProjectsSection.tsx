"use client";

import { useState } from "react";
import { PROJECTS, type Project } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { useLanguage } from "@/i18n/LanguageContext";
import { SectionLabel } from "@/components/SectionLabel";

export function ProjectsSection() {
  const { d } = useLanguage();
  const t = d.projects;
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Section label */}
        <RevealOnScroll>
          <SectionLabel number="05" label={t.section_label} />

          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t.heading}
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid gap-6 sm:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <RevealOnScroll key={project.title} delay={i * 100}>
              <ProjectCard
                project={project}
                onOpen={() => setActiveProject(project)}
              />
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* Single modal instance — impossible to open two at once */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}
