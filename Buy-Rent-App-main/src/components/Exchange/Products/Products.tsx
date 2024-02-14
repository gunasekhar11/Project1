import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nodata from "../../NoData/Nodata";
import "./Products.css";
import { Baseurl } from "../../utilities/ApiEndpoints";
import { getAuthToken } from "../../utilities/CommonFunctions";
import Loader from "../../Loader/Loader";

interface ProductComponentProps {
  details?: any[];
}

const Products: React.FC<ProductComponentProps> = ({ details }) => {
  const navigate = useNavigate();
  return (
    <section className="exchange-card-container">
      {details ? null : <Loader />}
      <div className="product">
        {details?.length == 0 ? <Nodata /> : null}
        {details?.map((detail, index) => {
          return (
            <section
              key={index}
              className="exchange-card"
              onClick={(event: React.MouseEvent) => {
                navigate("/exchange/productdetails/" + detail.id);
              }}
            >
              <img
                src={Baseurl + detail.images.slice(0, -1)}
                alt={detail.title}
                className="card-img"
              />
              <div className="card-body">
                <h4 className="title">{detail.title}</h4>
                <div className="description">
                  {/* <p style={{marginBottom:"5px"}}>Owner : {findUser(detail.product_owner_id)}</p> */}
                  <p style={{ marginBottom: "5px" }}>
                    Location: {detail.location}
                  </p>
                </div>
                <section className="description">
                  <p style={{ marginBottom: "5px" }}>Precautions:</p>
                  <li>{detail.description}</li>
                </section>
              </div>
              <div className="duration">
                <p className="h6" style={{ fontWeight: "bold" }}>
                  Upto
                </p>
                <br />
                <p
                  style={{ color: "#327AF0", fontWeight: "bold" }}
                  className="h6"
                >
                  {detail.duration} Days
                </p>
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
};

export default Products;
