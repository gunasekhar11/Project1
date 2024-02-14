import logo from "../../Assets/logo_maang.svg";
import { CgProfile } from "react-icons/cg";
import buy from "../../Assets/buy.avif";
import exchange from "../../Assets/exchange.avif";
import rent from "../../Assets/rent.avif";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import HomeHeader from "./homeHeader";
import "./home.css";

const Home = () => {
  return (
    <>
      <section className="home-intro">
        <p className="text">
          Find Your Perfect Place To
          <br />
          Buy
          <br />
          Exchange
          <br />
          Rent
        </p>
        <img src={exchange} alt="" style={{ width: "100%" }} />
      </section>
      <section id="about-us" className="about-us">
        <br />
        <h1 className="about-us-title">About Us</h1>
        <div>
          <img src={logo} alt="" />
          <p>
            <span className="h4">Maang Technologies :</span>
            <br />
            <br />
            Maang Technologies is a leading provider of innovative software
            solutions for the IT industry. Founded in 2022 and based in
            Hyderabad, our mission is to improve your productivity through
            effective outcomes by providing solutions with powerful tools to
            streamline development, reduce costs, and increase efficiency.
            <br />
            <br />
            AtMaang Technologies, we are committed to our core values of
            innovation, collaboration, and excellence. We believe that by
            working together with our clients and partners, we can create
            Innovative, more efficient system for all.
          </p>
        </div>
      </section>
      <section className="our-services" id="our-services">
        <br />
        <h1 className="our-services-title">Our Services</h1>
        <Link to="/newbuyproducts" style={{ textDecoration: "none", color: "black" }}>
          <div className="odd">
            <img src={buy} alt=""/>
            <p>
              <span className="h4">Buy Products :</span>
              <br />
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
              possimus eos sunt consequatur voluptate similique enim dolores
              fugiat. Consequuntur expedita architecto delectus itaque ex minus
              aliquam quae exercitationem quidem odit!
            </p>
          </div>
        </Link>
        <Link to="/exchange" style={{ textDecoration: "none", color: "black" }}>
          <div className="even">
            <p>
              <span className="h4">Exchange Your Products :</span>
              <br />
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
              possimus eos sunt consequatur voluptate similique enim dolores
              fugiat. Consequuntur expedita architecto delectus itaque ex minus
              aliquam quae exercitationem quidem odit!
            </p>
            <img src={exchange} alt=""/>
          </div>
        </Link>
        <Link to="/rents" style={{ textDecoration: "none", color: "black" }}>
          <div className="odd">
            <img src={rent} alt="" />
            <p>
              <span className="h4">Rent Your Products :</span>
              <br />
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
              possimus eos sunt consequatur voluptate similique enim dolores
              fugiat. Consequuntur expedita architecto delectus itaque ex minus
              aliquam quae exercitationem quidem odit!
            </p>
          </div>
        </Link>
      </section>
      <section id="contact-us" className="contact-us">
        <br />
        <h1 className="contact-us-title">Contact Us</h1>
        <div className="form">
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Contact Number" />
          <textarea placeholder="Description" />
          <button className="btns">Submit</button>
        </div>
      </section>
    </>
  );
};

export default Home;
