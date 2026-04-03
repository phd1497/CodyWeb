import React from 'react';
import { RiSearchLine } from 'react-icons/ri';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, resultCount }) => {
  return (
    <div className="store-toolbar">
      <div className="store-search-wrapper">
        <RiSearchLine className="store-search-icon" />
        <input
          type="text"
          className="store-search-input"
          placeholder="Search drinks by name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          id="store-search-input"
        />
      </div>
      <span className="store-result-count">
        {resultCount} result{resultCount !== 1 ? 's' : ''}
      </span>
    </div>
  );
};

export default React.memo(SearchBar);
