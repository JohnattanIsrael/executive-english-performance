import { CtaBand, PageHero } from "@/components/marketing/sections";
import { Badge, Container, PlaceholderNote, Section, SectionHeading } from "@/components/ui/primitives";
import { founder, methodologyPrinciples } from "@/content/founder";
import { pageMetadata } from "@/lib/seo";
import { asset } from "@/lib/utils";
import { PhotoFrame } from "@/components/ui/photo";
import { photos } from "@/content/photos";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Executive English Performance was founded by an experienced English teacher and coach who has spent years working with professionals and executives. Learn about the founder and the methodology.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        aside={<PhotoFrame photo={photos.glassClouds} sizes="(min-width: 1024px) 560px, 100vw" priority />}
        title="Experience matters when communication has consequences."
        lead={
          <p>
            Executive English Performance exists because strong English and executive communication are different
            skills — and the gap between them shows up exactly when the stakes are highest.
          </p>
        }
      />

      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.2fr]">
          <div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-paper-2">
              {founder.portrait ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={asset(founder.portrait)} alt={founder.name} className="h-full w-full object-cover" />
              ) : (
                <>
                  <div aria-hidden className="absolute inset-0 hairline-grid" />
                  <div className="absolute inset-x-5 bottom-5">
                    <PlaceholderNote>Founder portrait — add professional photography (src/content/founder.ts).</PlaceholderNote>
                  </div>
                </>
              )}
            </div>
          </div>
          <div>
            <p className="eyebrow">The founder</p>
            <h2 className="display mt-4 text-4xl text-ink md:text-5xl">{founder.name}</h2>
            <p className="mt-2 text-lg text-muted">{founder.title}</p>
            <div className="mt-8 flex flex-col gap-5 text-[16.5px] leading-relaxed text-ink-2">
              {founder.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <PlaceholderNote className="mt-6">
              Bracketed text is placeholder content. Replace it with the founder’s real, verifiable background before
              launch — no credentials should be published until confirmed.
            </PlaceholderNote>

            <dl className="mt-10 divide-y divide-line border-y border-line">
              {founder.credentials.map((c) => (
                <div key={c.label} className="grid gap-1 py-4 sm:grid-cols-[220px_1fr] sm:gap-6">
                  <dt className="text-sm text-muted">{c.label}</dt>
                  <dd className="flex flex-wrap items-center gap-2 text-ink">
                    {c.value}
                    {c.placeholder && <Badge tone="caution">Placeholder</Badge>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHeading
            eyebrow="The methodology"
            title="Learned from how professionals actually communicate."
            lead="The approach comes from years of observing professionals in real business settings — not just from teaching grammar."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {methodologyPrinciples.map((p, i) => (
              <div key={p.title} className="rounded-2xl border border-line bg-surface p-7">
                <span className="font-serif text-3xl text-brass">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-xl font-medium text-ink">{p.title}</h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow="Why AI, and why now" title="More practice. Better coaching. Same human judgment." />
          <div className="flex flex-col gap-5 text-[16.5px] leading-relaxed text-ink-2">
            <p>
              The limiting factor in developing executive communication has always been practice: there are only so many
              coaching hours in a week, and real high-stakes moments are rare.
            </p>
            <p>
              We are building an AI practice platform to close that gap — so clients can rehearse realistic conversations
              between sessions, and coaches can see patterns across that practice. The expert remains responsible for
              strategy, interpretation and the feedback that matters most.
            </p>
            <p className="text-muted">The AI platform is in development. Coaching programs are available today.</p>
          </div>
        </Container>
      </Section>

      <CtaBand location="about_footer_cta" />
    </>
  );
}
