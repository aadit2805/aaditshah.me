"use client";

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { Park } from '@/types/content';

type Lightbox = { photos: string[]; index: number; name: string; date?: string };

// Tiny warm-toned placeholder so photos fade in instead of popping.
const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNlM2RjY2IiLz48L3N2Zz4=';

export default function BallparksList({ parks }: { parks: Park[] }) {
  const [openId, setOpenId] = useState<Park['id'] | null>(null);
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);
  const teamsSeen = new Set(parks.map((p) => p.team)).size;

  const step = (delta: number) =>
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index + delta + lb.photos.length) % lb.photos.length } : lb
    );

  return (
    <div className="space-y-1">
      {parks.map((park, i) => {
        const hasPhotos = park.photos && park.photos.length > 0;
        const isOpen = openId === park.id;

        const rowInner = (
          <>
            <div className="flex items-baseline gap-4 min-w-0">
              <span className="font-mono text-sm text-landing-muted shrink-0 tabular-nums">
                {i + 1}
              </span>
              <span
                className={`font-sans font-medium text-landing-primary shrink-0 ${
                  hasPhotos ? 'group-hover:text-landing-hover transition-colors' : ''
                }`}
              >
                {park.name}
              </span>
              <span className="hidden sm:inline font-sans text-landing-muted text-sm truncate">
                {park.team} · {park.city}
              </span>
            </div>
            <span className="flex items-center gap-2 shrink-0 ml-4">
              {park.date && (
                <span className="font-mono text-sm text-landing-muted">{park.date}</span>
              )}
              {hasPhotos && (
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className={`h-3.5 w-3.5 text-landing-muted transition-transform ${
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
            </span>
          </>
        );

        return (
          <div key={park.id}>
            {hasPhotos ? (
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : park.id)}
                aria-expanded={isOpen}
                className="group flex w-full items-baseline justify-between py-2 text-left cursor-pointer border-b border-dashed border-landing-border hover:border-landing-muted transition-colors"
              >
                {rowInner}
              </button>
            ) : (
              <div className="flex items-baseline justify-between py-2 border-b border-dashed border-landing-border">
                {rowInner}
              </div>
            )}

            {hasPhotos && isOpen && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pb-4 pt-1">
                {park.photos?.map((src, idx) => {
                  const alt = `${park.name} — ${park.date || 'visit'} (${idx + 1})`;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setLightbox({
                          photos: park.photos ?? [],
                          index: idx,
                          name: park.name,
                          date: park.date,
                        })
                      }
                      aria-label={`View photo: ${alt}`}
                      className="relative block aspect-square overflow-hidden rounded-md bg-landing-muted/10 hover-lift cursor-zoom-in"
                    >
                      <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        quality={70}
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      <p className="font-sans text-xs text-landing-muted pt-3">
        {parks.length} ballparks · {teamsSeen} of 30 MLB teams
      </p>

      <Dialog open={!!lightbox} onOpenChange={(open) => { if (!open) setLightbox(null); }}>
        <DialogContent
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
            if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
          }}
          className="max-w-[96vw] sm:max-w-5xl border-0 bg-transparent p-0 shadow-none [&>button]:hidden"
        >
          {lightbox && (() => {
            const total = lightbox.photos.length;
            const multiple = total > 1;
            const src = lightbox.photos[lightbox.index];
            const alt = `${lightbox.name} — ${lightbox.date || 'visit'} (${lightbox.index + 1})`;
            return (
              <div className="relative">
                <DialogTitle className="sr-only">{alt}</DialogTitle>

                <div className="relative mx-auto h-[82vh] w-full">
                  <Image
                    key={src}
                    src={src}
                    alt={alt}
                    fill
                    sizes="96vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="rounded-lg object-contain"
                  />
                </div>

                {/* Close */}
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  aria-label="Close"
                  className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75"
                >
                  <X className="h-5 w-5" />
                </button>

                {multiple && (
                  <>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous photo"
                      className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next photo"
                      className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 font-mono text-xs text-white">
                      {lightbox.index + 1} / {total}
                    </div>
                  </>
                )}
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
