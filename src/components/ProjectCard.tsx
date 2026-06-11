"use client";

import type { Project } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageContext";
import { GitHubIcon } from "@/components/icons";

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const { d, locale } = useLanguage();
  const t = d.projects;
  const hasGithub = !!project.links.github;

  return (
    <article
      className="group gradient-border flex flex-col rounded-2xl border border-border overflow-hidden cursor-pointer"
      style={{
        background: "var(--color-surface)",
        transition: "box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow =
          "0 0 0 1px rgba(99,102,241,0.22), 0 12px 40px rgba(99,102,241,0.1), 0 4px 12px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Top gradient accent bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-accent-indigo/0 via-accent-indigo to-accent-teal/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold tracking-tight text-foreground leading-snug group-hover:text-accent-indigo transition-colors duration-200">
              {project.title}
            </h3>
            <span className="font-mono text-[10px] tracking-widest text-accent-teal uppercase">
              {project.role}
            </span>
          </div>

          {/* GitHub link — stop propagation so it doesn't also open the modal */}
          <div className="shrink-0">
            {hasGithub ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub`}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors duration-150 hover:border-accent-indigo/40 hover:text-accent-indigo cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <GitHubIcon size={14} />
              </a>
            ) : (
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border/40 text-muted-foreground/25 cursor-not-allowed select-none">
                <GitHubIcon size={14} />
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description[locale]}
        </p>

        {/* Impact callout */}
        <div
          className="rounded-xl border border-border/60 p-4 transition-colors duration-200 group-hover:border-accent-indigo/20"
          style={{ background: "var(--color-surface-elevated)" }}
        >
          <p className="mb-1.5 font-mono text-[9px] tracking-widest text-accent-indigo/70 uppercase">
            {t.impact_label}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.focus[locale]}
          </p>
        </div>

        {/* Stack badges */}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="chip-lift rounded-md border border-border/70 px-2.5 py-1 font-mono text-[11px] text-muted-foreground hover:border-accent-indigo/30 hover:text-accent-indigo/80"
              style={{ background: "var(--color-background)" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
