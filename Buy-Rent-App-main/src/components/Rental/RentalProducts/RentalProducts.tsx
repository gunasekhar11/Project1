import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./RentalProducts.module.css";
import Filter from "../Sidebar/RentalFilter";
import Mobilefilter from "../Sidebar/RentalMobileFilter";
import Nodata from "../../NoData/Nodata";
import { GetApiCall } from "../../utilities/CommonHTTP";
import Loader from "../../Loader/Loader";
import { Baseurl, authHeaders, current_user, headers, rental_products } from "../../utilities/ApiEndpoints";

//Defining  Type of Filters
interface FiltersType {
    category:string;
    price:string;
    location:string;
  }


  interface HeaderProps {
    HeaderQuery: string;
  }


//product field type
type Product = {
  product_id : number;
  product_owner_id : number;
  description : string;
  images :string;
  color : string;
  location :string;
  title : string;
  price :number;
  name : string;
};

const RentalProducts:React.FC<HeaderProps>= ({ HeaderQuery }) =>{

    //States
    const [price,setPrice] = useState("0");
    const [location,setLocation] = useState("None");
    const [category,setCategory] = useState("None");

  //Getting the logined user id
  const loginedUser:any = GetApiCall(current_user,authHeaders);
  const userId = loginedUser?.data?.data?.user_id;

  //Fetching the all rental products
  const rentalProducts:any = GetApiCall(rental_products,headers);

  //functions  passed to filter component
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleCategoryChange = ( event: React.ChangeEvent<HTMLSelectElement> ) => {
    setCategory(event.target.value);
  };

  const handleLocationChange = ( event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(event.target.value);
  };


      //to filter the products based on category,location,price
      const filteredProducts = rentalProducts?.data?.data.filter((product:Product) => {
      
        const passesCategoryFilter = !category || product.title.toLowerCase() === category.toLowerCase();
      
        const passesLocationFilter = !location || product.location.toLowerCase() === location.toLowerCase();
      
        const passesPriceFilter = !price || Number(product.price) <= Number(price);
      
        const passesQueryFilter = product.product_owner_id !== userId && product.title.toLowerCase().includes(HeaderQuery.toLowerCase());
      
        return (
          (category == "None"  || passesCategoryFilter) &&
          (location == "None" ||  passesLocationFilter) &&
          (price == "0" || passesPriceFilter) &&
          passesQueryFilter
        );
      });
   
   console.log(rentalProducts);
    return(
        <>
            <div className={classes.mainContainer}>
                <div className={classes.largeScreenFilter}>
                    <Filter handlePriceChange={handlePriceChange} handleLocationChange={handleLocationChange} handleCategoryChange={handleCategoryChange} />
                </div>
                <div  className={classes.mobileScreenFilter}>
                <Mobilefilter handlePriceChange={handlePriceChange} handleLocationChange={handleLocationChange} handleCategoryChange={handleCategoryChange} />
                </div>
                {!filteredProducts &&  <Loader />}
                {filteredProducts?.length == 0 && <Nodata />} 
                <div className={classes.productList}>
                    {filteredProducts?.map((product:Product,index:any) =>(
                        <Link to ={`/rents/${product.product_id}`} key = {product.product_id} className={classes.cardLink}>
                        {product.product_owner_id !== userId &&   (
                                <div className={classes.card} >
                                <img  alt={product.title} className={classes.cardimage} src={`${Baseurl}${product.images.slice(0,-1)}`}/>
                                <div className={classes.productDetails}>
                                    <span className={classes.cardprice}>$ {product.price}</span>
                                    <span className={classes.cardTitle}>{product.name}</span>
                                    <span className={classes.cardDescription}>{product.description}</span>
                                    <span className={classes.cardLocation}>{product.location}</span>
                                    <span>
                                    </span>
                                </div>
                            </div>
                        )}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};
export default RentalProducts;
