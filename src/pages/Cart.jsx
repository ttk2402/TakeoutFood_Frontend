import React, { useContext } from "react";
import ItemList from "../components/ItemList/ItemList";
import OrderInfo from "../components/OrderInfo/OrderInfo";
import { StoreContext } from "../components/Context/StoreContext";

const Cart = () => {
  const { items } = useContext(StoreContext);
  return (
    <div className="w-full flex my-10">
      <div className="w-2/3 border-2 border-white p-5">
        <ItemList items={items} />
      </div>
      <div className="w-1/3 border-2 border-white p-5">
        <OrderInfo />
      </div>
    </div>
  );
};

export default Cart;
