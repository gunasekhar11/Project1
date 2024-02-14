import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { CgProfile } from "react-icons/cg";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Header from "../../Header/header";
import axios from "axios";
import "./requests.css";
import { GetApiCall } from "../../utilities/CommonHTTP";
import { GetAllUsers, getAuthName } from "../../utilities/CommonFunctions";
import { accept_request, allusers, authHeaders, exchange_received_requests, exchange_sent_requests } from "../../utilities/ApiEndpoints";
import { Exchange_Products } from "../Functions/ExchangeFunctions";

interface recievedRequest {
  request_id: number;
  offered_product_id: number;
  desired_product_id: number;
  requester_id: number;
  status: string;
}

interface sentRequests {
  requester_id: number;
  offered_product_id: number;
  duration: number;
  id: number;
  desired_product_id: number;
  status: string;
}

interface users {
  id: number;
  hashed_password: string;
  username: string;
  email: string;
  is_active: boolean;
}

interface product {
  title: string;
  description: string;
  images: string;
  location: string;
  category: string;
  id: number;
  duration: number;
  product_owner_id: number;
}

const Requests: React.FC = () => {
  const cookies = new Cookies();
  const tokenFromCookies = cookies.get("jwt_authorisation");
  const authToken = "Bearer ".concat(tokenFromCookies);

  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchReceivedRequests : any= GetApiCall(exchange_received_requests , authHeaders)
  const receivedRequests :recievedRequest[] = fetchReceivedRequests?.data?.data

  const fetchSentRequests : any = GetApiCall(exchange_sent_requests,authHeaders)
  const sentRequests : sentRequests[] = fetchSentRequests?.data?.data

  const users : users[] = GetAllUsers()

  const products : product[] = Exchange_Products()

  const findUser = (id: number) => {
    const result = users?.find((user) => user.id === id);
    return result ? result.username : "User not found";
  };

  const findProductowner = (id:number) => {
        const result = products?.find((product) => product.id == id);
        return result ? findUser(result.product_owner_id) : "Name Not Found";
  }

  const findNameofproduct = (id: number) => {
    const result = products?.find((product) => product.id == id);
    return result ? result.title : "Name Not Found";
  };

  const [activeTab, setActiveTab] = useState<"recieved" | "sent">("recieved");

  const handleTabChange = (tabName: "recieved" | "sent") => {
    setActiveTab(tabName);
  };

  const handleRequest = (id: number, doAccept: number) => {
    const url = accept_request+`${id}/${doAccept}`;
    const headers = authHeaders
    axios
      .put(url, null, { headers })
      .then((response) => {
        console.log("Response:", response.data);
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="requests">
        <div style={{ display: "flex", justifyContent: "space-around" }} className="requests-header"> 
          <button onClick={() => handleTabChange("recieved")} className="btns">
            Requests Recieved
          </button>
          <button onClick={() => handleTabChange("sent")} className="btns">
            Sent Requests
          </button>
        </div>
        <div>
          {activeTab === "recieved" && (
            <div>
              <h2>Received Requests</h2>
              {receivedRequests?.length > 0 ? (
                <div className="requests-list">
                  {receivedRequests.map((request) => (
                    <li
                      key={request.request_id}
                      className="requests-card"
                      onClick={() => setButtonClicked(true)}
                    >
                      <CgProfile
                        style={{ width: "30px", height: "30px" }}
                      />
                        <p className="">
                        {findUser(request.requester_id)}
                        <br />
                        Requested to Exchange <br />
                        Your {findNameofproduct(request.desired_product_id)} <br />
                        With {findNameofproduct(request.offered_product_id)} <br />
                        of You
                        </p>
                      {request.status === "Pending" ? (
                        <>
                          <div>
                            <button
                              className="btns"
                              style={{ height: "30px",backgroundColor:"green",color:"white"}}
                              onClick={() => {
                                handleRequest(request.request_id, 1);
                                setButtonClicked(!buttonClicked);
                              }}
                            >
                              <BiCheckCircle />
                            </button>
                            <p>Accept</p>
                          </div>
                          <div>
                          <button
                            className="btns"
                            style={{ height: "30px",backgroundColor:"red",color:"black" }}
                            onClick={() => {
                              handleRequest(request.request_id, 0);
                              setButtonClicked(!buttonClicked);
                            }}
                          >
                            <BiXCircle />
                          </button>
                          <p>Reject</p>
                          </div>
                        </>
                      ) : request.status === "accepted" ? (
                        <>
                          <div>
                            <button
                              className="btns"
                              style={{
                                height: "30px",
                                backgroundColor: "green",
                                color: "white",
                              }}
                              disabled
                            >
                              <BiCheckCircle />
                            </button>
                            <p>Accepted</p>
                          </div>
                        </>
                      ) : request.status === "rejected" ? (
                        <>
                          <div>
                            <button
                              className="btns"
                              style={{
                                height: "30px",
                                backgroundColor: "red",
                                color: "black",
                              }}
                              disabled
                            >
                              <BiXCircle />
                            </button>
                            <p>Rejected</p>
                          </div>
                        </>
                      ) : null}
                    </li>
                  ))}
                </div>
              ) : (
                <p>No received requests found.</p>
              )}
            </div>
          )}
          {activeTab === "sent" && (
            <div>
              <h2>Sent Requests</h2>
              {sentRequests?.length > 0 ? (
                <div className="requests-list">
                  {sentRequests.map((request) => (
                    <li key={request.id} className="requests-card">
                      <CgProfile
                        style={{ width: "30px", height: "30px" }}
                      />
                      <p>Request Sent To <br />{findProductowner(request.desired_product_id)} <br />For {findNameofproduct(request.desired_product_id)} <br />With Your {findNameofproduct(request.offered_product_id)} </p>
                      <div>
                        <p>Status</p>
                        {request.status === "accepted" ? (
                          <div>
                          <button
                            className="btns"
                            style={{ backgroundColor: "green", color: "white" }}
                          >
                            <BiCheckCircle />
                          </button>
                          <p>Accepted</p>
                          </div>
                        ) : request.status === "rejected" ? (
                          <div>
                          <button
                            className="btns"
                            style={{ backgroundColor: "red", color: "black" }}
                          >
                            <BiXCircle />
                          </button>
                          <p>Rejected</p>
                          </div>
                        ) : request.status === "Pending" ? (
                          <div>
                          <button
                            className="btns"
                            style={{
                              backgroundColor: "orange",
                              color: "white",
                            }}
                          >
                            <AiOutlineExclamationCircle />
                          </button>
                          <p>Pending</p>
                          </div>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </div>
              ) : (
                <p>No sent requests found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Requests;
