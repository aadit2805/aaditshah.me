"use client";

import React, { useState } from 'react';
import revdata from '../app/reviews/revdata.json';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const MediaRatingSystem = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [mediaItems] = useState(revdata);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterType = (value) => {
    setFilterType(value);
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const filteredAndSortedItems = mediaItems
    .filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.artist.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(item =>
      filterType === 'all' ? true : item.type === filterType
    )
    .sort((a, b) => {
      if (sortConfig.key === 'rating') {
        return sortConfig.direction === 'desc' ? b.rating - a.rating : a.rating - b.rating;
      } else if (sortConfig.key === 'date') {
        return sortConfig.direction === 'desc'
          ? new Date(b.reviewDate) - new Date(a.reviewDate)
          : new Date(a.reviewDate) - new Date(b.reviewDate);
      }
      return 0;
    });

  const featuredItem = filteredAndSortedItems[0];
  const remainingItems = filteredAndSortedItems.slice(1);

  const getRatingStyle = (rating) => {
    if (rating >= 8) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    if (rating >= 7) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC'
    });
  };

  const truncateReview = (review, charLimit = 120) => {
    if (!review) return '';
    if (review.length <= charLimit) return review;
    return review.slice(0, charLimit).trim() + '...';
  };

  // Stats
  const totalReviews = mediaItems.length;
  const avgRating = (mediaItems.reduce((acc, item) => acc + item.rating, 0) / totalReviews).toFixed(1);
  const movieCount = mediaItems.filter(item => item.type === 'movie').length;
  const showCount = mediaItems.filter(item => item.type === 'show').length;

  return (
    <div className="w-full">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header with Stats */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                {totalReviews} reviews
              </Badge>
              <h1 className="text-4xl md:text-5xl font-mono font-bold text-zinc-100 mb-3">
                ~/reviews
              </h1>
              <p className="text-zinc-500 font-mono text-sm max-w-md">
                # Thoughts on what I've been watching. Unfiltered opinions.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="flex gap-3">
              <div className="px-4 py-3 bg-zinc-900 rounded-lg border border-zinc-800">
                <p className="text-2xl font-mono font-bold text-emerald-400">{avgRating}</p>
                <p className="text-xs text-zinc-600 uppercase tracking-wider font-mono">avg</p>
              </div>
              <div className="px-4 py-3 bg-zinc-900 rounded-lg border border-zinc-800">
                <p className="text-2xl font-mono font-bold text-cyan-400">{movieCount}</p>
                <p className="text-xs text-zinc-600 uppercase tracking-wider font-mono">films</p>
              </div>
              <div className="px-4 py-3 bg-zinc-900 rounded-lg border border-zinc-800">
                <p className="text-2xl font-mono font-bold text-purple-400">{showCount}</p>
                <p className="text-xs text-zinc-600 uppercase tracking-wider font-mono">shows</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <Input
              type="text"
              placeholder="grep -i ..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full sm:w-64 bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 font-mono focus:border-emerald-500 focus:ring-emerald-500/20"
            />

            <Select onValueChange={handleFilterType} value={filterType}>
              <SelectTrigger className="w-[130px] bg-zinc-900 border-zinc-700 text-zinc-300 font-mono">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                <SelectItem value="all" className="text-zinc-300 font-mono focus:bg-zinc-800">all</SelectItem>
                <SelectItem value="movie" className="text-zinc-300 font-mono focus:bg-zinc-800">films</SelectItem>
                <SelectItem value="show" className="text-zinc-300 font-mono focus:bg-zinc-800">shows</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2 ml-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('rating')}
                className={`font-mono ${sortConfig.key === 'rating' ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' : 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'}`}
              >
                rating {sortConfig.key === 'rating' && (sortConfig.direction === 'desc' ? '↓' : '↑')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('date')}
                className={`font-mono ${sortConfig.key === 'date' ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' : 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'}`}
              >
                date {sortConfig.key === 'date' && (sortConfig.direction === 'desc' ? '↓' : '↑')}
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Review */}
        {featuredItem && (
          <div className="mb-8">
            <Card
              className="group bg-zinc-900 border-zinc-800 overflow-hidden cursor-pointer hover:border-zinc-700 transition-all"
              onClick={() => setSelectedItem(featuredItem)}
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
                  <img
                    src={featuredItem.image}
                    alt={featuredItem.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded border text-sm font-mono font-bold ${getRatingStyle(featuredItem.rating)}`}>
                    {featuredItem.rating}/10
                  </div>
                </div>
                <CardContent className="p-8 flex flex-col justify-center bg-zinc-900">
                  <Badge variant="secondary" className="w-fit mb-4 bg-zinc-800 text-zinc-400 border-zinc-700 font-mono text-xs">
                    {featuredItem.type === 'movie' ? 'FILM' : 'SHOW'}
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-mono font-bold text-zinc-100 mb-2 group-hover:text-emerald-400 transition-colors">
                    {featuredItem.title}
                  </h2>
                  <p className="text-zinc-500 mb-4 font-mono text-sm">
                    {featuredItem.artist} · {formatDate(featuredItem.reviewDate)}
                  </p>
                  {featuredItem.review && (
                    <p className="text-zinc-400 leading-relaxed font-mono text-sm">
                      {truncateReview(featuredItem.review, 200)}
                    </p>
                  )}
                  <div className="mt-6 flex items-center gap-2 text-emerald-400 group-hover:gap-3 transition-all font-mono text-sm">
                    <span>cat review.txt</span>
                    <span>→</span>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {remainingItems.map((item, index) => (
            <Card
              key={item.id}
              className="group bg-zinc-900 border-zinc-800 overflow-hidden cursor-pointer hover:border-zinc-700 transition-all"
              onClick={() => setSelectedItem(item)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent" />

                <div className={`absolute top-3 right-3 w-10 h-10 rounded border flex items-center justify-center font-mono font-bold text-sm ${getRatingStyle(item.rating)}`}>
                  {item.rating}
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <Badge
                    variant="secondary"
                    className="bg-zinc-900/90 text-zinc-400 border-zinc-700 mb-2 font-mono text-xs"
                  >
                    {item.type === 'movie' ? 'FILM' : 'SHOW'}
                  </Badge>
                  <h3 className="font-mono text-lg font-bold text-zinc-100 leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>

              <CardContent className="p-4 bg-zinc-900">
                <p className="text-sm text-zinc-500 mb-2 font-mono">
                  {item.artist} · {formatDate(item.reviewDate)}
                </p>
                {item.review && (
                  <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 font-mono">
                    {truncateReview(item.review, 80)}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {filteredAndSortedItems.length === 0 && (
          <div className="text-center py-20">
            <div className="font-mono text-zinc-500">
              <p className="text-emerald-400 mb-2">$ grep "{searchTerm}"</p>
              <p>No matches found.</p>
            </div>
          </div>
        )}
      </div>

      {/* Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-700 max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          {selectedItem && (
            <>
              <div className="relative h-72 overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent" />

                <div className={`absolute top-4 right-4 px-4 py-2 rounded border font-mono font-bold text-lg ${getRatingStyle(selectedItem.rating)}`}>
                  {selectedItem.rating}/10
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Badge
                    variant="secondary"
                    className="bg-zinc-900/90 text-zinc-400 border-zinc-700 mb-3 font-mono"
                  >
                    {selectedItem.type === 'movie' ? 'FILM' : 'SHOW'}
                  </Badge>
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-mono font-bold text-zinc-100 pr-12">
                      {selectedItem.title}
                    </DialogTitle>
                  </DialogHeader>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 text-sm text-zinc-500 pb-4 border-b border-zinc-800 font-mono">
                  <span className="text-zinc-300">{selectedItem.artist}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <span>{formatDate(selectedItem.reviewDate)}</span>
                </div>

                {selectedItem.review && (
                  <div className="prose prose-invert prose-zinc max-w-none">
                    <p className="text-zinc-300 leading-relaxed text-base font-mono">
                      {selectedItem.review}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaRatingSystem;
