"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Container } from "@/components/ui/container";
import { LogoIcon } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/projects", key: "projects" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
          >
            <LogoIcon size={28} />
            <span>Volitan Labs</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
                  )}
                >
                  {t(item.key)}
                  {isActive && (
                    <m.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-1 -bottom-[calc(0.5rem+1px)] h-0.5 rounded-full bg-accent-cyan"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side: Toggles */}
          <div className="flex items-center gap-1">
            <LanguageToggle />
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/50 bg-background md:hidden"
          >
            <Container>
              <div className="flex flex-col gap-1 py-4">
                {navItems.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-surface-elevated text-text-primary"
                          : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  );
                })}
              </div>
            </Container>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
