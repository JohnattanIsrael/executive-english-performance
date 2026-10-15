import { AboutPage, aboutMetadata } from "@/views/about";

export const metadata = aboutMetadata("es");

export default function Page() {
  return <AboutPage locale="es" />;
}
