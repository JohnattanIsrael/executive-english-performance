import { PricingPage, pricingMetadata } from "@/views/pricing";

export const metadata = pricingMetadata("en");

export default function Page() {
  return <PricingPage locale="en" />;
}
