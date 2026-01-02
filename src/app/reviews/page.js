"use client";

import React from 'react';
import TerminalNav from '../../components/TerminalNav';
import MediaRatingSystem from '@/components/MediaRatingSystem';

export default function Reviews() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <TerminalNav currentPage="reviews" />
      <main className="pt-8 pb-20">
        <MediaRatingSystem />
      </main>
    </div>
  );
}
