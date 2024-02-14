import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./productDetails.css";
import Header from "../../Header/header";
import { Link } from "react-router-dom";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { GetAllUsers, getAuthToken } from "../../utilities/CommonFunctions";
import { Exchange_Products, GetExchangeProductById, User_Exchange_Products } from "../Functions/ExchangeFunctions";
import { Baseurl, authHeaders, post_exchange_request } from "../../utilities/ApiEndpoints";
import { PostApiCall } from "../../utilities/CommonHTTP";
import Loader from "../../Loader/Loader";

interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  duration: number;
  location: string;
  images: any;
  product_owner_id:number;
}

interface users {
  id: number;
  hashed_password: string;
  username: string;
  email: string;
  is_active: boolean;
}

const ExchangeProductdetails = () => {

  const { data } = useParams<{ data: string }>()

  const product = GetExchangeProductById(data)
  const allUsers : users[]= GetAllUsers()
  const user_products : Product[] = User_Exchange_Products()
  
  const findUser = (id: number) => {
    const result = allUsers?.find((user) => user.id === id);
    return result ? result.username : "User not found";
  };

  const [id, setId] = useState<number | null>(null);
  const owner_product : Product[] = user_products?.filter((product) => product.id === id)

  const submitRequest = (requester_id:number,offered_product_id:number,duration:number,desired_product_id:number) => {
    const requestData = {
      'requester_id' : requester_id,
      'offered_product_id' : offered_product_id,
      'duration' : duration,
      'desired_product_id' : desired_product_id
    }
    const request : Promise<any> = PostApiCall(post_exchange_request,requestData,authHeaders)
    request
    .then((result)=>{
    if(result?.data?.status_code == 201){
      alert("Request Sent")
    }
    })
    .catch((error) => {
      console.error(error)
    });
  }

  return (
    <div>
      {product ? (
        <>
          <div className="product-display">
            <div className="main">
              <div className="">
                <h2 className="h3" style={{fontWeight:"bold"}}>Exchange </h2>
                <div className="product">
                  <img
                    src={Baseurl+product.images.slice(0,-1)}
                    alt={product.title}
                    className="product-img"
                  />
                </div>
                <div className="description">
                  <p className="title">{product.title}</p>
                  <p className="location">Owner : {findUser(product.product_owner_id)}</p>
                  <p className="location">Location : {product.location}</p>
                  <p className="duration">Duration : {product.duration} Days</p>
                  <p className="precautions">Precautions :</p>
                    <li className="">&nbsp;&nbsp;&nbsp;&nbsp;{product.description}</li>
                </div>
              </div>
              {owner_product && owner_product?.length > 0 ? (
                <div className="">
                  <h2 className="h3" style={{fontWeight:"bold"}}>With Your </h2>
                  <div className="product">
                    <img
                      src={Baseurl+owner_product[0].images.slice(0,-1)}
                      alt={owner_product[0].title}
                      className="product-img"
                    />
                  </div>
                  <button
                    onClick={() => setId(null)}
                    className="btns"
                    style={{ marginBottom: "0px" }}
                  >
                   <BsChevronDoubleLeft /> Change Product
                  </button>
                  <div className="description">
                    <p className="title">{owner_product[0].title}</p>
                    <p className="location">Owner : {findUser(owner_product[0].product_owner_id)}</p>
                    <p className="location">Location : {owner_product[0].location}</p>
                    <p className="duration">Duration : {owner_product[0].duration} Days</p>
                    <p className="precautions">Precautions :</p>
                    <li>&nbsp;&nbsp;&nbsp;{owner_product[0].description}</li>
                  </div>
                </div>
              ) : (
                <div className="">
                  <h2 className="h3" style={{fontWeight:"bold"}}>With Your</h2>
                  <br />
                  {user_products?.length > 0 ? (
                    <ul className="user-products">
                      {user_products.map((product) => (
                        <li
                          className="user-product-item"
                          key={product.id}
                          onClick={() => setId(product.id)}
                        >
                          {product.title}
                        </li>
                      ))}
                    </ul>
                  ) : getAuthToken() ? (
                    <>
                      <p>No products Found Please Post</p>
                      <Link to="/post"><button className="btns">Post Product</button></Link>
                    </>
                  ) : (
                    <>
                      <p className="h4">Please Login To Continue</p>
                      <Link to="/login"><button className="btn btn-dark btns">Login</button></Link>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="buttons">
              <h2 className="h4" style={{fontWeight:"bold"}}>Exchange With Your Options</h2>
              <button
                className="exchange-button"
                onClick={() => {
                  if (product && owner_product && id){
                  submitRequest(product.product_owner_id,id,owner_product[0].duration,product.id);
                  }
                }}
              >
                Exchange
              </button>

              <div className="duration" style={{margin:"20px"}}>
                <p className="h4" style={{fontWeight:"bold",marginBottom:"10px"}}>Upto</p>
                <br />
                <p className="h5" style={{fontWeight:"bold"}}>
                  {product.duration}&nbsp;Days
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ExchangeProductdetails;
