"use client";

import { useState } from 'react';
import Image from 'next/image';
import PhotoLightbox, { type LightboxState } from './PhotoLightbox';

type Child = { id: number; text: string; done?: boolean };
export type SummerItem = {
  id: number;
  text: string;
  done?: boolean;
  photos?: string[];
  children?: Child[];
};

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNlM2RjY2IiLz48L3N2Zz4=';

const Check = ({ className }: { className: string }) => (
  <svg
    viewBox="0 0 16 16"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 8.5 6.5 12 13 4.5" />
  </svg>
);

export default function SummerList({ items }: { items: SummerItem[] }) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const step = (delta: number) =>
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index + delta + lb.photos.length) % lb.photos.length } : lb
    );

  return (
    <div className="space-y-1">
      {items.map((item) => {
        const hasChildren = !!item.children && item.children.length > 0;
        const hasPhotos = !!item.photos && item.photos.length > 0;
        const parentDone = hasChildren ? item.children!.every((c) => c.done) : item.done;
        const isOpen = openId === item.id;

        const row = (
          <div className="flex items-center gap-3 py-2 border-b border-dashed border-landing-border">
            <span
              aria-hidden="true"
              className={`inline-flex h-5 w-5 shrink-0 items-center justify-center border ${
                parentDone
                  ? 'border-landing-secondary bg-landing-muted/10 text-landing-secondary'
                  : 'border-landing-muted'
              }`}
            >
              {parentDone && <Check className="h-3.5 w-3.5" />}
            </span>
            <span
              className={`font-sans font-medium ${
                parentDone ? 'text-landing-muted line-through' : 'text-landing-primary'
              }`}
            >
              {item.text}
            </span>
            {hasPhotos && (
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className={`ml-auto h-3.5 w-3.5 shrink-0 text-landing-muted transition-transform ${
                  isOpen ? 'rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 4 10 8 6 12" />
              </svg>
            )}
          </div>
        );

        return (
          <div key={item.id}>
            {hasPhotos ? (
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                className="group block w-full text-left"
              >
                {row}
              </button>
            ) : (
              row
            )}

            {hasChildren && (
              <div className="pl-8">
                {item.children!.map((child) => (
                  <div key={child.id} className="flex items-center gap-2.5 py-1.5">
                    <span
                      aria-hidden="true"
                      className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center border ${
                        child.done
                          ? 'border-landing-muted bg-landing-muted/10 text-landing-muted'
                          : 'border-landing-muted/60'
                      }`}
                    >
                      {child.done && <Check className="h-2.5 w-2.5" />}
                    </span>
                    <span
                      className={`font-sans text-sm ${
                        child.done ? 'text-landing-muted line-through' : 'text-landing-secondary'
                      }`}
                    >
                      {child.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {hasPhotos && isOpen && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pb-4 pt-1 pl-8">
                {item.photos!.map((src, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      setLightbox({ photos: item.photos ?? [], index: idx, label: item.text })
                    }
                    aria-label={`View photo: ${item.text} (${idx + 1})`}
                    className="relative block aspect-square overflow-hidden rounded-md bg-landing-muted/10 hover-lift cursor-zoom-in"
                  >
                    <Image
                      src={src}
                      alt={`${item.text} (${idx + 1})`}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      quality={70}
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <PhotoLightbox state={lightbox} onClose={() => setLightbox(null)} onStep={step} />
    </div>
  );
}
