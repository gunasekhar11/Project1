import React, { useState } from "react";
import "./mobilefilter.css";

interface mobfilterProps {
  handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleLocation: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Mobilefilter: React.FC<mobfilterProps> = ({
  handlePriceChange,
  handleCategory,
  handleLocation,
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
    <div className="mobile-filter">
      <div>
        <select
          id="category"
          className="btns"
          style={{ padding:"5px",width:"100px" }}
          onChange={handleCategory}
        >
          <option value="" selected>
            Category
          </option>
          <option value="car">Cars</option>
          <option value="bike">Bike</option>
          <option value="cycle">Cycles</option>
        </select>
      </div>
      <div className="price-range" style={{ width: "auto" }}>
        <p>Duration Range</p>
        <input
          id="priceRange"
          type="range"
          min="30"
          max="365"
          step="10"
          defaultValue="365"
          onChange={handlePriceChangeAndPrice}
        />
        <p>{price} Days</p>
        <br />
      </div>
      <div>
        <select
          id="location"
          className="btns"
          style={{ padding:"5px",width:"100px"}}
          onChange={handleLocation}
        >
          <option value="" selected>
            Location
          </option>
          <option value="hyderabad">Hyderabad</option>
          <option value="bangore">Banglore</option>
          <option value="ananthapur">Ananthapur</option>
        </select>
      </div>
    </div>
  );
};

export default Mobilefilter;
