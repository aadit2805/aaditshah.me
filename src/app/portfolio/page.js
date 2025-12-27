"use client";

import React from 'react';
import Navbar from '../../components/nav';
import { Card, CardContent } from '@/components/ui/card';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-bone-100">
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center opacity-0 animate-fade-in-up">
          {/* Decorative element */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-bone-400" />
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-bone-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-terracotta-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-bone-400" />
              </div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-bone-400" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-terracotta-400" />
            <span className="text-sm font-medium text-espresso-500 uppercase tracking-wider">
              Portfolio
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-medium text-espresso-900 mb-4">
            Coming Soon
          </h1>

          {/* Placeholder cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-0 animate-fade-in animate-delay-200">
            {[1, 2, 3, 4].map((i) => (
              <Card
                key={i}
                className="bg-bone-50 border-bone-200 border-dashed"
              >
                <CardContent className="p-8">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-bone-200 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-bone-400 border-dashed rounded" />
                    </div>
                    <div className="h-2 w-20 bg-bone-200 rounded" />
                    <div className="h-2 w-16 bg-bone-200 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer note */}
          <footer className="mt-16 opacity-0 animate-fade-in animate-delay-300">
            <p className="text-sm text-espresso-400">
              In the meantime, feel free to check out my{' '}
              <a
                href="https://github.com/aadit2805"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terracotta-500 hover:text-terracotta-600 transition-colors"
              >
                GitHub
              </a>
              .
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
