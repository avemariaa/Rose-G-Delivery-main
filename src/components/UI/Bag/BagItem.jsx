import React from "react";
import { ListGroupItem } from "reactstrap";
import ChocoCup from "../../../assets/images/Food-Products/Ice-Cream/Choco_Cup.jpg";
import "../../../style/Bag-Item.css";

import { useDispatch } from "react-redux";
import { bagActions } from "../../../store/MyBag/bagSlice";
const BagItem = ({ item }) => {
  const { id, title, price, image01, quantity, totalPrice } = item;

  const dispatch = useDispatch();

  const incrementItem = () => {
    dispatch(
      bagActions.addItem({
        id,
        title,
        price,
        image01,
      })
    );
  };

  const decreaseItem = () => {
    dispatch(bagActions.removeItem(id));
  };

  const deleteItem = () => {
    dispatch(bagActions.deleteItem(id));
  };
  return (
    <ListGroupItem className="border-0 bag__item">
      <div className="bag__item-info d-flex gap-2">
        <img src={image01} alt="product-image" />

        <div className="bag__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
          <div>
            <h6 className="bag__product-title">{title}</h6>
            <p className="d-flex align-items-center gap-5 ">
              <div className="d-flex align-items-center gap-3 increase__decrease-btn">
                <span className="increase__btn" onClick={incrementItem}>
                  <i class="ri-add-circle-fill"></i>
                </span>
                <span className="quantity__title">{quantity}</span>
                <span className="decrease__btn" onClick={decreaseItem}>
                  <i class="ri-indeterminate-circle-fill"></i>
                </span>
              </div>

              <span className="bag__product-price">
                ₱ {parseFloat(totalPrice).toFixed(2)}
              </span>
            </p>
          </div>

          <span className="delete__btn" onClick={deleteItem}>
            <i class="ri-delete-bin-line"></i>
          </span>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default BagItem;
