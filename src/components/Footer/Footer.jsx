import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import logo from "../../assets/images/roseGLogoFooter.png";
import "../../style/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" md="4" sm="6">
            <div className="footer__logo text-start">
              <img src={logo} alt="logo" />
              {/* <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi,
                explicabo.
              </p> */}
            </div>
          </Col>
          <Col lg="3" md="4" sm="6">
            <ListGroup className="delivery__time-list">
              <ListGroupItem className="footer__menu-item border-0 ps-0">
                <Link to="/home">
                  <span>Home</span>
                </Link>
              </ListGroupItem>
              <ListGroupItem className="footer__menu-item border-0 ps-0">
                <Link to="/menu">
                  <span>Menu</span>
                </Link>
              </ListGroupItem>
              <ListGroupItem className="footer__menu-item border-0 ps-0">
                <Link to="/orders">
                  <span>Orders</span>
                </Link>
              </ListGroupItem>
              <ListGroupItem className="footer__menu-item border-0 ps-0">
                <Link to="/termsCondition">
                  <span>Terms & Conditions</span>
                </Link>
              </ListGroupItem>
              <ListGroupItem className="footer__menu-item border-0 ps-0">
                <Link to="/privacyPolicy">
                  <span>Privacy Policy</span>
                </Link>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg="3" md="4" sm="6">
            <h5 className="footer__title">Hours</h5>
            <ListGroup className="delivery__time-list">
              <ListGroupItem className="delivery__time-item border-0 ps-0">
                <span>Monday - Friday</span>
                <p>8:00am - 5:00pm</p>
              </ListGroupItem>

              <ListGroupItem className="delivery__time-item border-0 ps-0">
                <span>Saturday - Sunday</span>
                <p>Off Day</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg="3" md="4" sm="6">
            <h5 className="footer__title-contact">Contact Us</h5>
            <ListGroup className="contact__us-list">
              <ListGroupItem className="contact__us-item border-0 ps-0">
                <a href="https://www.google.com/maps/place/60+Camerino,+Project+4,+Lungsod+Quezon,+1109+Kalakhang+Maynila/@14.6248945,121.0667595,17z/data=!3m1!4b1!4m5!3m4!1s0x3397b78e161aaacf:0x32b943dad2a00bf6!8m2!3d14.6248945!4d121.0689482">
                  <i class="ri-map-pin-line"></i>
                  <span>
                    60 Camerino St. Bgy. Marilag Project 4, Quezon City
                  </span>
                </a>
              </ListGroupItem>

              <ListGroupItem className="contact__us-item border-0 ps-0">
                <i class="ri-phone-line"></i>
                <span>09123123123</span>
              </ListGroupItem>

              <ListGroupItem className="contact__us-item border-0 ps-0">
                <i class="ri-mail-line"></i>
                <span>rose.g.special@gmail.com</span>
              </ListGroupItem>
              <ListGroupItem className="contact__us-item border-0 ps-0">
                <a href="https://www.facebook.com/profile.php?id=100063606564417">
                  <i class="ri-facebook-circle-line"></i>
                  <span>facebook</span>
                </a>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>

        <Row>
          <div className="conditions__policy">
            <Link to="/termsCondition">
              <span className="terms__conditions">Terms & Conditions</span>
            </Link>
            <Link to="/privacyPolicy">
              <span className="privacy__policy">Privacy Policy</span>
            </Link>
          </div>
        </Row>
        <Row>
          <div className="copyright__text">
            <p>
              <i class="ri-copyright-line"></i> 2022 Rose G. All Rights
              Reserved.
            </p>
          </div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
