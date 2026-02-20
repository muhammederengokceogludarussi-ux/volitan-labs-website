"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { LogoIcon } from "@/components/shared/logo";
import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/muhammederengokceogludarussi-ux", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/muhammed-eren-g%C3%B6kceo%C4%9Flu-33b5bb1b7/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:eren.gokceoglu@metu.edu.tr", label: "Email" },
];

const navLinks = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/projects", key: "projects" },
  { href: "/contact", key: "contact" },
] as const;

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-surface">
      <Container>
        <div className="grid gap-8 py-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
            >
              <LogoIcon size={24} />
              <span>Volitan Labs</span>
            </Link>
            <p className="mt-2 text-sm text-text-secondary">
              {t("footer.description")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold">{t("footer.navigation")}</h3>
            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Legal */}
          <div>
            <h3 className="text-sm font-semibold">{t("footer.connect")}</h3>
            <div className="mt-3 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/privacy"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {t("privacy.title")}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 py-6">
          <p className="text-center text-xs text-text-muted">
            &copy; {year} Volitan Labs. {t("common.copyright")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
