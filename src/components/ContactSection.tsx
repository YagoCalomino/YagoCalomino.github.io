"use client";

import { SOCIAL } from "@/data/social";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { useLanguage } from "@/i18n/LanguageContext";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path
        d="M7.5 1v9M7.5 10l-3-3M7.5 10l3-3M2 13h11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1 4.5l6.5 4.5L14 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ContactSection() {
  const { d } = useLanguage();
  const t = d.contact;

  return (
    <section id="contact" className="py-32 md:py-40 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Main card */}
        <RevealOnScroll delay={60}>
          <div
            className="relative group overflow-hidden rounded-3xl border border-border/80 p-10 sm:p-14 text-center transition-all duration-500 hover:border-accent-indigo/25"
            style={{ background: "var(--color-surface)" }}
          >
            {/* Ambient background glow */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-700"
              style={{
                background:
                  "radial-gradient(ellipse 70% 65% at 50% 110%, rgba(37,99,235,0.1) 0%, transparent 70%)",
              }}
            />
            {/* Hover top edge glow */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-indigo/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Corner accent lights */}
            <div
              className="pointer-events-none absolute -top-20 -left-20 h-40 w-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: "radial-gradient(circle, rgba(37,99,235,0.12), transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            <div
              className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            <div className="relative z-10 mx-auto max-w-2xl space-y-6">
              <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {t.heading_1}{" "}
                <span className="text-accent-indigo">{t.heading_accent}</span>
              </h2>

              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t.body}
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
                <a
                  href={SOCIAL.resume}
                  download="Yago Calomino.pdf"
                  className="glow-button flex h-12 items-center gap-2.5 rounded-lg bg-accent-indigo px-8 text-sm font-semibold text-white cursor-pointer"
                >
                  <DownloadIcon />
                  {t.cta_resume}
                </a>

                <a
                  href={SOCIAL.email}
                  className="flex h-12 items-center gap-2.5 rounded-lg border border-border px-8 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:border-accent-indigo/30 hover:text-foreground cursor-pointer"
                >
                  <MailIcon />
                  {t.cta_email}
                </a>
              </div>

              {/* Social links */}
              <div className="flex items-center justify-center gap-3 pt-1">
                <a
                  href={SOCIAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 items-center gap-2 rounded-lg border border-border px-5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:border-foreground/20 hover:text-foreground cursor-pointer"
                >
                  <GitHubIcon size={15} />
                  {t.cta_github}
                </a>
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 items-center gap-2 rounded-lg border border-border px-5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:border-accent-indigo/30 hover:text-accent-indigo cursor-pointer"
                >
                  <LinkedInIcon size={15} />
                  {t.cta_linkedin}
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
