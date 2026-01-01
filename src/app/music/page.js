"use client";

import React from 'react';
import TerminalNav from '../../components/TerminalNav';
import { Card, CardContent } from '@/components/ui/card';

export default function Music() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <TerminalNav currentPage="music" />

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-8 pb-20">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-zinc-100 mb-3">
            ~/music
          </h1>
          <p className="text-zinc-500 font-mono text-sm">
            # What I've been listening to lately.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Recently Played */}
          <Card className="lg:col-span-4 bg-zinc-900 border-zinc-800 overflow-hidden">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <p className="text-zinc-100 font-mono font-medium">recently_played</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-zinc-500 font-mono">live</span>
                </div>
              </div>
              <div className="flex-1 rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700">
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
          <Card className="lg:col-span-8 bg-zinc-900 border-zinc-800 overflow-hidden">
            <CardContent className="p-6">
              <p className="text-zinc-100 font-mono font-medium mb-4">playlists/</p>
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden border border-zinc-700">
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
                <div className="rounded-lg overflow-hidden border border-zinc-700">
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
