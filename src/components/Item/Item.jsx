import React, { useContext } from "react";
import axios from "axios";
import minus_icon from "../../assets/icons8-minus-18.png";
import plus_icon from "../../assets/icons8-plus-18.png";
import { StoreContext } from "../Context/StoreContext";

const Item = ({
  id,
  quantity,
  price,
  productid,
  productname,
  productprice,
  url_image_product,
}) => {
  const { account, fetchItemData, deleteItem } = useContext(StoreContext);

  const updateItemQuantity = async (newQuantity) => {
    try {
      const response = await axios.put(`http://localhost:9092/api/item/${id}`, {
        productId: productid,
        quantity: newQuantity,
        price: productprice * newQuantity,
      });
      console.log(response.data);
      fetchItemData(account.id);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleIncrease = () => {
    if (quantity < 99) {
      updateItemQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateItemQuantity(quantity - 1);
    }
  };

  const handleDelete = (itemID) => {
    deleteItem(itemID);
  };

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3 justify-start">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={url_image_product} alt="" />
            </div>
          </div>
          <div>
            <div className="font-bold text-sm">{productname}</div>
          </div>
        </div>
      </td>
      <td className="font-bold text-center text-sm">
        {productprice.toLocaleString("vi-VN")}
      </td>
      <td className="">
        <div className="h-10 flex justify-center items-center space-x-3">
          <button
            className="btn btn-circle btn-outline btn-sm btn-info"
            onClick={handleDecrease}
          >
            <img src={minus_icon} alt="" />
          </button>
          <p className="text-sm font-bold">{quantity}</p>
          <button
            className="btn btn-circle btn-outline btn-sm btn-info"
            onClick={handleIncrease}
          >
            <img src={plus_icon} alt="" />
          </button>
        </div>
      </td>
      <td className="text-center font-bold text-sm">
        {price.toLocaleString("vi-VN")}
      </td>
      <td className="text-center">
        <button
          className="btn btn-square btn-outline btn-error btn-sm"
          onClick={() => handleDelete(id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Item;
