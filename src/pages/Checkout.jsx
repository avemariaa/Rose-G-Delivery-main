import React from "react";
import "../style/Checkout.css";
import { Container, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { bagActions } from "../store/MyBag/bagSlice";
const Checkout = () => {
  const bagItems = useSelector((state) => state.bag.bagItems);
  const bagSubTotalAmount = useSelector((state) => state.bag.subTotalAmount);
  const bagTotalAmount = useSelector((state) => state.bag.totalAmount);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" md="6">
            <div className="customer__details">
              <h6>Customer Details</h6>
              <form>
                <div className="form__group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Full Name" />
                </div>

                <div className="form__group">
                  <label>Contact Number</label>
                  <input type="number" placeholder="Contact Number" />
                </div>
              </form>
            </div>

            <div className="delivery__address mt-5">
              <h6>Delivery Address</h6>
              <form>
                <div className="form__group">
                  <label>Address Type: </label>

                  <input
                    type="radio"
                    name="type"
                    id="residential"
                    value="Residential"
                  />
                  <label for="residential">Residential</label>

                  <input type="radio" name="type" id="office" value="Office" />
                  <label for="office">office</label>
                </div>

                <div className="form__group">
                  <input type="text" placeholder="Address Details" />
                </div>

                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Notes to the store/rider (optional)"
                  />
                </div>
              </form>
            </div>
            <div className="payment__methods mt-5">
              <h6>Choose Payment Methods</h6>
              <form>
                <div className="form__group">
                  <input
                    type="radio"
                    id="cashOnPickup"
                    value="Cash On PickUp"
                    name="type"
                  />
                  <label for="cashOnPickup">Cash On PickUp</label>
                </div>
                <div className="form__group">
                  <input
                    type="radio"
                    id="cashOnDelivery"
                    value="Cash On Delivery"
                    name="type"
                  />
                  <label for="cashOnDelivery">Cash On Delivery</label>
                </div>
                <div className="form__group">
                  <input type="radio" id="gcash" value="GCash" name="type" />
                  <label for="gcash">GCash</label>
                </div>
              </form>
            </div>
          </Col>

          <Col lg="4" md="6">
            <div className="order__summary">
              <h6>Order Summary</h6>
              <hr></hr>
              {bagItems.length === 0 ? (
                <h5 className="text-center">Your Bag is empty</h5>
              ) : (
                <table className="table">
                  <tbody>
                    {bagItems.map((item) => (
                      <Tr item={item} key={item.id} />
                    ))}
                  </tbody>
                </table>
              )}
              <hr></hr>
              <h6>
                Subtotal: ₱{" "}
                <span>{parseFloat(bagSubTotalAmount).toFixed(2)}</span>
              </h6>
              <h6>
                Delivery Fee: <span>₱ 50.00</span>
              </h6>
              <h6>
                Total: ₱ <span>{parseFloat(bagTotalAmount).toFixed(2)}</span>
              </h6>

              <button className="place__order">Place Order</button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const Tr = (props) => {
  const { title, totalPrice, quantity } = props.item;

  return (
    <tr>
      <td className="text-center">{quantity}x</td>
      <td className="text-center">{title}</td>
      <td className="text-center">₱ {totalPrice}</td>
    </tr>
  );
};

export default Checkout;
