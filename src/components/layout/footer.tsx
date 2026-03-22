"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { label: "GitHub", Icon: Github, href: "https://github.com/muhammederengokceogludarussi-ux" },
  { label: "LinkedIn", Icon: Linkedin, href: "https://www.linkedin.com/in/muhammed-eren-g%C3%B6kceo%C4%9Flu-33b5bb1b7/" },
  { label: "Email", Icon: Mail, href: "mailto:eren.gokceoglu@metu.edu.tr" },
];

export function Footer() {
  const tPrivacy = useTranslations("privacy");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto border-t border-white/5 bg-zinc-950">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-16 sm:px-10">
        {/* Top row: branding + nav */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Left: Logo & tagline */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                V
              </div>
              <span className="font-display text-base font-semibold text-white">
                Volitan Labs
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
              {tNav("home") === "Ana Sayfa"
                ? "Mühendislik hassasiyetiyle dijital deneyimler."
                : "Digital experiences with engineering precision."}
            </p>
          </div>

          {/* Right: Nav links + social */}
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
            {/* Nav links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link href="/about" className="text-zinc-500 transition-colors hover:text-white">
                {tNav("about")}
              </Link>
              <Link href="/projects" className="text-zinc-500 transition-colors hover:text-white">
                {tNav("projects")}
              </Link>
              <Link href="/apps" className="text-zinc-500 transition-colors hover:text-white">
                {tNav("apps")}
              </Link>
              <Link href="/contact" className="text-zinc-500 transition-colors hover:text-white">
                {tNav("contact")}
              </Link>
              <Link href="/privacy" className="text-zinc-500 transition-colors hover:text-white">
                {tPrivacy("title")}
              </Link>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition-all hover:border-white/20 hover:text-white hover:bg-white/5"
                  aria-label={link.label}
                >
                  <link.Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom divider + copyright */}
        <div className="mt-12 border-t border-white/5 pt-6">
          <p className="text-center text-xs text-zinc-600">
            &copy; {year} Volitan Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
