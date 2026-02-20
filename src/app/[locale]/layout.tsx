import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { Providers } from "@/components/layout/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SkipToContent } from "@/components/shared/skip-to-content";
import { BackToTop } from "@/components/shared/back-to-top";
import { SmoothScroll } from "@/components/shared/smooth-scroll";
import { JsonLd, websiteSchema, personSchema } from "@/components/shared/json-ld";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <JsonLd data={websiteSchema} />
        <JsonLd data={personSchema} />
      </head>
      <body
        className={`${fontVariables} font-sans bg-background text-text-primary antialiased`}
      >
        <Providers locale={locale} messages={messages}>
          <SkipToContent />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <BackToTop />
          <SmoothScroll />
        </Providers>
      </body>
    </html>
  );
}
