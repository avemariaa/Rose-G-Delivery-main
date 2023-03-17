import React, { useState } from "react";
import "../style/ForgotPassword.css";
import ForgotPasswordImg from "../assets/images/forgot-password.png";

// Firebase
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

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

  /* -------------------- Forgot Password Button Function -------------------- */
  const handleSubmit = () => {
    if (email !== "") {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Password reset email has been sent successfully");
          setSuccessMsg(
            "Password reset email has been sent successfully. Check it on spam section"
          );
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(error.message);
        });
    }
  };
  return (
    <div className="forgotPassword__body">
      <div className="forgotPassword__container">
        <h3>Forgot Password?</h3>
        <img className="lock__img" src={ForgotPasswordImg} alt="lock-img" />

        <label>
          Enter the email associated with your account and we'll send an email
          with instructions to reset your password
        </label>

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

        {/* -------------------- Submit Button -------------------- */}
        <button onClick={handleSubmit}>Submit</button>

        {/* -------------------- Success Message -------------------- */}
        {successMsg !== "" && <label>{successMsg}</label>}
      </div>
    </div>
  );
};

export default ForgotPassword;
