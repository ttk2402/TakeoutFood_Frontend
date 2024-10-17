import React from "react";
import Product from "../Product/Product";

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-[30px] mt-5">
      {products.map((product, index) => {
        return <Product key={index} product={product} />;
      })}
    </div>
  );
};
export default ProductList;
