import React, { useEffect } from "react";
import { ListGroupItem } from "reactstrap";
import "../../../style/Bag-Item.css";

// Firebase
import { auth, db } from "../../../firebase";
import { deleteDoc, getDoc, updateDoc, doc } from "firebase/firestore";

// Redux
import { useDispatch } from "react-redux";
import { bagActions } from "../../../store/MyBag/bagSlice";
const BagItem = ({ item }) => {
  const { foodId, foodName, price, img, foodQty, totalPrice } = item;

  const dispatch = useDispatch();

  //------------------ Increment Item Function ------------------//
  const incrementItem = async () => {
    const userBagRef = doc(db, "UserBag", auth.currentUser.uid);
    const userBagData = await getDoc(userBagRef);

    const updatedBag = userBagData.data().bag.map((item) => {
      if (item.foodId === foodId) {
        return {
          ...item,
          foodQty: item.foodQty + 1,
          totalPrice: Number(item.totalPrice) + Number(item.price),
        };
      } else {
        return item;
      }
    });
    updateDoc(userBagRef, {
      bag: updatedBag,
    });

    // responsible for the data to reflect on the webiste
    dispatch(
      bagActions.addItem({
        foodId: foodId,
        foodName,
        price,
        img,
        foodQty: foodQty + 1,
        totalPrice: totalPrice + price,
      })
    );
  };

  //------------------ Decrement Item Function ------------------//
  const decreaseItem = async () => {
    const userBagRef = doc(db, "UserBag", auth.currentUser.uid);
    const userBagData = await getDoc(userBagRef);

    const updatedBag = userBagData
      .data()
      .bag.map((item) => {
        if (item.foodId === foodId) {
          return {
            ...item,
            foodQty: item.foodQty - 1,
            totalPrice: Number(item.totalPrice) - Number(item.price),
          };
        } else {
          return item;
        }
      })
      .filter((item) => item.foodQty && item.foodQty > 0);

    if (updatedBag.length > 0) {
      updateDoc(userBagRef, {
        bag: updatedBag,
      });
    } else {
      deleteDoc(userBagRef);
    }

    dispatch(
      bagActions.removeItem(
        foodId
        // foodName,
        // img,
        // price,
        // foodQty: foodQty - 1,
        // totalPrice: updatedItem.totalPrice - price,
      )
    );
  };

  //------------------ Delete Item Function ------------------//
  const deleteItem = async () => {
    const userBagRef = doc(db, "UserBag", auth.currentUser.uid);
    const userBagData = await getDoc(userBagRef);

    const updatedBag = userBagData
      .data()
      .bag.filter((item) => item.foodId !== foodId);

    await updateDoc(userBagRef, {
      bag: updatedBag,
    });

    dispatch(
      bagActions.deleteItem(
        foodId
        // foodName,
        // img,
        // price,
        // foodQty,
        // totalPrice,
      )
    );
  };

  return (
    <ListGroupItem className="border-0 bag__item">
      <div className="bag__item-info d-flex gap-2">
        <img src={img} alt="product-img" />

        <div className="bag__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
          <div>
            <h6 className="bag__product-title">{foodName}</h6>
            <p className="d-flex align-items-center gap-5 ">
              <div className="d-flex align-items-center gap-3 increase__decrease-btn">
                <span className="increase__btn" onClick={incrementItem}>
                  <i class="ri-add-circle-fill"></i>
                </span>
                <span className="quantity__title">{foodQty}</span>
                <span className="decrease__btn" onClick={decreaseItem}>
                  <i class="ri-indeterminate-circle-fill"></i>
                </span>
              </div>

              <span className="bag__product-price">
                ₱ {parseFloat(price * foodQty).toFixed(2)}
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
