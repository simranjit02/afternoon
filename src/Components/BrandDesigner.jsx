import React from "react";

const BrandDesigner = ({ ...prop }) => {
  return (
    <div>
      <div className="mb-[80px]">
        <div className="flex justify-center ">
          <div className="border border-black text-4xl w-fit px-[130px] py-[15px] tracking-[0.10em] z-10 bg-white absolute ">
            Brands & Designers
          </div>
        </div>
        <div className=" w-full  flex justify-center ">
          {prop?.brandImages?.map((images, index) => (
            <img
              className="border border-black w-fit mt-[30px] flex justify-center items-center 2xl:px-[110px] min-[836px]:px-[20px] max-[1024px]:px-[40px] min-[1024px]:px-[35px]  min-[1350px]:px-[70px] max-[1618px]:px-[110px]  px-[110px] min-[1240px]:px-[60px] max-[1350px]:px-[70px] py-[90px]"
              key={index}
              data-aos="fade-right"
              src={images}
              alt={`images ${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandDesigner;
