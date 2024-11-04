import React from "react";
import Item from "../Item/Item";

const ItemList = ({ items }) => {
  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  return (
    <div className="item-list flex flex-col items-center w-full">
      <table className="table">
        <thead>
          <tr>
            <th className="text-center font-bold text-sm">Sản phẩm</th>
            <th className="text-center font-bold text-sm">Giá</th>
            <th className="text-center font-bold text-sm">Số lượng</th>
            <th className="text-center font-bold text-sm">Tổng giá tiền</th>
            <th className="text-center font-bold text-sm"></th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => {
            return (
              <Item
                key={index}
                id={item.id}
                quantity={item.quantity}
                price={item.price}
                productid={item.productId}
                productname={item.productName}
                productprice={item.productPrice}
                url_image_product={item.productImage}
              />
            );
          })}
        </tbody>
      </table>
      {/* <div className="text-center">
        <span className="font-bold text-base mr-5">Tổng cộng:</span>
        <span className="font-bold text-base">{totalPrice.toLocaleString("vi-VN")}đ</span>
      </div> */}
    </div>
  );
};

export default ItemList;
