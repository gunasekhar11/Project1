import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Productdetails.css";
import Cookies from "universal-cookie";
import { FaStar } from "react-icons/fa";
import {
  Baseurl,
  authHeaders,
  buy_addTo_Cart,
  buy_addTo_wishlist,
  buy_cart_products,
  buy_listed_products,
  buy_product_ratings,
  buy_wishlist_products,
  headers,
} from "../../utilities/ApiEndpoints";
import { GetApiCall, PostApiCall } from "../../utilities/CommonHTTP";
import { AiOutlineHeart } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";

interface Product {
  id: number;
  title: string;
  description: string;
  duration: number;
  images: string;
  price: number;
  category: string;
  location: string;
}

const Productdetails: React.FC = () => {
  const { data } = useParams<{ data: string }>();

  //cookies
  const cookies = new Cookies();
  const tokenFromCookies = cookies.get("jwt_authorisation");

  //all buy products
  const allProducts: any = GetApiCall(buy_listed_products, headers);

  //all cart items
  const cartItems: any = GetApiCall(buy_cart_products, authHeaders);

  //all wishlist items
  const wishlistItems: any = GetApiCall(buy_wishlist_products, authHeaders);

  //function to find wheather the item is in cart ot not
  const findItemInCart = (id: any) => {
    const items = cartItems?.data?.find(
      (cartItem: any) => cartItem?.product_id == id
    );
    if (items) {
      return true;
    }
    return false;
  };

  //function to find wheather the item is in wishlist or not
  const findItemInWishllist = (id: any) => {
    const items = wishlistItems?.data?.find(
      (Item: any) => Item?.product_id == id
    );
    if (items) {
      return true;
    }
    return false;
  };

  //filtering single product
  var filteredProducts: Product | undefined;

  if (data) {
    filteredProducts = allProducts?.data?.data.find(
      (product: Product) => product.id === parseInt(data)
    );
  }

  //getting single product ratings
  const productData: any = GetApiCall(`${buy_product_ratings}${data}`, headers);
  const productAverageRating = productData.data?.average_rating;
  const productReviews = productData.data?.total_ratings;

  //adding item to cart
  const addToCart = async (id: any) => {
    const response: any = await PostApiCall(
      `${buy_addTo_Cart}${id}`,
      {},
      authHeaders
    );
    alert(response?.data?.message);
    if (response?.status == 200) {
      window.location.reload();
    }
  };

  //adding item to wishlist
  const addToWishlist = async (id: any) => {
    if (!findItemInWishllist(id)) {
      const response: any = await PostApiCall(
        `${buy_addTo_wishlist}${id}`,
        {},
        authHeaders
      );
      alert(response?.data?.message);
      window.location.reload();
      return;
    } else {
      alert("Item Already added to Wishlist");
      return;
    }
  };
  return (
    <div className="buy_product_details">
      <div className="product_details_container">
        <div className="product">
          <div className="heart">
            <Link to={"/buy"} className="cardlink_buy">
              <FaArrowLeft />
            </Link>
            {
              <AiOutlineHeart
                className="wishlist-heart"
                style={{
                  color: findItemInWishllist(filteredProducts?.id)
                    ? "red"
                    : "black",
                }}
                onClick={() => {
                  addToWishlist(filteredProducts?.id);
                }}
              />
            }
          </div>
        </div>
        <div className="image">
            <img
              src={Baseurl + filteredProducts?.images.slice(0, -1)}
              alt=""
              className="product_picture"
            />
          </div>
        <div className="details_view">
          <h1 className="product_name_display">{filteredProducts?.title}</h1>
          <span className="product_description_display">
            {filteredProducts?.description}
          </span>
          <div className="rating_display">
            <FaStar />{" "}
            {productAverageRating !== null
              ? productAverageRating?.toFixed(1)
              : "Loading..."}
          </div>
          <div className="reviews_display">{productReviews} Reviews</div>
          <div className="color_options">
            <span className="options">options</span>
            <table className="brown">
              <tbody>
                <tr>
                  <th>Color</th>
                </tr>
                <tr>
                  <td>
                    Brown <br />
                    In Stock
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="add_to_cartt">
          <div className="price_description">
            <span className="with_your_options">With your options</span>
            <span className="price_of_product">${filteredProducts?.price}</span>
          </div>
          {tokenFromCookies ? (
            <>
              <button disabled={true} className="buy_buttonn">
                Buy
              </button>
              {!findItemInCart(filteredProducts?.id) && (
                <button
                  onClick={() => {
                    addToCart(filteredProducts?.id);
                  }}
                  className="added_to_cart_button"
                >
                  Add to Cart
                </button>
              )}
              {findItemInCart(filteredProducts?.id) && (
                <button
                  onClick={() => {
                    alert("Item already in cart");
                  }}
                  className="added_to_cart_button"
                >
                  Added to Cart
                </button>
              )}
            </>
          ) : (
            <Link to="/login">
              <button className="continue_to_login_button_buy">
                Continue to Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Productdetails;
