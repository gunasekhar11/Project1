import React, { useState } from "react";
import "./exchangefilter.css";

interface sidebarProps {
  handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handelLocation: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Sidebar: React.FC<sidebarProps> = ({
  handlePriceChange,
  handleCategory,
  handelLocation,
}) => {
  const [price, setPrice] = useState("365");
  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handlePriceChangeAndPrice = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handlePriceChange(event);
    handlePrice(event);
  };

  return (
    <div className="sidebar">
      <div className="category">
        <label htmlFor="category">
          <h3>Categories</h3>
        </label>
        <br />
        <select
          id="category"
          className="category-select"
          onChange={handleCategory}
        >
          <option value="" selected>
            All
          </option>
          <option value="car">Cars</option>
          <option value="bike">Bikes</option>
          <option value="cycle">Cycles</option>
        </select>
      </div>
      <div className="category">
        <label htmlFor="location">
          <h3>Location</h3>
        </label>
        <br />
        <select
          id="location"
          className="category-select"
          onChange={handelLocation}
        >
          <option value="" selected>
            All
          </option>
          <option value="hyderabad">Hyderabad</option>
          <option value="banglore">Banglore</option>
          <option value="ananthapur">Ananthapur</option>
        </select>
      </div>
      <br />
      <div className="price-range">
        <h3>Duration Range</h3>
        <br />
        <input
          id="priceRange"
          type="range"
          min="30"
          max="365"
          step="10"
          defaultValue="365"
          onChange={handlePriceChangeAndPrice}
        />
        <br />
        <br />
        <p>{price} Days</p>
      </div>
    </div>
  );
};

export default Sidebar;
