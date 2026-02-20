import { cn } from "@/lib/utils";

type GlowPreset =
  | "hero"
  | "cyan-top"
  | "purple-bottom"
  | "amber-right"
  | "center-radial"
  | "dual-diagonal"
  | "warm-glow";

interface BackgroundGlowProps {
  className?: string;
  preset?: GlowPreset;
}

const presetStyles: Record<GlowPreset, string> = {
  hero: `
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(155,123,240,0.15) 0%, transparent 70%),
    radial-gradient(ellipse 60% 40% at 80% 50%, rgba(0,200,240,0.08) 0%, transparent 60%),
    radial-gradient(ellipse 50% 50% at 20% 80%, rgba(155,123,240,0.06) 0%, transparent 50%)
  `,
  "cyan-top": `
    radial-gradient(ellipse 70% 40% at 50% 0%, rgba(155,123,240,0.12) 0%, transparent 70%),
    radial-gradient(ellipse 40% 30% at 70% 20%, rgba(0,200,240,0.06) 0%, transparent 60%)
  `,
  "purple-bottom": `
    radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,200,240,0.12) 0%, transparent 70%),
    radial-gradient(ellipse 40% 30% at 30% 80%, rgba(155,123,240,0.06) 0%, transparent 60%)
  `,
  "amber-right": `
    radial-gradient(ellipse 50% 60% at 100% 30%, rgba(232,145,10,0.10) 0%, transparent 70%),
    radial-gradient(ellipse 40% 40% at 80% 70%, rgba(232,145,10,0.06) 0%, transparent 60%)
  `,
  "center-radial": `
    radial-gradient(ellipse 60% 50% at 50% 50%, rgba(155,123,240,0.10) 0%, transparent 70%),
    radial-gradient(ellipse 40% 40% at 30% 30%, rgba(0,200,240,0.06) 0%, transparent 50%),
    radial-gradient(ellipse 40% 40% at 70% 70%, rgba(155,123,240,0.05) 0%, transparent 50%)
  `,
  "dual-diagonal": `
    radial-gradient(ellipse 50% 50% at 20% 20%, rgba(155,123,240,0.12) 0%, transparent 60%),
    radial-gradient(ellipse 50% 50% at 80% 80%, rgba(0,200,240,0.10) 0%, transparent 60%)
  `,
  "warm-glow": `
    radial-gradient(ellipse 60% 50% at 50% 30%, rgba(232,145,10,0.10) 0%, transparent 70%),
    radial-gradient(ellipse 40% 40% at 70% 60%, rgba(155,123,240,0.06) 0%, transparent 60%)
  `,
};

export function BackgroundGlow({
  className,
  preset = "cyan-top",
}: BackgroundGlowProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      style={{
        backgroundImage: presetStyles[preset],
      }}
    />
  );
}
