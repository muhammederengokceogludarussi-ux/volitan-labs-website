"use client";

import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";

const privacyContent = {
  en: {
    lastUpdated: "January 15, 2025",
    sections: [
      {
        title: "Introduction",
        content: "Volitan Labs (\"we\", \"us\", or \"our\") operates the volitanlabs.dev website and Focus Space mobile application. This Privacy Policy explains how we collect, use, and protect your personal information.",
      },
      {
        title: "Information We Collect",
        content: "We collect minimal information necessary to provide our services:\n\n- Contact Form: When you submit our contact form, we collect your name, email address, and message content.\n- Analytics: We use Vercel Analytics which collects anonymous usage data without cookies.\n- App Data: Focus Space stores your productivity data locally on your device. No personal data is sent to our servers.",
      },
      {
        title: "How We Use Your Information",
        content: "We use the information we collect to:\n\n- Respond to your inquiries submitted through the contact form\n- Improve our website and services based on anonymous analytics\n- Send you updates about our apps only if you explicitly opt in",
      },
      {
        title: "Data Storage and Security",
        content: "Contact form submissions are processed securely. We do not sell, trade, or otherwise transfer your personally identifiable information to third parties. We implement appropriate security measures to protect your personal information.",
      },
      {
        title: "Cookies",
        content: "Our website uses only essential cookies for theme preference (dark/light mode) and language selection. We do not use tracking cookies or third-party advertising cookies.",
      },
      {
        title: "Third-Party Services",
        content: "We use the following third-party services:\n\n- Vercel: Website hosting and analytics (privacy-friendly, no cookies)\n- Cloudflare: DNS and security (Turnstile for spam protection)",
      },
      {
        title: "Your Rights",
        content: "You have the right to:\n\n- Access the personal data we hold about you\n- Request correction or deletion of your personal data\n- Withdraw consent for data processing\n- File a complaint with a data protection authority\n\nTo exercise these rights, please contact us at hello@volitanlabs.com.",
      },
      {
        title: "Changes to This Policy",
        content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last updated\" date.",
      },
      {
        title: "Contact Us",
        content: "If you have any questions about this Privacy Policy, please contact us at hello@volitanlabs.com.",
      },
    ],
  },
  tr: {
    lastUpdated: "15 Ocak 2025",
    sections: [
      {
        title: "Giris",
        content: "Volitan Labs (\"biz\") volitanlabs.dev web sitesini ve Focus Space mobil uygulamasini isletmektedir. Bu Gizlilik Politikasi, kisisel bilgilerinizi nasil topladigimizi, kullandigimizi ve korudugumuzu aciklar.",
      },
      {
        title: "Topladigimiz Bilgiler",
        content: "Hizmetlerimizi sunmak icin gereken minimum bilgileri topluyoruz:\n\n- Iletisim Formu: Iletisim formumuzu gonderdiginizde adinizi, e-posta adresinizi ve mesaj icerigini topluyoruz.\n- Analitik: Cerez kullanmadan anonim kullanim verileri toplayan Vercel Analytics kullaniyoruz.\n- Uygulama Verileri: Focus Space verimlilik verilerinizi cihazinizda yerel olarak saklar. Sunucularimiza kisisel veri gonderilmez.",
      },
      {
        title: "Bilgilerinizi Nasil Kullaniyoruz",
        content: "Topladigimiz bilgileri su amaclarla kullaniyoruz:\n\n- Iletisim formu araciligiyla gonderilen sorulariniza yanit vermek\n- Anonim analitiklere dayanarak web sitemizi ve hizmetlerimizi gelistirmek\n- Yalnizca acikca tercih ederseniz uygulamalarimiz hakkinda guncellemeler gondermek",
      },
      {
        title: "Veri Depolama ve Guvenlik",
        content: "Iletisim formu gonderimleri guvenli bir sekilde islenir. Kisisel tanimlanabilir bilgilerinizi ucuncu taraflara satmiyoruz, takas etmiyoruz veya baska sekilde aktarmiyoruz. Kisisel bilgilerinizi korumak icin uygun guvenlik onlemleri uyguluyoruz.",
      },
      {
        title: "Cerezler",
        content: "Web sitemiz yalnizca tema tercihi (koyu/acik mod) ve dil secimi icin temel cerezler kullanir. Izleme cerezleri veya ucuncu taraf reklam cerezleri kullanmiyoruz.",
      },
      {
        title: "Ucuncu Taraf Hizmetleri",
        content: "Asagidaki ucuncu taraf hizmetlerini kullaniyoruz:\n\n- Vercel: Web sitesi barindirma ve analitik (gizlilik dostu, cerez yok)\n- Cloudflare: DNS ve guvenlik (spam korumasi icin Turnstile)",
      },
      {
        title: "Haklariniz",
        content: "Su haklara sahipsiniz:\n\n- Hakkimizda tuttugumuza kisisel verilere erisim\n- Kisisel verilerinizin duzeltilmesini veya silinmesini talep etme\n- Veri isleme icin onayinizi geri cekme\n- Veri koruma otoritesine sikayet dosyalama\n\nBu haklari kullanmak icin lutfen hello@volitanlabs.com adresinden bize ulasin.",
      },
      {
        title: "Bu Politikadaki Degisiklikler",
        content: "Bu Gizlilik Politikasini zaman zaman guncelleyebiliriz. Herhangi bir degisikligi bu sayfada yeni Gizlilik Politikasini yayinlayarak ve \"Son guncelleme\" tarihini guncelleyerek size bildireceğiz.",
      },
      {
        title: "Bize Ulasin",
        content: "Bu Gizlilik Politikasi hakkinda sorulariniz varsa, lutfen hello@volitanlabs.com adresinden bize ulasin.",
      },
    ],
  },
};

export default function PrivacyPage() {
  const t = useTranslations("privacy");
  const locale = useLocale() as "en" | "tr";
  const data = privacyContent[locale];

  return (
    <Section className="pt-20 md:pt-32">
      <Container>
        <div className="mx-auto max-w-3xl">
          <AnimatedSection>
            <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-2 text-sm text-text-muted">
              {t("lastUpdated")}: {data.lastUpdated}
            </p>
          </AnimatedSection>

          <div className="mt-10 space-y-8">
            {data.sections.map((section, index) => (
              <AnimatedSection key={index} delay={0.05 * (index + 1)}>
                <div>
                  <h2 className="font-display text-xl font-semibold">
                    {section.title}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {section.content.split("\n\n").map((paragraph, i) => (
                      <p key={i} className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
