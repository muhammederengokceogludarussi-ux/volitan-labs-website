import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen items-center justify-center bg-[#0A0A0F] text-[#F0F0F5]">
        <div className="text-center">
          <p className="text-8xl font-bold text-[#9B7BF0]">404</p>
          <h1 className="mt-4 text-2xl font-bold">Page Not Found</h1>
          <p className="mt-2 text-[#8A8A9A]">
            The page you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-[#9B7BF0] px-7 py-3 text-sm font-semibold text-[#0A0A0F] transition-all hover:shadow-lg hover:shadow-[#9B7BF0]/25"
          >
            Go Home
          </Link>
        </div>
      </body>
    </html>
  );
}
