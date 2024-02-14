import React, { useState, ChangeEvent } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Header from "../../Header/header";
import "./Post.css"; 
import { PostApiCall } from "../../utilities/CommonHTTP";
import { authHeaders, buy_add_product, buy_cart_products } from "../../utilities/ApiEndpoints";
import { getAuthToken } from "../../utilities/CommonFunctions";

const Post = () => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [price,setPrice] = useState<string>("")

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      console.log(e.target.files[0]);
    } else {
      console.log("Please Upload Image");
    }
  };

  const formData = new FormData();
  formData.append("title",title);
  formData.append("description",description);
  formData.append("category",category);
  formData.append("duration",duration);
  formData.append("location",location);
  formData.append("price",price)
  if (image) {
    formData.append("image_files", image);
};
const formHeaders =
  {
    "accept": "application/json",
    "Authorization": authHeaders.Authorization,
    "Content-Type": "multipart/form-data",
  }
  const handleUpload = async (event:React.FormEvent) => {
    event.preventDefault();
    setCategory('');
    setDescription('');
    setPrice('');
    setTitle('');
    setDuration('');
    setLocation('');
    setImage(null);
    const respone:any = await PostApiCall(buy_add_product,formData, formHeaders)
    if(respone.status ==200){
      alert("prpoduct added sucessfully");
    }else{
      alert('failed to add product');
      console.log(respone);
    }
  };

  return (
    <form onSubmit={handleUpload}>
        <div className="buy-post">
      <div className="buy-post-form">
        <h2>Post Your Buy Product</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
        <input
          type="text-area"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input-field"
        />
         <input
          type="text"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input-field"
        />
        <button  className="btns upload-button">
          Post Product
        </button>
      </div>
    </div> 
    </form>
    
  );
}

export default Post;