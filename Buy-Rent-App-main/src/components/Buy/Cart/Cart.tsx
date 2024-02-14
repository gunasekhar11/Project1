import React, { useState, useEffect } from 'react';
import Header from '../../Header/header';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './Cart.css';
import logo from "../../../Assets/logo_maang.svg"
import { Baseurl } from '../../utilities/ApiEndpoints';
import { getAuthToken } from '../../utilities/CommonFunctions';

// Define the type for cart products
interface CartProduct {
  id: number;
  title: string;
  description: string;
  duration: number;
  images: string;
  price: number;
  category: string;
  location: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    fetchCartProducts();
  }, []);

  // Fetch cart products from the backend
  const fetchCartProducts = async () => {
    try {
      const authToken = "Bearer "+getAuthToken();

      if (!authToken) {
        console.error('Access token missing');
        return;
      }

      const response = await axios.get(`${Baseurl}cart/get_products`, {
        headers: {
          Authorization: authToken,
        },
      });

      // Transform fetched data into the required format for cart products
      const cartData = response.data.map((item: any) => ({
        id: item.product_id,
        title: item.product_name,
        description: item.product_description,
        duration: 0,
        images: item.product_images,
        price: item.product_price,
        category: '',
        location: '',
        quantity: item.quantity,
      }));

      setCartProducts(cartData);
      console.log(cartData);
    } catch (error) {
      console.error('Error fetching cart products:', error);
    }
  };

  // Handle quantity change for a cart product
  const handleQuantityChange = (index: number, newQuantity: number) => {
    // Ensure the new quantity is never below 0
    newQuantity = Math.max(newQuantity, 0);

    const updatedCart = [...cartProducts];
    updatedCart[index].quantity = newQuantity;

    // If the new quantity is 0, remove the item from the cart
    if (newQuantity === 0) {
      handleRemoveFromCart(updatedCart[index].id);
    } else {
      setCartProducts(updatedCart);
    }
  };

  // Handle removing a product from the cart
  const handleRemoveFromCart = async (productId: number) => {
    try {
      const authToken = "Bearer "+getAuthToken();
  
      if (!authToken) {
        console.error('Access token missing');
        return;
      }

      const response = await axios.delete(`${Baseurl}cart/delete_product/${productId}`, {
        headers: {
          Authorization: authToken,
        },
      });

      if (response.status === 200) {
        const updatedCart = cartProducts.filter(product => product.id !== productId);
        setCartProducts(updatedCart);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Calculate GST based on cart products
  const calculateGST = () => {
    if (cartProducts.length === 0) {
      return 0;
    }
    const totalQuantity = cartProducts.reduce((total, product) => total + product.quantity, 0);
    const GSTPerItem = 0.1122; // Replace with the actual GST percentage per item (11.22% in this example)
    const gstValue = totalQuantity * GSTPerItem;
    return parseFloat(gstValue.toFixed(2)); // Convert the final result to a floating-point number
  };

  // Calculate subtotal based on cart products
  const calculateSubtotal = () => {
    return cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  // Calculate grand total by adding subtotal and GST
  const calculateGrandTotal = () => {
    const subtotal = calculateSubtotal();
    const GST = calculateGST(); // GST is already a number with two decimal places
    return subtotal + GST;
  };

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

  async function showRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const price = calculateSubtotal()

    const data = {
      currency: "INR",
      amount: price,
      // id: "order_jkljsjzkjjnkjs"
    };

    console.log(data);

    const options = {
      key: "rzp_test_CYsjIleIgVHeY0",
      key_secret:"4fSJg2T4304IhKyso2uSFu0s",
      currency: data.currency,
      amount: data.amount*100,
      name: "Maang Technologies",
      description: "Thank you for nothing. Please give us some money",
      image: logo,
      prefill: {
        name: "Rajat",
        email: "rajat@rajat.com",
        phone_number: "9899999999"
      },
      theme: {
        color:"#3399cc"
      }
    };
    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  }

  return (
    <div>
      <div className="cart">
        <div className="cart_container">
          {cartProducts.map((cartproduct, index) => (
            <div className="cart_item" key={index}>
              <div className="cart_imagee">
                <img src={Baseurl+cartproduct.images.slice(0,-1)} alt={cartproduct.title} className='cart_image'/>
              </div>
                <div className="cart_image_details">
                  <h2 className="cart_image_name" style={{fontWeight:'bold'}}>{cartproduct.title}</h2>
                </div>
                <div className="quantity_box">
                  <button className="minus_button" onClick={() => handleQuantityChange(index, cartproduct.quantity - 1)}>-</button>
                  <input type="number" className="quantity_input" value={cartproduct.quantity} onChange={(e) => handleQuantityChange(index, +e.target.value)} />
                  <button className="plus_button" onClick={() => handleQuantityChange(index, cartproduct.quantity + 1)}>+</button>
                </div>
                <span className="cart_image_price">${cartproduct.price * cartproduct.quantity}</span>
                <button className="cart_remove_button" onClick={() => handleRemoveFromCart(cartproduct.id)}>Remove</button>
            </div>
          ))}
        </div>
        {cartProducts.length > 0 ? (
          <div className="cart_price">
            <div className="subtotal_cart_box">
              <h6 className="subtotal_cart_name">Subtotal : ${calculateSubtotal()}</h6>
            </div>
            <div className="subtotal_cart_box">
              <h6 className="subtotal_cart_name">GST : ${calculateGST().toString()}</h6>
            </div>
            <h6 className="grand_total">Grand Total : ${calculateGrandTotal()}</h6>
          </div>
        ) : (
          <h1 className="empty_cart" style={{textAlign:'center'}}>Your Cart is Empty!</h1>
        )}
        {cartProducts.length > 0 && (
          <div className='d-flex justify-center'>
            <button className="confirm_button" onClick={showRazorpay} >Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
