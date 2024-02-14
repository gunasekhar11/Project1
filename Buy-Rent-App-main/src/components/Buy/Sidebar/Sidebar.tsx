import React, { useState } from "react";
import "./Sidebar.css";

interface sidebarProps {
  handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Sidebar: React.FC<sidebarProps> = ({
  handlePriceChange,
  handleCategory,
}) => {
  const [price, setPrice] = useState("200");

  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePriceChange(event);
    handlePrice(event);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleCategory(event);
  };


  return (
    <div className="sidebar-buy">
      <div className="category-buy">
        <label htmlFor="cars">
          <h2 style={{fontWeight:'bold'}}>Categories</h2>
        </label>
        <br />
        <select
          id="cars"
          className="btns"
          onChange={handleSelectChange} style={{fontWeight:'bold'}}
        >
          <option value="">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Headset">Headset</option>
          <option value="Slippers">Slippers</option>
          <option value="Mobiles">Mobiles</option>
        </select>
      </div>
      <br />
      <div className="price-range-buy" style={{marginTop:"-5px"}}>
        <h2 style={{fontWeight:'bold'}}>Price Range</h2>
        <input
          id="priceRangebuy"
          type="range"
          min="100"
          max="70000"
          step="100"
          defaultValue="200"
          onChange={handleInputChange}
        />
        <p className="filter_price">${price}</p>
      </div>
    </div>
  );
};

export default Sidebar;
