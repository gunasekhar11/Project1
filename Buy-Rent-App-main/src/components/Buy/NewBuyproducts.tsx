import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { AiOutlineHeart } from "react-icons/ai";
import "./Buyproducts.css";
import { GetApiCall } from "../utilities/CommonHTTP";
import { Link } from "react-router-dom";
import { Baseurl, authHeaders, current_user, headers, buy_new_products} from "../utilities/ApiEndpoints";
import Loader from "../Loader/Loader";
import Nodata from "../NoData/Nodata";

interface Product {
  id: number;
  title: string;
  description: string;
  duration: number;
  images: string;
  price: number;
  category: string;
  location: string;
  time: string;
  addedToWishlist?: boolean;
  s_owner_id :number
}

interface HeaderProps {
  HeaderQuery: string;
}

const NewBuyproducts: React.FC<HeaderProps> = ({HeaderQuery}) => {

  // State variables
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  //Getting the logged-in user id
  const loginedUser:any = GetApiCall(current_user,authHeaders);
  const userId = loginedUser?.data?.data?.user_id;

  //Getting all new products 
  const newbuyproducts:any = GetApiCall(buy_new_products, headers) 
  // console.log("new :",newbuyproducts?.data)

  // Event handlers
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };


  // Filter and update data based on filters and query
    const filteredProducts = newbuyproducts?.data?.data.filter((product: Product) => {
      const categoryMatch = !category || product.category === category;
      const priceMatch = !price || product.price <= parseInt(price);
      const notUserProducts = product.s_owner_id !== userId;
      const queryMatch =
        !HeaderQuery ||
        product.title.toLowerCase().includes(HeaderQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(HeaderQuery.toLowerCase());

      return categoryMatch && priceMatch && notUserProducts && queryMatch;
    });

    // console.log("Filtered",filteredProducts)


  return (
    <div>
      <div className="buyy-display">
        <div className="buy-display">
          <Sidebar
            handlePriceChange={handlePriceChange}
            handleCategory={handleCategory}
          />
        </div>
        <div className="buyproducts">
          {!filteredProducts && <Nodata />}
          {/* {filteredProducts?.length ==0 && null} */}
          {filteredProducts?.map((detail: any) => (
             <Link to = {`/buy/productdetails/${detail.id}`} key = {detail.id} className="cardlink_buy" >
             <section  className="buycard" >
                <AiOutlineHeart  className="wishlist-heart-buy"/>
                <div className="buy-product-image">
                  <img src={Baseurl+detail.images.slice(0,-1)} alt={detail.title} className="buyimg" />
                </div>
                <div className="buy-products-description">
                  <h3 className="card-title-buy">{detail.title}</h3>
                  <div className="buy-category">{detail.category}</div>
                  <div className="price-buy">${detail.price}</div>
                </div>
              </section>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NewBuyproducts;