//Authentication Components
import Login from "./components/Authentication/Login";
// import Header from "./components/Authentication/Header";
import Verify from "./components/Authentication/Verify";
import Signup from "./components/Authentication/Signup";
import Activated from "./components/Authentication/Activated";
import Reset from "./components/Authentication/ResetPw";
import Forgot from "./components/Authentication/Forgot";
import Loginsuccess from "./components/Authentication/SuccessMessages/Loginsuccess";
import Loginunsuccess from "./components/Authentication/ErrorMessages/Loginunsuccess";
import Regsuccess from "./components/Authentication/SuccessMessages/Regsuccess";
import Regunsuccess from "./components/Authentication/ErrorMessages/Regsunsuccess";

//BuyRent App Components

//General Components
import Header from "./components/Header/header";
import HomeHeader from "./components/Home/homeHeader";
import Home from "./components/Home/home";
import Profile from "./components/Profile/profile";
// import Post from "./components/PostProduct/Post";
import Footer from "./components/Footer/footer";

//Buy Components
import Buy_Productdetails from "./components/Buy/Productdetails/Productdetails";
import Cart from "./components/Buy/Cart/Cart";
import Wishlist from "./components/Buy/Wishlist/wishlist";
import NewBuyproducts from "./components/Buy/NewBuyproducts";
import OldBuyproducts from "./components/Buy/OldBuyproducts";

//Exchange Components
import Exchange from "./components/Exchange/exchange";
import ExhangeProductdetails from "./components/Exchange/Products/productDetails";
import Requests from "./components/Exchange/Requests/requests";

//Rent Components
import RentalProducts from "./components/Rental/RentalProducts/RentalProducts";
import RentalProductDetails from "./components/Rental/RentalPRoductsDetails/RentProductDetails";
import RentalRequests from "./components/Rental/requests/requests2";
import AddRentProduct from "./components/Rental/AddProduct/AddRentProduct";

//Other Components
// import Test from "./components/PostProduct/Post";

//Some Packages
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";
import Testing from "./components/Test/Testing";
import Post from "./components/PostProduct/post";
import { useState } from "react";
import Payment from "./components/Payment/Payment";
import Failure from "./components/PaymentStatus/Failure";
import Success from "./components/PaymentStatus/Success";

function App() {
  const [query, setQuery] = useState("");
  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header handleInputChange={handleInputChange}></Header>
        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post" element={<Post />} />

            <Route path="/exchange" element={<Exchange query={query} />} />
            <Route path="/exchange/productdetails/:data" element={<ExhangeProductdetails />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/buy/productdetails/:data" element={<Buy_Productdetails />}/>

            <Route path="/buy/cart" element={<Cart />} />
            <Route path="/buy/wishlist" element={<Wishlist />} />
            <Route path="/buy" element={<NewBuyproducts HeaderQuery={query} />} />
            {/* <Route path="/newbuyproducts" element={<NewBuyproducts HeaderQuery={query} />} />
            <Route path="/oldbuyproducts" element={<OldBuyproducts  HeaderQuery ={query}/>} /> */}

            <Route path="/rents" element={<RentalProducts  HeaderQuery={query} />} />
            <Route path="/rents/:id" element={<RentalProductDetails />} />
            <Route path="/rents/new_product" element={<AddRentProduct />} />
            <Route path="/rental/requests" element={<RentalRequests />} />
          

            <Route path="/testing" element={<Testing />} />

            <Route  path="/login" element={<Login /> }/>
            <Route path="/signup" element={ <Signup />} />
            <Route path="/loginsuccess" element={ <Loginsuccess />}  />
            <Route  path="/loginunsuccess" element={ <Loginunsuccess /> } />
            <Route path="/regsuccess"  element={ <Regsuccess />}  />
            <Route  path="/regunsuccess" element={ <Regunsuccess /> }  />

            <Route path="/payment" element={<Payment />} />
            <Route path="/Payment/success" element={<Success />} />
            <Route path="/Payment/failure" element={<Failure />} />
            
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
