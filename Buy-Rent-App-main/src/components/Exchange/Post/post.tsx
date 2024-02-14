import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import "./post.css"; // Import your CSS file
import { Baseurl, authHeaders } from "../../utilities/ApiEndpoints";
import { getAuthToken } from "../../utilities/CommonFunctions";
import { PostApiCall } from "../../utilities/CommonHTTP";

const UploadForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      console.log(e.target.files[0]);
    } else {
      console.log("Please Upload Image");
    }
  };

  const handleUpload = async () => {
    const baseUrl = Baseurl+"exchange/post_product";
    const formHeaders =
  {
    "accept": "application/json",
    "Authorization": authHeaders.Authorization,
    "Content-Type": "multipart/form-data",
  }
    const formData = new FormData();
    formData.append("title",title);
    formData.append("description",description);
    formData.append("category",category);
    formData.append("duration",duration);
    formData.append("location",location);
    if (image) {
      formData.append("image_files", image);
    }
    const respone:any = await PostApiCall(baseUrl,formData, formHeaders)
    if(respone.status ==200){
      alert("product added sucessfully");
    }else{
      alert('failed to add product');
      console.log(respone);
    }
  };

  return (
    <div className="exchange-post">
      <div className="exchange-post-form">
        <h2>Post Your Exchange Product</h2>
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
        <button onClick={handleUpload} className="btns upload-button">
          Post Product
        </button>
      </div>
    </div>
  );
}

export default UploadForm;
