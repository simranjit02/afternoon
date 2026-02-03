import React from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import { BiLogoFacebook } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import { useAtom } from "jotai";
import { atomCartItem, atomShow } from "./store";
import ShowCart from "./ShowCart";

const TopNavbar = () => {
  const [cartt, setCartt] = useAtom(atomShow);
  const [cartItem] = useAtom(atomCartItem);

  const handleCartClick = () => {
    setCartt(true);
  };
  return (
    <div>
      <div className="w-full bg-white py-4 ">
        <div className=" flex w-full items-center justify-around px-[40px] ">
          <div className="flex items-center  w-full border-black">
            <div className=" flex gap-x-2">
              <BiLogoFacebook size={22} />
              <FaInstagram size={22} />
              <TiSocialTwitter size={23} />
            </div>
          </div>

          <div className="flex items-center gap-x-5 ">
            <div className="border-red-300 flex items-center gap-x-2">
              <IoPersonCircleSharp size={32} className=" " />
              <button className="lg:text-[18px] select-none md:text-[14px] sm:text-[13px] text-[11px]">
                Login
              </button>
            </div>
            <div className="flex gap-x-2">
              <div onClick={handleCartClick} className="cursor-pointer">
                <IoMdCart className="cursor-pointer " size={28} />
              </div>
              <div className="select-none">{cartItem}</div>
            </div>
          </div>
        </div>
      </div>

      {cartt === true && <ShowCart />}
    </div>
  );
};

export default TopNavbar;
