import axios from "axios";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  atomCartId,
  atomPrice,
  atomProductInfo,
  cardDetails,
  cardRender,
  priceChangeStopAtom,
} from "./store";
import { RxCross2 } from "react-icons/rx";
import PopUpCard from "./PopUpCard";
import { useNavigate } from "react-router-dom";
const Lights = () => {
  const navigate = useNavigate();

  const [hoveredIndex, setHoveredIndex] = useState("");

  const [priceChangeStop] = useAtom(priceChangeStopAtom);
  const [price, setPrice] = useAtom(atomPrice);
  const [prevPrice, setPrevPrice] = useState(price);
  const [popUp, setpopUp] = useAtom(cardRender);
  const [prevProductLength, setPrevProductLength] = useState(0);
  const [getImageData, setGetImageData] = useState();
  const [productDetails, setProductDetails] = useState([]);
  const [, setProductInfo] = useAtom(atomProductInfo);
  const [, setCartId] = useAtom(atomCartId);
  const [, setCardId] = useAtom(cardDetails);
  useEffect(() => {
    axios
      .get("/Data.json")
      .then((response) => {
        setPrevProductLength(() => {
          const filteredData = response?.data.filter(
            (product) =>
              product.productCategory === "Lighting" &&
              product.productPrice <= prevPrice
          );
          return filteredData.length;
        });

        setGetImageData(() => {
          const filteredData = response?.data.filter(
            (product) =>
              product.productCategory === "Lighting" &&
              product.productPrice <= prevPrice
          );
          return filteredData;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [prevPrice]);

  useEffect(() => {
    if (priceChangeStop === true) {
      setPrevPrice(price);
    }
  }, [price, priceChangeStop]);

  const resetPrice = () => {
    setPrice(85.0);
  };
  const handleImageClick = (index, product, e) => {
    e.stopPropagation();
    setHoveredIndex(index);

    setCartId(product?.productId);
    setTimeout(() => {
      navigate("/product");
      setProductInfo(product);
    }, 1000);
  };

  return (
    <div>
      <div className="   w-full ">
        <div className=" mb-[85px] ">
          {/* heading section */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-6xl mb-3 mt-8">Lighting</div>
            <p className="w-fit text-center">
              This is your category description. It’s a great place to tell
              customers what this category is
              <br /> about, connect with your audience and draw attention to
              your products.
            </p>
          </div>
        </div>
        {/* filter Section ui */}
        {price < 85.0 && (
          <div className="flex items-center gap-x-2 mb-4">
            <div className="flex gap-x-2 items-center w-fit px-3 ml-3 bg-gray-300">
              <div className="">$59.50 -${prevPrice}</div>
              <RxCross2
                onClick={resetPrice}
                size={15}
                className="cursor-pointer"
              />
            </div>
            <div onClick={resetPrice} className="cursor-pointer">
              Clear all
            </div>
          </div>
        )}

        {price <= 85.0 && (
          <div className="text-md mb-3 ml-4 opacity-90">
            {prevProductLength} products
          </div>
        )}

        {prevProductLength === 0 && (
          <div className="flex justify-center items-center mt-[100px] opacity-80">
            <div className="text-center">
              <div className="text-xl mt-2 ">We couldn't find any matches</div>
              <div className="text-xl mt-1 ">
                Try different filters or another category.
              </div>
              <div
                onClick={resetPrice}
                className="cursor-pointer text-lg mt-7 hover:underline"
              >
                Clear filter
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-y-8   ">
          {getImageData?.map((product, index) => (
            <div key={product?.productId} className=" relative ">
              <div className="relative w-[85%] group">
                <img
                  src={
                    hoveredIndex === product?.productId
                      ? product.imageTwo
                      : product.imageOne
                  }
                  alt={`slide${product?.productId}_combined`}
                  className="max-w-full h-auto cursor-pointer group"
                  onClick={(e) => handleImageClick(index, product, e)}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    setHoveredIndex(product.productId);
                  }}
                  onMouseLeave={(e) => {
                    e.stopPropagation();
                    setHoveredIndex(null);
                  }}
                />
                {product.isProductNew === "yes" && (
                  <div className="absolute bottom-[96%] px-2 py-[2px] text-sm bg-[#3F5C58] text-white">
                    New
                  </div>
                )}
                {product.productOnSale === "true" && (
                  <div className="absolute bottom-[96%] px-2 py-[2px] text-sm bg-[#3F5C58] text-white">
                    Sale
                  </div>
                )}
                {product.isProductBestseller === "1" && (
                  <div className="absolute bottom-[96%] px-2 py-[2px] text-sm bg-[#3F5C58] text-white">
                    Bestseller
                  </div>
                )}

                <div
                  className="absolute cursor-pointer z-20  group-hover:block bottom-0 left-0 right-0 bg-white bg-opacity-80    p-2 text-center"
                  onClick={(e) => {
                    e.stopPropagation();

                    setpopUp(true);

                    setProductDetails(product);

                    setCardId(product?.productId);
                  }}
                >
                  Quick View
                </div>
              </div>
              {/* product description */}
              <div className="mt-2 text-lg flex -ml-16 flex-col items-center">
                <div className="">{product.productCategory}</div>
                <div className="  ">{product.productPrice}</div>
              </div>
            </div>
          ))}
        </div>
        {/* card section */}

        {popUp === true && (
          <div className="">
            <PopUpCard productDetails={productDetails} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Lights;
