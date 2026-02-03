import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { atomCartId, atomProductInfo, cardDetails, cardRender } from "./store";
import PopUpCard from "./PopUpCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BestSeller = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [popUp, setpopUp] = useAtom(cardRender);

  const [getImageData, setGetImageData] = useState([]);

  const [, setCardId] = useAtom(cardDetails);

  const [productDetails, setProductDetails] = useState([]);
  const [, setProductInfo] = useAtom(atomProductInfo);
  const [, setCartId] = useAtom(atomCartId);

  useEffect(() => {
    axios
      .get("/Data.json")
      .then((res) => {
        setGetImageData(() => {
          const filteredData = res?.data.filter(
            (product) => product?.isProductBestseller === "1"
          );
          return filteredData;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleImageClick = (product, e) => {
    e.stopPropagation();

    setCartId(product?.productId);
    setTimeout(() => {
      navigate("/product");
      setProductInfo(product);
    }, 1000);
  };

  const handlePopUp = (product) => {
    setpopUp(true);

    setProductDetails(product);

    setCardId(product.productId);
  };

  return (
    <div className="">
      <div className="mt-[130px] ">
        <div className="w-full flex justify-center items-center h-20 mb-6 ">
          <div className="text-3xl text-black tracking-[.10em]">
            Bestsellers
          </div>
        </div>
        <div className="flex justify-center ml-2  ">
          {getImageData.map((product, index) => (
            <div key={product.productId} className=" ">
              <div className="relative w-[80%] ">
                <img
                  src={
                    hoveredIndex === index ? product.imageTwo : product.imageOne
                  }
                  alt={`slide${product.productId}_combined`}
                  className="max-w-full h-auto cursor-pointer group"
                  onClick={(e) => handleImageClick(product, e)}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    setHoveredIndex(index);
                  }}
                  onMouseLeave={(e) => {
                    e.stopPropagation();
                    setHoveredIndex(null);
                  }}
                />
                <div className="">
                  <div
                    className="absolute z-20 group-hover:block cursor-pointer bottom-0 left-0 bg-opacity-60 right-0 bg-white  p-2 text-center "
                    onClick={() => handlePopUp(product)}
                  >
                    Quick View
                  </div>
                </div>
              </div>
              {/* product description */}
              <div className="mt-2 text-lg flex flex-col items-center">
                <div className="">{product.productCategory}</div>
                <div className="  ">{product.productPrice}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {popUp === true && (
        <div className="">
          <PopUpCard productDetails={productDetails} />
        </div>
      )}
    </div>
  );
};

export default BestSeller;
