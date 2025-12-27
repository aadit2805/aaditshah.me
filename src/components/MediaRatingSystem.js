"use client";

import React, { useState, useEffect } from 'react';
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

  const getRatingStyle = (rating) => {
    if (rating >= 8) return 'bg-sage-100 text-sage-700 border-sage-200';
    if (rating >= 7) return 'bg-bone-200 text-espresso-600 border-bone-300';
    return 'bg-terracotta-100 text-terracotta-700 border-terracotta-200';
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

  const truncateReview = (review, charLimit = 100) => {
    if (!review) return '';
    if (review.length <= charLimit) return review;
    return review.slice(0, charLimit).trim() + '...';
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6">
      {/* Header */}
      <div className="mb-10 opacity-0 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-terracotta-400" />
          <span className="text-sm font-medium text-espresso-500 uppercase tracking-wider">
            Reviews
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-medium text-espresso-900 mb-3">
          Film & TV Reviews
        </h1>
        <p className="text-espresso-500">
          Thoughts on what I've been watching lately.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4 opacity-0 animate-fade-in animate-delay-100">
        <Input
          type="text"
          placeholder="Search titles or directors..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full bg-bone-50 border-bone-300 text-espresso-800 placeholder:text-espresso-400 focus:border-terracotta-400 focus:ring-terracotta-400"
        />

        <div className="flex flex-wrap items-center gap-3">
          <Select onValueChange={handleFilterType} value={filterType}>
            <SelectTrigger className="w-[140px] bg-bone-50 border-bone-300 text-espresso-700">
              <SelectValue placeholder="All media" />
            </SelectTrigger>
            <SelectContent className="bg-bone-50 border-bone-300">
              <SelectItem value="all">All media</SelectItem>
              <SelectItem value="movie">Movies</SelectItem>
              <SelectItem value="show">TV Shows</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant={sortConfig.key === 'rating' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSort('rating')}
              className={sortConfig.key === 'rating'
                ? 'bg-terracotta-500 hover:bg-terracotta-600 text-white'
                : 'bg-bone-50 border-bone-300 text-espresso-600 hover:bg-bone-200 hover:text-espresso-800'
              }
            >
              Rating {sortConfig.key === 'rating' && (sortConfig.direction === 'desc' ? '↓' : '↑')}
            </Button>

            <Button
              variant={sortConfig.key === 'date' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSort('date')}
              className={sortConfig.key === 'date'
                ? 'bg-terracotta-500 hover:bg-terracotta-600 text-white'
                : 'bg-bone-50 border-bone-300 text-espresso-600 hover:bg-bone-200 hover:text-espresso-800'
              }
            >
              Date {sortConfig.key === 'date' && (sortConfig.direction === 'desc' ? '↓' : '↑')}
            </Button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 animate-fade-in-up animate-delay-200">
        {filteredAndSortedItems.map((item, index) => (
          <Card
            key={item.id}
            className="group bg-bone-50 border-bone-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            onClick={() => setSelectedItem(item)}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/60 to-transparent" />

              {/* Rating badge */}
              <div className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm border ${getRatingStyle(item.rating)}`}>
                {item.rating}
              </div>

              {/* Type badge */}
              <Badge
                variant="secondary"
                className="absolute bottom-3 left-3 bg-bone-100/90 text-espresso-700 border-0"
              >
                {item.type === 'movie' ? 'Film' : 'TV'}
              </Badge>
            </div>

            <CardContent className="p-5">
              <h3 className="font-serif text-lg font-medium text-espresso-900 mb-1 group-hover:text-terracotta-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-espresso-500 mb-3">
                {item.artist} · {formatDate(item.reviewDate)}
              </p>
              {item.review && (
                <p className="text-sm text-espresso-600 leading-relaxed">
                  {truncateReview(item.review)}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredAndSortedItems.length === 0 && (
        <div className="text-center py-16">
          <p className="text-espresso-500">No reviews match your search.</p>
        </div>
      )}

      {/* Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="bg-bone-50 border-bone-200 max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedItem && (
            <>
              <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-lg">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/70 to-transparent" />

                <div className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 ${getRatingStyle(selectedItem.rating)}`}>
                  {selectedItem.rating}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <Badge
                    variant="secondary"
                    className="bg-bone-100/90 text-espresso-700 border-0 mb-2"
                  >
                    {selectedItem.type === 'movie' ? 'Film' : 'TV Show'}
                  </Badge>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-serif text-white">
                      {selectedItem.title}
                    </DialogTitle>
                  </DialogHeader>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-espresso-500">
                  <span>{selectedItem.artist}</span>
                  <span className="w-1 h-1 rounded-full bg-espresso-300" />
                  <span>{formatDate(selectedItem.reviewDate)}</span>
                </div>

                {selectedItem.review && (
                  <p className="text-espresso-700 leading-relaxed">
                    {selectedItem.review}
                  </p>
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
