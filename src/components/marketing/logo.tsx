import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className, inverse }: { className?: string; inverse?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <rect width="32" height="32" rx="8" fill={inverse ? "#f6f4ef" : "#0e1726"} />
      <rect x="8" y="9" width="16" height="2.6" rx="1.3" fill={inverse ? "#0e1726" : "#f6f4ef"} />
      <rect x="8" y="14.7" width="11" height="2.6" rx="1.3" fill="#c9a876" />
      <rect x="8" y="20.4" width="16" height="2.6" rx="1.3" fill={inverse ? "#0e1726" : "#f6f4ef"} />
    </svg>
  );
}

export function Logo({ inverse, className, href = "/" }: { inverse?: boolean; className?: string; href?: string }) {
  return (
    <Link href={href} className={cn("group flex items-center gap-3", className)} aria-label="Executive English Performance — home">
      <LogoMark inverse={inverse} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-serif text-[17px] tracking-[-0.01em]", inverse ? "text-paper" : "text-ink")}>Executive English</span>
        <span className={cn("mt-1 text-[9.5px] font-medium tracking-[0.28em] uppercase", inverse ? "text-brass-light" : "text-brass")}>
          Performance
        </span>
      </span>
    </Link>
  );
}
