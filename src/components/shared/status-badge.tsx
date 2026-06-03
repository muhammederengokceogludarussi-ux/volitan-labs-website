import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
}

const variantClasses = {
  primary: "bg-accent-primary/10 text-accent-primary",
  secondary: "bg-accent-secondary/10 text-accent-secondary",
} as const;

export function StatusBadge({
  label,
  variant = "primary",
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      <Sparkles className="h-3 w-3" />
      {label}
    </span>
  );
}
