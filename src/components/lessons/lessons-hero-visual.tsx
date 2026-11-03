import { Check, Volume2 } from "lucide-react";
import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";

/** Animated, decorative preview of the lesson player (CSS-only). */
export function LessonsHeroVisual({ locale }: { locale: Locale }) {
  const tiles = ["I’d", "like", "a", "tea,", "please."];
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[520px] select-none">
      {/* Soft color fields */}
      <div className="absolute top-[6%] left-[8%] size-[46%] rounded-full bg-[#dbe6f3] blur-2xl" />
      <div className="absolute right-[4%] bottom-[10%] size-[42%] rounded-full bg-[#ebe5f5] blur-2xl" />
      <div className="absolute right-[18%] top-[14%] size-[24%] rounded-full bg-[#f6ecd9] blur-2xl" />

      {/* Flashcard */}
      <div className="absolute top-[4%] left-[2%] w-[54%] animate-float [animation-duration:7s]">
        <div className="-rotate-6 rounded-[1.75rem] border border-line bg-surface p-6 text-center shadow-[0_30px_60px_-30px_rgb(14_23_38/0.4)]">
          <div className="text-5xl">🌅</div>
          <p className="mt-3 font-serif text-[1.65rem] leading-tight text-ink">Good morning</p>
          {locale === "es" && <p className="mt-1 text-sm text-muted">Buenos días</p>}
          <span className="mt-4 inline-flex size-10 items-center justify-center rounded-full bg-[#2f6aa8] text-white">
            <Volume2 className="size-4" />
          </span>
        </div>
      </div>

      {/* Clock */}
      <div className="absolute top-[10%] right-[4%] w-[34%] animate-float [animation-delay:-2s] [animation-duration:8s]">
        <div className="rotate-6 rounded-[1.5rem] border border-line bg-surface p-4 shadow-[0_30px_60px_-30px_rgb(14_23_38/0.35)]">
          <div className="relative mx-auto aspect-square w-full rounded-full border-2 border-ink/10 bg-[#f6ecd9]/50">
            {Array.from({ length: 12 }, (_, i) => (
              <span
                key={i}
                className="absolute top-1/2 left-1/2 h-[42%] w-px origin-bottom"
                style={{ transform: `translate(-50%, -100%) rotate(${i * 30}deg)` }}
              >
                <span className="block h-[14%] w-full bg-ink/40" />
              </span>
            ))}
            <span className="absolute top-1/2 left-1/2 h-[26%] w-[5px] origin-bottom -translate-x-1/2 -translate-y-full rotate-[100deg] rounded-full bg-ink" />
            <span className="absolute top-1/2 left-1/2 -ml-px h-[38%] w-[3px] -translate-y-full animate-tick rounded-full bg-[#a86a1f]" style={{ transformOrigin: "50% 100%" }} />
            <span className="absolute top-1/2 left-1/2 size-3 -translate-1/2 rounded-full bg-[#a86a1f]" />
          </div>
          <p className="mt-3 text-center text-sm font-medium text-ink-2">It’s half past three.</p>
        </div>
      </div>

      {/* Sentence builder */}
      <div className="absolute right-[2%] bottom-[8%] left-[10%] animate-float [animation-delay:-4s] [animation-duration:9s]">
        <div className="rounded-[1.75rem] border border-line bg-surface p-5 shadow-[0_40px_80px_-30px_rgb(14_23_38/0.45)]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium tracking-[0.14em] text-muted uppercase">{locale === "es" ? "Forme la frase" : "Build the sentence"}</p>
            <span className="h-2 w-24 overflow-hidden rounded-full bg-[#6b4fa3]/15">
              <span className="block h-full w-2/3 rounded-full bg-[#6b4fa3]" />
            </span>
          </div>
          <div className="mt-4 flex min-h-12 flex-wrap gap-2 rounded-xl border-2 border-dashed border-line-strong p-2.5">
            {tiles.map((w, i) => (
              <span
                key={w}
                className="inline-flex h-9 animate-tile-loop items-center rounded-lg border-2 border-[#6b4fa3] bg-[#ebe5f5] px-3 text-[15px] font-medium text-ink"
                style={{ animationDelay: `${i * 0.35}s` } as CSSProperties}
              >
                {w}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-good-soft px-3 py-2.5">
            <span className="flex size-7 items-center justify-center rounded-full bg-good text-white">
              <Check className="size-4" strokeWidth={3} />
            </span>
            <span className="text-sm font-semibold text-good">{locale === "es" ? "¡Excelente!" : "Excellent!"}</span>
          </div>
        </div>
      </div>

      {/* Floating stickers */}
      <span className="absolute top-[50%] left-[0%] animate-float text-4xl [animation-delay:-1s]">☕</span>
      <span className="absolute top-[46%] right-[6%] animate-float text-3xl [animation-delay:-3s]">🎨</span>
      <span className="absolute top-[0%] left-[52%] animate-float text-3xl [animation-delay:-5s]">👋</span>
    </div>
  );
}
