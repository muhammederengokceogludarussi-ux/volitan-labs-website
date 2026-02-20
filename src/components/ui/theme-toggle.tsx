"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[22px] w-[44px]" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="theme-switch"
    >
      {/* Track */}
      <span className="theme-switch__track" />

      {/* Thumb */}
      <span className="theme-switch__thumb" />

      {/* Sun icon */}
      <svg
        className="theme-switch__icon theme-switch__icon--light"
        viewBox="0 0 12 12"
        width="12"
        height="12"
        aria-hidden="true"
      >
        <circle cx="6" cy="6" r="2" fill="none" stroke="currentColor" strokeWidth="1" />
        <polyline
          points="6,0.5 6,1.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="1.5"
          strokeDashoffset="0"
        />
        <polyline
          points="6,10.5 6,11.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="1.5"
          strokeDashoffset="0"
        />
        <polyline
          points="1.11,3.5 1.97,4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="1.5"
          strokeDashoffset="0"
        />
        <polyline
          points="10.03,8 10.89,8.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="1.5"
          strokeDashoffset="0"
        />
        <polyline
          points="1.11,8.5 1.97,8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="1.5"
          strokeDashoffset="0"
        />
        <polyline
          points="10.03,4 10.89,3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="1.5"
          strokeDashoffset="0"
        />
        <polyline
          points="0.5,6 1.5,6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="1.5"
          strokeDashoffset="0"
        />
        <polyline
          points="10.5,6 11.5,6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="1.5"
          strokeDashoffset="0"
        />
      </svg>

      {/* Moon icon */}
      <svg
        className="theme-switch__icon theme-switch__icon--dark"
        viewBox="0 0 12 12"
        width="12"
        height="12"
        aria-hidden="true"
      >
        <path
          d="M5 1a5 5 0 1 0 5.5 7.5A4 4 0 0 1 5 1z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
