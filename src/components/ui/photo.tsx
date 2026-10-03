import type { Photo as PhotoData } from "@/content/photos";
import { asset, cn } from "@/lib/utils";

/**
 * Responsive self-hosted photo. Static export disables next/image
 * optimization, so this renders a plain <img> with a srcset of pre-sized WebP
 * files and the deployment base path applied.
 */
export function Photo({
  photo,
  sizes,
  className,
  priority,
  decorative,
}: {
  photo: PhotoData;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Purely atmospheric images get empty alt text. */
  decorative?: boolean;
}) {
  const src = (w: number) => asset(`/images/photos/${photo.slug}-${w}.webp`);
  const largest = photo.widths[photo.widths.length - 1];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src(largest)}
      srcSet={photo.widths.map((w) => `${src(w)} ${w}w`).join(", ")}
      sizes={sizes}
      width={largest}
      height={Math.round(largest / photo.ratio)}
      alt={decorative ? "" : photo.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={cn("h-full w-full object-cover", className)}
    />
  );
}

/** Rounded framed photo used in page heroes and sections. */
export function PhotoFrame({
  photo,
  sizes,
  className,
  priority,
  aspect = "aspect-[4/3]",
  tone = "none",
}: {
  photo: PhotoData;
  sizes: string;
  className?: string;
  priority?: boolean;
  aspect?: string;
  tone?: "none" | "ink";
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-paper-2", aspect, className)}>
      <Photo photo={photo} sizes={sizes} priority={priority} />
      {tone === "ink" && <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/10 to-transparent" />}
    </div>
  );
}
