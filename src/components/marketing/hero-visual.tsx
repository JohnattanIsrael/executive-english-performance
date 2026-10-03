import { MessageSquareQuote, Play } from "lucide-react";
import { Meter } from "@/components/ui/charts";
import { Badge } from "@/components/ui/primitives";

/**
 * Product preview composed in HTML. Values are illustrative interface
 * content, clearly labeled as a preview of the platform in development.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] animate-rise [animation-delay:150ms]">
      <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2rem] hairline-grid opacity-70 [mask-image:radial-gradient(closest-side,black,transparent)]" />

      <figure className="rounded-2xl border border-line bg-surface p-5 shadow-[0_30px_80px_-30px_rgb(14_23_38/0.25)] sm:p-6">
        <figcaption className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted">Communication profile</p>
            <p className="mt-0.5 text-[15px] font-medium text-ink">Lead clearer executive meetings</p>
          </div>
          <Badge tone="brass">Platform preview</Badge>
        </figcaption>

        <div className="mt-6 grid gap-6 sm:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-4">
            <Meter label="Clarity" value={68} previous={61} size="sm" />
            <Meter label="Response quality" value={63} previous={55} size="sm" />
            <Meter label="Confidence" value={59} previous={52} size="sm" />
            <Meter label="Vocabulary" value={74} previous={72} size="sm" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="rounded-xl bg-paper p-4">
              <p className="text-xs text-muted">This week</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-ink">3 of 5</p>
              <p className="text-xs text-muted">practice sessions</p>
              <div className="mt-3 flex gap-1" aria-hidden>
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className={i <= 3 ? "h-1.5 flex-1 rounded-full bg-data" : "h-1.5 flex-1 rounded-full bg-data-track"} />
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line p-4">
              <p className="text-xs text-muted">Next coaching session</p>
              <p className="mt-1 text-sm font-medium text-ink">Quarterly review rehearsal</p>
              <p className="text-xs text-muted">Thursday · 60 min</p>
            </div>
          </div>
        </div>
      </figure>

      <div className="absolute -bottom-10 -left-4 hidden w-64 rounded-xl border border-line bg-surface p-4 shadow-[0_20px_50px_-20px_rgb(14_23_38/0.3)] sm:block md:-left-8">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-ink text-paper">
            <Play className="size-3.5 translate-x-px" aria-hidden />
          </span>
          <div>
            <p className="text-xs text-muted">Recommended simulation</p>
            <p className="text-sm font-medium text-ink">Handling difficult questions</p>
          </div>
        </div>
      </div>

      <div className="absolute -right-3 -bottom-16 hidden w-60 rounded-xl border border-line bg-surface p-4 shadow-[0_20px_50px_-20px_rgb(14_23_38/0.3)] md:block lg:-right-6">
        <div className="flex items-center gap-2 text-xs text-muted">
          <MessageSquareQuote className="size-3.5 text-brass" aria-hidden />
          Coach note
        </div>
        <p className="mt-2 font-serif text-[15px] leading-snug text-ink">“Lead with the decision. Context second.”</p>
      </div>
    </div>
  );
}
