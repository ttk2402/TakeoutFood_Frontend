import React from "react";

const Item = ({id, quantity, price, productid, productname, productprice, url_image_product }) => {

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3 justify-center">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img
                src={url_image_product}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{productname}</div>
          </div>
        </div>
      </td>
      <td>{productprice}</td>
      <td className="">
        <div className="h-10 flex justify-center items-center space-x-3">
          <button>-</button>
          <p>{quantity}</p>
          <button>+</button>
        </div>
      </td>
      <td className="text-center">{price}</td>
      <td className="text-center">
        <button className="">X</button>
      </td>
    </tr>
  );
};

export default Item;