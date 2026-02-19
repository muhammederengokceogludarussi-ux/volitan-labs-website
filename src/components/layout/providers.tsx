"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";

export function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, unknown>;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <LazyMotion features={domAnimation}>
          <MotionConfig reducedMotion="user">
            {children}
          </MotionConfig>
        </LazyMotion>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
