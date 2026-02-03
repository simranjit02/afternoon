import React, { useEffect, useState } from "react";
import BgImage1 from "../Images/BgImage1.jpg";
import BgImage2 from "../Images/BgImage2.jpg";
import BgImage3 from "../Images/BgImage3.jpg";
import BestSeller from "./BestSeller";
import BdImage1 from "../Images/BdImage1.png";
import BdImage2 from "../Images/BdImage2.png";
import BdImage3 from "../Images/BdImage3.png";
import BdImage4 from "../Images/BdImage4.png";
import BdImage5 from "../Images/BdImage5.png";
import JaneLeviImage from "../Images/JaneLeviImage.jpeg";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

import TopMostNavbar from "./TopMostNavbar";
import Navbar from "./Navbar";
import TopNavbar from "./TopNavbar";
import { useAtom } from "jotai";
import { atomData } from "./store";
import { useNavigate } from "react-router-dom";
import BrandDesigner from "./BrandDesigner";

const Home = () => {
  const navigate = useNavigate();

  const images = [BgImage1, BgImage2, BgImage3];
  const brandImages = [BdImage1, BdImage2, BdImage3, BdImage4, BdImage5];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [getData, setGetData] = useAtom(atomData);

  const getFurnitureImage = getData?.filter((product) => {
    return product?.productId === "Rug2";
  });

  useEffect(() => {
    axios
      .get("/Data.json")
      .then((response) => {
        setGetData(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });

    AOS.init({ duration: "1000", delay: "5s", easing: "ease" });

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images?.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images?.length, setGetData]);

  return (
    <div>
      <div className="">
        <TopMostNavbar /> <Navbar /> <TopNavbar />
      </div>
      {/* 1stpart homepage */}
      <div className="relative  h-[100vh]">
        {images?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* box container */}

        <div className="h-[100vh] w-fit top-1/3 absolute left-1/3">
          <div className="bg-[#35383D] bg-opacity-90 flex justify-center flex-col items-center  w-fit px-[75px] py-[80px] ">
            <div className="flex flex-col items-center">
              <div className="text-5xl font-semibold text-white  tracking-[.16em] mb-2">
                The Annual
              </div>
              <div className="text-5xl font-semibold text-white mb-4  tracking-[.16em] mb-4">
                Holiday Sale
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white w-fit">
                I'm a title. Click here to add your{" "}
              </p>
              <p className=" text-white w-fit mb-8">own text and edit me. </p>
            </div>
            <div
              onClick={() => navigate("/shopAll")}
              className="text-xl  bg-[#35373C]  cursor-pointer w-fit font-md bg-black px-[50px] py-2 text-white cursor-pointer hover:bg-white hover:text-black shadow-2xl"
            >
              Shop Now
            </div>
          </div>
        </div>
      </div>

      {/* 2nd box container */}

      <div className="w-full mt-[-65px]  absolute">
        <div className="flex justify-around px-[30px]">
          <div className="flex justify-center items-center border-r-[1px] border-b-[1px] border-black gap-x-2 py-[50px] bg-white  w-full">
            <svg
              preserveAspectRatio="xMidYMid meet"
              data-bbox="34 52 132 96"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="34 52 132 96"
              data-type="color"
              role="presentation"
              aria-hidden="true"
              aria-label=""
            >
              <defs>
                <style>#comp-k2eflne6 svg [data-color="1"] </style>
              </defs>
              <g>
                <path
                  fill="#3F5C58"
                  d="M34 52v96h132V52H34zm6 90V58h58.5v84H40zm120 0h-55.5V58H160v84z"
                  data-color="1"
                ></path>
                <path
                  d="M127 88v24h-6V88h6z"
                  fill="#3F5C58"
                  data-color="1"
                ></path>
                <path
                  d="M80.5 88v24h-6V88h6z"
                  fill="#3F5C58"
                  data-color="1"
                ></path>
              </g>
            </svg>
            <button
              onClick={() => navigate("/furniture")}
              className="  text-xl  text-black  "
            >
              Furniture
            </button>
          </div>

          <div className="flex justify-center items-center border-r-[1px] border-b-[1px] border-black gap-x-2 py-[50px] bg-white  w-full">
            <svg
              preserveAspectRatio="xMidYMid meet"
              data-bbox="58.063 53.195 83.873 93.609"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="58.063 53.195 83.873 93.609"
              data-type="color"
              role="presentation"
              aria-hidden="true"
              aria-label=""
            >
              <defs>
                <style>#comp-k2efqkxy svg [data-color="1"] </style>
              </defs>
              <g>
                <path
                  fill="#3F5C58"
                  d="M141.936 123.279c0-21.993-17.026-40.05-38.584-41.767V53.195h-6v28.281c-21.889 1.377-39.289 19.573-39.289 41.803v3h16.801c2.382 11.696 12.747 20.525 25.136 20.525s22.754-8.829 25.136-20.525h16.8v-3zm-41.935 17.526c-9.061 0-16.687-6.171-18.951-14.525h37.901c-2.263 8.353-9.889 14.525-18.95 14.525zm-35.813-20.526C65.716 101.86 81.195 87.342 100 87.342s34.283 14.518 35.812 32.937H64.188z"
                  data-color="1"
                ></path>
              </g>
            </svg>
            <button
              onClick={() => navigate("/lighting")}
              className="  text-xl  text-black  "
            >
              Lighting
            </button>
          </div>

          <div className="flex justify-center items-center border-r-[1px] border-b-[1px] border-black gap-x-2 py-[50px] bg-white  w-full">
            <svg
              preserveAspectRatio="xMidYMid meet"
              data-bbox="24.75 48.75 150.5 102.499"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="24.75 48.75 150.5 102.499"
              data-type="color"
              role="presentation"
              aria-hidden="true"
              aria-label=""
            >
              <defs>
                <style>#comp-k2efs9ne svg [data-color="1"] </style>
              </defs>
              <g>
                <path
                  fill="#3F5C58"
                  d="M175.25 68.501v-6h-15.498V48.75h-6V62.5h-16.5V48.75h-6V62.5h-18V48.75h-6V62.5H92.25V48.75h-6V62.5h-18V48.75h-6V62.5h-16.5V48.75h-6V62.5h-15v6h15V85h-15v6h15v18h-15v6h15v16.5h-15v6h15v13.749h6V137.5h16.5v13.749h6V137.5h18v13.749h6V137.5h15.001v13.749h6V137.5h18v13.749h6V137.5h16.5v13.749h6V137.5h15.498v-6h-15.498V115h15.498v-6h-15.498V91h15.498v-6h-15.498V68.5h15.499zm-129.5 0h108.001v63H45.75v-63z"
                  data-color="1"
                ></path>
                <path
                  fill="#3F5C58"
                  d="M77.917 100.001l23.335 23.335 23.332-23.335-23.332-23.333-23.335 23.333zm23.335 14.85L86.401 100l14.851-14.849L116.1 100l-14.848 14.851z"
                  data-color="1"
                ></path>
              </g>
            </svg>
            <button
              onClick={() => navigate("/rugs")}
              className="  text-xl  text-black  "
            >
              Rugs
            </button>
          </div>

          <div className="flex justify-center items-center  border-b-[1px] border-black gap-x-2 py-[50px] bg-white  w-full">
            <svg
              preserveAspectRatio="xMidYMid meet"
              data-bbox="65.1 45.6 69.8 108.8"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="65.1 45.6 69.8 108.8"
              data-type="color"
              role="presentation"
              aria-hidden="true"
              aria-label=""
            >
              <defs>
                <style>#comp-k35z35qg svg [data-color="1"] </style>
              </defs>
              <g>
                <path
                  d="M112.82 102.55l4.242 4.242-29.768 29.77-4.243-4.243 29.769-29.77z"
                  fill="#3f5c58"
                  data-color="1"
                ></path>
                <path
                  d="M97.1 110.1a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  fill="#3f5c58"
                  data-color="1"
                ></path>
                <path
                  d="M116.2 129.3a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  fill="#3f5c58"
                  data-color="1"
                ></path>
                <path
                  fill="#3f5c58"
                  d="M134.9 154.4H65.1V74.3L100 45.6l34.9 28.7v80.1zm-63.8-6h57.8V77.1L100 53.3 71.1 77.1v71.3z"
                  data-color="1"
                ></path>
                <path
                  fill="#3f5c58"
                  d="M100 93.9c-6.9 0-12.6-5.6-12.6-12.6S93 68.7 100 68.7c6.9 0 12.6 5.6 12.6 12.6s-5.7 12.6-12.6 12.6zm0-19.1c-3.6 0-6.6 2.9-6.6 6.6S96.3 88 100 88s6.6-2.9 6.6-6.6-3-6.6-6.6-6.6z"
                  data-color="1"
                ></path>
              </g>
            </svg>
            <button
              onClick={() => navigate("/sale")}
              className="  text-xl  text-black  "
            >
              Sale
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <BestSeller />
      </div>

      {/*cozy Sophistication  */}
      <div className="  mt-[35px] flex">
        <div className="flex flex-col items-center justify-center py-[90px]  border-r-[2px]  border-black w-[50%] ">
          <div className="text-3xl mb-3 " data-aos="fade-right">
            Cozy Sophistication
          </div>
          <p className="" data-aos="fade-right">
            I'm a paragraph. Click here to add your own text and
          </p>
          <p className="mb-5" data-aos="fade-right">
            edit me. Let your users get to know you.
          </p>
          <div
            className="text-lg  bg-[#35373C]  w-fit  bg-black px-[20px] py-2 text-white cursor-pointer hover:bg-white hover:text-black hover:border hover:border-black"
            data-aos="fade-right"
            onClick={() => navigate("/furniture")}
          >
            Shop Furniture
          </div>
          {getFurnitureImage?.map((product) => (
            <img
              key={product?.productId}
              src={product?.imageTwo}
              data-aos="fade-right"
              alt=""
              className="w-[41%] mt-[50px]"
            />
          ))}
        </div>
        {/* jane levi img with text */}

        <div className="w-[50%] flex flex-col  items-center">
          <img
            data-aos="fade-right"
            src={JaneLeviImage}
            className="w-[41%] mt-[95px]"
            alt=""
          />
          <div className="w-[40%] text-3xl text-center mt-[20px] mb-[20px]">
            House Visit: Jane Levi's Californian Oasis
          </div>
          <p className="w-[40%] text-center mb-[20px]" data-aos="fade-right">
            I'm a paragraph. Click here to add your own text and edit me. Let
            your users get to know you.
          </p>
          <div
            className="text-lg  bg-[#35373C]  w-fit  bg-black px-[20px] py-2 text-white cursor-pointer hover:bg-white hover:text-black hover:border hover:border-black"
            data-aos="fade-up"
          >
            Read story
          </div>
        </div>
      </div>

      {/* brand designer */}

      <BrandDesigner brandImages={brandImages} />

      {/* #afternoon at home */}
      <div className="w-full flex justify-center items-center  h-20 mb-6">
        <div className="text-3xl text-black tracking-[.10em]">
          #AfternoonAtHome
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default Home;
