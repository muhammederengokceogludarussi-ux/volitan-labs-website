import type { Metadata } from "next";
import Image from "next/image";
import { Download, ExternalLink, Gamepad2, QrCode, ShieldCheck, Trophy } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedSection } from "@/components/shared/animated-section";

const gameUrl = "https://www.volitanlabs.dev/games/blue-rescue/index.html";

const copy = {
  tr: {
    badge: "SKY OLİMPİYATLARI PROJESİ",
    title: "BLUE RESCUE",
    description:
      "GÖKBEY Isıl ve Akışkanlar Analizi stajım için klasik bir teknik sunum yerine yaptığım küçük, oynanabilir kurtarma oyunu.",
    hold: "Basılı tutarak yüksel, bırakarak alçal.",
    score: "Kurtarma kombosu yap ve en yüksek skoru geç.",
    safe: "Hesap gerekmez. Skor yalnızca kendi cihazında saklanır.",
    fullscreen: "Oyunu tam ekranda aç",
    qrTitle: "Telefondan oyna",
    qrDescription: "Kameranı QR koda tut ve oyunu doğrudan aç.",
    iframeTitle: "Blue Rescue tarayıcı oyunu",
    deck: "SKY sunumunu indir",
    deckMeta: "7 slayt · Türkçe · PPTX",
  },
  en: {
    badge: "SKY OLYMPICS PROJECT",
    title: "BLUE RESCUE",
    description:
      "A small playable rescue game I made during my GÖKBEY Thermal and Fluid Analysis internship instead of presenting a predictable technical task.",
    hold: "Hold to rise and release to descend.",
    score: "Build a rescue combo and beat your high score.",
    safe: "No account required. Your score stays on your device.",
    fullscreen: "Open the full-screen game",
    qrTitle: "Play on your phone",
    qrDescription: "Point your camera at the QR code to open the game directly.",
    iframeTitle: "Blue Rescue browser game",
    deck: "Download the SKY presentation",
    deckMeta: "7 slides · Turkish · PPTX",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  return {
    title: "Blue Rescue",
    description: isTr
      ? "Tek dokunuşla oynanan kurtarma helikopteri oyunu."
      : "A one-touch rescue helicopter browser game.",
    alternates: {
      canonical: `https://www.volitanlabs.dev/${locale}/blue-rescue`,
      languages: {
        en: "https://www.volitanlabs.dev/en/blue-rescue",
        tr: "https://www.volitanlabs.dev/tr/blue-rescue",
      },
    },
  };
}

export default async function BlueRescuePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const text = copy[locale === "tr" ? "tr" : "en"];

  return (
    <div className="relative overflow-hidden pb-28 pt-32 md:pt-40">
      <Container>
        <AnimatedSection>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-4 py-2 font-mono text-xs font-semibold tracking-[0.16em] text-sky-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-sky-300" />
              {text.badge}
            </div>
            <h1 className="font-display text-5xl font-black tracking-[-0.06em] text-white md:text-7xl">
              BLUE <span className="text-sky-400">RESCUE</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
              {text.description}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,440px)_1fr] lg:justify-center">
          <AnimatedSection delay={0.1}>
            <div className="mx-auto w-full max-w-[430px] overflow-hidden rounded-[2rem] border border-white/15 bg-black/45 p-2 shadow-[0_0_80px_rgba(56,189,248,0.16)]">
              <iframe
                src="/games/blue-rescue/index.html"
                title={text.iframeTitle}
                className="aspect-[390/844] w-full rounded-[1.55rem] border-0 bg-[#071524]"
                allow="fullscreen"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex flex-col gap-6">
              <GlassCard glow="accent" className="p-7 md:p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300">
                  <Gamepad2 className="h-6 w-6" />
                </div>
                <div className="space-y-5 text-sm leading-relaxed text-text-secondary md:text-base">
                  <div className="flex gap-4">
                    <Gamepad2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" />
                    <p>{text.hold}</p>
                  </div>
                  <div className="flex gap-4">
                    <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                    <p>{text.score}</p>
                  </div>
                  <div className="flex gap-4">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                    <p>{text.safe}</p>
                  </div>
                </div>
                <a
                  href="/games/blue-rescue/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-6 py-3.5 text-sm font-bold text-slate-950 transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(56,189,248,0.35)]"
                >
                  {text.fullscreen}
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="/presentations/Blue_Rescue_SKY_Olimpiyatlari_Sunumu.pptx"
                  download
                  className="mt-3 flex w-full items-center justify-center gap-3 rounded-full border border-sky-300/25 bg-sky-300/[0.06] px-6 py-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-sky-300/50 hover:bg-sky-300/[0.1]"
                >
                  <Download className="h-5 w-5 shrink-0 text-sky-300" />
                  <span>
                    <span className="block text-sm font-bold text-white">{text.deck}</span>
                    <span className="block text-xs text-text-secondary">{text.deckMeta}</span>
                  </span>
                </a>
              </GlassCard>

              <GlassCard className="flex flex-col items-center gap-5 p-7 text-center sm:flex-row sm:text-left">
                <div className="rounded-2xl bg-white p-3 shadow-xl">
                  <Image
                    src="/images/games/blue-rescue/qr-volitanlabs.svg"
                    alt={`${text.qrTitle}: ${gameUrl}`}
                    width={164}
                    height={164}
                    className="h-36 w-36 sm:h-40 sm:w-40"
                  />
                </div>
                <div>
                  <QrCode className="mx-auto mb-3 h-6 w-6 text-sky-300 sm:mx-0" />
                  <h2 className="font-display text-xl font-bold text-white">
                    {text.qrTitle}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {text.qrDescription}
                  </p>
                </div>
              </GlassCard>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </div>
  );
}
