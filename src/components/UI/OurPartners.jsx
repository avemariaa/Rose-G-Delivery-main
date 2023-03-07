import React from "react";
import "../../style/OurPartners.css";
import { Container, Row, Col } from "reactstrap";
import AiceIceCreamLogo from "../../assets/images/aiceIceCreamLogo.jpg";
import LalamoveLogo from "../../assets/images/lalamove.png";
const OurPartners = () => {
  return (
    <div>
      <Row>
        <div className="ourPartners__title">
          <h4>Our Partners</h4>
        </div>
      </Row>
      <Row>
        <Col className="ourPartners__logo">
          <img src={AiceIceCreamLogo} alt="aice-logo" />
          <img src={LalamoveLogo} alt="lalamove-logo" />
        </Col>
      </Row>
    </div>
  );
};

export default OurPartners;
