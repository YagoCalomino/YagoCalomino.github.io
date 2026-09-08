"use client"

import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  forwardRef,
} from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProjectStatus } from "@/data/projects"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FolderProject {
  id: string
  image: string
  title: string
  url?: string
}

export interface FolderColors {
  back: string
  front: string
  tab: string
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────

interface ProjectCardProps {
  image: string
  title: string
  delay: number
  isVisible: boolean
  index: number
  onClick: () => void
  isSelected: boolean
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ image, title, delay, isVisible, index, onClick, isSelected }, ref) => {
    const rotations = [-12, 0, 12]
    const translations = [-55, 0, 55]

    return (
      <div
        ref={ref}
        className={cn(
          "absolute w-20 h-28 rounded-lg overflow-hidden shadow-xl",
          "border border-white/10 cursor-pointer",
          "hover:ring-2 hover:ring-white/25 hover:scale-105",
          isSelected && "opacity-0 pointer-events-none",
        )}
        style={{
          background: "#1a1d2c",
          transform: isVisible
            ? `translateY(-90px) translateX(${translations[index]}px) rotate(${rotations[index]}deg) scale(1)`
            : "translateY(0px) translateX(0px) rotate(0deg) scale(0.5)",
          opacity: isSelected ? 0 : isVisible ? 1 : 0,
          transition: `all 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
          zIndex: 10 - index,
          left: "-40px",
          top: "-56px",
        }}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <p className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-medium text-white/90 truncate leading-tight">
          {title}
        </p>
      </div>
    )
  },
)
ProjectCard.displayName = "ProjectCard"

// ─── ImageLightbox ────────────────────────────────────────────────────────────

interface ImageLightboxProps {
  screenshots: FolderProject[]
  projectTitle: string
  categoryLabel?: string
  description?: string
  impact?: string
  tags?: string[]
  status: ProjectStatus
  githubUrl?: string
  liveUrl?: string
  screenshotBackground?: string
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  sourceRect: DOMRect | null
  onCloseComplete?: () => void
  onNavigate: (index: number) => void
  // Navegação entre projetos:
  hasPrevProject: boolean
  hasNextProject: boolean
  onPrevProject: () => void
  onNextProject: () => void
  nextProjectTitle?: string
  prevProjectTitle?: string
}

export function ImageLightbox({
  screenshots,
  projectTitle,
  categoryLabel,
  description,
  impact,
  tags,
  status,
  githubUrl,
  liveUrl,
  screenshotBackground,
  currentIndex,
  isOpen,
  onClose,
  sourceRect,
  onCloseComplete,
  onNavigate,
  hasPrevProject,
  hasNextProject,
  onPrevProject,
  onNextProject,
  nextProjectTitle,
  prevProjectTitle,
}: ImageLightboxProps) {
  const [animationPhase, setAnimationPhase] = useState<"initial" | "animating" | "complete">("initial")
  const [isClosing, setIsClosing] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [internalIndex, setInternalIndex] = useState(currentIndex)
  const [isSliding, setIsSliding] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const totalScreenshots = screenshots.length
  const hasNext = internalIndex < totalScreenshots - 1
  const hasPrev = internalIndex > 0

  useEffect(() => {
    if (isOpen && currentIndex !== internalIndex && !isSliding) {
      setIsSliding(true)
      const timer = setTimeout(() => {
        setInternalIndex(currentIndex)
        setIsSliding(false)
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, isOpen]) // eslint-disable-line

  useEffect(() => {
    if (isOpen) {
      setInternalIndex(currentIndex)
      setIsSliding(false)
    }
  }, [isOpen]) // eslint-disable-line

  // Reset screenshot index when the project changes (screenshots array troca)
  const firstScreenshotId = screenshots[0]?.id ?? "empty"
  const prevFirstScreenshotIdRef = useRef(firstScreenshotId)
  useEffect(() => {
    if (prevFirstScreenshotIdRef.current !== firstScreenshotId) {
      prevFirstScreenshotIdRef.current = firstScreenshotId
      setInternalIndex(0)
      setIsSliding(false)
    }
  }, [firstScreenshotId])

  const navigateNext = useCallback(() => {
    if (internalIndex >= totalScreenshots - 1 || isSliding) return
    onNavigate(internalIndex + 1)
  }, [internalIndex, totalScreenshots, isSliding, onNavigate])

  const navigatePrev = useCallback(() => {
    if (internalIndex <= 0 || isSliding) return
    onNavigate(internalIndex - 1)
  }, [internalIndex, isSliding, onNavigate])

  const handleClose = useCallback(() => {
    setIsClosing(true)
    onClose()
    setTimeout(() => {
      setIsClosing(false)
      setShouldRender(false)
      setAnimationPhase("initial")
      onCloseComplete?.()
    }, 400)
  }, [onClose, onCloseComplete])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowRight") {
        if (internalIndex >= totalScreenshots - 1 && hasNextProject) onNextProject()
        else navigateNext()
      }
      if (e.key === "ArrowLeft") {
        if (internalIndex === 0 && hasPrevProject) onPrevProject()
        else navigatePrev()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    if (isOpen) document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, handleClose, navigateNext, navigatePrev, internalIndex, totalScreenshots, hasNextProject, hasPrevProject, onNextProject, onPrevProject])

  useLayoutEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setAnimationPhase("initial")
      setIsClosing(false)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimationPhase("animating"))
      })
      const timer = setTimeout(() => setAnimationPhase("complete"), 500)
      return () => clearTimeout(timer)
    }
  }, [isOpen, sourceRect])

  if (!shouldRender) return null

  const getInitialStyles = (): React.CSSProperties => {
    if (!sourceRect) return {}
    const vw = window.innerWidth
    const vh = window.innerHeight
    const tw = Math.min(768, vw - 64)
    const th = Math.min(vh * 0.85, 600)
    const tx = (vw - tw) / 2
    const ty = (vh - th) / 2
    const scale = Math.max(sourceRect.width / tw, sourceRect.height / th)
    const translateX = sourceRect.left + sourceRect.width / 2 - (tx + tw / 2)
    const translateY = sourceRect.top + sourceRect.height / 2 - (ty + th / 2)
    return { transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`, opacity: 1 }
  }

  const currentStyles =
    animationPhase === "initial" && !isClosing
      ? getInitialStyles()
      : { transform: "translate(0, 0) scale(1)", opacity: 1 }

  const btnBase =
    "flex items-center justify-center rounded-full backdrop-blur-md border border-white/10 text-white/50 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={handleClose}
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: isClosing ? 0 : 1,
        transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(5, 5, 8, 0.92)",
          backdropFilter: "blur(24px)",
          opacity: animationPhase === "initial" && !isClosing ? 0 : 1,
          transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Seta prev — navega apenas entre screenshots do projeto atual — centralizada verticalmente */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          navigatePrev()
        }}
        disabled={!hasPrev || isSliding}
        className={cn("absolute left-4 md:left-8 z-50 w-12 h-12", btnBase, "disabled:opacity-0 disabled:pointer-events-none hover:scale-110")}
        style={{
          top: "50%",
          background: "rgba(16, 17, 26, 0.8)",
          opacity: animationPhase === "complete" && !isClosing && hasPrev ? 1 : 0,
          transform:
            animationPhase === "complete" && !isClosing
              ? "translateY(-50%) translateX(0)"
              : "translateY(-50%) translateX(-20px)",
          transition: "opacity 300ms ease-out 150ms, transform 300ms ease-out 150ms",
        }}
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={2} />
      </button>

      {/* Seta next — navega apenas entre screenshots do projeto atual — centralizada verticalmente */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          navigateNext()
        }}
        disabled={!hasNext || isSliding}
        className={cn("absolute right-4 md:right-8 z-50 w-12 h-12", btnBase, "disabled:opacity-0 disabled:pointer-events-none hover:scale-110")}
        style={{
          top: "50%",
          background: "rgba(16, 17, 26, 0.8)",
          opacity: animationPhase === "complete" && !isClosing && hasNext ? 1 : 0,
          transform:
            animationPhase === "complete" && !isClosing
              ? "translateY(-50%) translateX(0)"
              : "translateY(-50%) translateX(20px)",
          transition: "opacity 300ms ease-out 150ms, transform 300ms ease-out 150ms",
        }}
      >
        <ChevronRight className="w-5 h-5" strokeWidth={2} />
      </button>

      {/* Pill flutuante — projeto anterior — posicionada embaixo para não colidir com as setas de screenshot */}
      {hasPrevProject && animationPhase === "complete" && !isClosing && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrevProject() }}
          className="absolute left-4 md:left-6 z-50 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
          style={{
            bottom: "32px",
            background: "rgba(16,17,26,0.9)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.7)",
            opacity: 1,
          }}
        >
          <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2} />
          <span style={{ color: "rgba(255,255,255,0.4)" }}>Anterior</span>
          <span>{prevProjectTitle}</span>
        </button>
      )}

      {/* Pill flutuante — próximo projeto — posicionada embaixo para não colidir com as setas de screenshot */}
      {hasNextProject && animationPhase === "complete" && !isClosing && (
        <button
          onClick={(e) => { e.stopPropagation(); onNextProject() }}
          className="absolute right-4 md:right-6 z-50 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
          style={{
            bottom: "32px",
            background: "rgba(16,17,26,0.9)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.7)",
            opacity: 1,
          }}
        >
          <span>{nextProjectTitle}</span>
          <span style={{ color: "rgba(255,255,255,0.4)" }}>Próximo</span>
          <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      )}

      <div
        ref={containerRef}
        className="relative z-10 w-full"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "900px",
          ...currentStyles,
          transform: isClosing ? "translate(0, 0) scale(0.96)" : currentStyles.transform,
          transition:
            animationPhase === "initial" && !isClosing
              ? "none"
              : "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease-out",
          transformOrigin: "center center",
        }}
      >
        <div
          className="relative overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_340px]"
          style={{
            background: "#10111a",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
            borderRadius: animationPhase === "initial" && !isClosing ? "8px" : "20px",
            transition: "border-radius 500ms cubic-bezier(0.16, 1, 0.3, 1)",
            maxHeight: "90vh",
          }}
        >
          {/* Coluna esquerda — imagem + navegação */}
          <div className="relative overflow-hidden flex flex-col" style={{ minHeight: "300px" }}>
            {totalScreenshots === 0 ? (
              // Placeholder para projetos sem screenshots
              <div
                className="flex flex-1 items-center justify-center"
                style={{
                  minHeight: "240px",
                  background: "rgba(109,40,217,0.06)",
                }}
              >
                <div className="text-center px-8">
                  <div className="text-4xl mb-3">🚧</div>
                  <p className="text-sm font-medium text-white/60">Em construção</p>
                  <p className="text-xs text-white/30 mt-1">Screenshots disponíveis em breve</p>
                </div>
              </div>
            ) : (
              <>
                <div
                  className="flex flex-1"
                  style={{
                    transform: `translateX(-${internalIndex * 100}%)`,
                    transition: isSliding ? "transform 350ms cubic-bezier(0.32, 0.72, 0, 1)" : "none",
                  }}
                >
                  {screenshots.map((screenshot) => (
                    <img
                      key={screenshot.id}
                      src={screenshot.image || "/placeholder.svg"}
                      alt={screenshot.title}
                      className="w-full h-auto flex-shrink-0"
                      style={{
                        minWidth: "100%",
                        background: screenshotBackground ?? "#050508",
                        maxHeight: "65vh",
                        objectFit: "contain",
                      }}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Nav dots sobre a imagem */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {screenshots.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => onNavigate(idx)}
                      className="transition-all duration-300"
                      style={{
                        width: idx === internalIndex ? "20px" : "6px",
                        height: "6px",
                        borderRadius: "3px",
                        background: idx === internalIndex ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                      }}
                    />
                  ))}
                </div>

                {/* Caption da screenshot */}
                {screenshots[internalIndex]?.title && (
                  <div
                    className="absolute bottom-8 left-3 text-xs text-white/40 px-2 py-1 rounded"
                    style={{ background: "rgba(0,0,0,0.4)" }}
                  >
                    {screenshots[internalIndex].title}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Coluna direita — detalhes técnicos */}
          <div
            className="flex flex-col overflow-y-auto p-6"
            style={{
              maxHeight: "90vh",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              opacity: animationPhase === "complete" && !isClosing ? 1 : 0,
              transform: animationPhase === "complete" && !isClosing ? "translateX(0)" : "translateX(16px)",
              transition: "opacity 350ms ease-out 120ms, transform 350ms ease-out 120ms",
            }}
          >
            {/* Label + título + X */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-white/30 uppercase tracking-widest">[PROJECT]</span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleClose() }}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={2} />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-white leading-tight">{projectTitle}</h2>
              {categoryLabel && (
                <span className="text-xs font-mono uppercase tracking-wider mt-1 block" style={{ color: "#2563eb" }}>
                  {categoryLabel}
                </span>
              )}
            </div>

            {/* Separador */}
            <div className="h-px mb-4" style={{ background: "rgba(255,255,255,0.06)" }} />

            {/* Descrição */}
            {description && (
              <div className="mb-4">
                <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-2">
                  Detalhes do Projeto
                </p>
                <p className="text-sm text-white/65 leading-relaxed">{description}</p>
              </div>
            )}

            {/* Impacto */}
            {impact && (
              <div
                className="p-3 rounded-xl mb-4"
                style={{
                  background: "rgba(5,5,8,0.6)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderLeft: "3px solid rgba(37,99,235,0.4)",
                }}
              >
                <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-2">
                  Impacto & Foco
                </p>
                <p className="text-sm text-white/55 leading-relaxed">{impact}</p>
              </div>
            )}

            {/* Stack */}
            {tags && tags.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-2">
                  Stack Técnico
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs text-white/50 rounded-md font-mono"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Botões — variam por status do projeto */}
            <div className="mt-auto flex gap-2 pt-2">
              {status === "closed-beta" && (
                <div
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium rounded-xl border"
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    cursor: "default",
                  }}
                >
                  🔒 Acesso Fechado · Em Fase Beta
                </div>
              )}

              {status === "coming-soon" && (
                <div
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium rounded-xl border"
                  style={{
                    color: "rgba(167,139,250,0.7)",
                    background: "rgba(109,40,217,0.08)",
                    border: "1px solid rgba(109,40,217,0.2)",
                    cursor: "default",
                  }}
                >
                  🚧 Em construção · Open Source em breve
                </div>
              )}

              {status === "open-source" && githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white/70 rounded-xl border border-white/10 hover:border-white/20 hover:text-white transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  GitHub
                </a>
              )}

              {status === "open-source" && liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white rounded-xl transition-all duration-200 hover:opacity-90"
                  style={{ background: "#2563eb" }}
                >
                  Ver Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── AnimatedFolder ────────────────────────────────────────────────────────────

interface AnimatedFolderProps {
  title: string
  categoryLabel?: string
  screenshots: FolderProject[]
  folderColors?: FolderColors
  className?: string
  isEmpty?: boolean
  hiddenCardId: string | null
  onOpenScreenshot: (screenshotIndex: number, sourceRect: DOMRect | null) => void
  onOpenFolder: () => void
}

export function AnimatedFolder({
  title,
  categoryLabel,
  screenshots,
  folderColors,
  className,
  isEmpty,
  hiddenCardId,
  onOpenScreenshot,
  onOpenFolder,
}: AnimatedFolderProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current)
    }
  }, [])

  const colors: FolderColors = folderColors ?? {
    back: "#1d4ed8",
    front: "#2563eb",
    tab: "#1e40af",
  }

  const handleProjectClick = (screenshot: FolderProject, index: number) => {
    const el = cardRefs.current[index]
    onOpenScreenshot(index, el ? el.getBoundingClientRect() : null)
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center",
        "px-6 pt-8 pb-6 rounded-2xl cursor-pointer select-none",
        "transition-all duration-500 ease-out group",
        className,
      )}
      style={{
        minWidth: "220px",
        minHeight: "260px",
        perspective: "1000px",
        background: "rgba(16, 17, 26, 0.6)",
        border: isHovered
          ? "1px solid rgba(255,255,255,0.12)"
          : "1px solid rgba(255,255,255,0.06)",
        boxShadow: isHovered
          ? `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${colors.front}15`
          : "none",
        transition: "box-shadow 500ms, border-color 500ms",
      }}
      onMouseEnter={() => {
        if (leaveTimerRef.current) {
          clearTimeout(leaveTimerRef.current)
          leaveTimerRef.current = null
        }
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        leaveTimerRef.current = setTimeout(() => setIsHovered(false), 150)
      }}
      onClick={() => {
        onOpenFolder()
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 80%, ${colors.front}18 0%, transparent 65%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 500ms",
        }}
      />

      <div className="relative flex items-center justify-center" style={{ height: "150px", width: "190px" }}>
        <div
          className="absolute w-28 h-20 rounded-xl shadow-lg"
          style={{
            background: `linear-gradient(160deg, ${colors.back} 0%, ${colors.back}cc 100%)`,
            transformOrigin: "bottom center",
            transform: isHovered ? "rotateX(-15deg)" : "rotateX(0deg)",
            transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            zIndex: 10,
          }}
        />
        <div
          className="absolute w-10 h-3.5 rounded-t-md"
          style={{
            background: colors.tab,
            top: "calc(50% - 40px - 10px)",
            left: "calc(50% - 56px + 12px)",
            transformOrigin: "bottom center",
            transform: isHovered ? "rotateX(-25deg) translateY(-2px)" : "rotateX(0deg)",
            transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            zIndex: 10,
          }}
        />
        <div
          className="absolute"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 20 }}
        >
          {screenshots.slice(0, 3).map((screenshot, index) => (
            <ProjectCard
              key={screenshot.id}
              ref={(el) => { cardRefs.current[index] = el }}
              image={screenshot.image}
              title={screenshot.title}
              delay={index * 80}
              isVisible={isHovered}
              index={index}
              onClick={() => handleProjectClick(screenshot, index)}
              isSelected={hiddenCardId === screenshot.id}
            />
          ))}
        </div>
        <div
          className="absolute w-28 h-20 rounded-xl shadow-xl"
          style={{
            background: `linear-gradient(160deg, ${colors.front} 0%, ${colors.front}ee 100%)`,
            top: "calc(50% - 40px + 4px)",
            transformOrigin: "bottom center",
            transform: isHovered ? "rotateX(25deg) translateY(8px)" : "rotateX(0deg)",
            transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            zIndex: 30,
          }}
        />
        <div
          className="absolute w-28 h-20 rounded-xl overflow-hidden pointer-events-none"
          style={{
            top: "calc(50% - 40px + 4px)",
            background: "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 45%)",
            transformOrigin: "bottom center",
            transform: isHovered ? "rotateX(25deg) translateY(8px)" : "rotateX(0deg)",
            transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            zIndex: 31,
          }}
        />
      </div>

      <div className="relative z-10 text-center mt-4">
        <h3
          className="text-sm font-semibold text-white/90 transition-all duration-300"
          style={{ transform: isHovered ? "translateY(3px)" : "translateY(0)" }}
        >
          {title}
        </h3>
        {categoryLabel && (
          <p
            className="text-xs mt-0.5 transition-all duration-300"
            style={{ color: colors.front, transform: isHovered ? "translateY(3px)" : "translateY(0)" }}
          >
            {categoryLabel}
          </p>
        )}
        {!isEmpty && <p className="text-xs text-white/30 mt-1">{screenshots.length} screenshots</p>}
      </div>

      {!isEmpty && (
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs"
          style={{
            color: "rgba(255,255,255,0.25)",
            opacity: isHovered ? 0 : 1,
            transform: isHovered ? "translateY(6px)" : "translateY(0)",
            transition: "opacity 300ms, transform 300ms",
          }}
        >
          hover
        </div>
      )}

      {isEmpty && (
        <div
          className="absolute inset-0 flex items-end justify-center pb-8 rounded-2xl z-40 pointer-events-none"
        >
          <span
            className="text-xs font-mono px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(109,40,217,0.2)",
              border: "1px solid rgba(109,40,217,0.4)",
              color: "rgba(167,139,250,0.9)",
            }}
          >
            Em construção
          </span>
        </div>
      )}
    </div>
  )
}
