import { cn } from "@/lib/utils";

type OrbPreset = "hero" | "top-right" | "bottom-left" | "center" | "scattered";

type AccentColor =
  | "accent-cyan"
  | "accent-purple"
  | "accent-amber"
  | "accent-green";

interface BackgroundGradientOrbsProps {
  className?: string;
  /** Predefined layout preset */
  preset?: OrbPreset;
  /** Primary accent color. Default "accent-cyan" */
  primaryColor?: AccentColor;
  /** Secondary accent color. Default "accent-purple" */
  secondaryColor?: AccentColor;
}

// Color values for inline styles (CSS variables for guaranteed visibility)
const colorValues: Record<AccentColor, string> = {
  "accent-cyan": "var(--color-accent-cyan)",
  "accent-purple": "var(--color-accent-purple)",
  "accent-amber": "var(--color-accent-amber)",
  "accent-green": "var(--color-accent-green)",
};

interface OrbConfig {
  position: string;
  color: "primary" | "secondary";
  size: string;
  animation: string;
}

const presetStyles: Record<OrbPreset, { orbs: OrbConfig[] }> = {
  hero: {
    orbs: [
      {
        position: "-top-32 -right-32",
        color: "primary",
        size: "h-[28rem] w-[28rem]",
        animation: "animate-orb-drift-1",
      },
      {
        position: "-bottom-32 -left-32",
        color: "secondary",
        size: "h-[24rem] w-[24rem]",
        animation: "animate-orb-drift-2",
      },
    ],
  },
  "top-right": {
    orbs: [
      {
        position: "-top-24 -right-24",
        color: "primary",
        size: "h-[22rem] w-[22rem]",
        animation: "animate-orb-drift-1",
      },
      {
        position: "top-1/2 -left-16",
        color: "secondary",
        size: "h-48 w-48",
        animation: "animate-orb-drift-2",
      },
    ],
  },
  "bottom-left": {
    orbs: [
      {
        position: "-bottom-24 -left-24",
        color: "secondary",
        size: "h-[22rem] w-[22rem]",
        animation: "animate-orb-drift-2",
      },
    ],
  },
  center: {
    orbs: [
      {
        position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        color: "primary",
        size: "h-[30rem] w-[30rem]",
        animation: "animate-orb-drift-1",
      },
      {
        position: "top-1/4 right-1/4",
        color: "secondary",
        size: "h-48 w-48",
        animation: "animate-orb-drift-2",
      },
    ],
  },
  scattered: {
    orbs: [
      {
        position: "-top-16 left-1/4",
        color: "primary",
        size: "h-[18rem] w-[18rem]",
        animation: "animate-orb-drift-1",
      },
      {
        position: "-bottom-16 right-1/4",
        color: "secondary",
        size: "h-[16rem] w-[16rem]",
        animation: "animate-orb-drift-2",
      },
    ],
  },
};

export function BackgroundGradientOrbs({
  className,
  preset = "scattered",
  primaryColor = "accent-cyan",
  secondaryColor = "accent-purple",
}: BackgroundGradientOrbsProps) {
  const config = presetStyles[preset];

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {config.orbs.map((orb, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full",
            orb.size,
            orb.position,
            orb.animation
          )}
          style={{
            backgroundColor:
              orb.color === "primary"
                ? colorValues[primaryColor]
                : colorValues[secondaryColor],
            opacity: 0.12,
            filter: "blur(80px)",
          }}
        />
      ))}
    </div>
  );
}
