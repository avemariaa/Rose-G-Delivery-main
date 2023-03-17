import React, { useState } from "react";
import "../style/Registration.css";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

// Firebase
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

// Navigate
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [customErrorMsg, setCustomErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);

  /* -------------------- First Name Validation -------------------- */
  const [checkFirstName, setCheckFirstName] = useState(false);
  const handleFirstName = (text) => {
    setFirstName(text);
    let reg = /^[A-Za-z ]+$/; // valid alphabet with space
    if (reg.test(text)) {
      setCheckFirstName(false);
    } else {
      setCheckFirstName(true);
    }
  };

  /* -------------------- Last Name Validation -------------------- */
  const [checkLastName, setCheckLastName] = useState(false);
  const handleLastName = (text) => {
    setLastName(text);
    let reg = /^[A-Za-z ]+$/; // valid alphabet with space
    if (reg.test(text)) {
      setCheckLastName(false);
    } else {
      setCheckLastName(true);
    }
  };

  /* -------------------- Email Validation -------------------- */
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const handleCheckEmail = (text) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  /* -------------------- Password Validation -------------------- */
  const [checkValidPassword, setCheckValidPassword] = useState(false);
  const handleCheckPassword = (text) => {
    let regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/;

    setPassword(text);
    if (regex.test(text)) {
      setCheckValidPassword(false);
    } else {
      setCheckValidPassword(true);
    }
  };

  /* -------------------- Sign Up Button Fucntion -------------------- */
  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setCustomErrorMsg("Password doesn't match");
      return;
    }
    if (
      checkFirstName === true ||
      checkLastName === true ||
      checkValidEmail === true ||
      checkValidPassword === true
    ) {
      setCustomErrorMsg("Follow the required format");
      return;
    }

    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          alert("user created");
          if (userCredentials?.user.uid) {
            const userRef = addDoc(collection(db, "UserData"), {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password,
              uid: userCredentials?.user.uid,
            })
              .then(() => {
                alert("Data added to firestore");
                signOut(auth);
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                navigate("/login");
              })
              .catch((error) => {
                alert("firestore error", error);
              });
          }

          // //Email Verification

          sendEmailVerification(auth.currentUser).then(() => {
            alert("Email Verification Sent!");
          });
        })
        .catch((error) => {
          alert("Sign up firebase error", error.message);
          if (
            firstName.length === 0 &&
            lastName.length === 0 &&
            email.length === 0 &&
            password.length === 0 &&
            confirmPassword.length === 0
          ) {
            setCustomErrorMsg("Fill out the form");
          } else if (
            (firstName.length === 0 &&
              lastName.length === 0 &&
              email.length === 0) ||
            password.length === 0 ||
            confirmPassword.length === 0
          ) {
            setCustomErrorMsg("Fill out the form");
          } else if (
            error.message ===
            "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
          ) {
            setCustomErrorMsg("Email already exists");
          } else if (
            error.message ===
            "Firebase: The email address is badly formatted. (auth/invalid-email)."
          ) {
            setCustomErrorMsg("Invalid Email");
          } else if (
            error.message ===
            "Firebase: Password should be at least 6 characters (auth/weak-password)."
          ) {
            setCustomErrorMsg(`Password should be at least 8 characters, 1 numeric character, 1 lowercase letter, 1
            uppercase letter, 1 special character`);
          } else {
            setCustomErrorMsg(error.message);
          }
        });
    } catch (error) {
      alert("Sign up system error", error.message);
    }
  };

  return (
    <div className="registration__body">
      <div className="authForm__container">
        <h3 className="mb-5">Create An Account!</h3>
        {/*------------------ Registration Content ----------------- */}

        {/*------------------ Custom Error Msg for Firebase Error ----------------- */}
        {customErrorMsg !== "" && (
          <label className="customErrorMsg">{customErrorMsg}</label>
        )}

        <form className="registration__form">
          {/*------------------ First Name Field ----------------- */}
          <label for="fname">First Name</label>
          <input
            value={firstName}
            onChange={(e) => handleFirstName(e.target.value)}
            type="text"
            placeholder="First Name"
            id="firstName"
            name="firstName"
          />
          {/*------------------ First Name Validation Msg ----------------- */}
          {checkFirstName ? (
            <label className="errorMsg">It should only contain alphabet</label>
          ) : (
            ""
          )}

          {/*------------------ Last Name Field ----------------- */}
          <label for="lastName">Last Name</label>
          <input
            value={lastName}
            onChange={(e) => handleLastName(e.target.value)}
            type="text"
            placeholder="Last Name"
            id="lastName"
            name="lastName"
          />
          {/*------------------ Last Name Validation Msg ----------------- */}
          {checkLastName ? (
            <label className="errorMsg">It should only contain alphabet</label>
          ) : (
            ""
          )}

          {/*------------------ Email Field ----------------- */}
          <label for="email">Email</label>
          <input
            value={email}
            onChange={(e) => handleCheckEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          {/*------------------ Email Validation Msg ----------------- */}
          {checkValidEmail ? (
            <label className="errorMsg">Invalid email format</label>
          ) : (
            ""
          )}

          {/*------------------ Password Field ----------------- */}

          <label for="password">Password</label>
          <input
            value={password}
            onChange={(e) => handleCheckPassword(e.target.value)}
            type="password"
            placeholder="**********"
            id="password"
            name="password"
          />

          {/*------------------ Password Validation Msg ----------------- */}
          {checkValidPassword ? (
            <label className="errorMsg">
              At least 8 characters, 1 numeric character, 1 lowercase letter, 1
              uppercase letter, 1 special character
            </label>
          ) : (
            ""
          )}

          {/*------------------ Confirm Password Field ----------------- */}
          <label for="password">Confirm Password</label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="**********"
            id="confirmPassword"
            name="confirmPassword"
          />
          <label className="d-flex justify-content-center">
            By registering, you confirm that you accept our&nbsp;
            <Link to="/termsCondition">
              <span className="termsConditionTxt">Terms & Conditions</span>
            </Link>
            &nbsp;and&nbsp;
            <Link to="/privacyPolicy">
              <span className="privacyPolicyTxt">Privacy Policy.</span>
            </Link>
          </label>
          <button className="mt-3" type="submit" onClick={handleSignUp}>
            Sign Up
          </button>
          <label className="d-flex justify-content-center">
            Already have an account?&nbsp;
            <Link to="/login">
              <span className="signInTxt">Sign In</span>
            </Link>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Registration;
