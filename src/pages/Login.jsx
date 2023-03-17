import React, { useState, useEffect } from "react";
import "../style/Login.css";
import { Link, useNavigate } from "react-router-dom";

// Firebase
import { db, auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  setDoc,
} from "firebase/firestore";

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

  // Navigation
  const navigate = useNavigate();

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
          navigate("/home");
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

  // Sign in With Google
  const [displayName, setDisplayName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const handleGoogleLogin = () => {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const email = result.user.email;
        const googleUid = result.user.uid;

        const displayName = result.user.displayName;
        setDisplayName(displayName);
        // Split the display name into first and last name
        const names = displayName.split(" ");
        setFirstName(names[0]);
        setLastName(names[names.length - 1]);

        const userDataRef = collection(db, "UserData"); // getting the UserData collection
        const queryData = query(userDataRef, where("email", "==", email));

        getDocs(queryData)
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              // user does not exist in database, so add a new document
              const userRef = doc(userDataRef);
              setDoc(userRef, {
                // fullName: displayName,
                firstName: firstName,
                lastName: lastName,
                email: email,
                uid: googleUid,
              });
              alert("New user added to Firestore");
            } else {
              alert("User already exists in Firestore");
            }
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  // Order as Guest Button Function
  const handleOrderAsGuest = () => {
    try {
      signInAnonymously(auth);
      alert("Logged in as guest");
      navigate("/home");
    } catch (error) {
      alert(error);
    }
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

          {/*------------------ Forgot Password ----------------- */}
          <Link to="/forgotPassword">
            <label className="forgotPassTxt d-flex justify-content-end mt-2">
              Forgot Password?
            </label>
          </Link>
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
        <button className="connectGoogle__btn" onClick={handleGoogleLogin}>
          Connect With Google
        </button>

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
        <button className="guest__btn" onClick={handleOrderAsGuest}>
          Order as Guest
        </button>
      </div>
    </div>
  );
};

export default Login;
