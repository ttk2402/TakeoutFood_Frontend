import React, { useState } from "react";

const ProductDetail = () => {
  const [amount, setAmount] = useState(1);
  const product = {
    id: 1,
    name: "Điều Rang Tỏi Ớt",
    price: 30000,
    description: "",
    url_image_product:
      "https://picture.miafood.vn/Gallery/ThumbPhone_20240608031600672.png",
  };

  return (
    <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
      <div className="flex gap-6 lg:w-2/5">
        <img
          src={product.url_image_product}
          alt=""
          className="w-96 h-full aspect-square object-cover rounded-xl"
        />
      </div>
      {/* ABOUT */}
      <div className="flex flex-col gap-4 lg:w-3/5">
        <div>
          <span className=" text-violet-600 font-semibold">
            Chi tiết sản phẩm
          </span>
          <h1 className="text-3xl font-bold">{product.name}</h1>
        </div>
        <h6 className="text-xl font-semibold text-red-500">
          {product.price.toLocaleString("vi-VN")}
          <span className="align-super text-[0.8em]">đ</span>
        </h6>
        <p className="text-gray-700">Thương hiệu: TAKEOUT FOOD</p>
        <p className="text-gray-700">Thành phần: {product.description}</p>
        <p className="text-gray-700">Hướng dẫn sử dụng: Dùng trực tiếp</p>
        <p className="text-gray-700">Xuất xứ: Việt Nam</p>
        <p className="text-gray-700">Tình trạng: Còn hàng</p>
        <p className="border-b"></p>
        <div className="flex justify-start items-center gap-12">
          <div className="flex flex-row items-center">
            <button
              className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-2xl"
              onClick={() => setAmount((prev) => prev - 1)}
            >
              -
            </button>
            <span className="py-4 px-6 rounded-lg">{amount}</span>
            <button
              className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-2xl"
              onClick={() => setAmount((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <button className="btn bg-violet-800 text-white font-semibold py-3 px-3.5 rounded-xl h-full">
            Thêm vào giỏ hàng
          </button>
          <button className="btn bg-violet-800 text-white font-semibold py-3 px-3.5 rounded-xl h-full">
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
