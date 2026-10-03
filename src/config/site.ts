/**
 * Brand, navigation and contact configuration.
 * Values wrapped in [brackets] are placeholders that must be replaced with
 * real business information before launch (see /admin/content).
 */
export const site = {
  name: "Executive English Performance",
  shortName: "EEP",
  tagline: "Turn strong English into executive-level communication.",
  primaryMessage: "You don't need more English lessons. You need to communicate better when it matters.",
  supportingMessage:
    "Executive English Performance combines experienced human coaching with AI-assisted practice to help professionals prepare for the meetings, presentations, negotiations and conversations that actually matter.",
  description:
    "Executive English coaching for professionals who need to perform, not simply practice. Human expertise, executive coaching and AI-assisted practice for high-stakes business communication.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  contact: {
    email: "[hello@yourdomain.com]",
    location: "[City, Country] · Working with clients internationally",
    responseTime: "We aim to respond within two business days.",
  },
  /** Public booking page (e.g. Google Calendar appointment schedule link). */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  /** Embeddable booking page URL, shown inline after an assessment request. */
  bookingEmbedUrl: process.env.NEXT_PUBLIC_BOOKING_EMBED_URL || "",
  social: {
    linkedin: "",
  },
} as const;

export const ctas = {
  assessment: { label: "Book an Executive Assessment", href: "/book" },
  proposal: { label: "Request a Corporate Proposal", href: "/proposal" },
  earlyAccess: { label: "Join AI Early Access", href: "/ai-coach#early-access" },
} as const;

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const mainNav: NavItem[] = [
  { label: "Executives", href: "/executives", description: "Private coaching for leaders" },
  { label: "Companies", href: "/companies", description: "Programs for leadership teams" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "AI Coach", href: "/ai-coach" },
  { label: "Programs", href: "/programs" },
  { label: "Pricing", href: "/pricing" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Programs",
    items: [
      { label: "For Executives", href: "/executives" },
      { label: "For Companies", href: "/companies" },
      { label: "Programs", href: "/programs" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Approach",
    items: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "AI Communication Coach", href: "/ai-coach" },
      { label: "Self-Assessment", href: "/assessment" },
      { label: "Results", href: "/results" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Client Sign In", href: "/sign-in" },
    ],
  },
];
