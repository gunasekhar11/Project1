import React from "react";
import {useState} from "react";
import {useEffect} from "react";
import { Link } from "react-router-dom";
import classes from "./requests.module.css";
import Cookies from "universal-cookie";
import { BiUserCircle } from "react-icons/bi";
import Header from "../../Header/header";
import { GetApiCall, PutApiCall } from "../../utilities/CommonHTTP";
import { Baseurl, allusers, authHeaders, headers, rental_products, rental_received_requests, rental_sent_requests } from "../../utilities/ApiEndpoints";


const RentalRequests:React.FC = () =>{

  //States
  const [sentRequestsButtonClicked, setSentRequestsButtonClicked] = useState(false);
  const [activeButton, setActiveButton] = useState("received");

  //fetching  all products data
  const productsApiResponse:any = GetApiCall(rental_products,headers);

   //fetching users data 
   const users:any = GetApiCall(allusers,headers);

   //fetching loginded user sent requests 
   const sentRequests:any = GetApiCall(rental_sent_requests,authHeaders);
  

  //fetching loginded user received requests
  const receviedRequests:any = GetApiCall(rental_received_requests,authHeaders)

  //function for handling  switching requests i.e either sentRequests or ReceivedRequests
  const handleSwitchRequests = (requestsType: "sent" | "received") => {
    if (requestsType === "sent") {
      setSentRequestsButtonClicked(true);
      setActiveButton("sent");
    } else if (requestsType === "received") {
        setSentRequestsButtonClicked(false);
        setActiveButton("received");
    }
};

  //function which returns  user name
  const requestedUserHandle = (id:number) =>{
    const user = users?.data?.data.find((item:any) => item.id == id );
    return user.username;
  }
  

  //function to  accept or rejecting the requested
  const statusChangeHandle = async (request_id:any,num:any) =>{
  const obj = {request_id,num,}
  await PutApiCall(`${rental_received_requests}/${request_id}/${num}`,obj,authHeaders)
  window.location.reload();
  }
   
//function which return  the user name and product image
  const rentProductDataHandle = (id:number,data : "image" | "name" | "sentRequestUser"):any =>{
    const newId = id;
    if(data === "name"){
      return productsApiResponse?.data?.data[newId-1]?.name;
    }
    else if (data === "sentRequestUser"){
      return productsApiResponse?.data?.data[newId-1]?.product_owner_id
    }else{
      return <img className={classes.RequestedProductImage} src={`${Baseurl}${productsApiResponse?.data?.data[newId-1]?.images.slice(0,-1)}`} style ={{boxSizing:"border-box",width:"100px",height:"100px",textAlign:"right"}}alt={productsApiResponse?.data?.data[newId]?.title} />
    }
  }

  return(
    <>
      <div className={classes.buttonsContainer}>
        <button  className={`${classes.RequestsButton} ${activeButton === "sent" ? classes.activeButton : ''}`} onClick={() => handleSwitchRequests("sent")}>
          Sent Requests
        </button>
        <button  className={`${classes.RequestsButton} ${activeButton === "received" ? classes.activeButton : ''}`} onClick={() => handleSwitchRequests("received")}>
          Received Requests
        </button>
      </div>
      {sentRequestsButtonClicked && sentRequests?.data?.data.length == 0 && <div className={classes.emptyRequests} style={{margin:"50px auto",fontWeight:"bold",fontSize:"25px"}}><p>Sent Requests Are Empty</p></div>}
      <div className={classes.sentRequestsContainer}>
      {sentRequestsButtonClicked  && sentRequests?.data?.data.length > 0 &&
          sentRequests?.data?.data.map((item: any) => (
            <Link className ={classes.Link} to ={`/rents/${item?.request_product_id}`}>
              <div key={item?.request_id} className={classes.sentRequestCard} >
              <div >
                  {rentProductDataHandle(item?.request_product_id,"image")}
                </div>
                <div className={classes.sentRequestDetails} >
                    <span className={classes.sentRequestTexts}>REQUESTED TO : {requestedUserHandle( rentProductDataHandle(item?.request_product_id,"sentRequestUser"))}</span><br />
                    <span className={classes.sentRequestTexts}>PRODUCT NAME : {rentProductDataHandle(item?.request_product_id,"name")}</span><br />
                    <span className={classes.sentRequestTexts}>REQUESTED DATE :{item?.request_date}</span><br />
                    {item?.status ==="Pending"  && <button className={classes.pendingButton}>Pending</button>}
                    {item?.status ==="accepted" && <button className={classes.acceptedButton }>Accepted</button>}
                    {item?.status ==="rejected" && <button className={classes.rejectedButton}>Rejected</button>}
                </div>
              </div>
            </Link> 
          ))}
      </div>
     <div className={classes.receivedRequestsContainer}>
     {!sentRequestsButtonClicked && receviedRequests?.data?.data[0].length ==0 && <div className={classes.emptyRequests} style={{margin:"50px auto",fontWeight:"bold",fontSize:"25px"}}><p>Received Requests Are Empty</p> </div>}
     {!sentRequestsButtonClicked && receviedRequests?.data?.data[0].map((item:any) => (
        <div key={item?.request_id} className={classes.receivedRequestCard}>
            <div  className={classes.userIconContainer}>
              <BiUserCircle  className={classes.userIcon} title="view user profile"></BiUserCircle>
            </div>
            <div className={classes.ReceiveRequestDetails}>
              <p className={classes.requestedContainers}><span className={classes.s}>Requested   By :</span> {requestedUserHandle(item?.requester_id)}</p><p className={classes.received_requests_requestedName}>Requested </p>
              <p className={classes.requestedContainers}><span className={classes.s}>Product  Name:</span>Your {rentProductDataHandle(item?.request_product_id,"name")}</p><p className={classes.received_requests_requestedName}>on</p>
              <p className={classes.requestedContainers}><span className={classes.s}>Requested Date : </span>{item?.request_date}</p>
              {item?.status ==="accepted" && <button className={classes.acceptedButton }>Accepted</button>}
              {item?.status ==="rejected" && <button className={classes.rejectedButton}>Rejected</button>}
              {item?.status ==  "Pending" &&
              <div> <button  className={classes.acceptedButton } id="1" onClick={() => statusChangeHandle(item?.request_id,1) } >Accept</button><button className={classes.rejectedButton} onClick={() => statusChangeHandle(item?.request_id,0)}>Reject</button> </div>}
            </div>
            <div  style={{display:"flex",alignItems:"center"}}>
             <Link className ={classes.Link} to ={`/rents/${item?.request_product_id}`}>
              {rentProductDataHandle(item?.request_product_id,"image")}
              </Link>
            </div>
        </div>
      ))}
     </div>
     
    </>
  );
};
export default RentalRequests;
