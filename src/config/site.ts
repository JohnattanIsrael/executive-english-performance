/**
 * Brand and contact configuration.
 * Values wrapped in [brackets] are placeholders that must be replaced with
 * real business information before launch (see /admin/content).
 *
 * Translatable copy (messages, navigation, CTAs) lives in
 * src/content/i18n/common.ts.
 */
export const site = {
  name: "Executive English Performance",
  shortName: "EEP",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  contact: {
    email: "[hello@yourdomain.com]",
  },
  /** Public booking page (e.g. Google Calendar appointment schedule link). */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  /** Embeddable booking page URL, shown inline after an assessment request. */
  bookingEmbedUrl: process.env.NEXT_PUBLIC_BOOKING_EMBED_URL || "",
  social: {
    linkedin: "",
  },
} as const;
