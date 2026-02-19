# Volitan Labs - Web Sitesi Tasarim ve Teknik Brief

## Bu Dokuman Nedir?

Bu dokuman, Volitan Labs sirketinin web sitesi projesi icin hazirlanmis kapsamli bir brief'tir.
Amac: Claude Chat'te deep research acilarak bu dosya paylasilacak ve tasarim + teknik konularda ek oneriler alinacak.

---

## 1. Sirket Profili

- **Isim**: Volitan Labs
- **Alan**: Mobil uygulama gelistirme + Makine muhendisligi
- **Kurucu**: Makine muhendisi, ayni zamanda mobil uygulama gelistirici (Flutter)
- **Konum**: Turkiye
- **Hedef**: Profesyonel sirket web sitesi - is basvurularinda, uygulama tanitiminda ve marka olusturmada kullanilacak
- **"Volitan" Anlami**: Latince "volitan/volitans" = ucmak, suruklemek. Bilimsel terminolojide de kullanilir (Exocoetus volitans - ucan balik).

## 2. Urun: Focus Space

- **Tur**: Uzay temali odaklanma/verimlilik uygulamasi
- **Platform**: Flutter (iOS + Android)
- **Durum**: Kapali test asamasinda, yakin zamanda Play Store'da yayinlanacak
- **Temel Ozellikler**:
  - Focus Timer (Pomodoro, Deep Work, Flowtime modlari)
  - Gamification (XP, streak, seviye, liderlik tablosu, liga sistemi)
  - Gezegen Terraforming (odaklanma sirasinda prosedural gezegen olusturma)
  - App Blocker (dikkat dagitici uygulamalari engelleme)
  - Ambient sesler (yagmur, kus, somine) + Noro ses modlari (beyaz/pembe/kahverengi gurultu)
  - Dock Mode (uyku modu)
  - Haftalik rapor ve analitik
  - Arkadaslik sistemi ve arkadaslik meydan okumalari
- **Uygulama Renkleri**:
  - Ana arka plan: #08081A (koyu mor-siyah)
  - Cyan: #00D4FF (timer, aktif elemanlar)
  - Amber: #F59E0B (XP, ilerleme)
  - Mor: #A78BFA (premium ozellikler)
  - Yesil: #10B981 (basari)
- **Uygulama Fontlari**: Space Grotesk (basliklar), Inter (govde), JetBrains Mono (sayilar)
- **Monetizasyon**: Freemium (ucretsiz + premium abonelik) + reklamlar

## 3. Web Sitesi Gereksinimleri

### Genel

- Minimalist, Apple tarzi temiz tasarim
- Dark/Light mode toggle
- Cift dil: Turkce + Ingilizce (toggle ile)
- Cok animasyonlu, goze hitap eden UI/UX
- Mobil-first responsive
- Kolay icerik guncelleme (vibe coder icin)

### Sayfalar

1. **Ana Sayfa**: Hero + Highlights + Featured App + CTA
2. **Uygulamalar**: App showcase listesi + detay sayfasi
3. **Hakkimizda**: Sirket hikayesi + kurucu
4. **Blog**: Teknik yazilar (MDX tabanli)
5. **Gizlilik Politikasi**: Play Store uyumluluk
6. **Iletisim**: Form + sosyal linkler
7. **Kariyer/Hakkimda**: Kurucunun CV tarzi portfolyo sayfasi

### Planlanan Tech Stack

- Next.js 15 (App Router), Tailwind CSS v4, Framer Motion
- Magic UI + Aceternity UI (animasyonlu bilesenler)
- next-intl (i18n), next-themes (dark/light)
- MDX + TypeScript icerik dosyalari
- Vercel deploy

---

## 4. Tasarim Odakli Sorular (Deep Research)

### Renk Paleti

- Minimalist modern bir site icin hangi renk paleti onerirsiniz?
- Uygulamanin uzay renkleri (cyan, mor, amber) siteye nasil entegre edilebilir - ama site uzay temali olmadan?
- Light mode ve dark mode icin ayri ayri renk paleti onerileri nelerdir?
- Aksan rengleri nasil kullanilmali? (CTA butonlar, hover efektler, vurgular)
- 2025-2026 trend renk paletlerinden bu projeye uyanlar hangileri?

### Tipografi

- Inter + Space Grotesk kombinasyonu yeterli mi? Daha iyi alternatifler var mi?
- Baslik boyutlari ve hiyerarsi icin en iyi uygulamalar nelerdir?
- Turkce karakterlerle iyi calisan font onerileriniz var mi?

### Animasyon Onerileri

- Minimalist bir sitede animasyonu abartmadan nasil etkileyici kullanabiliriz?
- Hero section icin en etkili animasyon pattern'leri nelerdir?
- Scroll-triggered animasyonlar icin en iyi pratikler nelerdir?
- Sayfa gecis animasyonlari icin oneriler?
- Micro-interaction ornekleri (buton hover, kart hover, form interaction)?
- Performansi dusurmeden zengin animasyon nasil saglanir?

### UI/UX Patternler

- Mobil uygulama tanitim sayfasi icin en iyi layout pattern'ler nelerdir?
- App screenshot showcasing icin en etkili yontemler? (carousel, mockup, video?)
- "Coming Soon" vs "Download Now" - uygulama henuz yayinda degil, bu nasil handle edilmeli?
- Career/portfolyo sayfasi icin en iyi layout ve icerik yapisi?
- Blog sayfasi icin modern tasarim pattern'leri?
- Contact formu vs sadece email/sosyal linkler - hangisi daha etkili?

### Ilham Kaynaklari

- Benzer (kucuk teknoloji sirketi / indie developer) web sitelerinden ornekler?
- Apple.com disinda minimalist modern tasarim icin baska ilham kaynaklari?
- Ozellikle uygulama tanitim sayfalari icin ornek siteler?

### Marka Kimligi

- "Volitan Labs" icin logo/wordmark tasarim onerileri?
- Favicon ve Open Graph gorselleri icin oneriler?
- Marka tutarliligi (site + uygulama) nasil saglanir, temayi kopyalamadan?

---

## 5. Teknik Odakli Sorular (Deep Research)

### Mimari

- Next.js 15 App Router ile bu olcekte bir site icin en iyi proje yapisi?
- Server Components vs Client Components ayirimi icin en iyi pratikler?
- MDX ile blog sistemi kurmak icin en iyi yaklasim? (contentlayer, next-mdx-remote, vs?)
- Icerik yonetimi: TypeScript dosyalari vs headless CMS - bu proje icin hangisi daha uygun?

### Performans

- Core Web Vitals optimizasyonu icin Next.js 15'te dikkat edilmesi gerekenler?
- Framer Motion animasyonlarinin performans etkisini minimize etmek icin stratejiler?
- Image optimizasyonu: next/image vs baska cozumler?
- Font yukleme stratejisi: next/font en iyi yaklasim mi?

### SEO

- Cift dilli site icin SEO en iyi pratikleri? (hreflang, canonical URL'ler)
- App showcase sayfasi icin structured data (JSON-LD) nasil uygulanmali?
- Blog SEO optimizasyonu icin oneriler?

### i18n

- next-intl vs next-i18next vs diger cozumler - 2025-2026'da en iyi hangisi?
- URL yapisi: /en/page vs /page?lang=en vs subdomain?
- Icerik cevirisi icin workflow onerisi?

### Deployment ve DevOps

- Vercel vs Cloudflare Pages vs Netlify - bu proje icin en uygun hangisi?
- CI/CD pipeline onerisi?
- Monitoring ve analytics icin oneriler? (Vercel Analytics, Plausible, PostHog?)

### Guvenlik

- Contact form spam korumasi icin oneriler? (reCAPTCHA, honeypot, rate limiting?)
- Environment variable yonetimi?
- CORS ve CSP konfigurasyonu?

---

## 6. Ek Bilgiler

- Kurucu vibe coder - kodlamayi derinlemesine bilmiyor, AI destekli gelistiriyor
- Site kolay degisebilir ve genisletilebilir olmali
- Gelecekte baska uygulamalar da eklenecek
- Site is basvurularinda da kullanilacak (profesyonel gozukmeli)
- LinkedIn ve GitHub hesaplari mevcut

---

## Beklenen Cikti

Lutfen su konularda detayli oneriler verin:

1. Spesifik renk paleti onerisi (hex kodlari ile, light ve dark mode ayri ayri)
2. Animasyon stratejisi ve ornek implementasyonlar
3. Her sayfa icin detayli layout wireframe/aciklama
4. Teknik mimari onerileri ve potansiyel tuzaklar
5. Rakip/ornek site analizleri (linkler ile)
6. SEO ve performans icin somut adimlar
7. Marka kimligi onerileri
8. Genel olarak gozden kacirmis olabilecegimiz seyler
