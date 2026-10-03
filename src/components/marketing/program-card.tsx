"use client";

import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/primitives";
import { track } from "@/lib/analytics";
import type { Program } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

export function ProgramCard({
  program,
  location,
  compact,
  emphasis,
}: {
  program: Program;
  location: string;
  compact?: boolean;
  emphasis?: boolean;
}) {
  const price = formatPrice(program.price);
  const items = compact ? program.includes.slice(0, 5) : program.includes;
  const dark = emphasis;

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border p-7 md:p-8",
        dark ? "border-ink bg-ink text-paper" : "border-line bg-surface",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className={cn("text-xs font-medium tracking-[0.16em] uppercase", dark ? "text-brass-light" : "text-brass")}>
          {program.duration}
        </span>
        {program.status === "coming_soon" && <Badge tone={dark ? "inverse" : "brass"}>In development</Badge>}
        {program.featured && !dark && <Badge tone="harbor">Flagship</Badge>}
        {program.featured && dark && <Badge tone="inverse">Flagship</Badge>}
      </div>
      <h3 className={cn("mt-4 font-serif text-[1.7rem] leading-tight", dark ? "text-paper" : "text-ink")}>{program.name}</h3>
      <p className={cn("mt-2 text-[15px] leading-relaxed", dark ? "text-paper/70" : "text-muted")}>{program.tagline}</p>

      <div className={cn("mt-7 border-t pt-6", dark ? "border-paper/15" : "border-line")}>
        <p className={cn("text-[1.65rem] font-semibold tracking-tight", dark ? "text-paper" : "text-ink")}>
          {price.amount}
          {price.period && <span className={cn("ml-1 text-base font-normal", dark ? "text-paper/60" : "text-muted")}>/ {price.period}</span>}
        </p>
        {program.priceNote && <p className={cn("mt-1 text-[13px]", dark ? "text-paper/55" : "text-muted")}>{program.priceNote}</p>}
      </div>

      <ul className="mt-7 flex flex-1 flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className={cn("flex gap-3 text-[14.5px]", dark ? "text-paper/80" : "text-ink-2")}>
            <Check className={cn("mt-0.5 size-4 shrink-0", dark ? "text-brass-light" : "text-data")} aria-hidden />
            {item}
          </li>
        ))}
        {compact && program.includes.length > items.length && (
          <li className={cn("pl-7 text-[13px]", dark ? "text-paper/55" : "text-muted")}>
            + {program.includes.length - items.length} more included
          </li>
        )}
      </ul>

      <ButtonLink
        href={program.cta.href}
        variant={dark ? "inverse" : program.status === "coming_soon" ? "secondary" : "primary"}
        className="mt-8 w-full"
        onClick={() => track("pricing_tier_clicked", { tier: program.slug, audience: program.audience, location })}
      >
        {program.cta.label}
      </ButtonLink>
    </article>
  );
}
