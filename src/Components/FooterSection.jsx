import React, { useState } from "react";
import { BiLogoFacebook } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const FooterSection = () => {
  const navigate = useNavigate();

  const footerButton1 = [
    { tab: "Furniture", url: "/furniture" },
    { tab: "Lighting", url: "/lighting" },
    { tab: "Rugs", url: "/rugs" },
    { tab: "New", url: "/new" },
    { tab: "Sale", url: "/sale" },
  ];
  const footerButton2 = [
    { tab: "Shipping & Returns" },
    { tab: "Store Policy" },
    { tab: "Payment Methods" },
    { tab: "FAQ" },
  ];
  const footerButton3 = [
    { tab: "Our Story" },
    { tab: "Brands & Designers", url: "/" },
    { tab: "Stores" },
    { tab: "Contact" },
  ];
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleNavigate = (url) => {
    navigate(url);
  };

  return (
    <div className="bg-[#3F5C58] w-[100%]  mt-[60px]   pb-[50px]">
      <div className="  md:flex   gap-x-[40px] py-[60px]">
        <div className="flex flex-col gap-y-[30px] w-fit   pl-[50px] md:pl-[30px] lg:pl-[60px] sm:pl-[200px]  mb-9 sm:mb-9">
          <p className="text-[17px] sm:text-[18px] text-white font-md lg:text-[22px]  md:text-[17px] ">
            Sign Up to Our Newsletter
          </p>
          <form className="" onSubmit={handleSubmit}>
            <div className="flex w-fit flex-col gap-y-[15px]">
              <label
                className="text-[15px] lg:text-[20px] md:text-[17px] text-white"
                htmlFor="email"
              >
                Email*
              </label>
              <input
                className={`bg-[#3F5C58] border-[1px] border-white focus:bg-[#3F5C58] text-white text-lg hover:outline-none pr-[80px] lg:pr-[140px] md:pr-[50px]  pl-[10px] w-fit text-left py-[6px] 
      `}
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e?.target?.value)}
                autoComplete="email"
              />
            </div>
            <div
              className=" bg-[#3F5C58] border sm:text-[14px] text-[14px] w-fit text-[10px] xl:text-md lg:text-[16px] md:text-[13px] text-white border-white lg:px-5 md:px-4 px-4 py-[7px] hover:bg-white hover:text-black cursor-pointer"
              type="submit"
            >
              Submit
            </div>
          </form>
        </div>

        <div className="flex flex-row  sm:justify-center md:justify-end  xl:gap-x-[150px] md:gap-x-[30px] sm:gap-x-[70px] gap-x-[40px] w-full sm:ml-0 ml-[48px] mr-10">
          {/* 1st line buttons */}
          <div className="flex  flex-col w-fit   gap-y-1  ">
            <div className="text-white  cursor-pointer font-semibold mb-4 lg:text-[18px] md:text-[16px] sm:text-[17px] text-[17px]">
              Shop
            </div>
            {footerButton1?.map((product) => (
              <div
                onClick={() => handleNavigate(product?.url)}
                key={product?.url}
                className="text-white lg:text-[16px] md:text-[13px] sm:text-[14px] text-[13px] cursor-pointer"
              >
                {product?.tab}
              </div>
            ))}
          </div>

          {/* 2nd line button */}
          <div className="flex  flex-col w-fit  gap-y-1 ">
            <div className="text-white font-semibold  cursor-pointer mb-4 lg:text-[18px] md:text-[16px] sm:text-[17px] text-[17px]">
              Customer Service
            </div>
            {footerButton2?.map((product) => (
              <div className="text-white text-md cursor-pointer lg:text-[16px] md:text-[13px] sm:text-[14px] text-[13px]">
                {product?.tab}
              </div>
            ))}
          </div>

          {/* 3rd line buttons */}
          <div className="flex  flex-col w-fit  gap-y-1  ">
            <div
              onClick={() => navigate("/")}
              className="text-white  font-semibold cursor-pointer mb-4 lg:text-[18px] md:text-[16px] sm:text-[17px] text-[17px]"
            >
              About After.noon
            </div>
            {footerButton3?.map((product) => (
              <div
                key={product?.url}
                onClick={() => handleNavigate(product?.url)}
                className="text-white text-md cursor-pointer lg:text-[16px] md:text-[13px] sm:text-[14px] text-[13px]"
              >
                {product?.tab}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* footer bottom */}
      <div className="border-0  sm:flex justify-between px-[50px]  items-center md:mt-[0px] sm:mt-[0px]">
        <div className="sm:flex md:gap-x-[50px] sm:gap-x-[30px]   border-0  w-fit">
          <div className="border-0  w-fit flex justify-center items-center gap-x-[10px]">
            <svg
              className="text-white lg:h-10 md:h-8 h-6"
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
                  fill="#ffffff"
                  d="M145.929 98.5v-5.101c0-25.326-20.604-45.929-45.929-45.929-25.327 0-45.932 20.603-45.932 45.929V98.5H28.149v3c0 15.917 11.078 29.262 25.919 32.819v18.211h6v-17.344c.62.034 1.233.094 1.86.094h76.14c.628 0 1.241-.06 1.86-.094v17.344h6v-18.211c14.842-3.556 25.922-16.902 25.922-32.819v-3h-25.921zm-85.861-5.101C60.068 71.382 77.98 53.47 100 53.47c22.017 0 39.929 17.912 39.929 39.929V98.5h-79.86v-5.101zM34.311 104.5h19.758v23.641c-10.575-3.126-18.545-12.383-19.758-23.641zm103.757 24.779h-76.14c-.627 0-1.243-.047-1.86-.088V104.5h79.86v24.691c-.617.041-1.232.088-1.86.088zm7.861-1.138V104.5h19.761c-1.214 11.258-9.185 20.516-19.761 23.641z"
                  data-color="1"
                ></path>
              </g>
            </svg>
            <div
              onClick={() => navigate("/")}
              className="font-semibold  xl:text-[22px] lg:text-[20px] md:text-[18px] cursor-pointer text-white text-[17px]  "
            >
              After.noon
            </div>
          </div>
          <div className="flex flex-col sm:mt-0 mt-5">
            {/* address part */}
            <div className="text-[13px] text-white xl:text-sm xl:text-[16px] sm:text-[12px] lg:text-[14px] md:text-[13px]">
              500 Terry Francine Street, San Francisco, CA 94158
            </div>
            {/* ph no & gmail */}
            <div className="text-[13px] text-white  xl:text-[16px] lg:text-[14px] sm:text-[12px] md:text-[13px]">
              123-456-7890 / info@my-domain.com
            </div>
          </div>
        </div>

        {/* footer logos */}

        <div className=" flex gap-x-2 sm:mt-0 mt-4 pr-5">
          <BiLogoFacebook size={22} color="white" />
          <FaInstagram size={22} color="white" />
          <TiSocialTwitter size={23} color="white" />
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
