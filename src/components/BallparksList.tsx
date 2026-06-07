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
          className="fixed inset-0 z-50 flex h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 items-center justify-center gap-0 rounded-none border-0 bg-transparent p-0 shadow-none [&>button]:hidden"
        >
          {lightbox && (() => {
            const total = lightbox.photos.length;
            const multiple = total > 1;
            const src = lightbox.photos[lightbox.index];
            const alt = `${lightbox.name} — ${lightbox.date || 'visit'} (${lightbox.index + 1})`;
            const btn =
              'absolute flex items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70';
            return (
              <div
                className="relative flex h-full w-full items-center justify-center"
                onClick={() => setLightbox(null)}
              >
                <DialogTitle className="sr-only">{alt}</DialogTitle>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={src}
                  src={src}
                  alt={alt}
                  onClick={(e) => e.stopPropagation()}
                  className="max-h-[92dvh] max-w-[94vw] select-none rounded-lg object-contain"
                />

                {/* Close — anchored to the viewport corner */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
                  aria-label="Close"
                  className={`${btn} right-3 top-3 h-10 w-10 sm:right-5 sm:top-5`}
                >
                  <X className="h-5 w-5" />
                </button>

                {multiple && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); step(-1); }}
                      aria-label="Previous photo"
                      className={`${btn} left-2 top-1/2 h-11 w-11 -translate-y-1/2 sm:left-4`}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); step(1); }}
                      aria-label="Next photo"
                      className={`${btn} right-2 top-1/2 h-11 w-11 -translate-y-1/2 sm:right-4`}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 font-mono text-xs text-white backdrop-blur-sm">
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
