"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function BallparksList({ parks }) {
  const [openId, setOpenId] = useState(null);
  const teamsSeen = new Set(parks.map((p) => p.team)).size;

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
          <div
            key={park.id}
            className="border-b border-dashed border-landing-border"
          >
            {hasPhotos ? (
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : park.id)}
                aria-expanded={isOpen}
                className="group flex w-full items-baseline justify-between py-2 text-left cursor-pointer hover:border-landing-muted"
              >
                {rowInner}
              </button>
            ) : (
              <div className="flex items-baseline justify-between py-2">
                {rowInner}
              </div>
            )}

            {hasPhotos && isOpen && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pb-4 pt-1">
                {park.photos.map((src, idx) => (
                  <a
                    key={idx}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block aspect-square overflow-hidden rounded-md bg-landing-muted/10 hover-lift"
                  >
                    <Image
                      src={src}
                      alt={`${park.name} — ${park.date || 'visit'} (${idx + 1})`}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <p className="font-sans text-xs text-landing-muted pt-3">
        {parks.length} ballparks · {teamsSeen} of 30 MLB teams
      </p>
    </div>
  );
}
