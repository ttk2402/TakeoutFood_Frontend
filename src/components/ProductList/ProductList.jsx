import React from "react";
import Product from "../Product/Product";

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-[30px] p-5">
      {products.map((product, index) => {
        return (
          <Product
            key={index}
            id={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            url_image_product={product.url_image_product}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
