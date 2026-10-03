"use client";

import { ExternalLink } from "lucide-react";
import { track } from "@/lib/analytics";

/**
 * Inline booking page (e.g. a Google Calendar appointment schedule embedded
 * with its `?gv=true` URL). Bookings happen inside the provider's frame, so
 * they are confirmed by the provider and land directly in the calendar.
 */
export function BookingEmbed({ src, link }: { src: string; link?: string }) {
  return (
    <div className="mt-6">
      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        <iframe
          src={src}
          title="Choose a time for your Executive Assessment"
          className="block h-[760px] w-full border-0 sm:h-[700px]"
          loading="lazy"
        />
      </div>
      {link && (
        <p className="mt-3 text-sm text-muted">
          Calendar not showing?{" "}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-ink underline underline-offset-2"
            onClick={() => track("cta_clicked", { label: "Open booking page", location: "assessment_success_embed", href: link })}
          >
            Open the booking page in a new tab <ExternalLink className="size-3.5" aria-hidden />
          </a>
        </p>
      )}
    </div>
  );
}
