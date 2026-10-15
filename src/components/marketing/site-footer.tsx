import { ButtonLink } from "@/components/ui/button";
import { LocaleLink } from "@/components/ui/locale-link";
import { Container } from "@/components/ui/primitives";
import { site } from "@/config/site";
import { commonCopy } from "@/content/i18n/common";
import type { Locale } from "@/i18n/config";
import { Logo } from "./logo";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = commonCopy[locale];
  return (
    <footer className="bg-ink text-paper">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Logo inverse />
            <p className="mt-6 font-serif text-xl leading-snug text-paper/90">{t.site.primaryMessage}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={t.ctas.assessment.href} variant="inverse" size="sm" trackLocation="footer">
                {t.ctas.assessment.label}
              </ButtonLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {t.footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-medium tracking-[0.18em] text-brass-light uppercase">{group.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <LocaleLink href={item.href} className="text-[15px] text-paper/70 transition-colors hover:text-paper">
                        {item.label}
                      </LocaleLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 pt-8 text-sm text-paper/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>{t.footer.platformNote}</span>
            <LocaleLink href="/privacy" className="hover:text-paper">
              {t.footer.privacy}
            </LocaleLink>
            <LocaleLink href="/credits" className="hover:text-paper">
              {t.footer.credits}
            </LocaleLink>
            <LocaleLink href={t.ctas.proposal.href} className="hover:text-paper">
              {t.footer.proposals}
            </LocaleLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}
