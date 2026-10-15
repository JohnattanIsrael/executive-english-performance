import { PricingPage, pricingMetadata } from "@/views/pricing";

export const metadata = pricingMetadata("es");

export default function Page() {
  return <PricingPage locale="es" />;
}
