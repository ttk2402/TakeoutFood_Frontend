import ItemOrderedList from "../ItemOrderedList/ItemOrderedList";
import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import axios from "axios";

const OrderDetail = ({ order }) => {
  const { account, fetchOrderData } = useContext(StoreContext);
  const shippingCost = 15000;
  /* Gọi API hủy đơn hàng*/
  const cancelOrder = async (orderID) => {
    try {
      const response = await axios.put(
        `http://localhost:8084/api/order/${orderID}/5`
      );
      fetchOrderData(account.id);
    } catch (error) {
      console.error("Lỗi khi gọi API hủy đơn hàng:", error);
    }
  };
  let statusClass = "";
  if (order.orderStatus) {
    switch (order.orderStatus.id) {
      case 1:
        statusClass =
          "bg-sky-500 text-white py-0.5 px-1 rounded text-sm font-semibold";
        break;
      case 2:
        statusClass =
          "bg-teal-400 text-white py-0.5 px-1 rounded text-sm font-semibold";
        break;
      case 3:
        statusClass =
          "bg-amber-200 text-black py-0.5 px-1 rounded text-sm font-semibold px-2";
        break;
      case 4:
        statusClass =
          "bg-emerald-400 text-white py-0.5 px-1 rounded text-sm font-semibold px-2";
        break;
      case 5:
        statusClass =
          "bg-red-400 text-white py-0.5 px-2.5 rounded text-sm font-semibold";
        break;
      default:
        statusClass = "";
        break;
    }
  }
  return (
    <div className="w-3/5 mx-auto border-2 p-3.5 drop-shadow-sm mb-5">
      <div className="flex justify-between items-center px-2 pb-1">
        <p className="mr-2 text-sm font-medium">
          Mã đơn: <span className="text-sm font-semibold">{order.id}</span>
        </p>
        <p className="mr-2 text-sm font-medium">
          Đặt lúc: <span className="text-sm font-semibold">{order.date}</span>
        </p>
        <p className="mr-2 text-sm font-semibold">{order.checkout.method}</p>
        <p className={statusClass}>{order.orderStatus.status}</p>
      </div>
      <div className="flex justify-between items-center px-2">
        <p className="text-sm font-medium">
          {order.deliveryInformation.commune},{" "}
          {order.deliveryInformation.district},{" "}
          {order.deliveryInformation.province}
        </p>
        <p className="text-sm font-medium">
          Người nhận:{" "}
          <span className="text-sm font-bold">
            {order.deliveryInformation.recipientName} -{" "}
            {order.deliveryInformation.phoneNumber}
          </span>
        </p>
      </div>
      {order.orderStatus.status !== "Đã hủy" &&
      order.orderStatus.status === "Chờ xác nhận" ? (
        <div className="flex justify-end">
          <button
            onClick={() => cancelOrder(order.id)}
            className="text-red-400 py-0.5 px-5 text-sm underline font-semibold mt-1 mr-5"
          >
            Hủy
          </button>
        </div>
      ) : null}
      <div>
        <ItemOrderedList items={order.itemOrdereds} />
      </div>
      <div className="flex flex-col items-end p-2">
        <p className="text-sm font-medium p-1">
          Tổng số sản phẩm: {order.itemOrdereds.length}
        </p>
        <p className="text-sm font-medium p-1">
          Tổng tiền hàng: {(order.totalprice - 15000).toLocaleString("vi-VN")}
          <span className="text-sm font-bold underline">đ</span>
        </p>
        <p className="text-sm font-medium p-1">
          Phí vận chuyển: {shippingCost.toLocaleString("vi-VN")}
          <span className="text-sm font-bold underline">đ</span>
        </p>
        <p className="text-sm font-semibold p-1">
          TỔNG THANH TOÁN: {order.totalprice.toLocaleString("vi-VN")}
          <span className="text-sm font-bold underline">đ</span>
        </p>
      </div>
    </div>
  );
};

export default OrderDetail;
