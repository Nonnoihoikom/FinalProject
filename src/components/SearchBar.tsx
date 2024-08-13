// SearchBar.tsx
import React, { useState } from "react";
import ButtonFilter from "./ButtonFilter";
import FilterBar from "./FilterBar";
import "../SearchBar.css";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (selectedCategories: string[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onCategoryChange,
}) => {
  const [isFilterBarVisible, setFilterBarVisible] = useState(false);

  const handleFilterButtonClick = () => {
    setFilterBarVisible(!isFilterBarVisible);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-filter">
        <input
          className="search-bar"
          type="text"
          placeholder="Search for courses..."
          value={searchTerm}
          onChange={onSearchChange}
        />
        <ButtonFilter onClick={handleFilterButtonClick}>Filter</ButtonFilter>
      </div>
      <div
        className={`filter-bar-container ${
          isFilterBarVisible ? "visible" : ""
        }`}
      >
        <FilterBar
          isVisible={isFilterBarVisible}
          onCategoryChange={onCategoryChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
