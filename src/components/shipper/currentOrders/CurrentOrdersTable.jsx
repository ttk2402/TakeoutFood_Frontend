import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreContext } from "../../Context/StoreContext";

const CurrentOrdersTable = () => {
  const { shipper, fetchShipperInfo } = useContext(StoreContext);
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
    fetchDeliveryOrderData();
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
  const fetchDeliveryOrderData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8086/api/delivery_order/current"
      );
      const allOrders = response.data;
      setOrders(allOrders);
      setFilteredOrders(allOrders);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách đơn hàng đang giao:", error);
    }
  };

  // Gọi API hủy đơn hàng giao
  const cancelDeliveryOrder = async (deliveryOrderId) => {
    try {
      await axios.delete(
        `http://localhost:8086/api/delivery_order/${deliveryOrderId}`
      );
      fetchDeliveryOrderData();
    } catch (error) {
      console.error("Lỗi khi gọi API hủy đơn hàng giao:", error);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);
  // Modal upload ảnh
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDeliveryOrder, setSelectedDeliveryOrder] = useState(null);

  const handleEditClick = (deliveryOrder) => {
    setSelectedDeliveryOrder(deliveryOrder);
    setIsUploadModalOpen(true);
  };
  // Gọi API hoàn thành đơn hàng giao
  const completeDeliveryOrder = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage); // Giả định API yêu cầu tệp hình ảnh với khóa 'image'
    try {
      await axios.put(
        `http://localhost:8086/api/delivery_order/complete/${selectedDeliveryOrder.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSelectedDeliveryOrder(null);
      setSelectedImage(null);
      fetchDeliveryOrderData();
      fetchShipperInfo(shipper.accountId);
      document.getElementById("upload_modal").close();
    } catch (error) {
      console.error("Lỗi khi tải lên hình ảnh:", error);
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
        {/* Modal upload ảnh */}
        {isUploadModalOpen && selectedDeliveryOrder && (
          <dialog id="upload_modal" className="modal" open>
            <div
              className="modal-box"
              style={{
                position: "fixed",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "450px",
              }}
            >
              <form method="dialog">
                <button
                  type="button"
                  className="btn btn-sm font-bold btn-circle btn-ghost absolute right-2 top-0 mt-2 bg-red-400 hover:bg-red-500"
                  onClick={() => {
                    setIsUploadModalOpen(false);
                    setSelectedDeliveryOrder(null);
                  }}
                >
                  ✕
                </button>
              </form>
              <div className="flex flex-col items-center">
                <p className="font-bold text-xl text-center mb-2.5">
                  Tải lên hình ảnh
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  required
                  className="my-5"
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={completeDeliveryOrder}
                  className="my-2.5 text-sm w-full px-7 text-white bg-emerald-400 hover:bg-emerald-600 focus:ring-emerald-100 font-bold rounded-lg sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-400 dark:hover:bg-emerald-600 dark:focus:bg-emerald-700"
                >
                  Tải lên
                </button>
              </div>
            </div>
          </dialog>
        )}

        {/* Bảng đơn hàng */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-2 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-2 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider text-center">
                  Order ID
                </th>
                <th className="px-2 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider text-center">
                  Receive Date
                </th>

                <th className="py-2 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider text-center">
                  Cost
                </th>
                <th className="px-2 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider text-center">
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
                    {order.orderId}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap font-medium text-rose-950 text-center">
                    {order.receiveDate}
                  </td>

                  <td className="px-2 py-2 whitespace-nowrap font-medium text-rose-950 text-center">
                    {ship_cost.toLocaleString("vi-VN")}đ
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-300 flex justify-center space-x-7">
                    <button
                      onClick={() => handleEditClick(order)}
                      className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                      <span className="relative px-4 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Hoàn tất
                      </span>
                    </button>
                    <button
                      onClick={() => cancelDeliveryOrder(order.id)}
                      className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                    >
                      <span className="relative px-7 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Hủy
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
    </>
  );
};
export default CurrentOrdersTable;
