import React, { useState } from 'react';
import './SearchBar.css';

interface Props {
  onSearch: (city: string) => void;
  onLocationClick: () => void;
}

const SearchBar: React.FC<Props> = ({ onSearch, onLocationClick }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search for a city..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="location-btn" onClick={onLocationClick} title="Use my location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </button>
        <button className="search-btn" onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
