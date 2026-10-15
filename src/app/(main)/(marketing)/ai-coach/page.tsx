import { AiCoachPage, aiCoachMetadata } from "@/views/ai-coach";

export const metadata = aiCoachMetadata("en");

export default function Page() {
  return <AiCoachPage locale="en" />;
}
