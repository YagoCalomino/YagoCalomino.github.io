"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface SkillItem {
  name: string
  category: "data" | "sql" | "process" | "dev"
}

const skills: SkillItem[] = [
  { name: "Power BI", category: "data" },
  { name: "PostgreSQL", category: "sql" },
  { name: "DAX", category: "data" },
  { name: "Python", category: "dev" },
  { name: "Oracle SQL", category: "sql" },
  { name: "Lean Six Sigma", category: "process" },
  { name: "Power Query", category: "data" },
  { name: "Pandas", category: "data" },
  { name: "Análise de Causa-Raiz", category: "process" },
  { name: "Firebird", category: "sql" },
  { name: "ETL / ELT", category: "sql" },
  { name: "Power Automate", category: "process" },
  { name: "NumPy", category: "data" },
  { name: "Microsoft Fabric", category: "data" },
  { name: "DMAIC", category: "process" },
  { name: "FastAPI", category: "dev" },
  { name: "Excel Avançado", category: "data" },
  { name: "Git / GitHub", category: "dev" },
]

const categoryColors: Record<string, string> = {
  data:    "#2563eb",
  sql:     "#0d9488",
  process: "#8b5cf6",
  dev:     "#6366f1",
}

function SkillPill({ skill }: { skill: SkillItem }) {
  const color = categoryColors[skill.category]
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap mx-2"
      style={{
        background: `${color}10`,
        border: `1px solid ${color}25`,
        color: "rgba(255,255,255,0.65)",
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
      {skill.name}
    </span>
  )
}

interface SkillsMarqueeProps {
  className?: string
  speed?: number  // seconds per full loop, default 55
}

export function SkillsMarquee({ className, speed = 55 }: SkillsMarqueeProps) {
  // Duplicate items for seamless loop
  const doubled = [...skills, ...skills]
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Fade masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #050508, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, #050508, transparent)" }}
      />

      {/* Track */}
      <div
        className="flex marquee-track"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          animation: `marquee-x ${speed}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
          width: "max-content",
        }}
      >
        {doubled.map((skill, i) => (
          <SkillPill key={i} skill={skill} />
        ))}
      </div>
    </div>
  )
}
