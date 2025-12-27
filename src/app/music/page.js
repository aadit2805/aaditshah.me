"use client";

import React from 'react';
import Navbar from '../../components/nav';
import { Card, CardContent } from '@/components/ui/card';

export default function Music() {
  return (
    <div className="min-h-screen bg-bone-100 overflow-hidden">
      <div className="grain" />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-1 opacity-30" />
      </div>

      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-espresso-900 mb-3">
            Music
          </h1>
          <p className="text-espresso-500">
            What I've been listening to lately.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Recently Played */}
          <Card className="lg:col-span-4 bg-espresso-900 border-0 overflow-hidden">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <p className="text-bone-100 font-medium">Recently Played</p>
                <div className="w-2 h-2 rounded-full bg-sage-400 animate-pulse" />
              </div>
              <div className="flex-1 rounded-lg overflow-hidden bg-espresso-800">
                <iframe
                  src="https://spotify-recently-played-readme.vercel.app/api?user=aadit2805&count=10"
                  width="100%"
                  height="100%"
                  style={{ minHeight: '500px' }}
                  allow="encrypted-media"
                  title="Recently Played"
                  className="border-0"
                  loading="lazy"
                />
              </div>
            </CardContent>
          </Card>

          {/* Current Rotation */}
          <Card className="lg:col-span-8 bg-bone-50/80 backdrop-blur-sm border-bone-200 overflow-hidden">
            <CardContent className="p-6">
              <p className="text-espresso-900 font-medium mb-4">Current Rotation</p>
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden">
                  <iframe
                    src="https://open.spotify.com/embed/playlist/2hJ9vjNCXEVrbPDmr8RRaY?utm_source=generator&theme=0"
                    width="100%"
                    height="352"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="Sunday Snooze"
                    className="border-0 rounded-lg"
                  />
                </div>
                <div className="rounded-lg overflow-hidden">
                  <iframe
                    src="https://open.spotify.com/embed/playlist/2N0n81gJrPqZzFxeteHPUI?utm_source=generator&theme=0"
                    width="100%"
                    height="352"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="Focus"
                    className="border-0 rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
