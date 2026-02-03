import React from "react";
import TopMostNavbar from "./TopMostNavbar";
import Navbar from "./Navbar";
import TopNavbar from "./TopNavbar";

const LayoutCart = ({ children }) => {
  return (
    <div>
      <TopMostNavbar />
      <Navbar />
      <TopNavbar />
      <div className=" ">{children}</div>
    </div>
  );
};

export default LayoutCart;
