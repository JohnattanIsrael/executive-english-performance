/** Smaller marketing pages: FAQ, contact, privacy, credits, book, proposal, self-assessment. */
import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { SelfAssessment } from "@/components/assessment/self-assessment";
import { CorporateInquiryForm } from "@/components/forms/corporate-inquiry-form";
import { ExecutiveAssessmentForm } from "@/components/forms/executive-assessment-form";
import { ContactForm } from "@/components/forms/simple-forms";
import { FaqList } from "@/components/marketing/faq-list";
import { CtaBand, PageHero } from "@/components/marketing/sections";
import { LocaleLink } from "@/components/ui/locale-link";
import { Photo, PhotoFrame } from "@/components/ui/photo";
import { Container, JsonLd, PlaceholderNote, Section } from "@/components/ui/primitives";
import { site } from "@/config/site";
import { faqContent, type FaqItem } from "@/content/faq";
import { commonCopy } from "@/content/i18n/common";
import { miscCopy } from "@/content/pages/misc";
import { photoAlt, photos } from "@/content/photos";
import type { Locale } from "@/i18n/config";
import { services } from "@/lib/services";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

type Page = keyof typeof miscCopy.en;

const paths: Record<Page, string> = {
  faq: "/faq",
  contact: "/contact",
  privacy: "/privacy",
  credits: "/credits",
  book: "/book",
  proposal: "/proposal",
  assessment: "/assessment",
};

export function miscMetadata(page: Page, locale: Locale): Metadata {
  const { title, description } = miscCopy[locale][page].meta;
  return pageMetadata({ title, description, path: paths[page], locale });
}

/* ---------------------------------------------------------------------- FAQ */

const faqGroups: FaqItem["group"][] = ["approach", "ai", "programs", "companies"];

export function FaqPage({ locale }: { locale: Locale }) {
  const t = miscCopy[locale].faq;
  const faqs = faqContent[locale];
  return (
    <>
      <JsonLd data={faqJsonLd(faqs, locale)} />
      <PageHero eyebrow={t.eyebrow} title={t.title} />
      <Section tone="surface">
        <Container className="flex flex-col gap-16">
          {faqGroups.map((g) => (
            <div key={g} className="grid gap-6 lg:grid-cols-[1fr_2.2fr]">
              <h2 className="font-serif text-2xl text-ink">{t.groups[g]}</h2>
              <FaqList items={faqs.filter((f) => f.group === g)} />
            </div>
          ))}
        </Container>
      </Section>
      <CtaBand locale={locale} location="faq_footer_cta" />
    </>
  );
}

/* ------------------------------------------------------------------ Contact */

export function ContactPage({ locale }: { locale: Locale }) {
  const t = miscCopy[locale].contact;
  const common = commonCopy[locale];
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} />
      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-line bg-paper p-7 md:p-9">
            <ContactForm />
          </div>
          <aside className="flex flex-col gap-5">
            <LocaleLink href={common.ctas.assessment.href} className="group rounded-2xl bg-ink p-7 text-paper">
              <p className="text-sm text-paper/60">{t.individuals}</p>
              <p className="mt-2 font-serif text-2xl">{common.ctas.assessment.label}</p>
              <ArrowRight className="mt-5 size-5 text-brass-light transition-transform group-hover:translate-x-1" aria-hidden />
            </LocaleLink>
            <LocaleLink href={common.ctas.proposal.href} className="group rounded-2xl border border-line bg-surface p-7">
              <p className="text-sm text-muted">{t.companies}</p>
              <p className="mt-2 font-serif text-2xl text-ink">{common.ctas.proposal.label}</p>
              <ArrowRight className="mt-5 size-5 text-brass transition-transform group-hover:translate-x-1" aria-hidden />
            </LocaleLink>
            <div className="rounded-2xl border border-line p-7 text-[15px] text-ink-2">
              <p className="flex items-center gap-3">
                <Mail className="size-4 text-muted" aria-hidden /> {site.contact.email}
              </p>
              <p className="mt-3 flex items-center gap-3">
                <MapPin className="size-4 text-muted" aria-hidden /> {common.site.location}
              </p>
              <p className="mt-4 text-sm text-muted">{common.site.responseTime}</p>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------ Privacy */

export function PrivacyPage({ locale }: { locale: Locale }) {
  const t = miscCopy[locale].privacy;
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} />
      <Section tone="surface">
        <Container className="max-w-3xl">
          <PlaceholderNote>{t.draft}</PlaceholderNote>
          <div className="mt-10 flex flex-col gap-10">
            {t.sections.map((s) => (
              <section key={s.title}>
                <h2 className="font-serif text-2xl text-ink">{s.title}</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{s.body}</p>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------ Credits */

export function CreditsPage({ locale }: { locale: Locale }) {
  const t = miscCopy[locale].credits;
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        lead={
          <p>
            {t.lead.before}{" "}
            <a href="https://unsplash.com" className="underline underline-offset-2 hover:text-ink">
              {t.lead.unsplash}
            </a>
            {t.lead.middle}{" "}
            <a href="https://unsplash.com/license" className="underline underline-offset-2 hover:text-ink">
              {t.lead.license}
            </a>
            {t.lead.after}
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
                  <p className="text-sm text-ink-2">{photoAlt(p, locale)}</p>
                  <p className="mt-2 text-sm text-muted">
                    {t.photoBy}{" "}
                    <a href={p.sourceUrl} className="font-medium text-ink underline underline-offset-2 hover:text-harbor-600">
                      {p.photographer}
                    </a>{" "}
                    {t.on}
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

/* --------------------------------------------------------------------- Book */

export function BookPage({ locale }: { locale: Locale }) {
  const t = miscCopy[locale].book;
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={<p>{t.lead}</p>} />
      <Section tone="surface" className="pt-14 md:pt-16">
        <Container className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8 md:p-10">
            <Suspense>
              <ExecutiveAssessmentForm />
            </Suspense>
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <PhotoFrame photo={photos.notebookPens} sizes="(min-width: 1024px) 400px, 100vw" aspect="aspect-[16/10]" className="mb-10" />
            <p className="eyebrow">{t.nextTitle}</p>
            <ol className="mt-6 flex flex-col gap-7">
              {t.steps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[40px_1fr] gap-3">
                  <span className="font-serif text-2xl text-brass">{i + 1}</span>
                  <div>
                    <p className="font-medium text-ink">{s.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-10 border-t border-line pt-6 text-sm leading-relaxed text-muted">{t.privacy}</p>
          </aside>
        </Container>
      </Section>
    </>
  );
}

/* ----------------------------------------------------------------- Proposal */

export function ProposalPage({ locale }: { locale: Locale }) {
  const t = miscCopy[locale].proposal;
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={<p>{t.lead}</p>} />
      <Section tone="surface" className="pt-14 md:pt-16">
        <Container className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8 md:p-10">
            <Suspense>
              <CorporateInquiryForm />
            </Suspense>
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">{t.coversTitle}</p>
            <ul className="mt-6 flex flex-col divide-y divide-line border-y border-line">
              {t.covers.map((i) => (
                <li key={i} className="py-3.5 text-[15px] text-ink">
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-muted">{t.nextStep}</p>
          </aside>
        </Container>
      </Section>
    </>
  );
}

/* ---------------------------------------------------------- Self-assessment */

export async function AssessmentPage({ locale }: { locale: Locale }) {
  const t = miscCopy[locale].assessment;
  const questions = await services.assessment.getQuestions(locale);
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={<p>{t.lead}</p>} />
      <Section tone="paper" className="pt-12 md:pt-16">
        <Container className="max-w-4xl">
          <SelfAssessment questions={questions} context="public" />
        </Container>
      </Section>
    </>
  );
}
