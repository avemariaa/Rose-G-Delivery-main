import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Orders from "../pages/Orders";
import FoodDetails from "../pages/FoodDetails";
import Bag from "../pages/Bag";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import TermsCondition from "../pages/TermsCondition";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import ForgotPassword from "../pages/ForgotPassword";
import UserProfile from "../pages/UserProfile";
import Settings from "../pages/Settings";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/foodDetails/:id" element={<FoodDetails />} />
      <Route path="/bag" element={<Bag />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/termsCondition" element={<TermsCondition />} />
      <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/userProfile" element={<UserProfile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default Routers;
