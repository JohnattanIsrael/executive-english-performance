"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-ink text-paper hover:bg-harbor-800 shadow-[0_1px_0_rgb(255_255_255/0.08)_inset]",
  secondary: "border border-line-strong text-ink hover:border-ink hover:bg-surface",
  ghost: "text-ink hover:text-harbor-600",
  inverse: "bg-paper text-ink hover:bg-white",
  "inverse-outline": "border border-paper/25 text-paper hover:border-paper/60 hover:bg-paper/5",
} as const;

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-base",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    variant === "ghost" && "h-auto px-0",
    className,
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize };

export function Button({ variant = "primary", size = "md", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** When set, emits a `cta_clicked` analytics event tagged with this location. */
  trackLocation?: string;
  onClick?: () => void;
};

export function ButtonLink({ href, children, variant = "primary", size = "md", className, trackLocation, onClick }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={buttonClasses(variant, size, className)}
      onClick={() => {
        if (trackLocation) {
          track("cta_clicked", { label: typeof children === "string" ? children : href, location: trackLocation, href });
        }
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}
