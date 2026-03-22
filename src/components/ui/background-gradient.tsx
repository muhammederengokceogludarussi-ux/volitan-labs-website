import { cn } from "@/lib/utils";

interface BackgroundGradientProps {
  className?: string;
  position?: "top-right" | "center" | "bottom-left";
}

export function BackgroundGradient({
  className,
  position = "top-right",
}: BackgroundGradientProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]",
        "bg-accent-primary",
        position === "top-right" && "right-[-10%] top-[-10%]",
        position === "center" && "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        position === "bottom-left" && "bottom-[-10%] left-[-10%]",
        className
      )}
    />
  );
}
