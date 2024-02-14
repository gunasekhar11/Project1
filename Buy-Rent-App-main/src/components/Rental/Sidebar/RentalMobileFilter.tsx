import React,{useState} from 'react'
import {useEffect} from 'react';
import styles from "./Filter.module.css";
import { GetApiCall } from '../../utilities/CommonHTTP';
import { headers, rental_products } from '../../utilities/ApiEndpoints';

//Filters data type
interface FilterType {
    category:string;
    price:string;
    location:string;
  }

  //Child props type
interface ChildProps {
    onDataFromChild2: (childData:FilterType) => void;
  }

  interface sidebarProps {
    handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleLocationChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  }
const Mobilefilter: React.FC<sidebarProps> = ({ handleCategoryChange,handleLocationChange,handlePriceChange }) => {

    const [uniqueTitles, setUniqueTitles] = useState<string[]>([]);
    const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);
    const [price,setPrice] = useState("0");

    const products:any = GetApiCall(rental_products,headers);

    useEffect(() => {

    //using set to remove duplicate values of locations and categoris
    const uniqueTitleSet = new Set<string>();
    const uniqueLocationsSet = new Set<string>();

    products?.data?.data.forEach((item:any) => {
      uniqueTitleSet.add(item.title.toLocaleLowerCase());
      uniqueLocationsSet.add(item.location.toLocaleLowerCase());
      
    });

    setUniqueTitles(Array.from(uniqueTitleSet));
    setUniqueLocations(Array.from(uniqueLocationsSet));
  }, [products.data]);

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
    <form >
    <div  style={{display:"flex",justifyContent:"space-around",textAlign:"center",paddingTop:"25px"}}>
        <div>
            
            <select  onChange={handleCategoryChange} className="btns" style={{margin:"0px"}}>
            <option value= "None"><span style={{fontWeight:"",fontSize:"14px",zIndex:"2"}}>Categories</span></option>
            <option value="None" style={{fontWeight:"",fontSize:"14px",zIndex:"2"}} >All</option>
                  {uniqueTitles.map((item) =>(
                  <option value={item.toLocaleUpperCase()} style={{fontWeight:"",fontSize:"14px",zIndex:"2"}} >{item.toLocaleUpperCase()}</option>
                ))}
            </select>
        </div>
        <div>
            <select onChange={handleLocationChange} className="btns" style={{margin:"0px"}}>
                 <option value="None" ><span style={{fontSize:"10px"}}>Location</span></option>
                 <option value="None" style={{fontWeight:"",fontSize:"14px",zIndex:"2"}} >All</option>
                  {uniqueLocations.map((item) =>(
                  <option value={item}style={{fontWeight:"",fontSize:"10px"}}  >{item.toLocaleUpperCase()}</option>
                ))}
            </select>
        </div>
        <div  style={{width:"auto"}}>
        <input
        style={{width:"100%"}}
          id="priceRange"
          type="range"
          min="30"
          max="100000"
          step="10"
          onChange={handlePriceChangeAndPrice}
        />
        <p style={{fontSize:"14px",fontWeight:"bold",marginTop:"-5px"}}>${price}</p>
      </div>
          </div>
    </form>
  )
}

export default Mobilefilter;
