"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { SOCIAL } from "@/data/social";
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { d } = useLanguage();

  const NAV_LINKS = [
    { label: d.nav.about, href: "#about" },
    { label: d.nav.experience, href: "#experience" },
    { label: d.nav.skills, href: "#skills" },
    { label: d.nav.courses, href: "#courses" },
    { label: d.nav.projects, href: "#projects" },
    { label: d.nav.contact, href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-strong border-b border-white/[0.04]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#"
          className="group relative flex items-center select-none cursor-pointer"
        >
          <span className="text-sm font-medium text-white/80 tracking-tight">Yago Calomino</span>
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-7"
          aria-label="Primary"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {l.label}
              <span
                className="absolute -bottom-1 left-0 h-px w-0 bg-accent-indigo/70 transition-all duration-250 group-hover:w-full"
                aria-hidden="true"
              />
            </a>
          ))}
        </nav>

        {/* Right cluster: social + lang switcher + mobile toggle */}
        <div className="flex items-center gap-4">
          <a
            href={SOCIAL.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground/60 transition-colors duration-200 hover:text-foreground"
          >
            <GitHubIcon size={17} />
          </a>
          <a
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground/60 transition-colors duration-200 hover:text-foreground"
          >
            <LinkedInIcon size={17} />
          </a>


          {/* Language switcher — desktop */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav
          className="md:hidden border-t border-white/[0.04] glass-strong"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block px-6 py-4 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-white/[0.02]"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          {/* Language switcher — mobile */}
          <div className="px-6 py-4 border-t border-white/[0.04]">
            <LanguageSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}
