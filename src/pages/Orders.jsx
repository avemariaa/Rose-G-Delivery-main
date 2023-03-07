import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import "../style/OrderPage.css";
import { bagActions } from "../store/MyBag/bagSlice";
import { Link } from "react-router-dom";
const Orders = () => {
  const bagItems = useSelector((state) => state.bag.bagItems);
  const subTotalAmount = useSelector((state) => state.bag.subTotalAmount);
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {bagItems.length === 0 ? (
              <h5 className="text-center">Your Bag is empty</h5>
            ) : (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Image</th>
                    <th className="text-center">Product Title</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {bagItems.map((item) => (
                    <Tr item={item} key={item.id} />
                  ))}
                </tbody>
              </table>
            )}

            <div className="mt-4">
              <h6>
                Subtotal:{" "}
                <span className="order__subtotal">₱ {subTotalAmount}</span>
              </h6>
              <p>Shipping will calculate at checkout</p>
              <div className="order__page-btn">
                <button className="continue__btn me-3">
                  <Link to="/menu">Continue Shopping</Link>
                </button>
                <button className="checkout__btn">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const Tr = (props) => {
  const { id, image01, title, price, quantity } = props.item;

  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(bagActions.deleteItem(id));
  };
  return (
    <tr>
      <td className="text-center bag__img-box">
        <img src={image01} alt="orderProduct-img" />
      </td>
      <td className="text-center">{title}</td>
      <td className="text-center">{price}</td>
      <td className="text-center">{quantity}</td>
      <td className="text-center bag__item-del" onClick={deleteItem}>
        <i class="ri-delete-bin-line"></i>
      </td>
    </tr>
  );
};

export default Orders;
