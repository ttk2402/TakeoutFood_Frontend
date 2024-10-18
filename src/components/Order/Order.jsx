import React, { useContext } from "react";
import { useState, useEffect } from "react";
import OrderDetailList from "../OrderDetailList/OrderDetailList";
import { StoreContext } from "../Context/StoreContext";

const Order = () => {
  const { orders } = useContext(StoreContext);
  const [filterStatus, setFilterStatus] = useState("All");
  // Hàm lọc đơn hàng theo trạng thái
  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "All") return true;
    if (filterStatus === "Chờ xác nhận" && order.orderStatus.id === 1)
      return true;
    if (filterStatus === "Đã xác nhận" && order.orderStatus.id === 2)
      return true;
    if (filterStatus === "Đang giao hàng" && order.orderStatus.id === 3)
      return true;
    if (filterStatus === "Đã nhận hàng" && order.orderStatus.id === 4)
      return true;
    if (filterStatus === "Đã hủy" && order.orderStatus.id === 5) return true;
    return false;
  });

  return (
    <div className="mt-5 mb-10">
      {/* Danh sách các nút lọc */}
      <ul className="flex mb-4 justify-center space-x-5">
        <li>
          <button
            className={`p-2 rounded ${
              filterStatus === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilterStatus("All")}
          >
            Tất cả
          </button>
        </li>
        <li>
          <button
            className={`p-2 rounded ${
              filterStatus === "Chờ xác nhận"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setFilterStatus("Chờ xác nhận")}
          >
            Chờ xác nhận
          </button>
        </li>
        <li>
          <button
            className={`p-2 rounded ${
              filterStatus === "Đã xác nhận"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setFilterStatus("Đã xác nhận")}
          >
            Đã xác nhận
          </button>
        </li>
        <li>
          <button
            className={`p-2 rounded ${
              filterStatus === "Đang giao hàng"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setFilterStatus("Đang giao hàng")}
          >
            Đang giao hàng
          </button>
        </li>
        <li>
          <button
            className={`p-2 rounded ${
              filterStatus === "Đã nhận hàng"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setFilterStatus("Đã nhận hàng")}
          >
            Đã nhận hàng
          </button>
        </li>
        <li>
          <button
            className={`p-2 rounded ${
              filterStatus === "Đã hủy"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setFilterStatus("Đã hủy")}
          >
            Đã hủy
          </button>
        </li>
      </ul>

      <OrderDetailList orders={filteredOrders} />
    </div>
  );
};
export default Order;
