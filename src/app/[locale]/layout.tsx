import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { Providers } from "@/components/layout/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ParticleBackground } from "@/components/ui/particle-background";
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

  let messages: Record<string, unknown> = {};
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (err) {
    console.error(`[LocaleLayout] Failed to load messages for "${locale}":`, err);
  }

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
          <ParticleBackground />
          <Header />
          <main className="relative z-10 flex min-h-screen flex-col">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
