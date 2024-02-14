import React, { useState } from "react";
import classes from "./Filter.module.css";
import { useEffect } from "react";
import { GetApiCall } from "../../utilities/CommonHTTP";
import { rental_products } from "../../utilities/ApiEndpoints";

interface sidebarProps {
  handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleLocationChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const Filter:React.FC<sidebarProps> = ( { handlePriceChange , handleCategoryChange ,handleLocationChange }) => {

  //states
  const [uniqueTitles, setUniqueTitles] = useState<string[]>([]);
  const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);
  const [price, setPrice] = useState("60000");


  //fetching the all products data
  const productsApiResponse:any = GetApiCall(rental_products);

  useEffect(() => {

    //using set to remove duplicate values of locations and categoris
    const uniqueTitleSet = new Set<string>();
    const uniqueLocationsSet = new Set<string>();

    productsApiResponse?.data?.data.forEach((item:any) => {
      uniqueTitleSet.add(item.title.toLocaleLowerCase());
      uniqueLocationsSet.add(item.location.toLocaleLowerCase());
      
    });

    setUniqueTitles(Array.from(uniqueTitleSet));
    setUniqueLocations(Array.from(uniqueLocationsSet));
  }, [productsApiResponse?.data?.data]);
  
  
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
    <div className={classes.filter}>
      <form
      >
        <table style={{textAlign:"center"}}>
          <tr>
            <td>
              <div className={classes.categories}>
                <br />
                <label htmlFor="categories" style={{fontWeight:"bold"}}>Categories</label>
                <br />
                <br />
                <select
                  name="category"
                  id="categories"
                  onChange={handleCategoryChange}
                >
                  <option value="None" >All</option>
                  {uniqueTitles.map((item) =>(
                  <option value={item.toLocaleUpperCase()} >{item.toLocaleUpperCase()}</option>
                ))}
                </select>
                <br />
                <br />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className={classes.categories}>
                <br />
                <label htmlFor="categories" style={{fontWeight:"bold"}}>Location</label>
                <br />
                <br />
                <select
                  name="location"
                  id="location"
                  onChange={handleLocationChange}
                >
                  <option value="None" >All</option>
                  {uniqueLocations.map((item) =>(
                  <option value={item} >{item.toLocaleUpperCase()}</option>
                ))}
                </select>
                <br />
                <br />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className={classes.categories}>
                <br />
                <label htmlFor="vol" style={{fontWeight:"bold"}}>Price Range:</label>
                <br />
                <br />
                <input
                  type="range"
                  style={{ width: "70%" }}
                  id="vol"
                  name="vol"
                  min="0"
                  max="60000"
                  step="500"
                  defaultValue="60000"
                  onChange={handlePriceChangeAndPrice}
                ></input>
                <p style={{fontWeight:"bold"}}>${price}</p>
              </div>
            </td>
          </tr>
          <br />
          <br />
          <br />
          <br />
        </table>
      </form>
    </div>
  );
};

export default Filter;
