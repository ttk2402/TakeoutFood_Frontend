import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { FaTags } from "react-icons/fa";

const Product = ({ product }) => {
  const { account, addItem } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (account == null) {
      console.log("Bạn cần đăng nhập mới thêm vào giỏ hàng được !");
      navigate("/dang-nhap");
    } else {
      addItem(product, account.id);
    }
  };

  const handleProductClick = (id) => {
    navigate(`/san-pham/${id}`);
  };

  const originalPrice = product.discount
    ? product.price / (1 - product.discount.percent)
    : product.price;

  return (
    <div className="w-[240px] h-[330px] mx-auto rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
      <div
        className="relative cursor-pointer"
        onClick={() => handleProductClick(product.id)}
      >
        <img
          src={product.url_image_product}
          alt={product.name}
          className="w-full h-48 rounded-t-lg object-cover"
        />
        {product.discount && (
          <div className="discount-icon absolute top-2 left-2 flex items-center space-x-2 bg-red-600 text-white px-2 py-1 rounded-full shadow-lg">
            <FaTags size={20} />
            <span className="text-sm font-bold">
              -{product.discount.percent * 100}%
            </span>
          </div>
        )}
      </div>
      <div
        className="cursor-pointer p-3.5"
        onClick={() => handleProductClick(product.id)}
      >
        <div className="flex justify-center items-center mb-2">
          <p className="font-bold">{product.name}</p>
        </div>
        {product.discount ? (
          <div className="flex justify-center items-center">
            <p className="line-through text-gray-500 font-bold">
              {originalPrice.toLocaleString("vi-VN")}đ
            </p>
            <p className="font-bold mx-2.5">-</p>
            <p className="font-bold text-rose-500">
              {product.price.toLocaleString("vi-VN")}đ
            </p>
          </div>
        ) : (
          <p className="font-bold text-rose-500 text-center">
            {product.price.toLocaleString("vi-VN")}đ
          </p>
        )}
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleAddToCart}
          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-300 to-blue-500 group-hover:from-green-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-100 dark:focus:ring-green-600"
        >
          <span className="relative px-4 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Thêm vào giỏ hàng
          </span>
        </button>
      </div>
    </div>
  );
};
export default Product;
