import React from "react";
import { data } from "./NavbarData";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (url) => {
    navigate(url);
  };

  return (
    <div>
      <div className="  ">
        <div className="bg-[#ffffff] py-[13px]  w-full   ">
          <div className="  w-full gap-x-[17px]  px-[45px] sm:flex sm:items-center justify-between ">
            <div className=" flex justify-center w-fit items-center gap-x-2  sm:gap-x-2 ">
              <svg
                className=" lg:h-11 md:h-9 h-6 sm:h-7"
                preserveAspectRatio="xMidYMid meet"
                data-bbox="28.149 47.47 143.701 105.06"
                viewBox="28.149 47.47 143.701 105.06"
                height=""
                width=""
                xmlns="http://www.w3.org/2000/svg"
                data-type="color"
                role="img"
                aria-label="Homepage"
              >
                <defs>
                  <style>#comp-k2iqflus svg [data-color="1"]</style>
                </defs>
                <g>
                  <path
                    d="M145.929 98.5v-5.101c0-25.326-20.604-45.929-45.929-45.929-25.327 0-45.932 20.603-45.932 45.929V98.5H28.149v3c0 15.917 11.078 29.262 25.919 32.819v18.211h6v-17.344c.62.034 1.233.094 1.86.094h76.14c.628 0 1.241-.06 1.86-.094v17.344h6v-18.211c14.842-3.556 25.922-16.902 25.922-32.819v-3h-25.921zm-85.861-5.101C60.068 71.382 77.98 53.47 100 53.47c22.017 0 39.929 17.912 39.929 39.929V98.5h-79.86v-5.101zM34.311 104.5h19.758v23.641c-10.575-3.126-18.545-12.383-19.758-23.641zm103.757 24.779h-76.14c-.627 0-1.243-.047-1.86-.088V104.5h79.86v24.691c-.617.041-1.232.088-1.86.088zm7.861-1.138V104.5h19.761c-1.214 11.258-9.185 20.516-19.761 23.641z"
                    fill="#3F5C58"
                    data-color="1"
                  ></path>
                </g>
              </svg>
              <div
                onClick={() => navigate("/")}
                className="font-semibold lg:text-2xl text-black cursor-pointer md:text-xl sm:text-lg"
              >
                After.noon
              </div>
            </div>
            <div className=" w-fit  flex flex-row gap-x-3  md:gap-x-[35px] sm:gap-x-[20px]">
              {data?.map((val) => (
                <div
                  key={val?.url}
                  onClick={() => handleNavigation(val?.url)}
                  className="text-[#2E3238] text-md  cursor-pointer xl:text-[17px]  lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px] sm:mt-0 mt-3"
                >
                  {val.tab}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="border-b-[1px] border-black w-[95%]"></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
