import React from "react";
import "./success.css";
import { Link } from "react-router-dom";
const CheckoutSucess = () => {
  return (
    <div className="checkout-success ">

      <div className=" success-card">
        <div
          style={{
            borderRadius: 200,
            height: 200,
            width: 200,
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <i className="checkmark">✓</i>
        </div>
        <div>

          <h1>Success</h1>
          <p>
            We received your purchase request;
            <br /> we'll be in touch shortly!
          </p>
        </div>
        <div>

          <button><Link to='/'>Go To Home</Link></button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSucess;
