import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/forms/simple-forms";
import { PageHero } from "@/components/marketing/sections";
import { Container, Section } from "@/components/ui/primitives";
import { ctas, site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact Executive English Performance about executive coaching, corporate programs or AI early access.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s talk about what’s at stake." />
      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-line bg-paper p-7 md:p-9">
            <ContactForm />
          </div>
          <aside className="flex flex-col gap-5">
            <Link href={ctas.assessment.href} className="group rounded-2xl bg-ink p-7 text-paper">
              <p className="text-sm text-paper/60">For individuals</p>
              <p className="mt-2 font-serif text-2xl">{ctas.assessment.label}</p>
              <ArrowRight className="mt-5 size-5 text-brass-light transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link href={ctas.proposal.href} className="group rounded-2xl border border-line bg-surface p-7">
              <p className="text-sm text-muted">For companies</p>
              <p className="mt-2 font-serif text-2xl text-ink">{ctas.proposal.label}</p>
              <ArrowRight className="mt-5 size-5 text-brass transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <div className="rounded-2xl border border-line p-7 text-[15px] text-ink-2">
              <p className="flex items-center gap-3">
                <Mail className="size-4 text-muted" aria-hidden /> {site.contact.email}
              </p>
              <p className="mt-3 flex items-center gap-3">
                <MapPin className="size-4 text-muted" aria-hidden /> {site.contact.location}
              </p>
              <p className="mt-4 text-sm text-muted">{site.contact.responseTime}</p>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
