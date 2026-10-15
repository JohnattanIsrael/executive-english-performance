import { RootDocument, rootViewport } from "@/components/layout/root-document";
import { rootMetadata } from "@/lib/seo";

export const metadata = rootMetadata("en");
export const viewport = rootViewport;

/** Root layout for English pages and the (English-only) app areas. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
