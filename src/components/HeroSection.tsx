"use client";

import { Download } from "lucide-react";
import { SOCIAL } from "@/data/social";
import { useLanguage } from "@/i18n/LanguageContext";
import { LocationMap } from "@/components/ui/expand-map";

export function HeroSection() {
  const { d } = useLanguage();

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden hero-grid"
    >
      {/* Ambient orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Radial edge fade */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 15%, var(--color-background) 78%)",
        }}
      />

      {/* Bottom section fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-background))",
        }}
      />

      {/* Location card — desktop only, sole decorative element in the hero */}
      <div
        className="hero-stat pointer-events-auto absolute hidden xl:block right-[max(2rem,calc(50%-38rem))] top-1/2 -translate-y-1/2"
        style={{ animationDelay: "1s" }}
      >
        <LocationMap location="Rio de Janeiro, RJ" coordinates="22.9068° S, 43.1729° W" />
      </div>

      {/* Main content */}
      <div
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center"
        style={{ animation: "hero-enter 0.85s cubic-bezier(0.22, 1, 0.36, 1) both" }}
      >
        {/* Name */}
        <h1 className="text-6xl font-bold leading-none tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
          <span className="gradient-text">Yago</span>
          <br />
          <span className="text-foreground">
            Calomino
            <span className="text-accent-indigo">.</span>
          </span>
        </h1>

        {/* Dual-identity badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full border border-accent-indigo/25 bg-accent-indigo/8 px-4 py-1.5 font-mono text-xs tracking-wide text-accent-indigo">
            {d.hero.badge_data}
          </span>
          <span className="font-mono text-xs text-border select-none">×</span>
          <span className="rounded-full border border-accent-teal/25 bg-accent-teal/8 px-4 py-1.5 font-mono text-xs tracking-wide text-accent-teal">
            {d.hero.badge_dev}
          </span>
        </div>

        {/* Value proposition */}
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {d.hero.value_prop}
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#projects"
            className="glow-button flex h-12 items-center rounded-lg bg-accent-indigo px-7 text-sm font-semibold text-white cursor-pointer"
          >
            {d.hero.cta_work}
          </a>
          <a
            href={SOCIAL.resume}
            download="Yago Calomino.pdf"
            className="flex h-12 items-center gap-2 rounded-lg border border-border px-7 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:border-foreground/20 hover:text-foreground cursor-pointer"
          >
            <Download size={14} />
            {d.hero.cta_resume}
          </a>
        </div>
      </div>

      <style>{`
        @keyframes hero-enter {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
