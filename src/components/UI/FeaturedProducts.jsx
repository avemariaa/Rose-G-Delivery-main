import React, { useState, useEffect } from "react";
import "../../style/FeaturedProducts.css";
import Slider from "react-slick";
import FeaturedProductsData from "../../assets/sample-data/FoodProduct";
import { Col } from "reactstrap";
import ProductCard from "./ProductCard";

// Connect Firebase
import {
  collection,
  getDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { db, storage } from "../../firebase.js";

const FeaturedProducts = () => {
  //------------------ Retrieve Food Data ------------------//
  const [foodData, setFoodData] = useState([]);
  useEffect(() => {
    //LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "FoodData"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setFoodData(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  console.log(foodData);

  //------------------ Featured Products Slider ------------------//
  const ArrowLeft = (props) => (
    <button
      {...props}
      className={"ftProdPrev__btn ri-arrow-left-circle-fill"}
    />
  );
  const ArrowRight = (props) => (
    <button
      {...props}
      className={"ftProdNext__btn ri-arrow-right-circle-fill"}
    />
  );
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: true,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
    className: "featuredProduct__slides",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <h4 className="ftProd__title">Featured Product</h4>
      <h6>Discover your new favorites here!</h6>
      <Slider {...settings}>
        {foodData.map((item) => (
          <div className="ftProduct__item">
            <Col lg="3" key={item.id}>
              <ProductCard item={item} />
            </Col>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedProducts;
