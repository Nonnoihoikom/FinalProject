import React, { useState, useEffect } from "react";
import axios from "axios";
import "../FilterBar.css";

interface FilterBarProps {
  isVisible: boolean;
  onCategoryChange: (selectedCategories: string[]) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  isVisible,
  onCategoryChange,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (isVisible) {
      axios
        .get(
          "https://c6ac9ab7-0ad6-4a92-8639-9a116c258fe1-00-299g209a7syl0.sisko.replit.dev/categories"
        )
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [isVisible]);

  const handleCategoryClick = (category: string) => {
    let updatedCategories = [...selectedCategories];
    if (selectedCategories.includes(category)) {
      updatedCategories = updatedCategories.filter((cat) => cat !== category);
    } else {
      updatedCategories.push(category);
    }
    setSelectedCategories(updatedCategories);
    onCategoryChange(updatedCategories);
  };

  const handleClear = () => {
    setSelectedCategories([]);
    onCategoryChange([]);
  };

  return (
    <div className={`filter-bar ${isVisible ? "visible" : ""}`}>
      {categories.map((category, index) => (
        <div
          key={index}
          className={`filter-item ${
            selectedCategories.includes(category) ? "selected" : ""
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </div>
      ))}
      <button className="clear-button" onClick={handleClear}>
        Clear
      </button>
    </div>
  );
};

export default FilterBar;
