import { cn } from "@/lib/utils";

interface BackgroundDotsProps {
  className?: string;
  /** Spacing between dots in pixels. Default 24 */
  spacing?: number;
  /** Dot radius in pixels. Default 1.2 */
  size?: number;
  /** Opacity 0-1. Default 0.35 */
  opacity?: number;
}

export function BackgroundDots({
  className,
  spacing = 24,
  size = 1.2,
  opacity = 0.35,
}: BackgroundDotsProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      style={{
        backgroundImage: `radial-gradient(circle, var(--color-text-muted) ${size}px, transparent ${size}px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
        opacity,
        maskImage:
          "radial-gradient(ellipse 90% 80% at 50% 50%, black 50%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 90% 80% at 50% 50%, black 50%, transparent 100%)",
      }}
    />
  );
}
