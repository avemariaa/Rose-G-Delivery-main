import React, { useState, useEffect } from "react";
import { ListGroup } from "reactstrap";
import "../style/Bag.css";
import BagItem from "../components/UI/Bag/BagItem";

// Navigation
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { bagUiActions } from "../store/MyBag/bagUiSlice";
import { bagActions } from "../store/MyBag/bagSlice";

// Firebase
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  onSnapshot,
} from "firebase/firestore";

const Bag = () => {
  const dispatch = useDispatch();
  const toggleBag = () => {
    dispatch(bagUiActions.toggle());
  };

  const [bagItemsFromFirebase, setBagItemsFromFirebase] = useState([]); // Firebase
  const bagProducts = useSelector((state) => state.bag.bagItems);
  const subTotalAmount = useSelector((state) => state.bag.subTotalAmount);
  const totalAmount = useSelector((state) => state.bag.totalAmount);

  // Synchronize Redux and Firebase data
  useEffect(() => {
    const userId = auth.currentUser.uid;
    const bagItemsCollection = collection(db, "UserBag");
    const bagItemsQuery = query(
      bagItemsCollection,
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(bagItemsQuery, (snapshot) => {
      const bagItems = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        bagItems.push({ id: doc.id, ...data });
      });
      setBagItemsFromFirebase(bagItems);
    });

    return unsubscribe;
  }, []);

  const bagItems = [...bagProducts, ...bagItemsFromFirebase];

  useEffect(() => {
    if (JSON.stringify(bagItems) !== JSON.stringify(bagProducts)) {
      dispatch(bagActions.setBagItems(bagItems));
    }
  }, [dispatch, bagItems, bagProducts]);

  console.log("Bag Items:", bagItems);

  return (
    <div className="bag__container">
      <ListGroup className="bag">
        <div className="bag__close">
          <span onClick={toggleBag}>
            <i class="ri-close-fill"></i>
          </span>
        </div>

        <div className="bag__item-list">
          {bagItems && bagItems.length === 0 ? (
            <h6 className="text-center mt-5">No item added to the cart</h6>
          ) : (
            bagItems.map((item) => <BagItem item={item} key={item.foodId} />)
          )}
        </div>

        <div className="bag__bottom">
          <label className="d-flex align-items-center justify-content-between">
            Subtotal:
            <span>₱ {parseFloat(subTotalAmount).toFixed(2)}</span>
          </label>
          <label className="d-flex align-items-center justify-content-between">
            Delivery Fee:<span> ₱ 50.00</span>
          </label>
          <h6 className="d-flex align-items-center justify-content-between mt-2">
            Total: <span>₱ {parseFloat(totalAmount).toFixed(2)}</span>
          </h6>
          <button className="bagCheckout__btn mt-3">
            <Link to="/checkout">Proceed to Checkout</Link>
          </button>
        </div>
      </ListGroup>
    </div>
  );
};

export default Bag;
