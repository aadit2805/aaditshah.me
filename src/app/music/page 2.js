"use client";

import React from 'react';
import Navbar from '../../components/nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Music() {
  const playlists = [
    {
      title: "Current Rotation",
      description: "What's on repeat right now",
      embedUrl: "https://open.spotify.com/embed/playlist/2hJ9vjNCXEVrbPDmr8RRaY?utm_source=generator&theme=0"
    },
    {
      title: "Recently Played",
      description: "Last 10 tracks",
      embedUrl: "https://spotify-recently-played-readme.vercel.app/api?user=aadit2805&count=10",
      isWidget: true
    },
    {
      title: "Favorites",
      description: "All-time favorites",
      embedUrl: "https://open.spotify.com/embed/playlist/2N0n81gJrPqZzFxeteHPUI?utm_source=generator&theme=0"
    }
  ];

  return (
    <div className="min-h-screen bg-bone-100">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="mb-12 opacity-0 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-terracotta-400" />
            <span className="text-sm font-medium text-espresso-500 uppercase tracking-wider">
              Music
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-espresso-900 mb-3">
            What I'm Listening To
          </h1>
          <p className="text-espresso-500 max-w-xl">
            A glimpse into my current musical rotation. I find that good music makes everything better.
          </p>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center gap-4 mb-12 opacity-0 animate-fade-in animate-delay-100">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-bone-400 to-transparent" />
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-bone-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-sage-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-bone-400" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-bone-400 to-transparent" />
        </div>

        {/* Playlist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 opacity-0 animate-fade-in-up animate-delay-200">
          {playlists.map((playlist, index) => (
            <Card
              key={index}
              className="bg-bone-50 border-bone-200 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-terracotta-400" />
                  <CardTitle className="text-lg font-serif text-espresso-900">
                    {playlist.title}
                  </CardTitle>
                </div>
                <p className="text-sm text-espresso-500">{playlist.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                {playlist.isWidget ? (
                  <div className="rounded-lg overflow-hidden bg-bone-100 border border-bone-200">
                    <iframe
                      src={playlist.embedUrl}
                      width="100%"
                      height="480"
                      allow="encrypted-media"
                      title={playlist.title}
                      className="border-0"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="rounded-lg overflow-hidden">
                    <iframe
                      src={playlist.embedUrl}
                      width="100%"
                      height="480"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title={playlist.title}
                      className="border-0 rounded-lg"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer note */}
        <footer className="mt-16 text-center opacity-0 animate-fade-in animate-delay-300">
          <p className="text-sm text-espresso-400">
            Updated in real-time from Spotify.
          </p>
        </footer>
      </main>
    </div>
  );
}
