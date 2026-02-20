import { cn } from "@/lib/utils";

interface BackgroundGridProps {
  className?: string;
  /** Grid cell size in pixels. Default 48 */
  size?: number;
  /** Opacity 0-1. Default 0.5 */
  opacity?: number;
}

export function BackgroundGrid({
  className,
  size = 48,
  opacity = 0.5,
}: BackgroundGridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(var(--color-border) 1px, transparent 1px),
          linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
        opacity,
        maskImage:
          "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
      }}
    />
  );
}
