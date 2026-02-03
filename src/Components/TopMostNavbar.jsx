import React from "react";
import { topMostNavbarData } from "./Data";
import { useNavigate } from "react-router-dom";

const TopMostNavbar = () => {
  const navigate = useNavigate();

  const handleNavigate = (url) => {
    navigate(url);
  };

  return (
    <div>
      <div className="  ">
        <div className="flex justify-around border border-blue-500">
          {topMostNavbarData?.map((elm) => (
            <button
              key={elm?.url}
              onClick={() => handleNavigate(elm?.url)}
              className="border-r-[1px] border-white bg-teal-900  lg:text-[16px] md:text-[12px] sm:text-[9px] w-full text-[8px]  text-white py-[6px] "
            >
              {elm?.discount}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopMostNavbar;
