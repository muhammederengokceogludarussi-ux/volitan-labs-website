import { cn } from "@/lib/utils";

interface BackgroundGridProps {
  variant?: "dots" | "lines";
  className?: string;
}

export function BackgroundGrid({
  variant = "dots",
  className,
}: BackgroundGridProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10",
        variant === "dots" ? "bg-grid-dots" : "bg-grid-lines",
        className
      )}
    />
  );
}
