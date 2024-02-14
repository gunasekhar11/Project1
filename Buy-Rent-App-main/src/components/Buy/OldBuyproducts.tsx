import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { AiOutlineHeart } from "react-icons/ai";
import "./Buyproducts.css";
import { GetApiCall } from "../utilities/CommonHTTP";
import { Link } from "react-router-dom";
import { Baseurl, authHeaders, current_user, headers, buy_old_products} from "../utilities/ApiEndpoints";
import Loader from "../Loader/Loader";
import Nodata from "../NoData/Nodata";

interface HeaderProps {
  HeaderQuery: string;
}

const OldBuyproducts: React.FC<HeaderProps> = ({HeaderQuery}) => {

  // State variables
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

   //Getting the logged-in user id
   const loginedUser:any = GetApiCall(current_user,authHeaders);
   const userId = loginedUser?.data?.data?.user_id;

   //Getting all old products 
   const oldbuyproducts:any = GetApiCall(buy_old_products, headers) 

  // Event handlers
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };



  // Filter and update data based on filters and query
    const filteredProducts = oldbuyproducts?.data?.data.filter((product:any) => {
      const categoryMatch = !category || product.category === category;
      const priceMatch = !price || product.price <= parseInt(price);
      const notUserProducts = product.s_owner_id !== userId;
      const queryMatch =
        !HeaderQuery ||
        product.title.toLowerCase().includes(HeaderQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(HeaderQuery.toLowerCase());

      return categoryMatch && priceMatch && queryMatch && notUserProducts;
    });

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
          {!filteredProducts   && <div style={{"margin":"100px auto"}}><Nodata /></div>}
          {filteredProducts?.length ==0 && <Nodata />}
          {filteredProducts?.map((detail: any, index: any) => (
            <Link to = {`/buy/productdetails/${detail.id}`}  key = {detail.id} className="cardlink_buy" >
              <section className="buycard" >
              <AiOutlineHeart className="wishlist-heart-buy" />
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

export default OldBuyproducts;
