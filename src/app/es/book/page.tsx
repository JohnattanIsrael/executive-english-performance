import { BookPage, miscMetadata } from "@/views/misc";

export const metadata = miscMetadata("book", "es");

export default function Page() {
  return <BookPage locale="es" />;
}
