import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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
import Settings from "../pages/Settings";
import UserProfile from "../pages/UserProfile";
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
      <Route path="/settings" element={<Settings />} />
      <Route path="/userProfile" element={<UserProfile />} />
    </Routes>
  );
};

export default Routers;
