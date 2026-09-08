"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";
import { useLanguage } from "@/i18n/LanguageContext";
import { SkillsMarquee } from "@/components/ui/skills-marquee";

type SkillGroup = {
  labelKey: "group_bi" | "group_sql" | "group_process" | "group_dev";
  icon: React.ReactNode;
  skills: string[];
  span: "wide" | "normal";
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    labelKey: "group_bi",
    icon: <DataIcon />,
    skills: ["Power BI", "DAX", "Power Query (M)", "Python, Pandas / NumPy", "Excel Avançado"],
    span: "wide",
  },
  {
    labelKey: "group_sql",
    icon: <DBIcon />,
    skills: ["PostgreSQL", "Oracle SQL", "Firebird", "Modelagem Relacional", "ETL / ELT"],
    span: "normal",
  },
  {
    labelKey: "group_process",
    icon: <ProcessIcon />,
    skills: ["Lean Six Sigma (Yellow Belt)", "Análise de Causa-Raiz (RCA)", "DMAIC", "Mapeamento de Processos", "Power Automate"],
    span: "normal",
  },
  {
    labelKey: "group_dev",
    icon: <CodeIcon />,
    skills: ["TypeScript", "React / Next.js", "FastAPI", "Node.js", "Tailwind CSS", "Git / GitHub"],
    span: "wide",
  },
];

export function SkillsSection() {
  const { d } = useLanguage();
  const t = d.skills;

  return (
    <section id="skills" className="py-32 md:py-40 px-6">
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <div className="mb-24 max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              {t.heading}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t.subheading}</p>
          </div>
        </RevealOnScroll>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
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

        <RevealOnScroll delay={SKILL_GROUPS.length * 80}>
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-sm font-medium text-white/35 shrink-0">{t.tools_label}</h3>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            </div>
            <SkillsMarquee />
          </div>
        </RevealOnScroll>
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
  return (
    <div
      className="relative h-full rounded-2xl border p-6 min-h-[180px] flex flex-col cursor-default"
      style={{
        background: "rgba(16,17,26,0.95)",
        borderColor: "rgba(255,255,255,0.07)",
        transition: "background-color 200ms ease, transform 200ms ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(22,24,36,0.95)";
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(16,17,26,0.95)";
        el.style.transform = "";
      }}
    >
      <div className="mb-5 flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg shrink-0"
          style={{
            border: "1px solid rgba(37,99,235,0.2)",
            background: "rgba(37,99,235,0.08)",
            color: "#2563eb",
          }}
        >
          {group.icon}
        </div>
        <p className="text-sm font-medium tracking-wide text-muted-foreground">
          {label}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="chip-lift rounded-full px-3 py-1 font-mono text-xs tracking-wide cursor-default"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              color: "rgba(255,255,255,0.55)",
            }}
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
