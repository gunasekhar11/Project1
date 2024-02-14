import React from "react";
import Logo from "../Assets/Logo.png";

import "./headers.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link to="\home">
          <img src={Logo} alt="image" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <a href="/" className="header-option font-bold">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="header-option font-bold">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="header-option font-bold">
              Contact
            </a>
          </li>
          <li>
            <a
              href="/"
              className="font-bold btn login-btn btn-outline-light btn-lg px-5 header-button"
            >
              Sign in
            </a>
          </li>
          <li>
            <a href="/signup">
              <button
                className="btn login-btn btn-outline-light btn-lg px-5 header-button font-bold"
                type="submit"
              >
                Sign up
              </button>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
