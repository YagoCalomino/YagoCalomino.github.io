"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--color-background)" }}
    >
      <div className="space-y-6 max-w-md">
        <p
          className="font-mono text-[11px] tracking-widest uppercase"
          style={{ color: "var(--color-accent-indigo)" }}
        >
          [404]
        </p>

        <h1
          className="font-mono text-8xl font-bold leading-none"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #93b4fd 40%, #2563eb 70%, #93b4fd 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </h1>

        <p className="text-base text-muted-foreground leading-relaxed">
          This page doesn&apos;t exist. It may have been moved or the URL is incorrect.
        </p>

        <Link
          href="/"
          className="inline-flex h-11 items-center gap-2 rounded-lg px-7 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: "var(--color-accent-indigo)",
            boxShadow: "0 0 0 0 rgba(37,99,235,0)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(37,99,235,0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(37,99,235,0)";
          }}
        >
          ← Back to portfolio
        </Link>
      </div>
    </div>
  );
}
