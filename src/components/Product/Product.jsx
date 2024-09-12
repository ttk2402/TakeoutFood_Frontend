import { React } from "react";
import './Product.css'

const Product = ({id, name, price, description, url_image_product}) => {

  return (
    <div className="product">
      <div className="product-img-container">
        <img src={url_image_product} alt="" className="product-image" />
      </div>
      <div className="product-info">
        <div className="product-name-rating">
          <p>{name}</p>
        </div>
        {/* <p className="product-desc">{description}</p> */}
        <p className="product-price">{price.toLocaleString("vi-VN")}<span>đ</span></p>
      </div>
      <div className="product-action">
        <button className="btn btn-info btn-outline">Thêm vào giỏ hàng</button>
      </div>
    </div>
  );
};

export default Product;