import React, { useState } from "react";
import "../../style/CompanyBackground.css";
import { Container, Row, Col } from "reactstrap";
import useCollapse from "react-collapsed";
import AboutUsImg from "../../assets/images/aboutUsImage.jpg";
const CompanyBackground = () => {
  // Read More Button Collapse Function
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  return (
    <div>
      <Row>
        <Col lg="6" md="6" className="aboutUs__img">
          <img src={AboutUsImg} alt="aboutUsImage" />
        </Col>
        <Col lg="6" md="6" className="aboutUs__desc">
          <h2>Rose Garden - Special Palabok</h2>
          <p className="mt-3">
            {" "}
            The business was established in 2010 as a sole proprietorship under
            the name Rose Garden Special Palabok. Mrs. Rosita Valencia Santos
            fondness for cooking resulted in the creation of the now popular
            PALABOK. Her first branch was located at 60 Camerino Street Project
            4 Quezon City.
          </p>
          <p {...getCollapseProps()}>
            After 12 years of existence offering low budget meals for the
            public, Mr. Reyes decided to incorporate Rose Garden Special
            Palabok. This would ensure that management of the Rose Garden
            Special Palabok will be passed on to their children. True enough,
            the children’s zest for expansion moved the Rose Garden into its new
            place and building. The business now offers catering services. The
            restaurant offers 12 hours access to good food and cheap meals
            designed especially for those who are on a restricted budget. Being
            low priced doesn’t mean that the quality of meals served is of low
            quality, so come and prove this for yourselves. The company’s
            carrier specialty is Palabok.
          </p>
          <button
            type="button"
            className="seeMore__btn"
            {...getToggleProps({
              onClick: () => setExpanded((prevExpanded) => !prevExpanded),
            })}
          >
            {isExpanded ? "See less" : "Read more"}
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default CompanyBackground;
