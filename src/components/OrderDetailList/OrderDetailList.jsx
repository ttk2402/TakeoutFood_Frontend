import React from "react";
import OrderDetail from "../OrderDetail/OrderDetail";

const OrderDetailList = ({ orders }) => {
  return (
    <div>
      {orders.map((order) => {
        return (
          <OrderDetail
            key={order.id}
            order={order}
          />
        );
      })}
    </div>
  );
};

export default OrderDetailList;
