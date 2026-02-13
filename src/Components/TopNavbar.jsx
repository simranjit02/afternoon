import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import { BiLogoFacebook } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import { useAtom } from "jotai";
import { atomCartItem, atomShow, atomUser, atomAuthToken, atomSendCart } from "./store";
import ShowCart from "./ShowCart";
import authService from "../services/authService";

const TopNavbar = () => {
  const navigate = useNavigate();
  const [cartt, setCartt] = useAtom(atomShow);
  const [cartItem, setCartItem] = useAtom(atomCartItem);
  const [user] = useAtom(atomUser);
  const [cartData] = useAtom(atomSendCart);
  const setToken = useAtom(atomAuthToken)[1];

  // Keep cart count in sync with cart length so badge is correct on all pages
  useEffect(() => {
    setCartItem(Array.isArray(cartData) ? cartData.length : 0);
  }, [cartData, setCartItem]);

  const handleCartClick = () => {
    setCartt(true);
  };

  const handleLoginClick = () => {
    navigate("/signin");
  };

  const handleLogout = () => {
    authService.clearToken();
    setToken(null);
    navigate("/");
    // User and cart are cleared in a separate place so UI updates; we clear cart so next login gets backend cart only
    window.dispatchEvent(new CustomEvent("afternoon-logout"));
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
              {user ? (
                <>
                  <span className="lg:text-[18px] select-none md:text-[14px] sm:text-[13px] text-[11px] text-[#2E3238]">
                    {user.name}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="lg:text-[18px] select-none md:text-[14px] sm:text-[13px] text-[11px] underline"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleLoginClick}
                  className="lg:text-[18px] select-none md:text-[14px] sm:text-[13px] text-[11px]"
                >
                  Login
                </button>
              )}
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
