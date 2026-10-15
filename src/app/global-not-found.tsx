import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/marketing/logo";
import { fontClasses } from "@/components/layout/root-document";

export const metadata: Metadata = {
  title: "Page not found · Página no encontrada",
  robots: { index: false, follow: false },
};

const versions = [
  {
    lang: "en",
    title: "This page doesn’t exist.",
    body: "The link may be outdated, or the page may have moved.",
    home: { label: "Go to homepage", href: "/" },
    cta: { label: "Book an Executive Assessment", href: "/book" },
  },
  {
    lang: "es",
    title: "Esta página no existe.",
    body: "Es posible que el enlace esté desactualizado o que la página se haya movido.",
    home: { label: "Ir a la página de inicio", href: "/es" },
    cta: { label: "Reserve una Evaluación Ejecutiva", href: "/es/book" },
  },
];

/**
 * One 404 for the whole static export (GitHub Pages serves a single 404.html),
 * so it speaks both languages. Required with multiple root layouts (spec 001 D1).
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontClasses}>
      <body className="flex min-h-full flex-col">
        <main id="main" className="flex min-h-dvh flex-col items-center justify-center bg-paper px-5 py-16 text-center">
          <Logo />
          <p className="eyebrow mt-14">404</p>
          <div className="mt-4 flex flex-col gap-12">
            {versions.map((v) => (
              <section key={v.lang} lang={v.lang}>
                <h1 className="display text-4xl text-ink md:text-5xl">{v.title}</h1>
                <p className="mx-auto mt-4 max-w-md text-muted">{v.body}</p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Link href={v.home.href} className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-harbor-800">
                    {v.home.label}
                  </Link>
                  <Link
                    href={v.cta.href}
                    className="rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-ink hover:border-ink"
                  >
                    {v.cta.label}
                  </Link>
                </div>
              </section>
            ))}
          </div>
        </main>
      </body>
    </html>
  );
}
