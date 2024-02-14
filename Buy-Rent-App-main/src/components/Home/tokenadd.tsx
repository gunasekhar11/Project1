import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import axios from "axios";
import "./login.css";

const Tokenadd = () => {
    // axios.get('http://localhost:8000/users/products')
    // .then(response => {
    //   console.log('GET Response:', response.data);
    // })
    // .catch(error => {
    //   console.error('GET Error:', error);
    // });

  const [Token, setToken] = useState("");

  const TokenHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
    console.log(Token);
  };

  const cookies = new Cookies();

  const logout = () => {
    cookies.remove("jwt_authorisation");
  };

  const login = (jwt_token: any) => {
    const decode: any = jwt(jwt_token);
    cookies.set("jwt_authorisation", jwt_token, {
      expires: new Date(decode.exp * 1000),
    });
  };

  return (
    <div className="login">
      <form className="login-form">
        <p style={{textAlign:"left"}}>Enter Your Token Below :</p>
        <input
        id="token"
          type="text"
          name="username"
          value={Token}
          onChange={TokenHandler}
          placeholder="Username"
        />
        <input
          onClick={() => login(Token)}
          type="submit"
          value="Set Token"
          className="submit-button"
        />
        <input
          onClick={() => logout()}
          type="submit"
          value="Remove Token"
          className="submit-button"
        />
      </form>
    </div>
  );
};

export default Tokenadd;
