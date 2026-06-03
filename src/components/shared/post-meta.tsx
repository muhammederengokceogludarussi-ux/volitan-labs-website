import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostMetaProps {
  date: string;
  readingTime: number;
  minReadLabel: string;
  locale?: string;
  className?: string;
}

export function PostMeta({
  date,
  readingTime,
  minReadLabel,
  locale = "en",
  className,
}: PostMetaProps) {
  const dateLocale = locale === "tr" ? "tr-TR" : "en-US";
  const formattedDate = new Date(date).toLocaleDateString(dateLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className={cn("flex items-center gap-3 text-xs text-text-muted", className)}>
      <span className="flex items-center gap-1">
        <Calendar className="h-3 w-3" />
        {formattedDate}
      </span>
      <span className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {readingTime} {minReadLabel}
      </span>
    </div>
  );
}
