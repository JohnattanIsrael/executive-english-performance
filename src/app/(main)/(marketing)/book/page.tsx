import { BookPage, miscMetadata } from "@/views/misc";

export const metadata = miscMetadata("book", "en");

export default function Page() {
  return <BookPage locale="en" />;
}
