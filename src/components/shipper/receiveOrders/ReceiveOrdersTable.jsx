import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const ReceiveOrdersTable = () => {
  const navigate = useNavigate();
  const { shipper } = useContext(StoreContext);
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
        "http://localhost:8084/api/order/orderStatus/2"
      );
      const allOrders = response.data;
      setOrders(allOrders);
      setFilteredOrders(allOrders);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách đơn hàng:", error);
    }
  };

  // Gọi API nhận đơn hàng giao
  const addDeliveryOrder = async (orderId) => {
    try {
      await axios.post(
        `http://localhost:8086/api/delivery_order/add/${shipper.id}`,
        {
          orderId: orderId,
        }
      );
      navigate("/giao-hang/don-hang-hien-tai");
    } catch (error) {
      console.error("Lỗi khi gọi API nhận đơn hàng giao:", error);
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
                <th className="px-2 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-2 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-2 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-2 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-2 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  Action
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
                  <td className="px-2 py-2 whitespace-nowrap font-medium text-rose-950">
                    {order.totalprice.toLocaleString("vi-VN")}đ
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap">
                    <span
                      className={`px-4 py-1 inline-flex text-sm font-semibold leading-5 rounded-full ${
                        order.orderStatus.id === 1
                          ? "bg-blue-200 text-blue-800"
                          : order.orderStatus.id === 2
                          ? "bg-teal-200 text-cyan-800"
                          : order.orderStatus.id === 3
                          ? "bg-yellow-100 text-yellow-800"
                          : order.orderStatus.id === 4
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.orderStatus.status}
                    </span>
                  </td>
                  <td className="py-2 whitespace-nowrap font-medium text-rose-950">
                    {order.deliveryInformation.district +
                      ", " +
                      order.deliveryInformation.province}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap font-medium text-rose-950">
                    {ship_cost.toLocaleString("vi-VN")}đ
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      onClick={() => addDeliveryOrder(order.id)}
                      className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-300 to-blue-500 group-hover:from-green-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-100 dark:focus:ring-green-600"
                    >
                      <span className="relative px-4 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Nhận giao
                      </span>
                    </button>
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
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Flip
      />
    </>
  );
};
export default ReceiveOrdersTable;
