"use client";

import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { BackgroundGrid } from "@/components/ui/background-grid";

const privacyContent = {
  en: {
    lastUpdated: "August 31, 2026",
    sections: [
      {
        title: "Introduction",
        content: "Volitan Labs (\"we\", \"us\", or \"our\") operates the volitanlabs.dev website and its interactive web experiences. This Privacy Policy explains how we collect, use, and protect your personal information.",
      },
      {
        title: "Information We Collect",
        content: "We collect minimal information necessary to provide our services:\n\n- Contact Form: When you submit our contact form, we collect your name, email address, and message content.\n- Analytics: We use Vercel Analytics which collects anonymous usage data without cookies.\n- Game Data: Blue Rescue stores high scores locally in your browser. This score data is not sent to our servers.",
      },
      {
        title: "How We Use Your Information",
        content: "We use the information we collect to:\n\n- Respond to your inquiries submitted through the contact form\n- Improve our website and interactive experiences based on anonymous analytics",
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
        content: "You have the right to:\n\n- Access the personal data we hold about you\n- Request correction or deletion of your personal data\n- Withdraw consent for data processing\n- File a complaint with a data protection authority\n\nTo exercise these rights, please contact us at eren.gokceoglu@metu.edu.tr.",
      },
      {
        title: "Changes to This Policy",
        content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last updated\" date.",
      },
      {
        title: "Contact Us",
        content: "If you have any questions about this Privacy Policy, please contact us at eren.gokceoglu@metu.edu.tr.",
      },
    ],
  },
  tr: {
    lastUpdated: "31 Ağustos 2026",
    sections: [
      {
        title: "Giris",
        content: "Volitan Labs (\"biz\") volitanlabs.dev web sitesini ve sitedeki etkileşimli web deneyimlerini işletmektedir. Bu Gizlilik Politikası, kişisel bilgilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklar.",
      },
      {
        title: "Topladığımız Bilgiler",
        content: "Hizmetlerimizi sunmak için gereken minimum bilgileri topluyoruz:\n\n- İletişim Formu: İletişim formumuzu gönderdiğinizde adınızı, e-posta adresinizi ve mesaj içeriğini topluyoruz.\n- Analitik: Çerez kullanmadan anonim kullanım verileri toplayan Vercel Analytics kullanıyoruz.\n- Oyun Verileri: Blue Rescue en yüksek skorları tarayıcınızda yerel olarak saklar. Bu skor verisi sunucularımıza gönderilmez.",
      },
      {
        title: "Bilgilerinizi Nasıl Kullanıyoruz",
        content: "Topladığımız bilgileri şu amaçlarla kullanıyoruz:\n\n- İletişim formu aracılığıyla gönderilen sorularınıza yanıt vermek\n- Anonim analitiklere dayanarak web sitemizi ve etkileşimli deneyimlerimizi geliştirmek",
      },
      {
        title: "Veri Depolama ve Guvenlik",
        content: "Iletisim formu gonderimleri guvenli bir sekilde islenir. Kisisel tanımlanabilir bilgilerinizi ucuncu taraflara satmıyoruz, takas etmiyoruz veya baska sekilde aktarmıyoruz. Kisisel bilgilerinizi korumak icin uygun guvenlik onlemleri uyguluyoruz.",
      },
      {
        title: "Cerezler",
        content: "Web sitemiz yalnızca tema tercihi (koyu/acık mod) ve dil secimi icin temel cerezler kullanır. Izleme cerezleri veya ucuncu taraf reklam cerezleri kullanmıyoruz.",
      },
      {
        title: "Ucuncu Taraf Hizmetleri",
        content: "Asagıdaki ucuncu taraf hizmetlerini kullanıyoruz:\n\n- Vercel: Web sitesi barındırma ve analitik (gizlilik dostu, cerez yok)\n- Cloudflare: DNS ve guvenlik (spam koruması icin Turnstile)",
      },
      {
        title: "Haklarınız",
        content: "Su haklara sahipsiniz:\n\n- Hakkınızda tuttuğumuz kisisel verilere erisim\n- Kisisel verilerinizin duzeltilmesini veya silinmesini talep etme\n- Veri isleme icin onayınızı geri cekme\n- Veri koruma otoritesine sikayet dosyalama\n\nBu hakları kullanmak icin lutfen eren.gokceoglu@metu.edu.tr adresinden bize ulasın.",
      },
      {
        title: "Bu Politikadaki Degisiklikler",
        content: "Bu Gizlilik Politikasını zaman zaman guncelleyebiliriz. Herhangi bir degisikligi bu sayfada yeni Gizlilik Politikasını yayınlayarak ve \"Son guncelleme\" tarihini guncelleyerek size bildirecegiz.",
      },
      {
        title: "Bize Ulasın",
        content: "Bu Gizlilik Politikası hakkında sorularınız varsa, lutfen eren.gokceoglu@metu.edu.tr adresinden bize ulasın.",
      },
    ],
  },
};

export default function PrivacyPage() {
  const t = useTranslations("privacy");
  const locale = useLocale() as "en" | "tr";
  const data = privacyContent[locale];

  return (
    <Section className="relative overflow-hidden pt-20 md:pt-32">
      <BackgroundGrid variant="dots" />
      <Container>
        <div className="mx-auto max-w-3xl">
          <AnimatedSection variant="fade">
            <h1 className="font-display text-3xl font-bold tracking-[-0.03em] md:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-2 text-sm text-text-muted">
              {t("lastUpdated")}: {data.lastUpdated}
            </p>

            <div className="mt-10 space-y-8">
              {data.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="font-display text-xl font-semibold tracking-[-0.03em]">
                    {section.title}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {section.content.split("\n\n").map((paragraph, i) => (
                      <p key={i} className="text-sm leading-relaxed text-text-secondary whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </Section>
  );
}
