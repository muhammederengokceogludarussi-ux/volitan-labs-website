"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "tr" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className={cn(
        "flex h-9 items-center gap-1 rounded-lg px-2",
        "text-sm font-medium text-text-secondary hover:text-text-primary",
        "transition-colors duration-200",
        "hover:bg-surface-elevated"
      )}
      aria-label="Toggle language"
    >
      <span className={cn(locale === "en" && "text-text-primary font-semibold")}>
        EN
      </span>
      <span className="text-text-muted">/</span>
      <span className={cn(locale === "tr" && "text-text-primary font-semibold")}>
        TR
      </span>
    </button>
  );
}
