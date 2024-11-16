import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import check_mark from "../../../assets/check-mark.png";
import { Edit, Trash2, Search } from "lucide-react";

const DeliveryTable = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Phân trang
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

    // Tìm kiếm theo ID đơn hàng hoặc Shipper ID
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toString().includes(searchTerm) ||
          (order.shipper && order.shipper.id.toString().includes(searchTerm))
      );
    }

    // Lọc theo trạng thái
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
        "http://localhost:8086/api/delivery_order/all"
      );
      const allOrders = response.data;
      setOrders(allOrders);
      setFilteredOrders(allOrders);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách đơn hàng đã giao:", error);
    }
  };

  // Gọi API lấy danh sách đơn hàng
  const confirmDeliverySuccess = async (deliveryOrderID, shipperID) => {
    try {
      await axios.put(
        `http://localhost:8086/api/delivery_order/complete/confirm/${deliveryOrderID}/${shipperID}`
      );
      fetchOrderData();
    } catch (error) {
      console.error(
        "Lỗi khi gọi API xác nhận đơn hàng đã giao thành công:",
        error
      );
    }
  };

  // Gọi API lấy danh sách đơn hàng
  const deleteDeliveryOrder = async (deliveryOrderID) => {
    try {
      await axios.delete(
        `http://localhost:8086/api/delivery_order/${deliveryOrderID}`
      );
      fetchOrderData();
    } catch (error) {
      console.error("Lỗi khi gọi API xóa đơn hàng đã giao:", error);
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
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-fuchsia-900">
            Danh sách đơn hàng giao
          </h2>

          {/* Tìm kiếm */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng..."
              className="bg-gray-100 text-black placeholder-gray-500 border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:ring-blue-200"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-500"
              size={18}
            />
          </div>
        </div>

        {/* Bảng đơn hàng */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-2 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-2 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider text-center">
                  Status
                </th>
                <th className="px-2 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider text-center">
                  Shipper ID
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
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider text-center">
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
                  <td className="px-2 py-2 whitespace-nowrap font-medium text-rose-950 text-center">
                    {order.isCompleted ? (
                      <img
                        src={check_mark}
                        alt=""
                        className="w-7 h-7 rounded-full object-cover mx-auto"
                      />
                    ) : (
                      <button
                        onClick={() =>
                          confirmDeliverySuccess(order.id, order.shipper.id)
                        }
                        className="btn btn-sm bg-green-400 hover:bg-green-500 text-white"
                      >
                        Xác nhận
                      </button>
                    )}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap font-medium text-rose-950 text-center">
                    {order.shipper.id}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap font-medium text-rose-950 text-center">
                    {order.receiveDate}
                  </td>
                  <td className="py-2 whitespace-nowrap font-medium text-rose-950 text-center">
                    {order.completeDate || "_"}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap font-medium text-rose-950 text-center">
                    {order.imageConfirmation ? (
                      <img
                        src={order.imageConfirmation}
                        alt="Confirmation"
                        className="w-12 h-12 rounded-md object-cover mx-auto"
                      />
                    ) : (
                      "_"
                    )}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap font-medium text-rose-950 text-center">
                    {order.orderId}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={() => deleteDeliveryOrder(order.id)}
                    >
                      <Trash2 size={20} />
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
    </>
  );
};

export default DeliveryTable;
