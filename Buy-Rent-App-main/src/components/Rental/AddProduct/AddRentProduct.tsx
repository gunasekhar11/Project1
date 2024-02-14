import React, { useRef } from "react";
import classes from "./AddRentProduct.module.css";
import { useState } from "react";
import { PostApiCall } from "../../utilities/CommonHTTP";
import { authHeaders, rental_add_product } from "../../utilities/ApiEndpoints";


//type definations
interface ProductData {
    image: File;
}

const AddRentProduct = () =>{

    //states
    const [priceData, setPriceData] = useState({colors: [{ colorName: "", colorPrice: "" }],});
    const [images, setImages] = useState<File| null>(null);
    const [color,setColor] = useState<string>("");
    const [description,setDescription] = useState<string>("");
    const [name,setName] = useState<string>("");
    const [title,setTitle] = useState<string>("");
    const [price,setPrice] = useState<string>("");
    const [location,setLocation] = useState<string>("");


    //form object to store the form data
    const formData = new FormData();
    formData.append("title",title);
    formData.append("name",name);
    formData.append("location",location);
    formData.append("price",price)  ;
    formData.append("color",color);
    formData.append("description",description);
    formData.append("images","images");
    if (images) {
        formData.append("image_files", images);
    };

    //form data handling functions to store form data in state
    const colorChangeHandle = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setColor(event.target.value);
    }

    const priceChangeHandle = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setPrice(event.target.value);
    }

    const locationChangeHandle = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setLocation(event.target.value);
    }

    const nameChangeHandle = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setName(event.target.value);
    }

    const titleChangeHandle = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setTitle(event.target.value);
    }

    const descriptionChangeHandle = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setDescription(event.target.value);
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        if (event.target.files && event.target.files.length>0 ) {
          setImages(event.target.files[0]);
        }
    };

    // function for sending the new product data to databse
    const postData = async (event:React.FormEvent) => {
        event.preventDefault();
        const sendRequestResponse:any = await PostApiCall(rental_add_product,formData,{
            accept : "application/json",
            Authorization: authHeaders.Authorization,
            "Content-Type" :"multipart/form-data",
        });
        sendRequestResponse?.data?.status_code == 201 ? alert(sendRequestResponse?.data?.message) : alert("Sending Request Failed");
    }

    return(
        <>
            <div className={classes.container}>
                <h3 style={{textAlign:"center"}}>Post Your Rent Product</h3>
                <form onSubmit={postData} className={classes.styledForm}>
                    <input placeholder="Product Name" onChange={nameChangeHandle} type="text" className={classes.inputField} />
                    
                    <input placeholder="Product Title eg: Bike" onChange={titleChangeHandle} type="text" className={classes.inputField} />
                    
                    <input  type="file"  onChange={handleImageChange} className={classes.inputField} />
                   
                    <input placeholder="Location" onChange={locationChangeHandle} type="text" className={classes.inputField} />

                    <input value={color} placeholder="color" onChange={colorChangeHandle} type="text" className={classes.inputField} />

                    <input onChange={priceChangeHandle} placeholder="Price" type="number" className={classes.inputField} />
                    
                    <input placeholder="Description" type="text" onChange={descriptionChangeHandle} className={classes.inputField} />
                    <button type="submit" className={classes.submitButton}>Submit</button>
                </form>
            </div>
        </>
    );
};
export default AddRentProduct;