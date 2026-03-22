"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/projects", key: "projects" },
  { href: "/apps", key: "apps" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrolled
            ? "top-4 left-1/2 right-auto -translate-x-1/2 w-[95%] max-w-3xl"
            : "w-full"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between backdrop-blur-2xl border-white/10 transition-all duration-500 will-change-[background,padding,border-radius]",
            scrolled
              ? "px-4 sm:px-6 py-2 bg-black/80 rounded-full border shadow-floating"
              : "px-6 sm:px-10 py-4 bg-black/40 border-b"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-white tracking-tight group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black text-sm font-mono overflow-hidden border border-white group-hover:bg-zinc-200 transition-colors">
              <span className="font-bold text-sm">V</span>
            </div>
            <span className="hidden sm:block text-sm font-display">
              Volitan Labs
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const label = t(item.key);
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "nav-link text-sm font-medium transition-colors duration-200",
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <div className="mx-1 h-4 w-px bg-white/10" />
            <Link
              href="/contact"
              className="hidden sm:flex items-center px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              {t("contact")}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 hover:text-white transition-colors md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <m.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "fixed left-4 right-4 z-40 rounded-2xl border border-white/10 bg-black/90 p-4 shadow-floating backdrop-blur-xl md:hidden",
                scrolled ? "top-20" : "top-20"
              )}
            >
              <div className="flex flex-col gap-1">
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
                        "rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200",
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  );
                })}
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-black"
                >
                  {t("contact")}
                </Link>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
