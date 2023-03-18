import React from "react";
import Slider from "react-slick";
import TestimonialsImg1 from "../../assets/images/sungJinwoo.jpg";
import "../../style/Testimonials.css";
import { Row, Col } from "reactstrap";
const Testimonials = () => {
  const ArrowLeft = (props) => (
    <button
      {...props}
      className={"testimonialsPrev__btn ri-arrow-left-circle-fill"}
    />
  );
  const ArrowRight = (props) => (
    <button
      {...props}
      className={"testimonialsNext__btn ri-arrow-right-circle-fill"}
    />
  );
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    arrows: true,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
    className: "testimonials__slides",
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
      <h4>Testimonials</h4>
      <Slider {...settings}>
        <Col className="p-3">
          <div className="testimonials__slides-item">
            <div className="testimonials__img__name">
              <img src={TestimonialsImg1} alt="testimonials-img" />
              <span>Sung Jinwoo1</span>
            </div>
            <div className="testimonials__desc">
              <p>
              It's me Hi! I'm the problem, it's me At teatime
              Everybody agrees I'll stare directly at the sun, but never in the mirror
              It must be exhausting always rooting for the anti-hero
              </p>
            </div>
          </div>
        </Col>

        <Col className="p-3">
          <div className="testimonials__slides-item">
            <div className="testimonials__img__name">
              <img src={TestimonialsImg1} alt="testimonials-img" />
              <span>Sung Jinwoo2</span>
            </div>
            <div className="testimonials__desc">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas
                nam natus omnis, nesciunt reprehenderit dolore illo explicabo
                blanditiis quia, magni iure praesentium saepe rerum consequatur
                id fuga optio corporis qui.
              </p>
            </div>
          </div>
        </Col>

        <Col className="p-3">
          <div className="testimonials__slides-item">
            <div className="testimonials__img__name">
              <img src={TestimonialsImg1} alt="testimonials-img" />
              <span>Sung Jinwoo3</span>
            </div>
            <div className="testimonials__desc">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas
                nam natus omnis, nesciunt reprehenderit dolore illo explicabo
                blanditiis quia, magni iure praesentium saepe rerum consequatur
                id fuga optio corporis qui.
              </p>
            </div>
          </div>
        </Col>

        <Col className="p-3">
          <div className="testimonials__slides-item">
            <div className="testimonials__img__name">
              <img src={TestimonialsImg1} alt="testimonials-img" />
              <span>Sung Jinwoo4</span>
            </div>
            <div className="testimonials__desc">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas
                nam natus omnis, nesciunt reprehenderit dolore illo explicabo
                blanditiis quia, magni iure praesentium saepe rerum consequatur
                id fuga optio corporis qui.
              </p>
            </div>
          </div>
        </Col>
      </Slider>
    </div>
  );
};

export default Testimonials;
