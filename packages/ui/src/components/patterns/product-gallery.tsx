import { useState } from "react";
import { cn } from "../../lib/cn";

export type ProductGalleryImage = {
  id?: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ProductGalleryProps = {
  images: readonly ProductGalleryImage[];
  label: string;
  thumbLabel: (index: number, alt: string) => string;
  activeIndex?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  className?: string;
};

export function ProductGallery({
  images,
  label,
  thumbLabel,
  activeIndex,
  defaultIndex = 0,
  onIndexChange,
  className,
}: ProductGalleryProps) {
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const current = Math.min(activeIndex ?? internalIndex, Math.max(images.length - 1, 0));
  const image = images[current];

  const select = (index: number) => {
    if (activeIndex === undefined) {
      setInternalIndex(index);
    }
    onIndexChange?.(index);
  };

  if (!image) {
    return null;
  }

  return (
    <figure data-slot="product-gallery" className={cn("min-w-0", className)}>
      <div className="border border-rule bg-tint p-2">
        <img
          src={image.src}
          alt={image.alt}
          width={image.width ?? 800}
          height={image.height ?? 600}
          fetchPriority="high"
          className="aspect-[4/3] w-full border border-rule bg-surface object-cover"
        />
      </div>
      <fieldset className="m-0 mt-2 grid grid-cols-4 gap-2 border-0 p-0">
        <legend className="sr-only">{label}</legend>
        {images.map((item, index) => (
          <button
            key={item.id ?? item.src}
            type="button"
            aria-label={thumbLabel(index, item.alt)}
            aria-pressed={index === current}
            onClick={() => select(index)}
            className={cn(
              "border bg-surface p-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-1",
              index === current ? "border-primary" : "border-rule hover:border-rule-strong",
            )}
          >
            <img
              src={item.src}
              alt=""
              width={120}
              height={90}
              loading="lazy"
              className="aspect-[4/3] w-full bg-tint object-cover"
            />
          </button>
        ))}
      </fieldset>
    </figure>
  );
}
