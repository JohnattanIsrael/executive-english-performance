import type { Metadata } from "next";
import Link from "next/link";
import { SignInForm } from "@/components/app/sign-in-form";
import { Logo } from "@/components/marketing/logo";
import { PlaceholderNote } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <main id="main" className="relative flex min-h-dvh flex-col items-center justify-center bg-paper px-5 py-16">
      <div aria-hidden className="absolute inset-0 hairline-grid [mask-image:radial-gradient(closest-side,black,transparent)]" />
      <div className="relative w-full max-w-md">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="mt-10 rounded-2xl border border-line bg-surface p-7 shadow-[0_30px_80px_-40px_rgb(14_23_38/0.3)] md:p-9">
          <h1 className="font-serif text-3xl text-ink">Client sign in</h1>
          <p className="mt-2 text-[15px] text-muted">Access your practice, progress and coaching.</p>
          <div className="mt-7">
            <SignInForm />
          </div>
        </div>
        <PlaceholderNote className="mt-5">
          Authentication is not connected yet. Continuing opens the demo client workspace with sample data.
        </PlaceholderNote>
        <p className="mt-8 text-center text-sm text-muted">
          Not a client yet?{" "}
          <Link href="/book" className="font-medium text-ink underline underline-offset-2">
            Book an Executive Assessment
          </Link>
        </p>
      </div>
    </main>
  );
}
