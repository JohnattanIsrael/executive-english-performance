import { PageHero } from "@/components/marketing/sections";
import { Photo } from "@/components/ui/photo";
import { Container, Section } from "@/components/ui/primitives";
import { photos } from "@/content/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Photo Credits",
  description: "Credits for the photography used on this website.",
  path: "/credits",
});

export default function CreditsPage() {
  return (
    <>
      <PageHero
        eyebrow="Credits"
        title="Photo credits"
        lead={
          <p>
            Photography on this site is from{" "}
            <a href="https://unsplash.com" className="underline underline-offset-2 hover:text-ink">
              Unsplash
            </a>
            , used under the{" "}
            <a href="https://unsplash.com/license" className="underline underline-offset-2 hover:text-ink">
              Unsplash License
            </a>
            . People pictured are not clients, coaches or staff.
          </p>
        }
      />
      <Section tone="surface">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(photos).map((p) => (
              <li key={p.slug} className="overflow-hidden rounded-2xl border border-line bg-paper">
                <div className="aspect-[4/3]">
                  <Photo photo={p} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
                </div>
                <div className="p-5">
                  <p className="text-sm text-ink-2">{p.alt}</p>
                  <p className="mt-2 text-sm text-muted">
                    Photo by{" "}
                    <a href={p.sourceUrl} className="font-medium text-ink underline underline-offset-2 hover:text-harbor-600">
                      {p.photographer}
                    </a>{" "}
                    on Unsplash
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
