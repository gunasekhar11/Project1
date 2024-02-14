import { useState } from "react";
import Logo from "../../Assets/logo_maang.svg";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "./header.css";
import {
  BsSearch,
  BsArrowLeftRight,
  BsQuestionCircleFill,
} from "react-icons/bs";
import { LuScanFace } from "react-icons/lu";
import {
  BiHeart,
  BiHeartCircle,
  BiHeartSquare,
  BiUserCircle,
} from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrFavorite, GrLogin, GrLogout } from "react-icons/gr";
import { VscRequestChanges } from "react-icons/vsc";
import { PiListBold } from "react-icons/pi";
import {
  FaHandHoldingUsd,
  FaHandHolding,
  FaRegHandshake,
} from "react-icons/fa";

interface HeaderProps {
  query?: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ query, handleInputChange }) => {
  const [openProfile, setopenProfile] = useState(false);
  const [toggle, setToggle] = useState(false);

  const cookies = new Cookies();
  const token = cookies.get("jwt_authorisation");

  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove("jwt_authorisation");
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img className="logo-img" src={Logo}></img>
        </Link>
      </div>
      <div className="nav-container">
        <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Search Products.."
        />
        {/* <div className="header-icons-container">
          <BsSearch className="header-icons" />
          <LuScanFace className="header-icons" />
        </div> */}
      </div>
      <div className="header-btns">
        <ul>
          <li>
            <Link to="/buy">Buy</Link>
          </li>
          <li>
            <Link to="/exchange">Exchange</Link>
          </li>
          <li>
            <Link to="/rents">Rent</Link>
          </li>
          {token ? (
            <>
              <li>
                <Link to="/payment">Payment</Link>
              </li>
              <li>
                <div className="profile-container">
                  <Link to="/buy/cart">
                    <AiOutlineShoppingCart
                      className="icons"
                      style={{
                        width: "30px",
                        height: "30px",
                        marginTop: "-5px",
                      }}
                    />
                  </Link>
                </div>
              </li>
              <li>
                <div className="profile-container">
                  <Link to="#">
                    <BiUserCircle
                      className="icons"
                      style={{
                        width: "30px",
                        height: "30px",
                        marginTop: "-5px",
                      }}
                      onClick={() => setopenProfile(!openProfile)}
                    />
                  </Link>
                  {openProfile && (
                    <div className="profile-list">
                      <ul
                        onClick={() => setopenProfile(false)}
                        id="profile-list-ul"
                      >
                        <Link to="/profile">
                          <li
                            style={{
                              fontWeight: "normal",
                              fontSize: "18px",
                            }}
                          >
                            <BiUserCircle
                              className="icons"
                              style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "10px",
                              }}
                            />
                            My Profile
                          </li>
                        </Link>
                        <Link to="/post">
                          <li
                            style={{
                              fontWeight: "normal",
                              fontSize: "18px",
                            }}
                          >
                            <BiUserCircle
                              className="icons"
                              style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "10px",
                              }}
                            />{" "}
                            Post Product
                          </li>
                        </Link>
                        <Link to="/buy/wishlist">
                          <li
                            style={{
                              fontWeight: "normal",
                              fontSize: "18px",
                            }}
                          >
                            <GrFavorite
                              className="icons"
                              style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "10px",
                              }}
                            />{" "}
                            Wish List
                          </li>
                        </Link>
                        <Link to="/requests">
                          <li
                            style={{
                              fontWeight: "normal",
                              fontSize: "18px",
                            }}
                          >
                            <VscRequestChanges
                              className="icons"
                              style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "10px",
                              }}
                            />{" "}
                            Exchange Requests
                          </li>
                        </Link>
                        <Link to="/rental/requests">
                          <li
                            style={{
                              fontWeight: "normal",
                              fontSize: "18px",
                            }}
                          >
                            <VscRequestChanges
                              className="icons"
                              style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "10px",
                              }}
                            />{" "}
                            Rental Requests
                          </li>
                        </Link>
                        <Link to="/buy/cart">
                          <li
                            style={{
                              fontWeight: "normal",
                              fontSize: "18px",
                            }}
                          >
                            <AiOutlineShoppingCart
                              className="icons"
                              style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "10px",
                              }}
                            />{" "}
                            My Cart
                          </li>
                        </Link>
                        <Link to="/">
                          <li
                            onClick={() => {
                              handleLogout();
                            }}
                            style={{
                              fontWeight: "normal",
                              fontSize: "18px",
                            }}
                          >
                            <GrLogout
                              className="icons"
                              style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "10px",
                              }}
                            />{" "}
                            Log Out
                          </li>
                        </Link>
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" style={{ textAlign: "center" }}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="toggler">
        <PiListBold
          style={{ width: "30px", height: "30px", color: "white" }}
          onClick={() => setToggle(!toggle)}
        />
        {toggle ? (
          <ul className="toggler-list" onClick={() => setToggle(!toggle)}>
            <Link to="/buy" style={{ textDecoration: "none" }}>
              {" "}
              <li>
                <FaHandHoldingUsd
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "10px",
                  }}
                />
                &nbsp;&nbsp;&nbsp;Buy
              </li>
            </Link>
            <Link to="/exchange" style={{ textDecoration: "none" }}>
              {" "}
              <li>
                <FaRegHandshake
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "10px",
                  }}
                />
                &nbsp;&nbsp;&nbsp;Exchange
              </li>
            </Link>
            <Link to="/rents" style={{ textDecoration: "none" }}>
              {" "}
              <li>
                <FaHandHolding
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "10px",
                  }}
                />
                &nbsp;&nbsp;&nbsp;Rent
              </li>
            </Link>
            {token ? (
              <>
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  {" "}
                  <li>
                    <BiUserCircle
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                      }}
                    />
                    &nbsp;&nbsp;&nbsp;View Profile
                  </li>
                </Link>
                <Link to="/buy/wishlist" style={{ textDecoration: "none" }}>
                  {" "}
                  <li>
                    <BiHeart
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                      }}
                    />
                    &nbsp;&nbsp;&nbsp;Wishlist
                  </li>
                </Link>
                <Link to="/buy/cart" style={{ textDecoration: "none" }}>
                  {" "}
                  <li>
                    <AiOutlineShoppingCart
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                      }}
                    />
                    &nbsp;&nbsp;&nbsp;Your Cart
                  </li>
                </Link>
                <Link to="/post" style={{ textDecoration: "none" }}>
                  {" "}
                  <li>
                    <BiHeart
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                      }}
                    />
                    &nbsp;&nbsp;&nbsp;Post Product
                  </li>
                </Link>
                <Link to="/rental/requests" style={{ textDecoration: "none" }}>
                  {" "}
                  <li>
                    <BsQuestionCircleFill
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                      }}
                    />
                    &nbsp;&nbsp;&nbsp;Rental Req
                  </li>
                </Link>
                <Link to="/requests" style={{ textDecoration: "none" }}>
                  {" "}
                  <li>
                    <BsQuestionCircleFill
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                      }}
                    />
                    &nbsp;&nbsp;&nbsp;Exchange Req
                  </li>
                </Link>
                <Link to="/" style={{ textDecoration: "none" }}>
                  {" "}
                  <li onClick={handleLogout}>
                    <GrLogout
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                      }}
                    />
                    &nbsp;&nbsp;&nbsp;Log out
                  </li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  {" "}
                  <li onClick={handleLogout}>
                    <GrLogin
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                      }}
                    />
                    &nbsp;&nbsp;&nbsp;Log In
                  </li>
                </Link>
              </>
            )}
          </ul>
        ) : (
          <span></span>
        )}
      </div>
    </nav>
  );
};

export default Header;
