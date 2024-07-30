"use client";

import React from 'react';
import Navbar from '../../components/nav';
import '../../lib/fontAwesome';
import MediaRatingSystem from '@/components/MediaRatingSystem';
import { useTheme } from '../../hooks/useTheme';

export default function Reviews() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="flex flex-col items-center justify-center text-center font-inter pt-24">
        <MediaRatingSystem theme={theme} />
      </main>
    </div>
  );
}