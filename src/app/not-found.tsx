import Link from "next/link";
import { Logo } from "@/components/marketing/logo";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-dvh flex-col items-center justify-center bg-paper px-5 text-center">
      <Logo />
      <p className="eyebrow mt-14">404</p>
      <h1 className="display mt-4 text-5xl text-ink">This page doesn’t exist.</h1>
      <p className="mt-4 max-w-md text-muted">The link may be outdated, or the page may have moved.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-harbor-800">
          Go to homepage
        </Link>
        <Link href="/book" className="rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-ink hover:border-ink">
          Book an Executive Assessment
        </Link>
      </div>
    </main>
  );
}
