"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { useLanguage } from "@/i18n/LanguageContext";
import { SectionLabel } from "@/components/SectionLabel";

const PHOTOS = [
  { src: "/profile-main.jpeg", alt: "Yago Calomino" },
  { src: "/jpr-event-1.jpeg",  alt: "JPR — Jornada Paulista de Radiologia" },
  { src: "/jpr-event-2.jpeg",  alt: "JPR — Jornada Paulista de Radiologia" },
];

export function AboutSection() {
  const { d } = useLanguage();
  const t = d.about;

  return (
    <section id="about" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <SectionLabel number="01" label={t.section_label} />
        </RevealOnScroll>

        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16 items-start">
          {/* Bio */}
          <RevealOnScroll delay={60}>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl leading-tight">
                {t.heading.split("dados brutos").length > 1 ||
                t.heading.split("raw data").length > 1 ||
                t.heading.split("datos crudos").length > 1 ? (
                  <HeadingWithAccents text={t.heading} />
                ) : (
                  t.heading
                )}
              </h2>

              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  {t.p1.split(t.highlight_lean)[0]}
                  <span className="text-foreground font-medium">{t.highlight_lean}</span>
                  {t.p1.split(t.highlight_lean)[1]?.split(t.highlight_rca)[0]}
                  <span className="text-foreground font-medium">{t.highlight_rca}</span>
                  {t.p1.split(t.highlight_rca)[1]}
                </p>
                <p>
                  {t.p2.split(t.highlight_db)[0]}
                  <span className="text-foreground font-medium">{t.highlight_db}</span>
                  {t.p2.split(t.highlight_db)[1]?.split(t.highlight_bi)[0]}
                  <span className="text-foreground font-medium">{t.highlight_bi}</span>
                  {t.p2.split(t.highlight_bi)[1]?.split(t.highlight_api)[0]}
                  <span className="text-foreground font-medium">{t.highlight_api}</span>
                  {t.p2.split(t.highlight_api)[1]?.split(t.highlight_frontend)[0]}
                  <span className="text-foreground font-medium">{t.highlight_frontend}</span>
                  {t.p2.split(t.highlight_frontend)[1]}
                </p>
                <p>{t.p3}</p>
              </div>

            </div>
          </RevealOnScroll>

          {/* Photo carousel */}
          <RevealOnScroll delay={140}>
            <div className="flex justify-center lg:justify-end">
              <PhotoCarousel />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

function HeadingWithAccents({ text }: { text: string }) {
  const accentWords: Record<string, "indigo" | "teal"> = {
    "dados brutos": "indigo",
    "dados crudos": "indigo",
    "raw data": "indigo",
    "decisões": "teal",
    decisions: "teal",
    decisiones: "teal",
  };

  let remaining = text;
  const parts: { text: string; accent?: "indigo" | "teal" }[] = [];

  for (const [word, color] of Object.entries(accentWords)) {
    const idx = remaining.toLowerCase().indexOf(word.toLowerCase());
    if (idx !== -1) {
      if (idx > 0) parts.push({ text: remaining.slice(0, idx) });
      parts.push({ text: remaining.slice(idx, idx + word.length), accent: color });
      remaining = remaining.slice(idx + word.length);
    }
  }
  if (remaining) parts.push({ text: remaining });

  return (
    <>
      {parts.map((p, i) =>
        p.accent ? (
          <span key={i} className={p.accent === "indigo" ? "text-accent-indigo" : "text-accent-teal"}>
            {p.text}
          </span>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
    </>
  );
}

function PhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((i) => (i + 1) % PHOTOS.length);
        setFading(false);
      }, 300);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const goTo = (idx: number) => {
    if (idx === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(idx);
      setFading(false);
    }, 300);
  };

  return (
    <div className="relative">
      {/* Outer ambient glow */}
      <div
        className="absolute -inset-4 rounded-2xl opacity-20"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.5), rgba(20,184,166,0.3))",
          filter: "blur(20px)",
        }}
        aria-hidden="true"
      />

      {/* Gradient border frame */}
      <div
        className="absolute -inset-px rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.45), rgba(20,184,166,0.25), rgba(99,102,241,0.1))",
        }}
        aria-hidden="true"
      />

      {/* Image frame */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ width: "256px", height: "320px" }}
      >
        <Image
          key={current}
          src={PHOTOS[current].src}
          alt={PHOTOS[current].alt}
          fill
          sizes="256px"
          className="object-cover"
          style={{
            transition: "opacity 300ms ease",
            opacity: fading ? 0 : 1,
          }}
          unoptimized
        />

        {/* Bottom gradient for dot visibility */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}
          aria-hidden="true"
        />

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {PHOTOS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Go to photo ${idx + 1}`}
              className="rounded-full transition-all duration-200 cursor-pointer"
              style={{
                height: "6px",
                width: idx === current ? "16px" : "6px",
                background: idx === current ? "#6366f1" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Corner accents */}
      <span className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-accent-indigo/70" />
      <span className="absolute -bottom-2 -left-2 h-3 w-3 rounded-full bg-accent-teal/70" />
    </div>
  );
}
