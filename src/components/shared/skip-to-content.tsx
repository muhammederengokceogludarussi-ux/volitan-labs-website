"use client";

import { useLocale } from "next-intl";

export function SkipToContent() {
  const locale = useLocale();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
    >
      {locale === "tr" ? "İçeriğe atla" : "Skip to content"}
    </a>
  );
}
