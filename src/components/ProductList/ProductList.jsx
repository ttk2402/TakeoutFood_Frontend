import React from "react";
import "./ProductList.css";
import Product from "../Product/Product";

const ProductList = () => {

  const products = [
    {
      id: 1,
      name: "Điều Rang Tỏi Ớt",
      price: 30000,
      description: "",
      url_image_product: "https://picture.miafood.vn/Gallery/ThumbPhone_20240608031600672.png"
    },
    {
      id: 2,
      name: "Hạt Bí Xanh Sấy Tỏi Ớt",
      price: 40000,
      description: "",
      url_image_product: "https://picture.miafood.vn/Gallery/ThumbPhone_20240608031520312.png"
    },
    {
      id: 3,
      name: "Mứt Táo Không Hạt",
      price: 75000,
      description: "",
      url_image_product: "https://picture.miafood.vn/Gallery/ThumbPhone_20240704221851859.jpg"
    },
    {
      id: 4,
      name: "Kiwi Sấy Dẻo",
      price: 96000,
      description: "",
      url_image_product: "https://picture.miafood.vn/Gallery/ThumbPhone_20240704222756437.jpg"
    },
    {
      id: 5,
      name: "Kẹo Dâu Tây",
      price: 52000,
      description: "",
      url_image_product: "https://picture.miafood.vn/Gallery/ThumbPhone_20240704235626718.jpg"
    },
    {
      id: 6,
      name: "Kẹo Dâu Tằm",
      price: 52000,
      description: "",
      url_image_product: "https://picture.miafood.vn/Gallery/ThumbPhone_20240704235517265.jpg"
    },
    {
      id: 7,
      name: "Khô Bò Miếng",
      price: 123000,
      description: "",
      url_image_product: "https://picture.miafood.vn/Gallery/ThumbPhone_20240608141427578.png"
    },
    {
      id: 8,
      name: "Mực Mix 2 Vị",
      price: 55000,
      description: "",
      url_image_product: "https://picture.miafood.vn/Gallery/ThumbPhone_20240710133636500.jpg"
    },
    {
      id: 9,
      name: "Bánh Trung Thu Thập Cẩm",
      price: 47000,
      description: "",
      url_image_product: "https://picture.miafood.vn/Gallery/ThumbPhone_20240807174721562.png"
    },
    {
      id: 10,
      name: "Bánh Trung Thu Đậu Xanh",
      price: 45000,
      description: "",
      url_image_product: "https://picture.miafood.vn/Gallery/ThumbPhone_20240807174734671.png"
    },
  ]

  return (
    <div className="food-display" id="food-display">
      <div className="food-display-list">
        {products.map((product, index) => {
          return (
            <Product
              key={index}
              id={product.id}
              name={product.name}
              price={product.price.toLocaleString("vi-VN")}
              description={product.description}
              url_image_product={product.url_image_product}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
