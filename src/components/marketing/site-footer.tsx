import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { ctas, footerNav, site } from "@/config/site";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Logo inverse />
            <p className="mt-6 font-serif text-xl leading-snug text-paper/90">{site.primaryMessage}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={ctas.assessment.href} variant="inverse" size="sm" trackLocation="footer">
                {ctas.assessment.label}
              </ButtonLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-medium tracking-[0.18em] text-brass-light uppercase">{group.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-[15px] text-paper/70 transition-colors hover:text-paper">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 pt-8 text-sm text-paper/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>The AI communication platform is in development.</span>
            <Link href="/privacy" className="hover:text-paper">
              Privacy
            </Link>
            <Link href="/credits" className="hover:text-paper">
              Photo credits
            </Link>
            <Link href={ctas.proposal.href} className="hover:text-paper">
              Corporate proposals
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
