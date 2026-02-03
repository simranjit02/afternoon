import React from "react";
import TopMostNavbar from "./TopMostNavbar";
import Navbar from "./Navbar";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";

const LayoutSection = ({ children }) => {
  return (
    <div className="">
      <TopMostNavbar />
      <Navbar />
      <TopNavbar />
      <div className="flex  gap-x-[50px]  ">
        <Sidebar />
        <div className="w-full ">{children}</div>
      </div>
    </div>
  );
};

export default LayoutSection;
