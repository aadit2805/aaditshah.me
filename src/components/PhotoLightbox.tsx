"use client";

import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

export type LightboxState = { photos: string[]; index: number; label: string };

const btn =
  'absolute flex items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70';

/**
 * Fullscreen image lightbox with viewport-anchored controls and a carousel
 * when more than one photo is passed. Controls: click backdrop / Esc / ✕ to
 * close, ‹ / › or arrow keys to page.
 */
export default function PhotoLightbox({
  state,
  onClose,
  onStep,
}: {
  state: LightboxState | null;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  return (
    <Dialog open={!!state} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') { e.preventDefault(); onStep(-1); }
          if (e.key === 'ArrowRight') { e.preventDefault(); onStep(1); }
        }}
        className="fixed inset-0 z-50 flex h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 items-center justify-center gap-0 rounded-none border-0 bg-transparent p-0 shadow-none [&>button]:hidden"
      >
        {state && (() => {
          const total = state.photos.length;
          const multiple = total > 1;
          const src = state.photos[state.index];
          const alt = `${state.label} (${state.index + 1})`;
          return (
            <div
              className="relative flex h-full w-full items-center justify-center"
              onClick={onClose}
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

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                aria-label="Close"
                className={`${btn} right-3 top-3 h-10 w-10 sm:right-5 sm:top-5`}
              >
                <X className="h-5 w-5" />
              </button>

              {multiple && (
                <>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onStep(-1); }}
                    aria-label="Previous photo"
                    className={`${btn} left-2 top-1/2 h-11 w-11 -translate-y-1/2 sm:left-4`}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onStep(1); }}
                    aria-label="Next photo"
                    className={`${btn} right-2 top-1/2 h-11 w-11 -translate-y-1/2 sm:right-4`}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 font-mono text-xs text-white backdrop-blur-sm">
                    {state.index + 1} / {total}
                  </div>
                </>
              )}
            </div>
          );
        })()}
      </DialogContent>
    </Dialog>
  );
}
