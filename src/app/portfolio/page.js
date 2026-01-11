"use client";

import React from 'react';
import TerminalNav from '../../components/TerminalNav';
import ProjectShowcase from '../../components/ProjectShowcase';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <TerminalNav currentPage="portfolio" />

      <main className="relative z-10 py-24">
        <ProjectShowcase />
      </main>
    </div>
  );
}
