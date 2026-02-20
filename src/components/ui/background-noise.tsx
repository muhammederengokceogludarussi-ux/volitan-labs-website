import { cn } from "@/lib/utils";

interface BackgroundNoiseProps {
  className?: string;
  /** Unique ID for the SVG filter (required when multiple instances on same page) */
  id?: string;
  /** Opacity 0-1. Default 0.07 */
  opacity?: number;
}

export function BackgroundNoise({
  className,
  id = "noise",
  opacity = 0.07,
}: BackgroundNoiseProps) {
  const filterId = `noise-filter-${id}`;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter={`url(#${filterId})`}
          style={{ opacity }}
        />
      </svg>
    </div>
  );
}
