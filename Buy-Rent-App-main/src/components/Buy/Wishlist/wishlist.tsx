import React, { useState, useEffect } from "react";
import './wishlist.css';
import { Baseurl, authHeaders, buy_removeFrom_cart, buy_removeFrom_wishlist, buy_wishlist_products, headers } from "../../utilities/ApiEndpoints";
import { DeleteApiCall, GetApiCall } from "../../utilities/CommonHTTP";

const Wishlist: React.FC = () => {

  //fetching wishlist products
  const wishlistProducts:any = GetApiCall(buy_wishlist_products,authHeaders);

  //function to remove item  from wishlist
  const handleRemoveFromWishlist = async (productId: number) => {
    const response:any = await DeleteApiCall(buy_removeFrom_wishlist+productId,authHeaders);
    if(response?.status == 200 ){
      alert("removed from cart sucessfully") ;
      window.location.reload()
    } else{
      alert('failed to remove item from wishlist');
    }
  };

  return (
    <div>
      <div className="wishlist">
      {wishlistProducts?.data?.length > 0 ?  (<h2 className="wishlist_items">MY WISHLIST ({wishlistProducts?.data?.length})</h2> ) : 
        (<h1 className="wishlist_empty_buy" style={{textAlign:'center'}}> Your wishlist is Empty!</h1>) }
        <div className="wishlist_box">
          {wishlistProducts?.data?.map((wishlistproduct:any) => (
            <div className="wishlist_card" key={wishlistproduct.product_id}>
              <div className="wishlist_image_card">
                <img className="wishlist_image" style={{alignItems:'center'}} src={Baseurl+wishlistproduct.product_images.slice(0,-1)} alt={wishlistproduct.title} />
              </div>
              <div className="wishlist_description">
                <h6 className="wishlist_image_name">{wishlistproduct.product_name}</h6>
                <span className="wishlist_image_price">$ {wishlistproduct.product_price}</span>
              </div>
              <div className="wishlist_remove_button">
                <button className="remove_button" onClick={() => handleRemoveFromWishlist(wishlistproduct.product_id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
