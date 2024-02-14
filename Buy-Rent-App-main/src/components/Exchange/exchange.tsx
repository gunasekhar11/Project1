import React, { useState } from "react";
import Card2 from "./Products/Products";
import Header from "../Header/header";
import Sidebar from "./Sidebar/exchangefilter";
import Mobilefilter from "./Sidebar/mobilefilter";
import './exchange.css';
import { Exchange_Products, User_Exchange_Products } from "../Exchange/Functions/ExchangeFunctions" 

interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  duration: number;
  location: string;
  images: any;
}

interface HeaderProps {
  query: string;
}

const Exchange: React.FC<HeaderProps> = ({ query }) => {

  const [price, setPrice] = useState("365");
  const handlePrice = (event: any) => {
    setPrice(event.target.value);
  };

  const [category, setCategory] = useState("");
  const handleCategory = (event: any) => {
    setCategory(event.target.value);
  };

  const [location, setLocation] = useState("");
  const handleLocation = (event: any) => {
    setLocation(event.target.value);
  };

  const Exchange_products: Product[] | undefined = Exchange_Products();
  const user_products: Product[] | undefined = User_Exchange_Products();

  let filteredProducts: Product[] | undefined;

  if (Exchange_products) {
    filteredProducts = Exchange_products?.filter(product =>
      !user_products?.some(userProduct => userProduct.title === product.title)
    );
  }

  let filteredItems: any | undefined;
  if (filteredProducts) {
    filteredItems = filteredProducts.filter(product => {
      const titleMatches = product.title.toLowerCase().includes(query.toLowerCase());
      const categoryMatches = product.category.toLowerCase() === category || category === '';
      const locationMatches = product.location.toLowerCase() === location || location === '';
      const priceNumber = parseFloat(price);
      const durationMatches = product.duration <= priceNumber;
      return titleMatches && categoryMatches && locationMatches && durationMatches;
    });
  }

  return (
    <>
      <div className='exchange-screen'>
        <Sidebar handlePriceChange={handlePrice} handleCategory={handleCategory} handelLocation={handleLocation}></Sidebar>
        <Card2 details={filteredItems}/>
      </div>
      <div className="mobile-exchange-screen">
        <Mobilefilter handleCategory={handleCategory} handlePriceChange={handlePrice} handleLocation={handleLocation} />
        <Card2 details={filteredItems}/>
      </div>
    </>
  );
};

export default Exchange;
