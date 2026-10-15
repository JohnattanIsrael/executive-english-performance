import { HomePage, homeMetadata } from "@/views/home";

export const metadata = homeMetadata("es");

export default function Page() {
  return <HomePage locale="es" />;
}
