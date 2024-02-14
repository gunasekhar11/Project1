import React, { useEffect, useState, ChangeEvent, } from "react";
import { useParams, Link } from "react-router-dom";
import classes from "./RentalProductDetails.module.css";
import Header from "../../Header/header";
import { GetApiCall, PostApiCall } from "../../utilities/CommonHTTP";
import { Baseurl, authHeaders, headers, rental_product_ratings, rental_product_reviews, rental_products, rental_request } from "../../utilities/ApiEndpoints";
import Loader from "../../Loader/Loader";
import Cookies from "universal-cookie";

//Defing useparams type
interface ParamType {
    id: string,
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

const RentalProductDetails: React.FC = () => {

    //states
    const [rentDuration, setRentDuration] = useState<number>(1);


    //cookies
    const cookies = new Cookies();
    const tokenFromCookies = cookies.get("jwt_authorisation");

    //Getting the today date and changing formate of Date
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    //getting the params
    const { id } = useParams<ParamType | any>();

    //fetching all products data
    const products:any = GetApiCall(rental_products,headers);

    //finding the single product
    const rentProduct = products?.data?.data.find((item:Product) => (Number(id) == item.product_id));

    //function for fetching the product reviews
    const reviewsResponse:any = GetApiCall(rental_product_reviews,headers);
    const Reviews =reviewsResponse?.data?.reviews?.filter((item:any) => item.product_id == id)

    //function for fetching the product ratings and calculate averge product rating
    const ratingsResponse:any = (GetApiCall(rental_product_ratings,headers));
    const Ratings = ratingsResponse?.data?.ratings.filter((item: any) => item.product_id == id);

    const average_rating =(Ratings?.reduce((accumulator:any, currentObject:any) => {
        return accumulator + currentObject.ratings;
      }, 0))/Ratings?.length ;

    //function to handle duration change
    const priceRangeHandlar = (event: ChangeEvent<HTMLInputElement>) => {
        setRentDuration(Number(event.target.value));
    };

    // function for sending rent request
    const sendRequest =async (product_id: any, duration: any) => {
        const requestBody = {request_product_id:product_id,request_date: formattedDate,duration: String(duration)}
        const sendRequestResponse:any = await PostApiCall(rental_request,requestBody,authHeaders);
        sendRequestResponse?.data?.status_code == 201 ? alert(sendRequestResponse?.data?.message) : alert("Sending Request Failed");
    }

    
    return (
        <div className={classes.rental_products_details}>
            <div className={classes.arrow} >
                <Link to="/rents">
                    <svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Outline 24px / arrow-left">
                            <g id="Vector">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6667 34.9998C11.6667 33.389 12.9726 32.0832 14.5834 32.0832H55.4167C57.0276 32.0832 58.3334 33.389 58.3334 34.9998C58.3334 36.6107 57.0276 37.9165 55.4167 37.9165H14.5834C12.9726 37.9165 11.6667 36.6107 11.6667 34.9998Z" fill="#3A3A3A" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M37.0625 12.5208C38.2015 13.6598 38.2015 15.5065 37.0625 16.6456L18.7082 34.9998L37.0625 53.3541C38.2015 54.4931 38.2015 56.3399 37.0625 57.4789C35.9234 58.6179 34.0767 58.6179 32.9377 57.4789L12.521 37.0622C11.382 35.9232 11.382 34.0765 12.521 32.9374L32.9377 12.5208C34.0767 11.3817 35.9234 11.3817 37.0625 12.5208Z" fill="#3A3A3A" />
                            </g>
                        </g>
                    </svg>
                </Link>
            </div>
            <div className={classes.productContainer}>

                <div className={classes.ImageContainer}>
                    {!rentProduct && <Loader />}
                    <img className={classes.ProductImage} src={`${Baseurl}${rentProduct?.images.slice(0, -1)}`} alt={rentProduct?.name}></img>
                </div>
            </div>
            <div className={classes.productDetailsContainer}>
                <div className={classes.ProductDetails}>
                    <p className={classes.productName}>{rentProduct?.name}</p>
                    <span className={classes.rating}>
                        <svg width="20" height="15" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0088 0.946216C9.8193 0.583581 9.42823 0.354004 9.00003 0.354004C8.57184 0.354004 8.18077 0.583581 7.99124 0.946216L5.93524 4.88004L1.33733 5.51476C0.913696 5.57324 0.561931 5.85374 0.429881 6.23838C0.297831 6.62301 0.408388 7.04509 0.715083 7.32722L4.0412 10.3869L3.25622 14.7094C3.18383 15.108 3.35736 15.5109 3.70383 15.7486C4.05031 15.9863 4.50963 16.0177 4.88867 15.8294L9.00003 13.7874L13.1114 15.8294C13.4904 16.0177 13.9498 15.9863 14.2962 15.7486C14.6427 15.5109 14.8162 15.108 14.7438 14.7094L13.9589 10.3869L17.285 7.32722C17.5917 7.04509 17.7022 6.62301 17.5702 6.23838C17.4381 5.85374 17.0864 5.57324 16.6627 5.51476L12.0648 4.88004L10.0088 0.946216Z" fill="black" />
                        </svg><span className={classes.ratingText}>{Ratings?.length ==0 ? 0 : average_rating}</span>
                    </span>
                    <span className={classes.review}>{Reviews?.length} Reviews</span>
                    <span className={classes.options}>options</span>
                    <div className={classes.colorsTable}>
                        <div >
                            <table className={classes.tableColor} style={{ border: `0.5px solid ${rentProduct?.color}` }} >
                                <tbody>
                                    <th>{rentProduct?.color}</th>
                                    <tr>${rentProduct?.price}</tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <form>
                        <label htmlFor='time'>Duration in Months</label><br></br>
                        <input onChange={priceRangeHandlar} type='number' min='1' max="12" step="1" defaultValue="1" name="time" />
                        <br></br>
                    </form>
                </div>
                <div className={classes.productDescription}>
                    <p className={classes.productDescriptiontitle}>Details</p>
                    <div className={classes.descriptionContainer}>
                        <p className={classes.descriptionContainerText}>  {rentProduct?.description}</p>
                    </div>
                    <div>
                        <p style={{ fontWeight: "bold", fontSize: "20px" }}>Reviews</p>
                        <div className={classes.productReviews} >
                            <table style={{ border: `solid 1px ${rentProduct?.color}` }}>
                                <ul>
                                    {Reviews?.map((item:any) => (

                                        <tr><li>{item.reviews}</li></tr>
                                    ))}
                                    {Reviews?.length == 0 && <p>No Reviews</p>}
                                </ul>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.productFooter}>
                <div>
                    <p className={classes.optionstext}>with your options</p>
                    <span className={classes.totalPrice} >${rentDuration > 12 && rentProduct?.price}{rentDuration === 0 && rentProduct?.price}{rentDuration <= 12 && rentDuration > 0 && Number(rentProduct?.price) * rentDuration}  </span>
                </div>
                <div>
                    { tokenFromCookies && <button onClick={() => {
                        sendRequest(rentProduct?.product_id, rentDuration)
                    }} className={classes.rentButton}>RENT</button>}
                    { !tokenFromCookies && <Link to ="/login" ><button className={classes.rentButton} >Sing in</button></Link>}
                </div>
            </div>
        </div>
    );
};

export default RentalProductDetails;
