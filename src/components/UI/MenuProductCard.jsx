import React from "react";
import { Link } from "react-router-dom";
import "../../style/MenuProductCard.css";
const MenuProductCard = (props) => {
  const { id, foodName, img, price } = props.item;
  return (
    <div className="menu__singleProduct">
      <div className="menu__productImg">
        <img src={img} alt="image01" />
      </div>
      <div className="menu__productContent">
        <h6>
          <Link to={`/foodDetails/${id}`}>{foodName}</Link>
        </h6>
        <div className="align-items-center justify-content-between">
          <span className="menu__productPrice">
            <span>₱{parseFloat(price).toFixed(2)}</span>
          </span>
          <button className="menu__orderBtn">
            <Link to={`/foodDetails/${id}`}>Order</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuProductCard;
