export function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="mb-16 flex items-center gap-4">
      <div className="flex items-center gap-0 font-mono select-none">
        <span
          className="rounded-l-sm border border-r-0 px-2 py-0.5 text-[10px] tracking-widest uppercase"
          style={{
            borderColor: "rgba(99,102,241,0.2)",
            background: "rgba(99,102,241,0.06)",
            color: "var(--color-accent-indigo)",
          }}
        >
          [{number}]
        </span>
        <span
          className="shimmer rounded-r-sm border px-3 py-0.5 text-[10px] tracking-widest uppercase"
          style={{
            borderColor: "rgba(255,255,255,0.05)",
            color: "var(--color-accent-indigo)",
          }}
        >
          {label}
        </span>
      </div>
      <span className="h-px flex-1 bg-gradient-to-r from-accent-indigo/40 to-transparent" />
    </div>
  );
}
