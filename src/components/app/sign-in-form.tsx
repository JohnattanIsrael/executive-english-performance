"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { describedBy, Field, Input } from "@/components/ui/field";
import { services } from "@/lib/services";

/** Auth-ready sign-in. AuthService.signIn is mocked; swap in a real provider (magic link, OAuth, SSO). */
export function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [pending, setPending] = useState(false);

  return (
    <form
      noValidate
      className="flex flex-col gap-5"
      onSubmit={async (e) => {
        e.preventDefault();
        const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setError("Enter a valid email address.");
          return;
        }
        setError(undefined);
        setPending(true);
        await services.auth.signIn(email);
        router.push("/dashboard");
      }}
    >
      <Field id="email" label="Work email" required error={error}>
        <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" {...describedBy("email", { error })} />
      </Field>
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Opening workspace…" : "Continue"}
      </Button>
      <p className="text-center text-sm text-muted">
        Or explore the{" "}
        <Link href="/company" className="underline underline-offset-2 hover:text-ink">
          company
        </Link>{" "}
        and{" "}
        <Link href="/admin" className="underline underline-offset-2 hover:text-ink">
          admin
        </Link>{" "}
        demo workspaces.
      </p>
    </form>
  );
}
