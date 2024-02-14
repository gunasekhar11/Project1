import React, { useState } from "react";
import Logo from "../../Assets/logo_maang.svg";
import "./Payment.css";
import { FaRupeeSign, FaMobileAlt } from "react-icons/fa";
import { AiFillCreditCard } from "react-icons/ai";
import { BiSolidLockAlt } from "react-icons/bi";
import axios from "axios";
import {
  Payment_Baseurl,
  authHeaders,
  creat_order,
  headers,
} from "../utilities/ApiEndpoints";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [price, setPrice] = useState<number>(0);
  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const [number, setNumber] = useState<string>("");
  const handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };
  // const Cashfree = require("cashfree-sdk");
  // const cf = new Cashfree("vaklsfdkank.sj");
  // cf.redirect();

  const pay = () => {
    const data = {
      orderAmount: price,
      customerMobile: number,
    };

    const headers = authHeaders;

    axios
      .post(creat_order, data, { headers })
      .then(function (response) {
        console.log("Response data:", response?.data);
        const session_id = response?.data?.session_id;
        console.log(session_id);
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  };

  const navigate = useNavigate();

  function loadScript(src: string): Promise<boolean> {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function Razorpay(order_id: any) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const data = {
      currency: "INR",
      amount: price,
    };

    // console.log(data);

    const options = {
      order_id: order_id,
      name: "Maang Technologies",
      image: Logo,
      handler: function (response: any) {
        if (response.razorpay_payment_id) {
          navigate("/Payment/success");
        } else {
          navigate("/Payment/failure");
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
    setPrice(0);
  }

  const Pay_Money = () => {
    const data = {
      orderAmount: price,
    };
    const headers = authHeaders;
    axios
      .post(Payment_Baseurl + "razor-pay", data, { headers })
      .then((response) => {
        // console.log(response.data);
        const order_id = response?.data?.id;
        if (order_id) {
          Razorpay(order_id);
        }else{
          alert("Order Id Not Generated")
        }
      })
      .catch((error) => {
        console.error(error); // Log any errors
      });
  };

  return (
    <section className="payment-layout">
      <div className="payment-container">
        <img src={Logo} className="logo" alt="logo" />
        <br />
        <h5>Payment Gateway</h5>
        <div className="input-price-layout">
          <div>
            {/* <label htmlFor="Mobile">
              <FaMobileAlt /> Enter Mobile Number
            </label>
            <br />
            <input
              id="Mobile"
              type="tel" // Assuming it's a phone number input
              onChange={handlePhoneNumber}
              value={number}
            />
            <br />
            <br /> */}
            <label htmlFor="Price">
              <FaRupeeSign /> Enter Amount
            </label>
            <br />
            <input
              id="Price"
              type="number"
              onChange={handlePrice}
              value={price}
            />
          </div>
        </div>
        <div className="buttons">
          <button type="button" className="btn btn-outline-success px-5" onClick={()=>{navigate("/..")}}>
            Back
          </button>
          <button
            type="button"
            className="btn btn-outline-success px-5"
            onClick={Pay_Money}
          >
            Pay ₹{price}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Payment;
