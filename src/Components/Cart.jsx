import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  atomAdd,
  atomBuyItem,
  atomProductInfo,
  atomSendCart,
  atomShow,
  cardDetails,
} from "./store";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FiCircle } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import axios from "axios";
import Buy from "./Buy";
import { motion } from "framer-motion";

const Cart = () => {
  const [productInfo] = useAtom(atomProductInfo);
  const [show, setShow] = useState(false);
  const [localAdd, setLocalAdd] = useState(1);
  const [add, setAdd] = useAtom(atomAdd);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(productInfo.imageOne);
  const [isExpanded, setIsExpanded] = useState(false);
  const [rrExpanded, setRrExpanded] = useState(false);
  const [siExpanded, setSiExpanded] = useState(false);
  const [, setCartt] = useAtom(atomShow);
  const [cartData, setCartData] = useAtom(atomSendCart);
  const [cardId] = useAtom(cardDetails);
  const [, setData] = useState([]);

  const [buyItem, setBuyItem] = useAtom(atomBuyItem);
  const [buyLoading, setBuyLoading] = useState(false);
  // const [hoveredIndex, setHoveredIndex] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`/Data.json`)
      .then((res) => {
        setData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        imageOne: productInfo?.imageOne,
        productCategory: productInfo?.productCategory,
        productPrice: productInfo?.productPrice,
        quantity: localAdd,
      };

      setCartData((prevItems) => [...prevItems, { newItem }]);
    }

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
  const handleCircleClick = (image) => {
    setSelectedImage(image);
  };
  const toggleShow = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

  const toggle = () => setRrExpanded((change) => !change);

  const toggleShowMe = () => setSiExpanded((change) => !change);

  const handleBuy = () => {
    setBuyLoading(true);
    setTimeout(() => {
      setBuyItem(true);
      setBuyLoading(false);
    }, 2000);
  };

  // const handleView = (productId) => {
  //   const updatedProductInfo = data.find(
  //     (item) => item.productId === productId
  //   );
  //   if (updatedProductInfo) {
  //     setProductInfo(updatedProductInfo);
  //   }
  // };
  // const handleNext = () => {};

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        {/* home prev next  */}
        <div className="  flex items-center justify-around cursor-pointer mt-[70px] mb-[30px] ">
          <div className="flex gap-x-2">
            <div className="text-[17px] ">Home</div>
            <div className="text-[17px]">/</div>
            <div className="text-[17px] ">{productInfo.productCategory}</div>
          </div>

          <div className="flex items-center gap-x-[5px] cursor-pointer">
            <HiOutlineChevronLeft size={20} />
            <div className="text-[17px] ">Prev </div>
            <div className="text-[17px]">|</div>
            <div className="text-[17px]"> Next</div>
            <HiOutlineChevronRight size={20} />
          </div>
        </div>
        {/* img */}
        <div className=" ml-[21%] select-none">
          <div className="flex gap-x-[30px] ">
            <div className=" flex flex-col">
              {productInfo && (
                <img
                  src={selectedImage || productInfo.imageOne}
                  alt=""
                  className="w-[93%] border border-black"
                />
              )}
              {/* circle select */}
              <div className="flex justify-center mt-5 ">
                <button
                  onClick={() => handleCircleClick(productInfo?.imageOne)}
                  className=" "
                >
                  <FiCircle
                    size={15}
                    fill={
                      selectedImage === productInfo?.imageOne ? "black" : "gray"
                    }
                    color="white"
                  />
                </button>
                <button
                  onClick={() => handleCircleClick(productInfo?.imageTwo)}
                  className="ml-[4px]"
                >
                  <FiCircle
                    size={15}
                    fill={
                      selectedImage === productInfo?.imageTwo ? "black" : "gray"
                    }
                    color="white"
                  />
                </button>
                <button
                  onClick={() => handleCircleClick(productInfo?.imageThree)}
                  className=" ml-[4px]"
                >
                  <FiCircle
                    size={15}
                    fill={
                      selectedImage === productInfo?.imageThree
                        ? "black"
                        : "gray"
                    }
                    color="white"
                  />
                </button>
              </div>

              {/* product description */}
              <div className="w-[470px]  text-[16px] text-justify  mt-10 select-none">
                I'm a product description. I'm a great place to add more details
                about your product such as sizing, material, care instructions
                and cleaning instructions.
              </div>
            </div>
            <div className=" flex flex-col gap-y-3 relative">
              <div className="text-2xl text-[#5C5757]">
                {productInfo.productCategory}
              </div>
              <div className="text-2xl text-[#5C5757]">
                ${productInfo.productPrice}
              </div>
              <div className="mt-[30px] mb-1 text-lg select-none">Quantity</div>

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
              </div>
              {/* cart button */}
              <div
                onClick={handleClick}
                className="bg-black text-white min-w-[320px] text-center hover:bg-opacity-70 py-2 cursor-pointer select-none   "
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Add to Cart"}
              </div>

              {/* buy now button */}
              <div
                disabled={buyLoading}
                onClick={handleBuy}
                className="border border-black text-black min-w-[320px] text-center  py-2 cursor-pointer select-none   "
              >
                {buyLoading ? "Loading..." : "Buy Now"}
              </div>
              {/* product info */}
              <div className=" border-b-[1px] border-[#D9D9D9] mt-6 select-none">
                <div className="flex items-center pb-[12px] justify-between ">
                  <div className="">PRODUCT INFO</div>
                  <div className="cursor-pointer" onClick={toggleShow}>
                    {isExpanded ? <FiMinus size={20} /> : <GoPlus size={20} />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="w-[320px] text-[15px] text-justify overflow-auto ">
                    I'm a product detail. I'm a great place to add more
                    information about your product such as sizing, material,
                    care and cleaning instructions. This is also a great space
                    to write what makes this product special and how your
                    customers can benefit from this item.
                  </div>
                )}
              </div>

              {/* return & refund policy */}
              <div className=" border-b-[1px] border-[#D9D9D9] mt-3 select-none">
                <div className="flex items-center pb-[12px] justify-between ">
                  <div className="">RETURN & REFUND POLICY</div>
                  <div className="cursor-pointer" onClick={toggle}>
                    {isExpanded ? <FiMinus size={20} /> : <GoPlus size={20} />}
                  </div>
                </div>

                {rrExpanded && (
                  <div className="w-[320px] text-[15px] text-justify">
                    I’m a Return and Refund policy. I’m a great place to let
                    your customers know what to do in case they are dissatisfied
                    with their purchase. Having a straightforward refund or
                    exchange policy is a great way to build trust and reassure
                    your customers that they can buy with confidence.
                  </div>
                )}
              </div>

              {/* shipping info */}
              <div className=" border-b-[1px] border-[#D9D9D9] mt-3 select-none">
                <div className="flex items-center pb-[12px] justify-between ">
                  <div className="">SHIPPING INFO</div>
                  <div className="cursor-pointer" onClick={toggleShowMe}>
                    {isExpanded ? <FiMinus size={20} /> : <GoPlus size={20} />}
                  </div>
                </div>

                {siExpanded && (
                  <div className="w-[320px] text-[15px] text-justify">
                    I’m a Return and Refund policy. I’m a great place to let
                    your customers know what to do in case they are dissatisfied
                    with their purchase. Having a straightforward refund or
                    exchange policy is a great way to build trust and reassure
                    your customers that they can buy with confidence.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* you might also like */}
        {/* <div className="  text-2xl ml-4 mt-8 mb-10 select-none  border ">
        You Might Also Like
<<<<<<< HEAD
<<<<<<< HEAD
        <div className="flex items-center mt-10">
          <HiOutlineChevronLeft
            size={170}
            className="cursor-pointer mr-4"
            onClick={handlePrev}
          />
          <div className="  flex flex-row gap-x-8 overflow-hidden">
            {data.map((item, index) => (
              <img
                key={item.productId}
                virtualIndex={index}
                src={
                  hoveredIndex === item.productId
                    ? item.imageTwo
                    : item.imageOne
                }
                alt=""
                className={`w-[18%] border border-red-400  transition-transform duration-300 transform`}
                onMouseEnter={() => setHoveredIndex(item.productId)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleView(item.productId, index)}
              />
            ))}
          </div>
          <HiOutlineChevronRight
            size={170}
            className="cursor-pointer ml-4 border"
            onClick={handleNext}
          />
        </div>
      </div>
=======
      //   <Swiper
      //     modules={[Virtual, Navigation, Pagination]}
      //     onSwiper={setSwiperRef}
      //     slidesPerView={3}
      //     centeredSlides={true}
      //     spaceBetween={30}
      //     pagination={{
      //       type: "fraction",
      //     }}
      //     navigation={true}
      //     virtual
      //   >
      //     <div className="flex items-center mt-10">
      //       <HiOutlineChevronLeft size={170} className=" mr-4" />
      //       <div className="  flex flex-row gap-x-8 overflow-hidden">
      //         {data.map((item, index) => (
      //           <SwiperSlide key={item.productId} virtualIndex={index}>
      //             <img
      //               key={item.productId}
      //               virtualIndex={index}
      //               src={
      //                 hoveredIndex === item.productId
      //                   ? item.imageTwo
      //                   : item.imageOne
      //               }
      //               alt=""
      //               className={`w-[18%] border border-red-400  transition-transform duration-300 transform`}
      //               onMouseEnter={() => setHoveredIndex(item.productId)}
      //               onMouseLeave={() => setHoveredIndex(null)}
      //               onClick={() => handleView(item.productId, index)}
      //             />
      //           </SwiperSlide>
      //         ))}
      //       </div>
      //       <HiOutlineChevronRight
      //         size={170}
      //         className="cursor-pointer ml-4 border bor "
      //       />
      //     </div>
      //   </Swiper>
      // </div> */}

        {buyItem && <Buy />}
      </div>
    </motion.div>
  );
};

export default Cart;
