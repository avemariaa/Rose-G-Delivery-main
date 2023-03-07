import React, { useState, useRef } from "react";
import "../../style/Header.css";

import RoseGLogo from "../../assets/images/roseGLogoName.png";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bagUiActions } from "../../store/MyBag/bagUiSlice";
import profile from "../../assets/images/sungJinwoo.jpg";

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
  {
    display: "Login",
    path: "/login",
  },
  {
    display: "Sign up",
    path: "/registration",
  },
  
];

const profile__links = [
  {
    display:"Profile",
    path:"/userProfile",
  },
  {
    display:"Settings",
    path: "/settings",
  },
  {
    display: "Logout",
    path: "/login",
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const totalQuantity = useSelector((state) => state.bag.totalQuantity);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const toggleBag = () => {
    dispatch(bagUiActions.toggle());
  };

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
          </div>
        </div>

        <div className="nav__icons d-flex align-items-center gap-4">
          <span className="bag__icon" onClick={toggleBag}>
            <i class="ri-shopping-bag-2-line"></i>
            <span className="bag__badge">{totalQuantity}</span>
          </span>

          <span className="mobile__menu" onClick={() => setIsMobile(!isMobile)}>
            {isMobile ? (
              <i class="ri-close-line"></i>
            ) : (
              <i class="ri-menu-line"></i>
            )}
          </span>
        </div>

        <div>
          <div className="dropdown">
              <img 
              onClick={()=>setOpen(!open)}
              src={profile} alt="profile"
               />
              {open &&
              <div>
              {profile__links.map((item, index) => (
                <ul
                onClick={() => setOpen(false)}>
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                >
                  {item.display}
                </NavLink>
                </ul>
              ))}
              </div>}
              
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
