import React from "react";
import ItemList from "../ItemList/ItemList";
import ReceiveInfo from "../InfoReceive/ReceiveInfo";

const Cart = () => {
  return (
    <div className="w-full flex my-10">
      <div className="w-2/3 border-2 border-white p-5 bg-slate-50">
        <ItemList />
      </div>
      <div className="w-1/3 border-2 border-white p-5 bg-slate-50">
        <ReceiveInfo />
      </div>
    </div>
  );
};

export default Cart;
