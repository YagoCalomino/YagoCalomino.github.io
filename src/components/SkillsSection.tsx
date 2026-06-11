"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";
import { useLanguage } from "@/i18n/LanguageContext";
import { SectionLabel } from "@/components/SectionLabel";

type SkillGroup = {
  labelKey: "group_data" | "group_engineering" | "group_fullstack" | "group_methodologies";
  color: "indigo" | "teal" | "slate";
  accentColor: string;
  glowColor: string;
  icon: React.ReactNode;
  skills: string[];
  span?: "wide" | "normal";
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    labelKey: "group_data",
    color: "indigo",
    accentColor: "rgba(99,102,241,0.2)",
    glowColor: "rgba(99,102,241,0.06)",
    icon: <DataIcon />,
    skills: ["Power BI", "Python", "R", "Excel"],
    span: "wide",
  },
  {
    labelKey: "group_engineering",
    color: "teal",
    accentColor: "rgba(20,184,166,0.2)",
    glowColor: "rgba(20,184,166,0.05)",
    icon: <DBIcon />,
    skills: ["PostgreSQL", "Oracle"],
    span: "normal",
  },
  {
    labelKey: "group_fullstack",
    color: "indigo",
    accentColor: "rgba(99,102,241,0.2)",
    glowColor: "rgba(99,102,241,0.06)",
    icon: <CodeIcon />,
    skills: ["TypeScript", "React", "Next.js", "Node.js", "FastAPI", "Tailwind CSS"],
    span: "normal",
  },
  {
    labelKey: "group_methodologies",
    color: "slate",
    accentColor: "rgba(100,116,139,0.2)",
    glowColor: "rgba(100,116,139,0.04)",
    icon: <ProcessIcon />,
    skills: ["Lean Six Sigma (Yellow Belt)", "RCA", "Process Automation"],
    span: "wide",
  },
];

export function SkillsSection() {
  const { d } = useLanguage();
  const t = d.skills;

  return (
    <section id="skills" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Section label */}
        <RevealOnScroll>
          <SectionLabel number="03" label={t.section_label} />
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.heading}
          </h2>
        </RevealOnScroll>

        {/* Asymmetric bento grid — 3 cols on desktop */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => (
            <RevealOnScroll
              key={group.labelKey}
              delay={i * 80}
              className={group.span === "wide" ? "sm:col-span-2" : "sm:col-span-1"}
            >
              <BentoCard group={group} label={t[group.labelKey]} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  group,
  label,
}: {
  group: SkillGroup;
  label: string;
}) {
  const chipStyle =
    group.color === "teal"
      ? {
          border: "1px solid rgba(20,184,166,0.2)",
          background: "rgba(20,184,166,0.06)",
          color: "var(--color-accent-teal)",
        }
      : group.color === "indigo"
      ? {
          border: "1px solid rgba(99,102,241,0.2)",
          background: "rgba(99,102,241,0.06)",
          color: "var(--color-accent-indigo)",
        }
      : {
          border: "1px solid var(--color-border)",
          background: "var(--color-surface-elevated)",
          color: "var(--color-muted-foreground)",
        };

  const iconStyle =
    group.color === "teal"
      ? {
          border: "1px solid rgba(20,184,166,0.2)",
          background: "rgba(20,184,166,0.08)",
          color: "var(--color-accent-teal)",
        }
      : group.color === "indigo"
      ? {
          border: "1px solid rgba(99,102,241,0.2)",
          background: "rgba(99,102,241,0.08)",
          color: "var(--color-accent-indigo)",
        }
      : {
          border: "1px solid var(--color-border)",
          background: "var(--color-surface-elevated)",
          color: "var(--color-muted-foreground)",
        };

  return (
    <div
      className="gradient-border h-full rounded-2xl border p-6 min-h-[200px] flex flex-col cursor-default"
      style={{
        background: "var(--color-surface)",
        borderColor: "var(--color-border)",
        transition: "transform 200ms ease, box-shadow 200ms ease, border-color 250ms ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = `0 8px 32px ${group.glowColor}, 0 0 0 1px ${group.accentColor}`;
        el.style.borderColor = group.accentColor;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "";
        el.style.boxShadow = "";
        el.style.borderColor = "";
      }}
    >
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg shrink-0"
          style={iconStyle}
        >
          {group.icon}
        </div>
        <p className="font-mono text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
          {label}
        </p>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="chip-lift rounded-full px-3 py-1 font-mono text-xs tracking-wide cursor-default"
            style={chipStyle}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function DataIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1" y="9" width="3" height="6" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="6" y="5" width="3" height="10" rx="0.5" fill="currentColor" opacity="0.75" />
      <rect x="11" y="1" width="3" height="14" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function DBIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <ellipse cx="8" cy="4" rx="6" ry="2.2" />
      <path d="M2 4v4c0 1.2 2.7 2.2 6 2.2S14 9.2 14 8V4" />
      <path d="M2 8v4c0 1.2 2.7 2.2 6 2.2S14 13.2 14 12V8" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="5,3 1,8 5,13" />
      <polyline points="11,3 15,8 11,13" />
      <line x1="9" y1="2" x2="7" y2="14" />
    </svg>
  );
}

function ProcessIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="5.5" />
      <circle cx="8" cy="8" r="2" fill="currentColor" stroke="none" />
      <line x1="8" y1="1" x2="8" y2="3" />
      <line x1="8" y1="13" x2="8" y2="15" />
      <line x1="1" y1="8" x2="3" y2="8" />
      <line x1="13" y1="8" x2="15" y2="8" />
    </svg>
  );
}
