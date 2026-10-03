import type { ComponentProps, ReactNode } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)} {...props} />;
}

export function Section({
  className,
  tone = "paper",
  ...props
}: ComponentProps<"section"> & { tone?: "paper" | "surface" | "ink" | "paper-2" }) {
  const tones = {
    paper: "bg-paper",
    "paper-2": "bg-paper-2",
    surface: "bg-surface",
    ink: "bg-ink text-paper",
  };
  return <section className={cn("py-20 md:py-28", tones[tone], className)} {...props} />;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  inverse,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  inverse?: boolean;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("eyebrow mb-5", inverse && "text-brass-light")}>{eyebrow}</p>}
      <Tag
        className={cn(
          "display text-[2.1rem] leading-[1.08] sm:text-5xl md:text-[3.4rem]",
          inverse ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </Tag>
      {lead && (
        <div className={cn("prose-lead mt-6", inverse && "text-paper/75", align === "center" && "mx-auto")}>{lead}</div>
      )}
    </div>
  );
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("rounded-2xl border border-line bg-surface", className)} {...props} />;
}

const badgeTones = {
  neutral: "border-line bg-paper text-ink-2",
  harbor: "border-harbor-200 bg-harbor-50 text-harbor-700",
  brass: "border-brass-light/50 bg-[#f7f0e3] text-brass",
  good: "border-good/20 bg-good-soft text-good",
  caution: "border-caution/20 bg-caution-soft text-caution",
  inverse: "border-paper/20 bg-paper/5 text-paper/80",
} as const;

export function Badge({
  tone = "neutral",
  className,
  ...props
}: ComponentProps<"span"> & { tone?: keyof typeof badgeTones }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        badgeTones[tone],
        className,
      )}
      {...props}
    />
  );
}

/** Visible label for anything that must be replaced with verified business data. */
export function PlaceholderNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 rounded-lg border border-dashed border-caution/40 bg-caution-soft/60 px-3 py-2 text-xs leading-relaxed text-caution",
        className,
      )}
    >
      <Info aria-hidden className="mt-0.5 size-3.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-0 border-t border-line", className)} />;
}
