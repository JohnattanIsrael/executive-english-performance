"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { localizePath } from "@/i18n/routes";

/** `next/link` that sends internal links to the current language's version of the page. */
export function LocaleLink({ href, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const locale = useLocale();
  return <Link href={localizePath(href, locale)} {...props} />;
}
