import React, { useState, useEffect } from "react";
import "../style/FoodDetails.css";
import { Container, Row, Col } from "reactstrap";
import FoodProductsData from "../assets/sample-data/FoodProduct";
import { useParams } from "react-router-dom";
import ChocoCup from "../assets/images/Food-Products/Ice-Cream/Choco_Cup.jpg";
import MenuProductCard from "../components/UI/MenuProductCard";
import { useDispatch } from "react-redux";
import { bagActions } from "../store/MyBag/bagSlice";

// Connect Firebase
import {
  collection,
  getDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase.js";

const FoodDetails = () => {
  //------------------ Get Document ID of the selected food ------------------//
  const { id } = useParams();
  console.log(id);

  //------------------ Retrieve Food Data ------------------//
  const [foodData, setFoodData] = useState();

  const getFoodData = async () => {
    const docRef = doc(db, "FoodData", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data: ", docSnap.data());
      setFoodData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getFoodData();
  }, []);
  console.log(foodData);

  // const product = FoodProductsData.find((product) => product.id === id);
  // const { title, image01, price, category, desc } = product;

  /*Filtering data by their category*/
  // const relatedProduct = FoodProductsData.filter(
  //   (item) => item.category === category
  // );

  /*Bag - Functions*/
  const dispatch = useDispatch();

  // const addToBag = () => {
  //   dispatch(
  //     bagActions.addItem({
  //       id,
  //       title,
  //       image01,
  //       price,
  //     })
  //   );
  // };

  return (
    <section>
      <Container>
        <Row className="single__product-row mb-5">
          <Col lg="4" md="4">
            <div className="foodProduct__image">
              <img src={foodData?.img} alt="product-img" />
            </div>

            <div className="single__product-content">
              <h2 className="foodProduct__title mb-3">{foodData?.foodName}</h2>

              <p className="foodProduct__price">
                ₱ <span>{parseFloat(foodData?.price).toFixed(2)}</span>
              </p>

              <p className="foodProduct__category mb-5">
                Category: <span>{foodData?.categoryTitle}</span>
              </p>

              <div className="foodProduct_desc">
                <p>Description:</p>
                <span>{foodData?.description}</span>
              </div>
            </div>
          </Col>

          {/* <Col lg="6" md="6">
            <div className="customize__order">
              Customize your order:
              <button className="foodProduct__addBtn" onClick={addToBag}>
                Add to Bag
              </button>
            </div>
          </Col> */}
        </Row>

        {/* <Row>
          <Col lg="12" className="mb-5 mt-4">
            <h2>You might also like</h2>
          </Col>
          {relatedProduct.map((item) => (
            <Col lg="3" md="4" sm="6" xs="6" key={item.id}>
              <MenuProductCard item={item} />
            </Col>
          ))}
        </Row> */}
      </Container>
    </section>
  );
};

export default FoodDetails;
