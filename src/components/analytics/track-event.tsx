"use client";

import { useEffect } from "react";
import { track, type AnalyticsEventName, type AnalyticsEvents } from "@/lib/analytics";

/** Fires a single analytics event when the page mounts (e.g. landing_page_view, pricing_viewed). */
export function TrackOnMount<E extends AnalyticsEventName>({ event, properties }: { event: E; properties: AnalyticsEvents[E] }) {
  useEffect(() => {
    track(event, properties);
    // Fire once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
