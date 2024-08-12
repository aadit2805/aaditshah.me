import React, { useState, useEffect, useRef } from 'react';
import revdata from '../app/reviews/revdata.json';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const MediaRatingSystem = ({ theme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [mediaItems, setMediaItems] = useState(revdata);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showReviews, setShowReviews] = useState(true);
  const popupRef = useRef(null);

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

  const toggleReviews = () => {
    setShowReviews(prev => !prev);
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

  const handleItemClick = (item) => {
    setSelectedItem(item);
    document.body.classList.add('popup-open');
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
    document.body.classList.remove('popup-open');
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        handleClosePopup();
      }
    };

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClosePopup();
      }
    };

    if (selectedItem) {
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedItem]);

  const getRatingColor = (rating) => {
    if (rating < 7) return '#E57373';  
    if (rating < 8) return '#FFF176'; 
    return '#81C784';  
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { timeZone: 'UTC' });
  };

  const truncateReview = (review, charLimit = 125) => {
    if (review.length <= charLimit) return review;
    return review.slice(0, charLimit).trim() + '...';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-5 text-center">Film & TV Reviews</h1>

      <input
        type="text"
        placeholder="search for titles, artists..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-4 mb-4 rounded-xl text-lg border border-gray-300 dark:border-gray-700"
        style={{
          backgroundColor: 'rgb(var(--background-rgb))',
          color: 'rgb(var(--foreground-rgb))'
        }}
      />
      <div className="mb-4 flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-4 mb-2">
          <Select onValueChange={handleFilterType} value={filterType}>
            <SelectTrigger className="w-[180px] border-gray-300 dark:border-gray-700 rounded-xl">
              <SelectValue placeholder="select media" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">select media</SelectItem>
              <SelectItem value="movie">movie</SelectItem>
              <SelectItem value="show">show</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => handleSort('rating')}
            className="button rounded-xl"
          >
            sort by rating {sortConfig.key === 'rating' ? (sortConfig.direction === 'desc' ? '↓' : '↑') : '↕'}
          </button>

          <button
            onClick={() => handleSort('date')}
            className="button rounded-xl"
          >
            sort by date {sortConfig.key === 'date' ? (sortConfig.direction === 'desc' ? '↓' : '↑') : '↕'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredAndSortedItems.map(item => (
          <div 
            key={item.id} 
            className="p-6 rounded-xl bg-opacity-10 border border-gray-300 dark:border-gray-700 shadow-lg cursor-pointer transition-transform hover:scale-105 relative"
            style={{
              color: 'rgb(var(--foreground-rgb))',
              backgroundColor: 'rgba(var(--background-rgb), 0.1)'
            }}
            onClick={() => handleItemClick(item)}
          >
            <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
            <p className="text-lg mb-2">{item.artist}</p>
            <p className="text-sm mb-2">{formatDate(item.reviewDate)}</p>
            <div className="w-full h-64 mb-4 overflow-hidden rounded-xl">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <button 
              className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
              style={{
                backgroundColor: getRatingColor(item.rating),
                color: theme === 'dark' ? 'rgb(var(--background-rgb))' : 'rgb(var(--foreground-rgb))',
              }}
            >
              {item.rating}
            </button>
            {showReviews && item.review && (
              <div className="mt-4">
                <p className="text-base">{truncateReview(item.review)}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="popup-overlay">
          <div 
            ref={popupRef}
            className="popup-content p-8 rounded-xl shadow-lg relative max-w-4xl w-11/12 max-h-90vh overflow-y-auto"
            style={{
              color: 'rgb(var(--foreground-rgb))',
              backgroundColor: 'rgb(var(--background-rgb))'
            }}
          >
            <button onClick={handleClosePopup} className="absolute top-4 right-4 text-3xl">
              &times;
            </button>
            <h3 className="text-3xl font-semibold mb-4">{selectedItem.title}</h3>
            <p className="text-xl mb-2">{selectedItem.artist}</p>
            <p className="text-sm mb-2">{formatDate(selectedItem.reviewDate)}</p>
            <div className="w-full h-96 mb-6 overflow-hidden rounded-xl">
              <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
            </div>
            {selectedItem.review && (
              <div className="mt-4">
                <p className="text-lg">{selectedItem.review}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaRatingSystem;