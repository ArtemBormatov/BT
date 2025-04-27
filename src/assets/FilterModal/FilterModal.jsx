import { useState } from "react";
import "./FilterModal.css";

function FilterModal({ onClose, onFilter }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    onFilter(category);
    onClose(); // Close the modal after selecting a category
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Filter by Category</h2>
        <div className="filter-options">
          <button onClick={() => handleFilterChange("All")}>All</button>
          <button onClick={() => handleFilterChange("Food")}>Food</button>
          <button onClick={() => handleFilterChange("Transport")}>Transport</button>
          <button onClick={() => handleFilterChange("Shopping")}>Shopping</button>
          <button onClick={() => handleFilterChange("Entertainment")}>Entertainment</button>
          <button onClick={() => handleFilterChange("Bills")}>Bills</button>
          <button onClick={() => handleFilterChange("Other")}>Other</button>
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default FilterModal;
