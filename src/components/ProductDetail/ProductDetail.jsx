import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { StoreContext } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const ProductDetail = ({ id, name, price, description, url_image_product }) => {
  const [quantity, setQuantity] = useState(1);
  const { account, addItemFromDetail } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (account == null) {
      console.log("Bạn cần đăng nhập mới thêm vào giỏ hàng được !");
    } else {
      const product = {
        id,
        name,
        price,
        url_image_product,
      };
      addItemFromDetail(product, quantity, account.id);
    }
  };

  const handleBuyNow = () => {
    if (account == null) {
      console.log("Bạn cần đăng nhập mới đặt hàng ngay được !");
    } else {
      const product = {
        id,
        name,
        price,
        url_image_product,
      };
      addItemFromDetail(product, quantity, account.id);
      navigate("/gio-hang");
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 mb-16">
      <div className="mx-auto p-5">
        {" "}
        <span className=" text-violet-600 font-semibold text-2xl">
          Chi tiết sản phẩm #{id}
        </span>
      </div>
      <div className="flex flex-col justify-center lg:flex-row gap-16 lg:items-center">
        <div className="flex gap-6 lg:w-2/5">
          <img
            src={url_image_product}
            alt=""
            className="w-72 h-full aspect-square object-cover rounded-xl"
          />
        </div>
        {/* ABOUT */}
        <div className="flex flex-col gap-4 lg:w-3/5">
          <div>
            <h1 className="text-xl font-bold">{name}</h1>
          </div>
          <h6 className="text-base font-medium">
            Giá: {price ? price.toLocaleString("vi-VN") : ""}
            <span className="underline">đ</span>
          </h6>
          <p className="text-base font-medium">Thương hiệu: TAKEOUT FOOD</p>
          <p className="text-base font-medium">Thành phần: {description}</p>
          <p className="text-base font-medium">
            Hướng dẫn sử dụng: Dùng trực tiếp
          </p>
          <p className="text-base font-medium">Xuất xứ: Việt Nam</p>
          <p className="text-base font-medium">Tình trạng: Còn hàng</p>
          <p className="border-b"></p>
          <div className="flex justify-start items-center gap-12">
            <div className="flex flex-row items-center">
              <button
                className="bg-gray-200 px-3.5 py-1 rounded-lg text-violet-800 text-xl font-bold"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="py-4 px-6 rounded-lg">{quantity}</span>
              <button
                className="bg-gray-200 px-2.5 py-1 rounded-lg text-violet-800 text-xl font-bold"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <button
              className="btn btn-sm py-3 bg-violet-800 text-white font-semibold px-2.5 rounded-xl h-full"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </button>
            <button
              className="btn btn-sm py-3 bg-violet-800 text-white font-semibold px-2.5 rounded-xl h-full"
              onClick={handleBuyNow}
            >
              Đặt hàng ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
