import type { AnalyticsEventName, AnalyticsEvents } from "./events";

export type { AnalyticsEventName, AnalyticsEvents } from "./events";

/**
 * Provider-agnostic analytics. Choose a provider with
 * NEXT_PUBLIC_ANALYTICS_PROVIDER (none | console | ga4 | plausible | posthog).
 * Script loading for each provider lives in components/analytics/analytics-scripts.tsx.
 */
export type AnalyticsProvider = "none" | "console" | "ga4" | "plausible" | "posthog";

export const analyticsConfig = {
  provider: (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "console") as AnalyticsProvider,
  ga4Id: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "",
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "",
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY || "",
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
};

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: Props) => void;
    plausible?: (name: string, options?: { props?: Props }) => void;
    posthog?: { capture: (name: string, props?: Props) => void };
  }
}

export function track<E extends AnalyticsEventName>(event: E, properties: AnalyticsEvents[E]) {
  if (typeof window === "undefined") return;
  const props = properties as unknown as Props;
  try {
    switch (analyticsConfig.provider) {
      case "ga4":
        window.gtag?.("event", event, props);
        break;
      case "plausible":
        window.plausible?.(event, { props });
        break;
      case "posthog":
        window.posthog?.capture(event, props);
        break;
      case "console":
        if (process.env.NODE_ENV !== "production") console.info(`[analytics] ${event}`, props);
        break;
      case "none":
        break;
    }
  } catch {
    /* analytics must never break the page */
  }
}
