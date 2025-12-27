"use client";

import React from 'react';
import Navbar from '../../components/nav';
import MediaRatingSystem from '@/components/MediaRatingSystem';

export default function Reviews() {
  return (
    <div className="min-h-screen bg-bone-100">
      <Navbar />
      <main className="pt-28 pb-20">
        <MediaRatingSystem />
      </main>
    </div>
  );
}
