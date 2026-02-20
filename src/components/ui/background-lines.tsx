import { cn } from "@/lib/utils";

type LineColor = "cyan" | "purple" | "amber";

interface BackgroundLinesProps {
  className?: string;
  color?: LineColor;
}

const colorValues: Record<LineColor, { glow: string; static: string }> = {
  cyan: { glow: "0, 200, 240", static: "0, 200, 240" },
  purple: { glow: "155, 123, 240", static: "155, 123, 240" },
  amber: { glow: "232, 145, 10", static: "232, 145, 10" },
};

const lines = [
  { top: "8%", angle: 20, duration: 42, delay: 0, width: "180%" },
  { top: "24%", angle: -15, duration: 50, delay: -18, width: "170%" },
  { top: "42%", angle: 25, duration: 38, delay: -10, width: "190%" },
  { top: "60%", angle: -20, duration: 55, delay: -30, width: "175%" },
  { top: "78%", angle: 18, duration: 45, delay: -22, width: "185%" },
  { top: "92%", angle: -28, duration: 48, delay: -36, width: "200%" },
];

export function BackgroundLines({
  className,
  color = "cyan",
}: BackgroundLinesProps) {
  const { glow: glowRgb, static: staticRgb } = colorValues[color];

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: line.top,
            left: "-40%",
            width: line.width,
            height: "1px",
            transform: `rotate(${line.angle}deg)`,
            transformOrigin: "center",
          }}
        >
          {/* Static faint line - always visible */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, transparent 5%, rgba(${staticRgb}, 0.03) 25%, rgba(${staticRgb}, 0.04) 50%, rgba(${staticRgb}, 0.03) 75%, transparent 95%)`,
            }}
          />
          {/* Animated glow beam - travels along the line */}
          <div
            className="absolute inset-0 line-glow-travel"
            style={{
              background: `linear-gradient(90deg, transparent 0%, transparent 40%, rgba(${glowRgb}, 0.12) 48%, rgba(${glowRgb}, 0.18) 50%, rgba(${glowRgb}, 0.12) 52%, transparent 60%, transparent 100%)`,
              backgroundSize: "300% 100%",
              animationDuration: `${line.duration}s`,
              animationDelay: `${line.delay}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
