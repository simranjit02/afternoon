import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { cardDetails, showProduct } from "./store";
import axios from "axios";

const ProductDetailPage = () => {
  const [cardId] = useAtom(cardDetails);
  // const [productViewd, setProductViewd] = useAtom(showProduct);
  const [idNo, setIdNo] = useState([]);

  useEffect(() => {
    axios
      .get("/Data.json")
      .then((res) => {
        const specificData = res.data.find((val) => val.productId === cardId);
        setIdNo(specificData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className=""></div>
    </div>
  );
};

export default ProductDetailPage;
