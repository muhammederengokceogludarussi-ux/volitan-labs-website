"use client";

import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

interface HackerTextProps {
  text: string;
  className?: string;
}

export function HackerText({ text, className }: HackerTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const handleMouseOver = useCallback(() => {
    const el = spanRef.current;
    if (!el) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    let iteration = 0;
    intervalRef.current = setInterval(() => {
      el.innerText = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < iteration) return text[index];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }
      iteration += 1 / 3;
    }, 30);
  }, [text]);

  return (
    <span
      ref={spanRef}
      onMouseOver={handleMouseOver}
      className={cn("cursor-default font-mono", className)}
    >
      {text}
    </span>
  );
}
