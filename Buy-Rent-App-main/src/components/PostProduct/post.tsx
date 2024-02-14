import axios from 'axios'
import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import logo from "./logo_maang.svg"
import AddRentProduct from '../Rental/AddProduct/AddRentProduct'
import UploadForm from '../Exchange/Post/post'
import Header from '../Header/header'
import Post2 from '../Buy/PostBuy/Post'
interface post{
  title : string
  description : string
  category : string
  images : any
  duration : number
  location : string
}

const Post = () => {

  const cookies = new Cookies();
  const tokenFromCookies = cookies.get("jwt_authorisation");
  const authToken = "Bearer ".concat(tokenFromCookies);
  const [buttonClicked,setButtonClicked] = useState("buy");
  const handleSubmit = () =>{
    setButtonClicked("buy")
  }
  const handleSubmit2 = () =>{
    setButtonClicked("rent")
  }
  const handleSubmit3 = () =>{
    setButtonClicked("exchange")
  }

  return (
    <div>
       <div style={{display:"flex",justifyContent:"space-around",paddingTop:"30px"}}>
       <button onClick={handleSubmit} className='btns' >
        Buy
      </button>
      <button onClick={handleSubmit3} className='btns'>
        Exchange
      </button>
      <button  onClick={handleSubmit2} className='btns'>
        Rent
      </button>
       </div>
      <div>
        {buttonClicked === "rent" && <AddRentProduct />}
        {buttonClicked === "exchange" && <UploadForm />}
        {buttonClicked === "buy" && <Post2 />}
      </div>
    </div>
  );
}

export default Post;