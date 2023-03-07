import React from "react";
import "../../style/FoodCategorySlider.css";
import Slider from "react-slick";
import FoodCategoryImg1 from "../../assets/images/category-01.png";
import PalabokIcon from "../../assets/images/Category-Icons/palabok-logo.png";
import RiceMealIcon from "../../assets/images/Category-Icons/fried-rice.png";
import BarbecueIcon from "../../assets/images/Category-Icons/bbq.png";
import DrinksIcon from "../../assets/images/Category-Icons/soft-drink.png";
import IceCreamIcon from "../../assets/images/Category-Icons/ice-cream.png";
import { Link } from "react-router-dom";
const FoodCategorySlider = () => {
  const ArrowLeft = (props) => (
    <button
      {...props}
      className={"foodCatPrev__btn ri-arrow-left-circle-fill"}
    />
  );
  const ArrowRight = (props) => (
    <button
      {...props}
      className={"foodCatNext__btn ri-arrow-right-circle-fill"}
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
    className: "foodCategory__slides",
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
      <h4>Menu</h4>
      <h6>What are you craving for today?</h6>
      <Slider {...settings}>
        <div className="foodCategory__item">
          <Link to="/menu">
            <img src={PalabokIcon} />
            <span>Palabok</span>
          </Link>
        </div>
        <div className="foodCategory__item">
          <Link to="/menu">
            <img src={RiceMealIcon} />
            <span>Rice Meals</span>
          </Link>
        </div>
        <div className="foodCategory__item">
          <Link to="/menu">
            <img src={BarbecueIcon} />
            <span>Barbecue</span>
          </Link>
        </div>
        <div className="foodCategory__item">
          <Link to="/menu">
            <img src={DrinksIcon} />
            <span>Drinks</span>
          </Link>
        </div>
        <div className="foodCategory__item">
          <Link to="/menu">
            <img src={IceCreamIcon} />
            <span>Ice Cream</span>
          </Link>
        </div>
      </Slider>
    </div>
  );
};

export default FoodCategorySlider;
