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
    if (rating >= 8) return 'bg-sage-500 text-white';
    if (rating >= 7) return 'bg-bone-600 text-white';
    return 'bg-terracotta-500 text-white';
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
      {/* Grain overlay */}
      <div className="grain" />

      {/* Animated blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header with Stats */}
        <div className="mb-12 stagger-children">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <Badge className="mb-4 bg-terracotta-100 text-terracotta-700 border-0">
                {totalReviews} Reviews
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif font-medium text-espresso-900 mb-3">
                Film & TV Reviews
              </h1>
              <p className="text-espresso-500 max-w-md">
                Thoughts on what I've been watching. Unfiltered opinions on cinema and television.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="flex gap-3">
              <div className="px-4 py-3 bg-bone-50/80 backdrop-blur-sm rounded-xl border border-bone-200">
                <p className="text-2xl font-serif font-medium text-espresso-900">{avgRating}</p>
                <p className="text-xs text-espresso-500 uppercase tracking-wider">Avg Rating</p>
              </div>
              <div className="px-4 py-3 bg-bone-50/80 backdrop-blur-sm rounded-xl border border-bone-200">
                <p className="text-2xl font-serif font-medium text-espresso-900">{movieCount}</p>
                <p className="text-xs text-espresso-500 uppercase tracking-wider">Films</p>
              </div>
              <div className="px-4 py-3 bg-bone-50/80 backdrop-blur-sm rounded-xl border border-bone-200">
                <p className="text-2xl font-serif font-medium text-espresso-900">{showCount}</p>
                <p className="text-xs text-espresso-500 uppercase tracking-wider">Shows</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full sm:w-64 bg-bone-50/80 backdrop-blur-sm border-bone-300 text-espresso-800 placeholder:text-espresso-400"
            />

            <Select onValueChange={handleFilterType} value={filterType}>
              <SelectTrigger className="w-[130px] bg-bone-50/80 backdrop-blur-sm border-bone-300 text-espresso-700">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-bone-50 border-bone-300">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="movie">Films</SelectItem>
                <SelectItem value="show">Shows</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2 ml-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('rating')}
                className={`${sortConfig.key === 'rating' ? 'bg-espresso-900 text-bone-100 hover:bg-espresso-800' : 'text-espresso-600 hover:bg-bone-200'}`}
              >
                Rating {sortConfig.key === 'rating' && (sortConfig.direction === 'desc' ? '↓' : '↑')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('date')}
                className={`${sortConfig.key === 'date' ? 'bg-espresso-900 text-bone-100 hover:bg-espresso-800' : 'text-espresso-600 hover:bg-bone-200'}`}
              >
                Date {sortConfig.key === 'date' && (sortConfig.direction === 'desc' ? '↓' : '↑')}
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Review */}
        {featuredItem && (
          <div className="mb-8">
            <Card
              className="group bg-bone-50/80 backdrop-blur-sm border-bone-200 overflow-hidden hover-lift cursor-pointer"
              onClick={() => setSelectedItem(featuredItem)}
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
                  <img
                    src={featuredItem.image}
                    alt={featuredItem.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/60 via-transparent to-transparent" />
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${getRatingStyle(featuredItem.rating)}`}>
                    {featuredItem.rating}/10
                  </div>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-4 bg-bone-200 text-espresso-600">
                    {featuredItem.type === 'movie' ? 'Film' : 'TV Show'}
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-serif font-medium text-espresso-900 mb-2 group-hover:text-terracotta-600 transition-colors">
                    {featuredItem.title}
                  </h2>
                  <p className="text-espresso-500 mb-4">
                    {featuredItem.artist} · {formatDate(featuredItem.reviewDate)}
                  </p>
                  {featuredItem.review && (
                    <p className="text-espresso-600 leading-relaxed">
                      {truncateReview(featuredItem.review, 200)}
                    </p>
                  )}
                  <div className="mt-6 flex items-center gap-2 text-terracotta-500 group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Read review</span>
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
              className="group bg-bone-50/80 backdrop-blur-sm border-bone-200 overflow-hidden hover-lift cursor-pointer"
              onClick={() => setSelectedItem(item)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/70 to-transparent" />

                <div className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${getRatingStyle(item.rating)}`}>
                  {item.rating}
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <Badge
                    variant="secondary"
                    className="bg-bone-100/90 text-espresso-700 border-0 mb-2"
                  >
                    {item.type === 'movie' ? 'Film' : 'TV'}
                  </Badge>
                  <h3 className="font-serif text-lg font-medium text-white leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>

              <CardContent className="p-4">
                <p className="text-sm text-espresso-500 mb-2">
                  {item.artist} · {formatDate(item.reviewDate)}
                </p>
                {item.review && (
                  <p className="text-sm text-espresso-600 leading-relaxed line-clamp-2">
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
            <div className="w-16 h-16 rounded-full bg-bone-200 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎬</span>
            </div>
            <p className="text-espresso-500">No reviews match your search.</p>
          </div>
        )}
      </div>

      {/* Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="bg-bone-50 border-bone-200 max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          {selectedItem && (
            <>
              <div className="relative h-72 overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/80 via-espresso-900/20 to-transparent" />

                <div className={`absolute top-4 right-4 px-4 py-2 rounded-full font-bold text-lg ${getRatingStyle(selectedItem.rating)}`}>
                  {selectedItem.rating}/10
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Badge
                    variant="secondary"
                    className="bg-bone-100/90 text-espresso-700 border-0 mb-3"
                  >
                    {selectedItem.type === 'movie' ? 'Film' : 'TV Show'}
                  </Badge>
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-serif text-white pr-12">
                      {selectedItem.title}
                    </DialogTitle>
                  </DialogHeader>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 text-sm text-espresso-500 pb-4 border-b border-bone-200">
                  <span className="font-medium text-espresso-700">{selectedItem.artist}</span>
                  <span className="w-1 h-1 rounded-full bg-espresso-300" />
                  <span>{formatDate(selectedItem.reviewDate)}</span>
                </div>

                {selectedItem.review && (
                  <div className="prose prose-stone max-w-none">
                    <p className="text-espresso-700 leading-relaxed text-lg">
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
