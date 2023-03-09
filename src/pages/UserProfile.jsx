import React from "react";
import "../style/UserProfile.css";
import { Container, Row, Col } from "reactstrap";
const UserProfile = () => {
  return (
    <div className="userProfile__content">
      <Container>
        <h2>User Profile</h2>
        <p className="mt-3">
          user profile contents
        </p>

       
      </Container>
    </div>
  );
};

export default UserProfile;
