"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";
import { useLanguage } from "@/i18n/LanguageContext";
import { COURSES, type CourseCategory } from "@/data/courses";
import { SectionLabel } from "@/components/SectionLabel";
import { ExternalLinkIcon } from "@/components/icons";

const CATEGORY_COLORS: Record<CourseCategory, { border: string; bg: string; text: string; className: string }> = {
  data: {
    border: "rgba(99,102,241,0.25)",
    bg: "rgba(99,102,241,0.08)",
    text: "var(--color-accent-indigo)",
    className: "badge-data",
  },
  dev: {
    border: "rgba(20,184,166,0.25)",
    bg: "rgba(20,184,166,0.08)",
    text: "var(--color-accent-teal)",
    className: "badge-dev",
  },
  methodology: {
    border: "rgba(245,158,11,0.25)",
    bg: "rgba(245,158,11,0.08)",
    text: "#fbbf24",
    className: "badge-methodology",
  },
  cloud: {
    border: "rgba(100,116,139,0.25)",
    bg: "rgba(100,116,139,0.08)",
    text: "var(--color-muted-foreground)",
    className: "badge-cloud",
  },
};

const CATEGORY_ICONS: Record<CourseCategory, React.ReactNode> = {
  data: <DataIcon />,
  dev: <DevIcon />,
  methodology: <MethodIcon />,
  cloud: <CloudIcon />,
};

export function CoursesSection() {
  const { d, locale } = useLanguage();
  const t = d.courses;

  const catLabel: Record<CourseCategory, string> = {
    data: t.cat_data,
    dev: t.cat_dev,
    methodology: t.cat_methodology,
    cloud: t.cat_cloud,
  };

  return (
    <section id="courses" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <SectionLabel number="04" label={t.section_label} />

          <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t.heading}
            </h2>
            <p className="text-sm text-muted-foreground">{t.subtitle}</p>
          </div>
        </RevealOnScroll>

        {/* Bento courses grid — first card featured on lg */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course, i) => {
            const colors = CATEGORY_COLORS[course.category];
            const isFeatured = i === 0;

            return (
              <RevealOnScroll
                key={course.title.en}
                delay={i * 70}
                className={isFeatured ? "lg:col-span-2" : undefined}
              >
                <article
                  className="group flex flex-col rounded-2xl border p-5 h-full cursor-default"
                  style={{
                    background: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                    transition: "transform 200ms ease, box-shadow 200ms ease, border-color 250ms ease",
                    minHeight: isFeatured ? "200px" : undefined,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-3px)";
                    el.style.boxShadow = `0 8px 28px rgba(99,102,241,0.12), 0 0 0 1px rgba(99,102,241,0.18)`;
                    el.style.borderColor = "rgba(99,102,241,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.boxShadow = "";
                    el.style.borderColor = "";
                  }}
                >
                  {/* Top row */}
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span
                      className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wide uppercase"
                      style={{
                        borderColor: colors.border,
                        background: colors.bg,
                        color: colors.text,
                      }}
                    >
                      {CATEGORY_ICONS[course.category]}
                      {catLabel[course.category]}
                    </span>
                    <span className="font-mono text-[11px] shrink-0" style={{ color: "var(--color-muted-foreground)", opacity: 0.5 }}>
                      {course.issued}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-1.5 text-base font-bold tracking-tight text-foreground leading-snug transition-colors duration-200"
                    style={{ color: undefined }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--color-accent-indigo)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "";
                    }}
                  >
                    {course.title[locale]}
                  </h3>

                  {/* Issuer */}
                  <p className="mb-3 font-mono text-[11px] tracking-wide text-accent-teal">
                    {course.issuer}
                    {course.hours && (
                      <span className="text-muted-foreground/60"> · {course.hours}h</span>
                    )}
                  </p>

                  {/* Description */}
                  <p className="mt-auto text-sm leading-relaxed text-muted-foreground">
                    {course.description[locale]}
                  </p>

                  {/* Credential link */}
                  {course.credentialUrl && (
                    <a
                      href={course.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center gap-1.5 font-mono text-[11px] text-accent-indigo transition-opacity duration-150 hover:opacity-80"
                    >
                      {t.view_cert}
                      <ExternalLinkIcon size={10} />
                    </a>
                  )}
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DataIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <rect x="0.5" y="5.5" width="2" height="4" rx="0.3" fill="currentColor" opacity="0.6" />
      <rect x="4" y="3" width="2" height="6.5" rx="0.3" fill="currentColor" opacity="0.8" />
      <rect x="7.5" y="0.5" width="2" height="9" rx="0.3" fill="currentColor" />
    </svg>
  );
}

function DevIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3,1.5 0.5,5 3,8.5" />
      <polyline points="7,1.5 9.5,5 7,8.5" />
    </svg>
  );
}

function MethodIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
      <circle cx="5" cy="5" r="3.5" />
      <circle cx="5" cy="5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7.5 7H3a2 2 0 110-4h.1A2.5 2.5 0 019 5a1.5 1.5 0 01-1.5 2z" />
    </svg>
  );
}

