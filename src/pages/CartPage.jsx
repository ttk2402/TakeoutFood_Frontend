import React, { useContext } from "react";
import ItemList from "../components/ItemList/ItemList";
import OrderInfo from "../components/OrderInfo/OrderInfo";
import { StoreContext } from "../components/Context/StoreContext";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
const CartPage = () => {
  const { items } = useContext(StoreContext);
  return (
    <>
      <Navbar />
      <div className="w-full flex mb-7">
        <div className="w-2/3 border-2 border-white p-5">
          <ItemList items={items} />
        </div>
        <div className="w-1/3 border-2 border-white p-5">
          <OrderInfo />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
