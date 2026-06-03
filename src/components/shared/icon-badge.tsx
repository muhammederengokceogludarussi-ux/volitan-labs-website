import { cn } from "@/lib/utils";

interface IconBadgeProps {
  icon: React.ComponentType<{ className?: string }>;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { container: "h-8 w-8", icon: "h-4 w-4" },
  md: { container: "h-10 w-10", icon: "h-5 w-5" },
  lg: { container: "h-12 w-12", icon: "h-6 w-6" },
} as const;

export function IconBadge({
  icon: Icon,
  size = "md",
  interactive = true,
  className,
}: IconBadgeProps) {
  const { container, icon } = sizeMap[size];

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-gradient-to-br from-accent-primary/20 to-accent-primary/5 border border-accent-primary/10 transition-all",
        interactive &&
          "group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(139,108,240,0.2)]",
        container,
        className
      )}
    >
      <Icon className={cn("text-accent-primary", icon)} />
    </div>
  );
}
