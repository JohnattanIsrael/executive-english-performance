import { MarketingShell } from "@/components/marketing/marketing-shell";
import { RootDocument, rootViewport } from "@/components/layout/root-document";
import { rootMetadata } from "@/lib/seo";

export const metadata = rootMetadata("es");
export const viewport = rootViewport;

/** Root layout for the Spanish site (spec 001). */
export default function SpanishRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootDocument locale="es">
      <MarketingShell locale="es">{children}</MarketingShell>
    </RootDocument>
  );
}
