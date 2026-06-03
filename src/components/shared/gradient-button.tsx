import { cn } from "@/lib/utils";

interface GradientButtonProps {
  children: React.ReactNode;
  href?: string;
  as?: "a" | "button" | "link";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
} as const;

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-primary to-[#C084FC] font-medium text-white shadow-[0_0_20px_rgba(139,108,240,0.3)] transition-all hover:shadow-[0_0_40px_rgba(139,108,240,0.5)] hover:scale-[1.03]";

export function GradientButton({
  children,
  href,
  as = "a",
  size = "md",
  className,
  onClick,
}: GradientButtonProps) {
  const classes = cn(baseClasses, sizeClasses[size], className);

  if (as === "button" || !href) {
    return (
      <button className={classes} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}
