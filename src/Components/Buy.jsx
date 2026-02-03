import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useAtom } from "jotai";
import { atomBuyItem } from "./store";
const Buy = () => {
  const [buyItem, setBuyItem] = useAtom(atomBuyItem);
  console.log("buyItem", buyItem);

  const handleShow = () => {
    setBuyItem(false);
  };

  return (
    <div>
      <div className="fixed  top-0 left-0 w-full h-full bg-[#808080] bg-opacity-70 z-30">
        <div className="flex justify-center items-center h-full">
          <div className="absolute bg-white  pb-[70px] pr-6 pt-3 ">
            <div
              onClick={handleShow}
              className="flex justify-end cursor-pointer"
            >
              <RxCross2 className="" size={20} />
            </div>
            <div className="flex flex-col mt-10 items-center">
              <div className="text-3xl w-[60%] text-center mb-5">
                We can't accept online orders right now
              </div>
              <div className="text-lg mb-6">
                Please contact us to complete your purchase.
              </div>
              <div
                onClick={handleShow}
                className="border  bg-black text-white w-fit px-10  text-center hover:bg-opacity-80  py-2 cursor-pointer select-none"
              >
                Got It
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
