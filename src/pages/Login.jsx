import React, { useState, useEffect } from "react";
import "../style/Login.css";
import { Link } from "react-router-dom";

// Firebase
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  userLogInState,
  userLogOutState,
  selectUser,
} from "../store/UserSlice/userSlice";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  //Redux
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser && authUser.emailVerified === true) {
        // Logged In Action
        dispatch(
          userLogInState({
            email: authUser.email,
            lastSignIn: authUser.metadata.lastSignInTime,
            // emailVerified: authUser.emailVerified.toString(),
          })
        );
        // Clear textfields once successfully logged in

        setEmail("");
        setPassword("");
      } else {
        // Logged Out action
        dispatch(userLogOutState());
        // Clear textfields once successfully logged out
        setEmail("");
        setPassword("");
      }
    });
  }, []);

  // Validation Error Messagge
  const [customErrorMsg, setCustomErrorMsg] = useState("");

  // Sign Up Button Function
  const handleSignIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // If email is verified, the user can logged in
        if (auth.currentUser.emailVerified) {
          alert("Logged in successfully");
        }
        // Verify email first to login
        else {
          alert("Verify your email first");
          setEmail("");
          setPassword("");
          setCustomErrorMsg("");
        }
      })
      .catch((error) => {
        console.log(error);
        var errorMessage = error.message;
        if (email === "" && password === "") {
          setCustomErrorMsg("Please enter email address and password");
        } else if (
          errorMessage ===
          "Firebase: The email address is badly formatted. (auth/invalid-email)."
        ) {
          setCustomErrorMsg("Please enter a valid email address");
        } else {
          setCustomErrorMsg("Incorrect email or password");
        }
      });
  };

  // Sign Out Button Function
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        alert("Logged out successfully");
        setCustomErrorMsg();
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="login__body">
      <div className="authForm__container">
        <h3 className="mb-5">Sign in to your account</h3>

        {/*------------------ Login Content ----------------- */}

        {/*------------------ Validation Error Message ----------------- */}
        {customErrorMsg !== "" && (
          <label className="customErrorMsg">{customErrorMsg}</label>
        )}

        <form className="login__form" onSubmit={handleSignIn}>
          {/*------------------ Email Field ----------------- */}
          <label for="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />

          {/*------------------ Password Field ----------------- */}
          <label for="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="**********"
            id="password"
            name="password"
          />
          <label className="forgotPassTxt d-flex justify-content-end mt-2">
            Forgot Password?
          </label>
        </form>

        {/*------------------ Login - Redux ----------------- */}
        {user ? (
          // If current user is logged in, it display the email and last sign in
          <>
            <p>Email: {user.email}</p>
            <p>Last Sign In: {user.lastSignIn}</p>
            <p>Email Verified: {user.emailVerified}</p>
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          // If the current user is not yet logged in or logout, the sign in button should appear
          <button onClick={handleSignIn}>Sign In</button>
        )}

        <label className="d-flex justify-content-center mt-2">
          Don't have an account?
        </label>

        {/*------------------ Create An Account Button ----------------- */}
        <Link to="/registration">
          <button className="createAcc__btn">Create An Account</button>
        </Link>

        {/*------------------ Connect With Google Button ----------------- */}
        <button className="connectGoogle__btn">Connect With Google</button>

        {/*------------------ Terms & Condition - Privacy Policy ----------------- */}
        <label>
          By continuing, you agree to our updated{" "}
          <Link to="/termsCondition">
            <span className="termsConditionTxt">Terms & Conditions</span>
          </Link>
          &nbsp;and&nbsp;
          <Link to="/privacyPolicy">
            <span className="privacyPolicyTxt">Privacy Policy.</span>
          </Link>
        </label>
        <label className="d-flex justify-content-center">OR</label>

        {/*------------------ Order As Guest Button ----------------- */}
        <button className="guest__btn">Order as Guest</button>
      </div>
    </div>
  );
};

export default Login;
