import React from "react";
import ItemOrder from "../ItemOrder/ItemOrder";

const ItemOrderList = () => {

  const items = [
    {
      id: 1,
      quantity: 2,
      price: 60000.0,
      productid: 1,
      productname: "Điều Rang Tỏi Ớt",
      productprice: 30000,
      url_image_product:
        "https://picture.miafood.vn/Gallery/ThumbPhone_20240608031600672.png",
    },
    {
      id: 2,
      quantity: 2,
      price: 60000.0,
      productid: 1,
      productname: "Điều Rang Tỏi Ớt",
      productprice: 30000,
      url_image_product:
        "https://picture.miafood.vn/Gallery/ThumbPhone_20240608031600672.png",
    },
    {
      id: 3,
      quantity: 2,
      price: 60000.0,
      productid: 1,
      productname: "Điều Rang Tỏi Ớt",
      productprice: 30000,
      url_image_product:
        "https://picture.miafood.vn/Gallery/ThumbPhone_20240608031600672.png",
    },
    {
      id: 4,
      quantity: 2,
      price: 60000.0,
      productid: 1,
      productname: "Điều Rang Tỏi Ớt",
      productprice: 30000,
      url_image_product:
        "https://picture.miafood.vn/Gallery/ThumbPhone_20240608031600672.png",
    },
    {
      id: 5,
      quantity: 2,
      price: 60000.0,
      productid: 1,
      productname: "Điều Rang Tỏi Ớt",
      productprice: 30000,
      url_image_product:
        "https://picture.miafood.vn/Gallery/ThumbPhone_20240608031600672.png",
    },
  ];

  return (
    <div className="item-list flex flex-col w-full">
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">Product</th>
            <th>Price</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Total Price</th>

          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => {
            return (
              <ItemOrder
                key={index}
                id={item.id}
                quantity={item.quantity}
                price={item.price}
                productid={item.productid}
                productname={item.productname}
                productprice={item.productprice}
                url_image_product={item.url_image_product}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ItemOrderList;
