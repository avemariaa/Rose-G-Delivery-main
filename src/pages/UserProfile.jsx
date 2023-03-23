import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
// Firebase
import { db } from "../firebase";
import { collection, where, getDocs, query } from "firebase/firestore";

export default function UserProfile() {
  //------------------ Retrieve User Data ------------------//
  const [userLoggedUid, setUserLoggedUid] = useState(null);
  const [userData, setUserData] = useState(null);

  const getUserData = () => {
    const userDataRef = collection(db, "UserData"); // getting the UserData collection
    const queryData = query(userDataRef, where("uid", "==", userLoggedUid));

    getDocs(queryData).then((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
        });
      } else {
        //navigation.navigate("Login");
        console.log("Empty user document");
      }
    });
  };
  useEffect(() => {
    getUserData();
  }, [userLoggedUid]);

  return (
    <section>
      <Container>
        <h3>User Profile</h3>
        <h4>try nga</h4>
        <ul>
          <span>{userData?.firstName || "User"}</span>
        </ul>
        <button className="bagCheckout__btn mt-3">
          <Link to="/settings">Edit Profile</Link>
        </button>
      </Container>
    </section>
  );
}
