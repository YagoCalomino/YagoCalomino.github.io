"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";
import { useLanguage } from "@/i18n/LanguageContext";
import { EXPERIENCES } from "@/data/experience";
import { SectionLabel } from "@/components/SectionLabel";

function ChevronRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ExperienceSection() {
  const { d, locale } = useLanguage();
  const t = d.experience;

  return (
    <section id="experience" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <SectionLabel number="02" label={t.section_label} />
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.heading}
          </h2>
        </RevealOnScroll>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute top-3 bottom-3 w-px pointer-events-none"
            style={{
              left: "11px",
              background:
                "linear-gradient(to bottom, var(--color-accent-indigo), rgba(99,102,241,0.2) 70%, transparent)",
            }}
            aria-hidden="true"
          />

          <div className="space-y-8">
            {EXPERIENCES.map((exp, i) => (
              <RevealOnScroll key={exp.id} delay={i * 120}>
                <div className="relative" style={{ paddingLeft: "40px" }}>
                  {/* Timeline dot */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: "5px",
                      top: "22px",
                      width: "13px",
                      height: "13px",
                      border: "2px solid var(--color-accent-indigo)",
                      background: "var(--color-background)",
                      boxShadow: "0 0 8px rgba(99,102,241,0.35)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Company card */}
                  <div
                    className="rounded-2xl border p-6 sm:p-7"
                    style={{
                      background: "var(--color-surface)",
                      borderColor: "var(--color-border)",
                      transition: "box-shadow 200ms ease, border-color 200ms ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.boxShadow =
                        "0 8px 32px rgba(99,102,241,0.1), 0 0 0 1px rgba(99,102,241,0.2)";
                      el.style.borderColor = "rgba(99,102,241,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.boxShadow = "";
                      el.style.borderColor = "";
                    }}
                  >
                    {/* Header */}
                    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                      <h3 className="text-xl font-bold tracking-tight text-foreground">
                        {exp.company}
                      </h3>
                      <span
                        className="rounded-full border px-3 py-1 font-mono text-[11px] tracking-wide"
                        style={{
                          borderColor: "rgba(99,102,241,0.2)",
                          background: "rgba(99,102,241,0.06)",
                          color: "var(--color-accent-indigo)",
                        }}
                      >
                        {exp.period[locale]}
                      </span>
                    </div>

                    {/* Role progression */}
                    <div className="mb-5">
                      <p
                        className="mb-2.5 font-mono text-[10px] tracking-widest uppercase"
                        style={{ color: "rgba(99,102,241,0.6)" }}
                      >
                        {t.label_progression}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        {exp.roles.map((role, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            {idx > 0 && (
                              <span style={{ color: "var(--color-muted-foreground)", opacity: 0.4 }}>
                                <ChevronRightIcon />
                              </span>
                            )}
                            <span
                              className="flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs"
                              style={
                                role.current
                                  ? {
                                      borderColor: "rgba(99,102,241,0.4)",
                                      background: "rgba(99,102,241,0.1)",
                                      color: "var(--color-accent-indigo)",
                                    }
                                  : {
                                      borderColor: "var(--color-border)",
                                      background: "var(--color-surface-elevated)",
                                      color: "var(--color-muted-foreground)",
                                    }
                              }
                            >
                              {role.title[locale]}
                              {role.current && (
                                <span
                                  className="ml-1 rounded-sm px-1 font-mono text-[9px] font-semibold uppercase tracking-wider"
                                  style={{
                                    background: "rgba(99,102,241,0.15)",
                                    color: "var(--color-accent-indigo)",
                                  }}
                                >
                                  {t.label_current}
                                </span>
                              )}
                            </span>
                            {role.period[locale] && !role.current && (
                              <span
                                className="hidden sm:inline font-mono text-[10px]"
                                style={{ color: "var(--color-muted-foreground)", opacity: 0.4 }}
                              >
                                [{role.period[locale]}]
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Focus */}
                    <div
                      className="mb-5 rounded-xl border p-4"
                      style={{
                        borderColor: "var(--color-border-subtle)",
                        background: "var(--color-surface-elevated)",
                      }}
                    >
                      <p
                        className="mb-1.5 font-mono text-[10px] tracking-widest uppercase"
                        style={{ color: "rgba(99,102,241,0.6)" }}
                      >
                        {t.label_focus}
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {exp.focus[locale]}
                      </p>
                    </div>

                    {/* Stack */}
                    <div>
                      <p
                        className="mb-2.5 font-mono text-[10px] tracking-widest uppercase"
                        style={{ color: "rgba(99,102,241,0.6)" }}
                      >
                        {t.label_stack}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.stack.map((tech) => (
                          <span
                            key={tech}
                            className="chip-lift rounded-md border px-2.5 py-1 font-mono text-[11px] text-muted-foreground hover:border-accent-indigo/30 hover:text-accent-indigo/80"
                            style={{
                              borderColor: "rgba(255,255,255,0.07)",
                              background: "var(--color-background)",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
