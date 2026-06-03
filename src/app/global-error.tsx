"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[#0A0A0F] text-[#F0F0F5]">
        <div className="text-center px-4">
          <p className="text-8xl font-bold text-[#8B6CF0]">!</p>
          <h1 className="mt-4 text-2xl font-bold">
            Something went wrong / Bir şeyler ters gitti
          </h1>
          <p className="mt-2 text-[#8A8A9A]">
            An unexpected error occurred. Please try again.
            <br />
            Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
          </p>
          {error.digest && (
            <p className="mt-2 font-mono text-xs text-[#5A5A6A]">
              Ref: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            className="mt-6 inline-block rounded-full bg-[#8B6CF0] px-7 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-[#8B6CF0]/25"
          >
            Try Again / Tekrar Dene
          </button>
        </div>
      </body>
    </html>
  );
}
