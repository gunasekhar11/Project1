import React from "react";
import logo from "../../Assets/logo_maang.svg";
import "./home.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { CgProfile } from "react-icons/cg";

const HomeHeader = () => {
  const cookies = new Cookies();
  const token = cookies.get("jwt_authorisation");
  return (
    <>
      <section className="home-header">
        <div className="home-logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="home-navlinks">
          <a href="/#our-services" style={{ textDecoration: "none" }}>
            <p>Our&nbsp;Services</p>
          </a>
          <a href="/#about-us" style={{ textDecoration: "none" }}>
            <p>About&nbsp;Us</p>
          </a>
          <a href="/#contact-us" style={{ textDecoration: "none" }}>
            <p>Contact&nbsp;Us</p>
          </a>
          <div className="dropdown">
            <p className="dropbtn">Services</p>
            <div className="dropdown-content">
              <Link to="/oldbuyproducts">Buy Old</Link>
              <Link to="/newbuyproducts">Buy New</Link>
              <Link to="/exchange">Exchange</Link>
              <Link to="/rents">Rental</Link>
            </div>
          </div>
          {token ? (
            <Link to="/profile">
              <p>
                <CgProfile style={{ width: "30px", height: "30px" }} />
              </p>
            </Link>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <p>Login</p>
            </Link>
          )}
        </div>
        <div className="home-mobile-toggler">
          {token ? (
            <Link
              to="/profile"
              style={{ color: "black", textDecoration: "none" }}
            >
              <CgProfile style={{ width: "30px", height: "30px" }} />
            </Link>
          ) : (
            <Link
              to="/login"
              style={{ color: "black", textDecoration: "none" }}
            >
              <p
                style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}
              >
                Login
              </p>
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default HomeHeader;
