import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/faq";

/** Native <details> accordion — accessible and works without JavaScript. */
export function FaqList({ items }: { items: Pick<FaqItem, "question" | "answer">[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left">
            <h3 className="text-lg font-medium text-ink">{item.question}</h3>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong transition-transform duration-200 group-open:rotate-45">
              <Plus className="size-4 text-ink" aria-hidden />
            </span>
          </summary>
          <p className="max-w-3xl pr-12 pb-6 text-[15.5px] leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
