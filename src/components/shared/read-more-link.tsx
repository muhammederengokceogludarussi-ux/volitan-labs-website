import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReadMoreLinkProps {
  label: string;
  className?: string;
}

export function ReadMoreLink({ label, className }: ReadMoreLinkProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 text-sm font-medium text-accent-primary",
        className
      )}
    >
      {label}
      <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
    </div>
  );
}
