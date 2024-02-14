import axios from "axios";
import { useEffect, useState } from "react";

const GetApiCall = (url: any, headers: any = {})  =>{
  const [data , setData] = useState({})
  useEffect(()=> { Request() },[]);
  const Request = async ()=> {
    try {
      const response = await axios.get(url, { headers })
      setData(response)
    } catch (error) {
      console.error("GET Request Error:", error);
      return error;
    }
  };
  return data
}

const PostApiCall = async(url : any , data : any , headers : any = {}) =>{
    try {
      const response = await axios.post(url, data, { headers });
      return response
    } catch (error) {
      console.error("POST Request Error:", error);
      throw error;
    }
}


const PutApiCall = async(url: any, data: any, headers: any = {}) =>{
    try {
      const response = await axios.put(url, data, { headers });
      return response
    } catch (error) {
      console.error("PUT Request Error:", error);
      throw error;
    }
}

const DeleteApiCall = async(url: any, headers: any = {}) =>{
    try {
      const response = await axios.delete(url, { headers });
      return response;
    } catch (error) {
      console.error("DELETE Request Error:", error);
      throw error;
    }
}
export {
  GetApiCall,
  PostApiCall,
  PutApiCall,
  DeleteApiCall
};



