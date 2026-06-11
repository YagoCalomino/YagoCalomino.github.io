"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageContext";
import { GitHubIcon, ExternalLinkIcon } from "@/components/icons";

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 3L6 8l4 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 3l4 5-4 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { d, locale } = useLanguage();
  const t = d.projects;
  const [currentImage, setCurrentImage] = useState(0);

  const images = project.images ?? [];
  const hasImages = images.length > 0;
  const isFirst = currentImage === 0;
  const isLast = currentImage === images.length - 1;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (hasImages && e.key === "ArrowLeft" && !isFirst)
        setCurrentImage((i) => i - 1);
      if (hasImages && e.key === "ArrowRight" && !isLast)
        setCurrentImage((i) => i + 1);
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, hasImages, isFirst, isLast]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: "rgba(0,0,0,0.85)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl border shadow-2xl"
        style={{
          background: "var(--color-surface)",
          borderColor: "var(--color-border)",
          boxShadow: "0 0 0 1px rgba(99,102,241,0.1), 0 24px 64px rgba(0,0,0,0.7)",
          animation: "modal-enter 0.28s cubic-bezier(0.22, 1, 0.36, 1) both",
        }}
      >
        <style>{`
          @keyframes modal-enter {
            from { opacity: 0; transform: scale(0.97) translateY(8px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>
        {/* Top accent bar */}
        <div className="h-[2px] w-full bg-gradient-to-r from-accent-indigo/0 via-accent-indigo to-accent-teal/60" />

        <div className="p-7 sm:p-9 space-y-7">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="font-mono text-[10px] tracking-widest uppercase"
                  style={{ color: "var(--color-accent-indigo)", opacity: 0.6 }}
                >
                  [PROJECT]
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {project.title}
              </h2>
              <span className="font-mono text-[10px] tracking-widest text-accent-teal uppercase">
                {project.role}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label={t.modal_close}
              className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors duration-150 hover:border-foreground/20 hover:text-foreground cursor-pointer"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Image gallery — only rendered when project has images */}
          {hasImages && (
            <div className="space-y-3">
              <p className="font-mono text-[10px] tracking-widest text-accent-indigo/70 uppercase">
                // screenshots
              </p>
              <div
                className="relative w-full overflow-hidden rounded-xl"
                style={{
                  background: "var(--color-background)",
                  aspectRatio: "16 / 9",
                  border: "1px solid var(--color-border)",
                }}
              >
                <Image
                  src={images[currentImage]}
                  alt={`${project.title} screenshot ${currentImage + 1} of ${images.length}`}
                  fill
                  className="object-contain"
                  unoptimized
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage((i) => i - 1)}
                      disabled={isFirst}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-border/70 backdrop-blur-sm text-muted-foreground transition-all duration-150 hover:text-foreground hover:border-accent-indigo/40 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                      style={{ background: "rgba(9,9,15,0.75)" }}
                    >
                      <ChevronLeftIcon />
                    </button>

                    <button
                      onClick={() => setCurrentImage((i) => i + 1)}
                      disabled={isLast}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-border/70 backdrop-blur-sm text-muted-foreground transition-all duration-150 hover:text-foreground hover:border-accent-indigo/40 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                      style={{ background: "rgba(9,9,15,0.75)" }}
                    >
                      <ChevronRightIcon />
                    </button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImage(idx)}
                          aria-label={`Go to image ${idx + 1}`}
                          className="h-1.5 rounded-full transition-all duration-200 cursor-pointer"
                          style={{
                            width: idx === currentImage ? "1rem" : "0.375rem",
                            background:
                              idx === currentImage
                                ? "var(--color-accent-indigo)"
                                : "rgba(148,163,184,0.35)",
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-3">
            <p className="font-mono text-[10px] tracking-widest text-accent-indigo/70 uppercase">
              {t.modal_details}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.description[locale]}
            </p>
          </div>

          {/* Impact */}
          <div
            className="rounded-xl border border-border/60 p-5 space-y-2"
            style={{ background: "var(--color-surface-elevated)" }}
          >
            <p className="font-mono text-[9px] tracking-widest text-accent-indigo/70 uppercase">
              {t.impact_label}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.focus[locale]}
            </p>
          </div>

          {/* Stack */}
          <div className="space-y-3">
            <p className="font-mono text-[10px] tracking-widest text-accent-indigo/70 uppercase">
              {t.modal_stack}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="chip-lift rounded-md border border-border/70 px-3 py-1 font-mono text-[11px] text-muted-foreground hover:border-accent-indigo/30 hover:text-accent-indigo/80"
                  style={{ background: "var(--color-background)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-1">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-button flex h-10 items-center gap-2 rounded-lg bg-accent-indigo px-6 font-mono text-sm font-semibold text-white cursor-pointer"
              >
                {t.modal_view_live} <ExternalLinkIcon size={13} />
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center gap-2 rounded-lg border border-border px-6 font-mono text-sm text-muted-foreground transition-colors duration-150 hover:border-accent-indigo/30 hover:text-foreground cursor-pointer"
              >
                <GitHubIcon size={15} /> {t.modal_view_github}
              </a>
            )}
            <button
              onClick={onClose}
              className="flex h-10 items-center rounded-lg border border-border px-6 font-mono text-sm text-muted-foreground transition-colors duration-150 hover:border-foreground/20 hover:text-foreground cursor-pointer"
            >
              {t.modal_close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
