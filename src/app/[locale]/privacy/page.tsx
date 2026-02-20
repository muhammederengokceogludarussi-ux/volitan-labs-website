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
    lastUpdated: "15 Ocak 2025",
    sections: [
      {
        title: "Giriş",
        content: "Volitan Labs (\"biz\") volitanlabs.dev web sitesini ve Focus Space mobil uygulamasını işletmektedir. Bu Gizlilik Politikası, kişisel bilgilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklar.",
      },
      {
        title: "Topladığımız Bilgiler",
        content: "Hizmetlerimizi sunmak için gereken minimum bilgileri topluyoruz:\n\n- İletişim Formu: İletişim formumuzu gönderdiğinizde adınızı, e-posta adresinizi ve mesaj içeriğini topluyoruz.\n- Analitik: Çerez kullanmadan anonim kullanım verileri toplayan Vercel Analytics kullanıyoruz.\n- Uygulama Verileri: Focus Space verimlilik verilerinizi cihazınızda yerel olarak saklar. Sunucularımıza kişisel veri gönderilmez.",
      },
      {
        title: "Bilgilerinizi Nasıl Kullanıyoruz",
        content: "Topladığımız bilgileri şu amaçlarla kullanıyoruz:\n\n- İletişim formu aracılığıyla gönderilen sorularınıza yanıt vermek\n- Anonim analitiklere dayanarak web sitemizi ve hizmetlerimizi geliştirmek\n- Yalnızca açıkça tercih ederseniz uygulamalarımız hakkında güncellemeler göndermek",
      },
      {
        title: "Veri Depolama ve Güvenlik",
        content: "İletişim formu gönderimleri güvenli bir şekilde işlenir. Kişisel tanımlanabilir bilgilerinizi üçüncü taraflara satmıyoruz, takas etmiyoruz veya başka şekilde aktarmıyoruz. Kişisel bilgilerinizi korumak için uygun güvenlik önlemleri uyguluyoruz.",
      },
      {
        title: "Çerezler",
        content: "Web sitemiz yalnızca tema tercihi (koyu/açık mod) ve dil seçimi için temel çerezler kullanır. İzleme çerezleri veya üçüncü taraf reklam çerezleri kullanmıyoruz.",
      },
      {
        title: "Üçüncü Taraf Hizmetleri",
        content: "Aşağıdaki üçüncü taraf hizmetlerini kullanıyoruz:\n\n- Vercel: Web sitesi barındırma ve analitik (gizlilik dostu, çerez yok)\n- Cloudflare: DNS ve güvenlik (spam koruması için Turnstile)",
      },
      {
        title: "Haklarınız",
        content: "Şu haklara sahipsiniz:\n\n- Hakkınızda tuttuğumuz kişisel verilere erişim\n- Kişisel verilerinizin düzeltilmesini veya silinmesini talep etme\n- Veri işleme için onayınızı geri çekme\n- Veri koruma otoritesine şikâyet dosyalama\n\nBu hakları kullanmak için lütfen eren.gokceoglu@metu.edu.tr adresinden bize ulaşın.",
      },
      {
        title: "Bu Politikadaki Değişiklikler",
        content: "Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Herhangi bir değişikliği bu sayfada yeni Gizlilik Politikasını yayınlayarak ve \"Son güncelleme\" tarihini güncelleyerek size bildireceğiz.",
      },
      {
        title: "Bize Ulaşın",
        content: "Bu Gizlilik Politikası hakkında sorularınız varsa, lütfen eren.gokceoglu@metu.edu.tr adresinden bize ulaşın.",
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
