import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
// Firebase
import { db } from "../firebase";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

if (user !== null) {
  user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  First Name: " + profile.firstName);
    console.log("  Email: " + profile.email);
  });
}

const UserProfile = () => {
  return (
    <section>
      <Container>
        <h3>User Profile</h3>
        <ul>
          <span>Email: {user.email}</span>
          <span>First: burikat {user.firstName}</span>
        </ul>
        <button className="bagCheckout__btn mt-3">
          <Link to="/settings">Edit Profile</Link>
        </button>
      </Container>
    </section>
  );
};

export default UserProfile;
