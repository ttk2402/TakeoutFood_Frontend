import React from "react";

const ItemOrdered = ({
  id,
  productId,
  quantity,
  price,
  productName,
  productPrice,
  productImage,
}) => {
  return (
    <div className="flex justify-start items-center my-2 p-2">
      <div className="">
        <a href="#">
          <img src={productImage} alt="" className="w-16 h-16" />
        </a>
      </div>
      <div className="flex-grow ml-4">
        <a href="#" className="flex justify-between">
          <span className="text-sm font-bold hover:text-red-500">
            {productName}
          </span>
          <span className="ml-3.5 text-sm font-normal">
            Giá: {productPrice.toLocaleString("vi-VN")}
            <span className="text-sm font-normal underline">đ</span>
          </span>
        </a>
        <div className="flex justify-between">
          <p className="text-sm font-bold">x {quantity}</p>
          <p className="text-sm font-bold">
            {price.toLocaleString("vi-VN")}
            <span className="text-sm font-bold underline">đ</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default ItemOrdered;
