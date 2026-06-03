"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();
  const isTR = locale === "tr";

  useEffect(() => {
    console.error("[LocaleError]", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-accent-primary">!</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-text-primary">
        {isTR ? "Bir şeyler ters gitti" : "Something went wrong"}
      </h1>
      <p className="mt-2 max-w-md text-text-secondary">
        {isTR
          ? "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin."
          : "An unexpected error occurred. Please try again."}
      </p>
      {error.digest && (
        <p className="mt-2 font-mono text-xs text-text-muted">
          Ref: {error.digest}
        </p>
      )}
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-gradient-to-r from-accent-primary to-[#C084FC] px-7 py-3 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(139,108,240,0.3)]"
      >
        {isTR ? "Tekrar Dene" : "Try Again"}
      </button>
    </div>
  );
}
