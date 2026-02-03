import React, { useState } from "react";
import { atomBuyItem, atomSendCart } from "./store";
import { useAtom } from "jotai";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import Buy from "./Buy";

const ViewCart = () => {
  const [cartData, setCartData] = useAtom(atomSendCart);
  // console.log("cartData", cartData);
  const [isLoading, setIsLoading] = useState(false);
  const [buyItem, setBuyItem] = useAtom(atomBuyItem);
  const [loading, setLoading] = useState(false);

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

  const calculateTotal = (productId) => {
    let total = 0;
    const product = cartData.find(
      (item) => item.newItem.productId === productId
    );
    if (product) {
      total = product.newItem.productPrice * product.newItem.quantity;
    }
    return total.toFixed(2);
  };

  const calculateSubtotal = () => {
    let total = 0;
    cartData.forEach((item) => {
      total += item.newItem.productPrice * item.newItem.quantity;
    });
    return total;
  };

  const taxes = () => {
    if (calculateSubtotal()) {
      return (calculateSubtotal() * 10) / 100;
    }
  };
  const deliveryCharge = () => {
    if (calculateSubtotal() >= 600) {
      return 0;
    } else {
      return 3.0;
    }
  };

  const calculateGrandtotal = () => {
    let total = 0;
    const subtotal = calculateSubtotal();
    if (subtotal) {
      const delivery =
        deliveryCharge() === 0 ? 0 : parseFloat(deliveryCharge());
      total = subtotal + taxes() + delivery;
    }
    return total.toFixed(2);
  };
  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setBuyItem(true);
      setIsLoading(false);
    }, 2000);
  };
  return (
    <div>
      <div className="py-10 flex justify-center gap-x-[60px]">
        <div className="">
          <div className="w-[730px]  border-b-[1px] border-black">
            <div className="text-xl mt-[4%] pb-3 mb-3   ">My Cart</div>
          </div>
          <div className="">
            {cartData?.map((item) => (
              <div className="  border-b-[1px] border-black flex justify-between w-fit mt-2">
                <img
                  key={item.newItem.productId}
                  src={item.newItem.imageOne}
                  alt=""
                  className=" w-[17%] p-2   "
                />

                <div className="">
                  <div className="text-lg text-[#5C5757] pt-3 mb-2 ">
                    {item?.newItem.productCategory}
                  </div>
                  <div className="text-md font-bold text-[#5C5757] ">
                    ${item?.newItem.productPrice}
                  </div>
                </div>

                {/* quantity */}
                <div className=" mt-1 ">
                  <div className="border w-fit px-1  py-[1px]  flex justify-between gap-x-3 items-center mt-[7px]">
                    <FiMinus
                      className="cursor-pointer text-black"
                      onClick={() => minus(item?.newItem?.productId)}
                      size={13}
                    />

                    <div className=" w-fit text-black text-center ">
                      {item?.newItem.quantity}
                    </div>

                    <GoPlus
                      className="cursor-pointer text-black"
                      onClick={() => plus(item?.newItem?.productId)}
                      size={14}
                    />
                  </div>
                </div>
                {/* quantity end */}
                {/* total price */}
                <div className="text-black text-lg  mt-2   min-w-10 ">
                  ${calculateTotal(item?.newItem.productId)}
                </div>
                {/* total price end */}
                {/* remove item */}

                <div className="text-black mt-3 cursor-pointer  ">
                  <RxCross2
                    size={19}
                    onClick={(e) => removeItem(item?.newItem.productId, e)}
                  />
                </div>

                {/* remove item end */}
              </div>
            ))}
          </div>
        </div>
        {/* order summary */}
        <div className=" flex flex-col ">
          <div className="text-xl mt-[11%] pb-5 mb-3 w-[300px] border-b-[1px] border-black">
            Order Summary
          </div>
          <div className="flex gap-x-[160px]">
            <div className="text-lg">Subtotal :</div>
            <div className="text-lg">${calculateSubtotal().toFixed(2)}</div>
          </div>
          <div className="flex gap-x-[190px]">
            <div className="text-lg">Taxes :</div>
            <div className="text-lg">${taxes()}</div>
          </div>
          <div className="flex gap-x-[110px]">
            <div className="text-lg">Delivery charge :</div>
            <div className={`text-lg `}>${deliveryCharge()}</div>
          </div>
          {/* <div className="text-lg mt-4 cursor-pointer">Delivery address</div> */}
          <div className="text-xl mt-[11%] pb-5 mb-3   w-[300px] border-t-[1px] border-black">
            <div className="flex gap-x-[140px] mt-3">
              <div className="text-lg ">Grand total: </div>
              <div className="text-lg">${calculateGrandtotal()}</div>
            </div>
          </div>
          <div
            onClick={handleLoading}
            disabled={loading}
            className="mt-10 ml-3 bg-black text-white w-[260px] text-center hover:bg-opacity-70 py-2 cursor-pointer  "
          >
            {loading === true ? "Loading..." : "Checkout"}
          </div>
        </div>
      </div>
      {buyItem && <Buy />}
    </div>
  );
};

export default ViewCart;
