"use client";

import { SOCIAL } from "@/data/social";
import { useLanguage } from "@/i18n/LanguageContext";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export function Footer() {
  const { d } = useLanguage();

  return (
    <footer
      className="py-8 px-6"
      style={{ background: "var(--color-background)" }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-xs text-muted-foreground/40 select-none">
          {d.footer.copy}
        </p>

        <div className="flex items-center gap-1">
          <a
            href={SOCIAL.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground/35 transition-colors duration-150 hover:text-muted-foreground"
          >
            <GitHubIcon size={17} />
          </a>
          <a
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground/35 transition-colors duration-150 hover:text-muted-foreground"
          >
            <LinkedInIcon size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}
