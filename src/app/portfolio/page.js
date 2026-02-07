"use client";

import React from 'react';
import MinimalNav from '../../components/MinimalNav';
import ProjectShowcase from '../../components/ProjectShowcase';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-landing-bg">
      <MinimalNav currentPage="projects" />
      <main>
        <ProjectShowcase />
      </main>
    </div>
  );
}
