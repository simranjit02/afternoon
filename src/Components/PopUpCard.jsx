import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import {
  atomAdd,
  atomProductInfo,
  atomSendCart,
  atomShow,
  cardDetails,
  cardRender,
} from "./store";
import axios from "axios";
import { FiCircle } from "react-icons/fi";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import ShowCart from "./ShowCart";
import { useNavigate } from "react-router-dom";

const PopUpCard = ({ ...prop }) => {
  const navigate = useNavigate();

  const [cardId] = useAtom(cardDetails);
  const [, setPopUp] = useAtom(cardRender);

  const [popData, setPopData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(
    prop?.productDetails.imageOne
  );
  const [add, setAdd] = useAtom(atomAdd);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [cartData, setCartData] = useAtom(atomSendCart);
  const [cartt, setCartt] = useAtom(atomShow);
  const [localAdd, setLocalAdd] = useState(1);
  const [, setProductInfo] = useAtom(atomProductInfo);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`/Data.json`)
      .then((res) => {
        const specificData = res?.data?.find(
          (item) => item?.productId === cardId
        );

        setPopData(specificData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cardId]);

  const handleCircleClick = (image) => {
    setSelectedImage(image);
  };

  const addItemToCart = () => {
    const existingItem = cartData.find(
      (item) => item.newItem.productId === cardId
    );

    if (existingItem) {
      const updatedCartData = cartData.map((item) => {
        if (item.newItem.productId === cardId) {
          return {
            ...item,
            newItem: {
              ...item.newItem,
              quantity: item.newItem.quantity + localAdd,
            },
          };
        }
        return item;
      });

      setCartData(updatedCartData);
    } else {
      const newItem = {
        productId: cardId,
        imageOne: popData?.imageOne,
        productCategory: popData?.productCategory,
        productPrice: popData?.productPrice,
        quantity: localAdd,
      };

      setCartData((prevItems) => [...prevItems, { newItem }]);
    }

    setPopUp(false);
    setCartt(true);
    setLocalAdd(1);
  };

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addItemToCart();

      setAdd(add);
    }, 2000);
  };

  const plus = (e) => {
    e.stopPropagation();

    setAdd(add + 1);
    setLocalAdd(add + 1);
  };

  const minus = (e) => {
    e.stopPropagation();
    if (add > 1 && localAdd > 1) {
      setAdd(add - 1);
      setLocalAdd(add - 1);
    }
  };
  const resetAddValue = () => {
    setLocalAdd(1);
  };

  const handleViewDetails = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/product");
      setProductInfo(popData);
      // setProductView((change) => !change);
      setPopUp(false);
      setLoading(false);
    }, 2000);
  };

  return (
    <div
      // onClick={() => setPopUp(false)}
      className="fixed  top-0 left-0 w-full h-full bg-[#808080] bg-opacity-70 z-30 "
    >
      <div className="flex justify-center items-center h-full">
        <div className="absolute  bg-[#FFFFFF] pb-5   ">
          <div
            className="flex cursor-pointer justify-end mr-3 mt-2"
            onClick={() => {
              setPopUp(false);
              resetAddValue();
            }}
          >
            <RxCross2 size={22} />
          </div>
          {/* image part  */}
          <div className="">
            <div className=" flex ">
              {popData && (
                <img
                  src={selectedImage}
                  alt=""
                  className="w-[40%]  ml-[70px] select-none"
                />
              )}

              <div className="ml-9">
                <div className="text-4xl text-[#5C5757] mb-3 font-sans select-none">
                  {popData?.productCategory}
                </div>
                <div className="text-lg select-none">
                  ${popData?.productPrice}
                </div>
                <div className="">
                  <div className="mt-[30px] mb-2 select-none">Quantity</div>
                  <div className="flex gap-x-4 ">
                    <div
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        setShow(true);
                      }}
                      onMouseLeave={(e) => {
                        e.stopPropagation();
                        setShow(false);
                      }}
                      className={`border w-fit px-3  py-1  flex justify-between  mb-10 min-w-[90px] min-h-[42px]`}
                    >
                      <div className=" w-fit select-none">{localAdd}</div>

                      <div className="flex flex-col  w-fit">
                        {show === true && (
                          <IoIosArrowUp
                            className="cursor-pointer"
                            onClick={(e) => plus(e)}
                            size={16}
                          />
                        )}
                        {show === true && (
                          <IoIosArrowDown
                            className="cursor-pointer "
                            onClick={(e) => minus(e)}
                            size={16}
                          />
                        )}
                      </div>
                    </div>
                    {/* {localAdd >= 5 && (
                      <span className=" text-red-600 text-sm mt-2 select-none">
                        Order limit reached
                      </span>
                    )} */}
                  </div>
                </div>

                {/* cart button */}

                <div
                  onClick={handleClick}
                  className="bg-black text-white min-w-[280px] text-center hover:bg-opacity-70 py-2 cursor-pointer select-none   "
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Add to Cart"}
                </div>
                <div
                  onClick={handleViewDetails}
                  className="text-[15px] mt-4 underline cursor-pointer select-none"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "View More Details"}
                </div>
              </div>
            </div>
            {/* circle select */}
            <div className="ml-[200px] mt-3 ">
              <button
                onClick={() => handleCircleClick(prop?.productDetails.imageOne)}
                className=" "
              >
                <FiCircle
                  size={15}
                  fill={
                    selectedImage === prop?.productDetails.imageOne
                      ? "black"
                      : "gray"
                  }
                  color="white"
                />
              </button>
              <button
                onClick={() => handleCircleClick(prop?.productDetails.imageTwo)}
                className="ml-[4px]"
              >
                <FiCircle
                  size={15}
                  fill={
                    selectedImage === prop?.productDetails.imageTwo
                      ? "black"
                      : "gray"
                  }
                  color="white"
                />
              </button>
              <button
                onClick={() =>
                  handleCircleClick(prop?.productDetails.imageThree)
                }
                className=" ml-[4px]"
              >
                <FiCircle
                  size={15}
                  fill={
                    selectedImage === prop?.productDetails.imageThree
                      ? "black"
                      : "gray"
                  }
                  color="white"
                />
              </button>
            </div>

            {/* details of product part */}
          </div>
        </div>
      </div>

      {cartt === true && <ShowCart />}
    </div>
  );
};

export default PopUpCard;
