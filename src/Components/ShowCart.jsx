import { useAtom } from "jotai";
import React, { useState } from "react";
import { atomCartItem, atomSendCart, atomShow } from "./store";
import { IoIosArrowForward } from "react-icons/io";

import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ShowCart = () => {
  const navigate = useNavigate();

  const [cartt, setCartt] = useAtom(atomShow);
  const [cartData, setCartData] = useAtom(atomSendCart);
  const [isLoading, setIsLoading] = useState(false);
  const [, setCartItem] = useAtom(atomCartItem);
  const notDisplay = (e) => {
    e.stopPropagation();
    setCartt(true);
  };
  const plus = (productId) => {
    const updatedCartData = cartData.map((item) => {
      if (item.newItem.productId === productId) {
        return {
          ...item,
          newItem: { ...item.newItem, quantity: item.newItem.quantity + 1 },
        };
      }
      return item;
    });

    setCartData(updatedCartData);
  };

  const minus = (productId) => {
    const updatedCartData = cartData.map((item) => {
      if (item.newItem.productId === productId && item.newItem.quantity > 1) {
        return {
          ...item,
          newItem: { ...item.newItem, quantity: item.newItem.quantity - 1 },
        };
      }
      return item;
    });

    setCartData(updatedCartData);
  };

  const removeItem = (product, e) => {
    e.stopPropagation();

    setCartData(
      cartData.filter((item) => {
        return item.newItem.productId !== product;
      })
    );
  };
  const calculateTotal = () => {
    let total = 0;
    cartData.forEach((item) => {
      total += item.newItem.productPrice * item.newItem.quantity;
    });
    return total;
  };

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/cartView");
      setCartt(false);
      setIsLoading(false);
    }, 2000);
  };

  setCartItem(cartData.length);

  return (
    <div>
      <div
        onClick={() => {
          setCartt(false);
        }}
        className="fixed  top-0 left-0 w-full h-full bg-[#808080] bg-opacity-50 z-30"
      >
        <div
          onClick={notDisplay}
          className={`top-0 right-0 w-[18vw] bg-white flex flex-col justify-between text-white absolute h-full z-40 border  ease-in-out duration-400 ${
            cartt ? "translate-x-0 " : "translate-x-full "
          }`}
        >
          <div className="">
            {/* cart heading */}
            <div className="bg-[#414141] h-[10vh] w-full flex items-center pl-4 gap-x-[90px]">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setCartt(false);
                }}
                className=" cursor-pointer"
              >
                <IoIosArrowForward size={28} className="" />
              </div>
              <div className="text-xl select-none ">Cart</div>
            </div>
            {/* card heading end */}

            {/* carddetails */}
            <div className=" h-auto ">
              {cartData?.map((item) => (
                <li
                  key={item.newItem.productId}
                  className=" border-b border-gray-300  w-fit flex gap-x-4 ml-5 mr-5"
                >
                  <img
                    src={item.newItem.imageOne}
                    alt=""
                    className=" w-[28%] p-2  select-none "
                  />

                  <div className="">
                    <div className="text-md text-[#5C5757] pt-3 select-none">
                      {item.newItem.productCategory}
                    </div>
                    <div className="text-md font-bold text-[#5C5757] select-none">
                      ${item.newItem.productPrice}
                    </div>
                    <div className="">
                      <div className="border w-fit px-1  py-[1px]  flex justify-between gap-x-3 items-center mt-[7px]">
                        <FiMinus
                          className="cursor-pointer text-black"
                          onClick={() => minus(item?.newItem?.productId)}
                          size={13}
                        />

                        <div className=" w-fit text-black text-center select-none">
                          {item.newItem.quantity}
                        </div>

                        <GoPlus
                          className="cursor-pointer text-black"
                          onClick={() => plus(item?.newItem?.productId)}
                          size={14}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="text-black mt-3 ml-[80px] cursor-pointer">
                      <RxCross2
                        size={15}
                        onClick={(e) => removeItem(item.newItem.productId, e)}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </div>
          {/* card details end */}
          {/* total part */}
          <div className="mb-[100px] ml-6 select-none">
            <div className="text-black text-2xl">
              Subtotal : ${calculateTotal().toFixed(2)}
            </div>
            <div
              onClick={handleLoading}
              disabled={isLoading}
              className="mt-10 ml-3 bg-black text-white w-[260px] text-center hover:bg-opacity-70 py-2 cursor-pointer select-none "
            >
              {isLoading === true ? "Loading..." : "View Cart"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCart;
