import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import "./Product.css";
import { useNavigate } from "react-router-dom";

const Product = ({ id, name, price, description, url_image_product }) => {
  const { account, addItem } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const product = {
      id,
      name,
      price,
      url_image_product,
    };
    addItem(product, account.id);
  };

  const handleProductClick = (id) => {
    navigate(`/san-pham/${id}`);
  };

  return (
    <div className="product">
      <div
        className="product-img-container cursor-pointer"
        onClick={() => handleProductClick(id)}
      >
        <img
          src={url_image_product}
          alt=""
          className="product-image w-full h-64"
        />
      </div>
      <div
        className="product-info cursor-pointer"
        onClick={() => handleProductClick(id)}
      >
        <div className="product-name-rating">
          <p className="text-xl font-bold text-center">{name}</p>
        </div>
        <p className="product-price text-lg font-bold">
          {price.toLocaleString("vi-VN")}
          <span>đ</span>
        </p>
      </div>
      <div className="product-action">
        <button
          className="btn btn-outline font-bold text-base"
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default Product;
