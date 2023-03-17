import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { db } from "../firebase";

export default function UserProfile() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    console.log(users)
  }, [users])

  const getUsers = async () => {
    const userDataRef = collection(db, "UserData")
    getDocs(userDataRef)
      .then(Response => {
        const anyUser = Response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id,
        }))
        setUsers(anyUser)
      })
      .catch(error => console.log(error.message))
  }

  return (
    <section>
      <Container>
        <h3>User Profile</h3>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.data.email}</li>
          ))}
        </ul>
        <button className="bagCheckout__btn mt-3">
          <Link to="/settings">Edit Profile</Link>
        </button>
      </Container>
    </section>
  )

};


