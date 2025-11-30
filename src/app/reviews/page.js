"use client";

import React from 'react';
import Navbar from '../../components/nav';
import '../../lib/fontAwesome';
import MediaRatingSystem from '@/components/MediaRatingSystem';
import { useTheme } from '../../hooks/useTheme';

export default function Reviews() {
  const { mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar />
      <main className="flex flex-col items-center justify-center text-center font-inter pt-24">
        <MediaRatingSystem />
      </main>
    </div>
  );
}