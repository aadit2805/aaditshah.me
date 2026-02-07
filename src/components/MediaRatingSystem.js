"use client";

import React, { useState } from 'react';
import revdata from '../app/reviews/revdata.json';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const MediaRatingSystem = () => {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const sortedItems = [...revdata].sort((a, b) => {
    if (sortConfig.key === 'rating') {
      return sortConfig.direction === 'desc' ? b.rating - a.rating : a.rating - b.rating;
    }
    return sortConfig.direction === 'desc'
      ? new Date(b.reviewDate) - new Date(a.reviewDate)
      : new Date(a.reviewDate) - new Date(b.reviewDate);
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-8 pb-24">
      {/* Sort toggles */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => handleSort('date')}
          className={`font-sans text-sm transition-colors ${
            sortConfig.key === 'date'
              ? 'text-landing-primary font-medium'
              : 'text-landing-muted hover:text-landing-hover'
          }`}
        >
          date {sortConfig.key === 'date' && (sortConfig.direction === 'desc' ? '\u2193' : '\u2191')}
        </button>
        <button
          onClick={() => handleSort('rating')}
          className={`font-sans text-sm transition-colors ${
            sortConfig.key === 'rating'
              ? 'text-landing-primary font-medium'
              : 'text-landing-muted hover:text-landing-hover'
          }`}
        >
          rating {sortConfig.key === 'rating' && (sortConfig.direction === 'desc' ? '\u2193' : '\u2191')}
        </button>
      </div>

      {/* Review list */}
      <div>
        {sortedItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group w-full flex items-baseline justify-between py-2 border-b border-dashed border-landing-border hover:border-landing-muted transition-colors text-left"
          >
            <div className="flex items-baseline gap-4 min-w-0">
              <span className="font-sans font-medium text-landing-primary group-hover:text-landing-hover transition-colors shrink-0">
                {item.title}
              </span>
              <span className="hidden sm:inline font-sans text-landing-muted text-sm truncate">
                {item.artist}
              </span>
            </div>
            <span className="font-mono text-sm text-landing-muted shrink-0 ml-4">
              {item.rating}/10
            </span>
          </button>
        ))}
      </div>

      {/* Review modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="bg-landing-bg border-landing-border max-w-lg max-h-[85vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="font-sans text-xl font-bold text-landing-primary pr-8">
                  {selectedItem.title}
                </DialogTitle>
                <DialogDescription asChild>
                  <div className="flex items-center gap-3 text-sm text-landing-muted font-sans pt-1">
                    <span>{selectedItem.artist}</span>
                    <span className="w-1 h-1 rounded-full bg-landing-muted/40" />
                    <span>{formatDate(selectedItem.reviewDate)}</span>
                    <span className="w-1 h-1 rounded-full bg-landing-muted/40" />
                    <span className="font-medium text-landing-secondary">{selectedItem.rating}/10</span>
                  </div>
                </DialogDescription>
              </DialogHeader>

              {selectedItem.review && (
                <div className="pt-4 border-t border-dashed border-landing-border">
                  <p className="font-sans text-landing-secondary leading-relaxed text-sm">
                    {selectedItem.review}
                  </p>
                </div>
              )}

              {!selectedItem.review && (
                <div className="pt-4 border-t border-dashed border-landing-border">
                  <p className="font-sans text-landing-muted text-sm italic">
                    No review written yet.
                  </p>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaRatingSystem;
