import React from "react";
import "../../style/ProductCard.css";

// Navigation
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const { id, foodName, img, price } = props.item;
  return (
    <div className="single__product">
      {" "}
      <div className="product__img">
        <img src={img} alt="image01" />
      </div>
      <div className="product__content">
        <h6>{foodName}</h6>
        <div className="align-items-center justify-content-between">
          <span className="product__price">
            <span>₱{parseFloat(price).toFixed(2)}</span>
          </span>
          <Link to={`/foodDetails/${id}`}>
            <button className="order__btn">Order</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
