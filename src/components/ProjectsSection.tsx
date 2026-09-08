"use client";

import { useState, useCallback } from "react";
import { AnimatedFolder, ImageLightbox } from "@/components/ui/3d-folder";
import { projectFolders } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageContext";
import { RevealOnScroll } from "@/components/RevealOnScroll";

interface LightboxState {
  projectIdx: number | null;
  screenshotIdx: number;
  sourceRect: DOMRect | null;
}

export function ProjectsSection() {
  const { d } = useLanguage();
  const t = d.projects;

  const [lightbox, setLightbox] = useState<LightboxState>({
    projectIdx: null,
    screenshotIdx: 0,
    sourceRect: null,
  });

  // Track hidden card per folder to maintain the fade-out effect
  const [hiddenCards, setHiddenCards] = useState<Record<string, string | null>>({});

  const isOpen = lightbox.projectIdx !== null;
  const currentProject = lightbox.projectIdx !== null ? projectFolders[lightbox.projectIdx] : null;

  const openAt = useCallback((projectIdx: number, screenshotIdx: number, sourceRect: DOMRect | null) => {
    setLightbox({ projectIdx, screenshotIdx, sourceRect });
    const project = projectFolders[projectIdx];
    if (project?.screenshots[screenshotIdx]) {
      setHiddenCards((prev) => ({ ...prev, [project.id]: project.screenshots[screenshotIdx].id }));
    }
  }, []);

  const handleClose = useCallback(() => {
    setLightbox((prev) => ({ ...prev, projectIdx: null }));
  }, []);

  const handleCloseComplete = useCallback(() => {
    setHiddenCards({});
  }, []);

  const handleNavigateScreenshot = useCallback(
    (idx: number) => {
      setLightbox((prev) => ({ ...prev, screenshotIdx: idx }));
      if (lightbox.projectIdx !== null) {
        const project = projectFolders[lightbox.projectIdx];
        if (project?.screenshots[idx]) {
          setHiddenCards((prev) => ({ ...prev, [project.id]: project.screenshots[idx].id }));
        }
      }
    },
    [lightbox.projectIdx]
  );

  const handlePrevProject = useCallback(() => {
    if (lightbox.projectIdx === null || lightbox.projectIdx <= 0) return;
    const newIdx = lightbox.projectIdx - 1;
    setLightbox({ projectIdx: newIdx, screenshotIdx: 0, sourceRect: null });
    setHiddenCards((prev) => {
      const project = projectFolders[newIdx];
      return project?.screenshots[0] ? { ...prev, [project.id]: project.screenshots[0].id } : prev;
    });
  }, [lightbox.projectIdx]);

  const handleNextProject = useCallback(() => {
    if (lightbox.projectIdx === null) return;
    const newIdx = lightbox.projectIdx + 1;
    if (newIdx >= projectFolders.length) return;
    setLightbox({ projectIdx: newIdx, screenshotIdx: 0, sourceRect: null });
    setHiddenCards((prev) => {
      const project = projectFolders[newIdx];
      return project?.screenshots[0] ? { ...prev, [project.id]: project.screenshots[0].id } : prev;
    });
  }, [lightbox.projectIdx]);

  return (
    <section id="projects" className="py-32 md:py-40 px-6">
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <div className="mb-24 max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              {t.heading}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t.subtitle}</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
            {projectFolders.map((project, projectIdx) => (
              <AnimatedFolder
                key={project.id}
                title={project.title}
                categoryLabel={project.categoryLabel}
                screenshots={project.screenshots}
                folderColors={project.folderColors}
                isEmpty={project.status === "coming-soon"}
                hiddenCardId={hiddenCards[project.id] ?? null}
                onOpenScreenshot={(screenshotIdx, sourceRect) =>
                  openAt(projectIdx, screenshotIdx, sourceRect)
                }
                onOpenFolder={() => openAt(projectIdx, 0, null)}
              />
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground/50 text-center">{t.folder_hint}</p>
        </RevealOnScroll>

        {/* Global lightbox */}
        {currentProject && (
          <ImageLightbox
            screenshots={currentProject.screenshots}
            projectTitle={currentProject.title}
            categoryLabel={currentProject.categoryLabel}
            description={currentProject.description}
            impact={currentProject.impact}
            tags={currentProject.tags}
            status={currentProject.status}
            githubUrl={currentProject.githubUrl}
            liveUrl={currentProject.liveUrl}
            screenshotBackground={currentProject.screenshotBackground}
            currentIndex={lightbox.screenshotIdx}
            isOpen={isOpen}
            onClose={handleClose}
            sourceRect={lightbox.sourceRect}
            onCloseComplete={handleCloseComplete}
            onNavigate={handleNavigateScreenshot}
            hasPrevProject={lightbox.projectIdx !== null && lightbox.projectIdx > 0}
            hasNextProject={
              lightbox.projectIdx !== null && lightbox.projectIdx < projectFolders.length - 1
            }
            onPrevProject={handlePrevProject}
            onNextProject={handleNextProject}
            nextProjectTitle={
              lightbox.projectIdx !== null && lightbox.projectIdx < projectFolders.length - 1
                ? projectFolders[lightbox.projectIdx + 1]?.title
                : undefined
            }
            prevProjectTitle={
              lightbox.projectIdx !== null && lightbox.projectIdx > 0
                ? projectFolders[lightbox.projectIdx - 1]?.title
                : undefined
            }
          />
        )}
      </div>
    </section>
  );
}
