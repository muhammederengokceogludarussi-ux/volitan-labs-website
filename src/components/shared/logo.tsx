"use client";

import { useId } from "react";

interface LogoIconProps {
  className?: string;
  size?: number;
}

export function LogoIcon({ className, size = 32 }: LogoIconProps) {
  const id = useId();
  const gradientId = `vl-grad-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="3"
          y1="6"
          x2="29"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00C8F0" />
          <stop offset="1" stopColor="#9B7BF0" />
        </linearGradient>
      </defs>
      <path
        d="M3 6L16 28L29 6H22L16 19L10 6H3Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}
