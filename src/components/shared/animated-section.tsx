"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "slide" | "fade" | "scale" | "blur" | "none";
}

const easeOut = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const variantMap = {
  slide: {
    hidden: { opacity: 0, y: 16 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay, ease: easeOut },
    }),
  },
  fade: {
    hidden: { opacity: 0 },
    visible: (delay: number) => ({
      opacity: 1,
      transition: { duration: 0.4, delay, ease: "easeOut" as const },
    }),
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay, ease: easeOut },
    }),
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: (delay: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.5, delay, ease: easeOut },
    }),
  },
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  variant = "slide",
}: AnimatedSectionProps) {
  if (variant === "none") {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
      variants={variantMap[variant]}
      className={className}
    >
      {children}
    </m.div>
  );
}
