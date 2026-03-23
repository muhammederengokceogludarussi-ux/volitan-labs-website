import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen items-center justify-center bg-[#0A0A0F] text-[#F0F0F5]">
        <div className="text-center">
          <p className="text-8xl font-bold text-[#8B6CF0]">404</p>
          <h1 className="mt-4 text-2xl font-bold">
            Page Not Found / Sayfa Bulunamadı
          </h1>
          <p className="mt-2 text-[#8A8A9A]">
            The page you are looking for does not exist.
            <br />
            Aradığınız sayfa mevcut değil.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/en"
              className="inline-block rounded-full bg-[#8B6CF0] px-7 py-3 text-sm font-semibold text-white transition-[background-color,box-shadow] duration-200 hover:shadow-lg hover:shadow-[#8B6CF0]/25"
            >
              Go Home
            </Link>
            <Link
              href="/tr"
              className="inline-block rounded-full border border-[#8B6CF0]/30 px-7 py-3 text-sm font-semibold text-[#8B6CF0] transition-all duration-200 hover:bg-[#8B6CF0]/10"
            >
              Ana Sayfaya Git
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
