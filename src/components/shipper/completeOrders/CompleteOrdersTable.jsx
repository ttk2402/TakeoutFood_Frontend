import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompleteOrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ship_cost = 15000;
  //Phân trang
  const ORDERS_PER_PAGE = 5;
  const indexOfLastOrder = currentPage * ORDERS_PER_PAGE;
  const indexOfFirstOrder = indexOfLastOrder - ORDERS_PER_PAGE;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  useEffect(() => {
    fetchOrderData();
  }, []);

  useEffect(() => {
    let filtered = orders;
    if (searchTerm) {
      filtered = filtered.filter((order) =>
        order.id.toString().includes(searchTerm)
      );
    }
    if (filterStatus) {
      filtered = filtered.filter(
        (order) => order.orderStatus.id === Number(filterStatus)
      );
    }
    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterStatus, orders]);

  // Gọi API lấy danh sách đơn hàng
  const fetchOrderData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8086/api/delivery_order/complete"
      );
      const allOrders = response.data;
      setOrders(allOrders);
      setFilteredOrders(allOrders);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách đơn hàng đã giao:", error);
    }
  };

  return (
    <>
      <motion.div
        className="bg-white backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* Bảng đơn hàng */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-2 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-2 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider text-center">
                  Cost
                </th>
                <th className="px-2 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider text-center">
                  Receive Date
                </th>
                <th className="py-2 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider text-center">
                  Complete Date
                </th>
                <th className="px-2 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider text-center">
                  Image Confirm
                </th>
                <th className="px-2 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider text-center">
                  Order ID
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentOrders.map((order) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-2 py-2 whitespace-nowrap font-medium text-rose-950">
                    {order.id}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap font-medium text-rose-950 text-center">
                    {ship_cost.toLocaleString("vi-VN")}đ
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap font-medium text-rose-950 text-center">
                    {order.receiveDate}
                  </td>
                  <td className="py-2 whitespace-nowrap font-medium text-rose-950 text-center">
                    {order.completeDate}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap font-medium text-rose-950 text-center">
                    <img
                      src={order.imageConfirmation}
                      alt=""
                      className="w-12 h-12 rounded-md object-cover mx-auto"
                    />
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap font-medium text-rose-950 text-center">
                    {order.orderId}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Phân trang */}
        <div className="flex justify-between mt-4">
          <button
            className={`px-7 py-2 text-white ${
              currentPage === 1
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            } rounded`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          <span className="text-black">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            className={`px-2 py-2 text-white ${
              currentPage === totalPages
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            } rounded`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Tiếp theo
          </button>
        </div>
      </motion.div>
    </>
  );
};
export default CompleteOrdersTable;
