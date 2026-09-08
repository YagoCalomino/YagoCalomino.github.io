"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";
import { useLanguage } from "@/i18n/LanguageContext";
import { EXPERIENCES } from "@/data/experience";
import { CareerTimeline, type CareerEntry } from "@/components/ui/career-timeline";

export function ExperienceSection() {
  const { d, locale } = useLanguage();
  const t = d.experience;

  const careerEntries: CareerEntry[] = EXPERIENCES.map((exp) => ({
    id: exp.id,
    company: exp.company,
    currentRole: exp.roles[exp.roles.length - 1].title[locale],
    period: exp.period[locale],
    summary: exp.summary[locale],
    focus: exp.focus?.[locale],
    stack: exp.stack,
    accentColor: exp.accentColor,
    achievements: exp.achievements?.map((a) => a[locale]),
    internNote: exp.internNote?.[locale],
    progression: exp.roles.map((role) => ({
      title: role.title[locale],
      period: role.period[locale] || undefined,
      isCurrent: role.current,
    })),
  }));

  return (
    <section id="experience" className="py-32 md:py-40 px-6">
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <div className="mb-24 max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              {t.heading}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t.subheading}</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <CareerTimeline entries={careerEntries} />
        </RevealOnScroll>
      </div>
    </section>
  );
}
