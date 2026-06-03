import { cn } from "@/lib/utils";

interface TagListProps {
  tags: string[];
  variant?: "accent" | "glass" | "muted";
  className?: string;
}

const variantClasses = {
  accent: "rounded-full bg-accent-primary/10 px-2.5 py-0.5 text-xs font-medium text-accent-primary",
  glass: "glass rounded-full px-3 py-1 text-sm text-text-secondary",
  muted: "bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-0.5 text-xs text-text-muted",
} as const;

export function TagList({ tags, variant = "accent", className }: TagListProps) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {tags.map((tag) => (
        <span key={tag} className={variantClasses[variant]}>
          {tag}
        </span>
      ))}
    </div>
  );
}
