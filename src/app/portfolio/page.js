"use client";

import React from 'react';
import Navbar from '../../components/nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../lib/fontAwesome';
import { useTheme } from '../../hooks/useTheme';

export default function Music() {
  const { mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen transition-colors duration-0">
      <Navbar />
      <main className="flex flex-col items-center justify-center text-center font-inter pt-24"> 
        <div className="w-full max-w-2xl px-4">
          <section className="mb-12">
            <h1 className="text-4xl font-semibold neon-orange-gradient">
             coming soon...
            </h1>
          </section>
        </div>
      </main>
    </div>
  );
}