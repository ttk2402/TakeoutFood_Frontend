import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../ProductList/ProductList";

const ProductDiscount = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProductDiscount();
  }, []);
  //Gọi API lấy danh sách sản phẩm đang khuyến mãi
  const fetchProductDiscount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/api/product/discounted"
      );
      setProducts(response.data);
    } catch (error) {
      console.error(
        "Lỗi khi gọi API lấy danh sách sản phẩm đang khuyến mãi:",
        error
      );
    }
  };
  return (
    <div>
      <div className="rounded-lg mb-5">
        <div className="flex justify-center py-4 bg-zinc-400 rounded-t-lg">
          <p className=" text-lg font-extrabold text-white">
            SẢN PHẨM ĐANG KHUYẾN MÃI
          </p>
        </div>
        <div>
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};
export default ProductDiscount;