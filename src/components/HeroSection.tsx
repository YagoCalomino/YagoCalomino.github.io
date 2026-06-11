"use client";

import { Download } from "lucide-react";
import { SOCIAL } from "@/data/social";
import { useLanguage } from "@/i18n/LanguageContext";

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

      {/* Floating stat cards — desktop only */}
      <div
        className="hero-stat pointer-events-none absolute hidden xl:flex flex-col gap-2 left-[max(2rem,calc(50%-38rem))] top-1/3"
        style={{ animationDelay: "0.9s" }}
      >
        <StatCard value={d.hero.stat_exp} label={d.hero.stat_exp_label} color="indigo" className="float-up" />
        <StatCard value={d.hero.stat_projects} label={d.hero.stat_projects_label} color="teal" className="float-down" style={{ animationDelay: "0.8s" }} />
      </div>

      <div
        className="hero-stat pointer-events-none absolute hidden xl:flex flex-col gap-2 right-[max(2rem,calc(50%-38rem))] top-1/3"
        style={{ animationDelay: "1.1s" }}
      >
        <StatCard value={d.hero.stat_belt} label={d.hero.stat_belt_label} color="indigo" className="float-down" style={{ animationDelay: "0.4s" }} />
      </div>

      {/* Main content */}
      <div
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center"
        style={{ animation: "hero-enter 0.85s cubic-bezier(0.22, 1, 0.36, 1) both" }}
      >
        <div className="flex items-center gap-0 font-mono text-sm select-none">
          <span
            className="rounded-l-md border border-r-0 px-3 py-1.5 text-[11px] tracking-widest uppercase"
            style={{
              borderColor: "rgba(99,102,241,0.2)",
              background: "rgba(99,102,241,0.06)",
              color: "var(--color-accent-indigo)",
            }}
          >
            [00]
          </span>
          <span
            className="flex items-center gap-2 rounded-r-md border px-4 py-1.5 text-[11px] tracking-wide"
            style={{
              borderColor: "rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              color: "var(--color-muted-foreground)",
            }}
          >
            <span style={{ color: "var(--color-accent-teal)" }}>$</span>
            <span>{d.hero.eyebrow}</span>
            <span
              className="inline-block w-[7px] h-[13px] rounded-sm"
              style={{
                background: "var(--color-accent-indigo)",
                animation: "cursor-blink 1.1s step-end infinite",
                opacity: 0.85,
              }}
            />
          </span>
        </div>

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
            download
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
        @keyframes cursor-blink {
          0%, 100% { opacity: 0.85; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  );
}

function StatCard({
  value,
  label,
  color,
  className = "",
  style,
}: {
  value: string;
  label: string;
  color: "indigo" | "teal";
  className?: string;
  style?: React.CSSProperties;
}) {
  const borderColor =
    color === "indigo" ? "rgba(99,102,241,0.2)" : "rgba(20,184,166,0.2)";
  const textColor =
    color === "indigo" ? "var(--color-accent-indigo)" : "var(--color-accent-teal)";
  const glowColor =
    color === "indigo" ? "rgba(99,102,241,0.08)" : "rgba(20,184,166,0.08)";

  return (
    <div
      className={`rounded-xl px-5 py-3 text-center glass ${className}`}
      style={{ borderColor, background: glowColor, ...style }}
    >
      <p className="font-mono text-xl font-bold leading-none" style={{ color: textColor }}>
        {value}
      </p>
      <p className="mt-1 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
    </div>
  );
}
