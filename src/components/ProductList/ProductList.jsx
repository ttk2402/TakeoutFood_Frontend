import React from "react";
import "./ProductList.css";
import Product from "../Product/Product";

const ProductList = ({ products }) => {

  return (
    <div className="food-display" id="food-display">
      <div className="food-display-list">
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
    </div>
  );
};

export default ProductList;
