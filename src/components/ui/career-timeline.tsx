"use client"

import { useState } from "react"
import { ChevronDown, Building2, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CareerProgression {
  title: string
  period?: string
  isCurrent?: boolean
}

export interface CareerEntry {
  id: string
  company: string
  currentRole: string
  period: string
  summary: string
  focus?: string
  stack: string[]
  progression?: CareerProgression[]
  accentColor?: string
  achievements?: string[]   // conquistas/premiações — aparecem só no expandido
  internNote?: string       // nota sobre cargo anterior (estagiário etc)
}

// ─── EntryCard ────────────────────────────────────────────────────────────────

function EntryCard({
  entry,
  isLast,
}: {
  entry: CareerEntry
  isLast: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const accent = entry.accentColor ?? "#2563eb"

  return (
    <div className="flex items-stretch gap-4">
      {/* Icon + connector */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `${accent}15`,
            border: `1px solid ${accent}30`,
          }}
        >
          <Building2 className="w-4 h-4" style={{ color: accent }} />
        </div>
        {!isLast && (
          <div
            className="w-px flex-1 mt-2"
            style={{ background: "rgba(255,255,255,0.07)", minHeight: "32px" }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-8">
        <button
          type="button"
          className="w-full text-left group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className="p-5 rounded-2xl transition-all duration-300"
            style={{
              background: "rgba(16, 17, 26, 0.7)",
              border: isOpen
                ? `1px solid ${accent}30`
                : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-white leading-tight">{entry.company}</h3>
                <p className="text-sm mt-0.5" style={{ color: accent }}>
                  {entry.currentRole}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className="text-xs font-mono px-2.5 py-1 rounded-full whitespace-nowrap"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {entry.period}
                </span>
                <ChevronDown
                  className="w-4 h-4 transition-transform duration-300 shrink-0"
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </div>
            </div>

            {/* Summary (always visible) */}
            <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              {entry.summary}
            </p>

            {/* Stack pills */}
            <div className="flex flex-wrap gap-1.5">
              {entry.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2 py-0.5 rounded-md"
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Expandable details */}
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: isOpen ? "900px" : "0px", opacity: isOpen ? 1 : 0 }}
            >
              <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>

                {/* Focus */}
                {entry.focus && (
                  <div
                    className="p-3 rounded-xl mb-4"
                    style={{
                      background: "rgba(5,5,8,0.5)",
                      border: "1px solid rgba(255,255,255,0.04)",
                      borderLeft: `3px solid ${accent}40`,
                    }}
                  >
                    <p className="text-xs font-mono uppercase tracking-widest mb-1.5"
                      style={{ color: `${accent}70` }}>
                      Foco
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {entry.focus}
                    </p>
                  </div>
                )}

                {/* Progression */}
                {entry.progression && entry.progression.length > 0 && (
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest mb-3"
                      style={{ color: "rgba(255,255,255,0.25)" }}>
                      Progressão
                    </p>
                    <div className="flex flex-wrap items-start gap-x-1 gap-y-2">
                      {entry.progression.map((step, i) => (
                        <div key={i} className="flex items-start gap-1">
                          <div className="flex flex-col items-start">
                            <span
                              className="text-xs font-mono px-2.5 py-1 rounded-lg"
                              style={{
                                color: step.isCurrent ? accent : "rgba(255,255,255,0.6)",
                                background: step.isCurrent ? `${accent}15` : "rgba(255,255,255,0.05)",
                                border: step.isCurrent
                                  ? `1px solid ${accent}30`
                                  : "1px solid rgba(255,255,255,0.08)",
                              }}
                            >
                              {step.title}
                              {step.isCurrent && (
                                <span className="ml-1.5 text-[9px] uppercase tracking-wide" style={{ color: accent }}>
                                  atual
                                </span>
                              )}
                            </span>
                            {step.period && (
                              <span
                                className="text-[10px] mt-0.5 pl-1"
                                style={{ color: "rgba(255,255,255,0.25)" }}
                              >
                                {step.period}
                              </span>
                            )}
                          </div>
                          {i < entry.progression!.length - 1 && (
                            <ArrowRight
                              className="w-3 h-3 shrink-0"
                              style={{ color: "rgba(255,255,255,0.2)", marginTop: "7px" }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Conquistas */}
                {entry.achievements && entry.achievements.length > 0 && (
                  <div className="mt-4">
                    <p
                      className="text-xs font-mono uppercase tracking-widest mb-2"
                      style={{ color: "rgba(255,255,255,0.25)" }}
                    >
                      Conquistas
                    </p>
                    <ul className="space-y-1.5">
                      {entry.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                          <span className="mt-1 shrink-0 text-xs" style={{ color: "#2563eb" }}>★</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Nota sobre cargo anterior (ex: estagiário) */}
                {entry.internNote && (
                  <p
                    className="mt-4 text-xs italic leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {entry.internNote}
                  </p>
                )}
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

// ─── CareerTimeline ────────────────────────────────────────────────────────────

interface CareerTimelineProps {
  entries: CareerEntry[]
  className?: string
}

export function CareerTimeline({ entries, className }: CareerTimelineProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {entries.map((entry, index) => (
        <EntryCard
          key={entry.id}
          entry={entry}
          isLast={index === entries.length - 1}
        />
      ))}
    </div>
  )
}
