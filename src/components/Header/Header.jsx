import React, { useState, useRef, useEffect } from "react";
import "../../style/Header.css";

import RoseGLogo from "../../assets/images/roseGLogoName.png";
import { NavLink, Link } from "react-router-dom";
import { bagUiActions } from "../../store/MyBag/bagUiSlice";

import profile from "../../assets/images/sungJinwoo.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Firebase
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  userLogInState,
  userLogOutState,
  selectUser,
} from "../../store/UserSlice/userSlice";

// Navigation
import { useNavigate } from "react-router-dom";
import { Icon } from "@mui/material";

// Main Menu Navigation Links
const nav__links = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Menu",
    path: "/menu",
  },
  {
    display: "Orders",
    path: "/orders",
  },
  // {
  //   display: "Login",
  //   path: "/login",
  // },
  // {
  //   display: "Sign up",
  //   path: "/registration",
  // },
];

const Header = () => {
  const menuRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Navigation
  const navigate = useNavigate();

  // User Profile Drop Down
  const [open, setOpen] = useState(false);
  const toggleProfileMenu = () => {
    setOpen(!open);
  };

  const totalQuantity = useSelector((state) => state.bag.totalQuantity);

  const dispatch = useDispatch();
  const toggleBag = () => {
    dispatch(bagUiActions.toggle());
  };

  //Redux
  const user = useSelector(selectUser);
  // onAuthChanged
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser && authUser.emailVerified === true) {
        // Logged In Action
        dispatch(
          userLogInState({
            email: authUser.email,
            lastSignIn: authUser.metadata.lastSignInTime,
            emailVerified: authUser.emailVerified.toString(),
          })
        );
      } else {
        // Logged Out action
        dispatch(userLogOutState());
      }
    });
  }, []);

  // Only show login and sign up links when user is not logged in
  const authLinks = user ? null : (
    <>
      <NavLink to="/login" activeClassName="active__menu">
        Login
      </NavLink>
      <NavLink to="/registration" activeClassName="active__menu">
        Sign up
      </NavLink>
    </>
  );

  // Sign Out Function
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        alert("Logged out successfully");
        navigate("/login");
      })
      .catch((error) => alert(error));
  };

  // User Profile Drop Down Links
  const userProfile__links = [
    {
      display: "Profile",
      path: "/userProfile",
    },
    {
      display: "Settings",
      path: "/settings",
    },
    {
      display: "Logout",
      onClick: handleSignOut,
    },
  ];

  return (
    <header className="header">
      <div className="nav_wrapper d-flex align-items-center">
        <div className="nav__left d-flex align-items-center me-auto">
          <div className="logo">
            <Link to="/home">
              <img src={RoseGLogo} alt="rose-g-logo" />
              {/* <span>Rose G</span> */}
            </Link>
          </div>
        </div>

        {/* ===== MENU =====*/}
        <div
          className={isMobile ? "menu-mobile" : "navigation"}
          ref={menuRef}
          onClick={() => setIsMobile(false)}
        >
          <div className="menu d-flex align-items-center gap-4">
            {nav__links.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={(navClass) =>
                  navClass.isActive ? "active__menu" : ""
                }
              >
                {item.display}
              </NavLink>
            ))}
            {authLinks}
          </div>
        </div>

        {/* BAG */}
        <div className="nav__icons d-flex align-items-center gap-4">
          <span className="bag__icon" onClick={toggleBag}>
            <i class="ri-shopping-bag-2-line"></i>
            <span className="bag__badge">{totalQuantity}</span>
          </span>

          {user && (
            <>
              {/* USER PROFILE DROPDOWN */}
              <div className="dropdown">
                <button
                  className="dropdown__button"
                  onClick={toggleProfileMenu}
                >
                  {/* <img src={profile} alt="profile" /> */}
                  <AccountCircleIcon
                    style={{ fontSize: 35, marginLeft: -10 }}
                  />
                </button>
                {open && (
                  <div className="dropdown__menu">
                    {userProfile__links.map((item, index) => (
                      <>
                        {/* item.onClick is use to not overlap the onClick function from the NavLink */}
                        {item.onClick ? (
                          <a
                            className="dropdown__menu__item"
                            onClick={item.onClick}
                          >
                            {item.display}
                          </a>
                        ) : (
                          <NavLink
                            to={item.path}
                            key={index}
                            className="dropdown__menu__item"
                            onClick={toggleProfileMenu}
                          >
                            {/* <img src={item.icon} alt={item.display} /> */}
                            {item.display}
                          </NavLink>
                        )}
                      </>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
          <span className="mobile__menu" onClick={() => setIsMobile(!isMobile)}>
            {isMobile ? (
              <i class="ri-close-line"></i>
            ) : (
              <i class="ri-menu-line"></i>
            )}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
