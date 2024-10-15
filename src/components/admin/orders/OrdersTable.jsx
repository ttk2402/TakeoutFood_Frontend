import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { motion } from "framer-motion";
import { Search, Eye, Trash2, Plus } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrdersTable = () => {
  const {
    account,
    items,
    checkouts,
    addItemFromDetail,
    deleteItem,
    fetchItemData,
  } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  // Modal thêm
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedCheckout, setSelectedCheckout] = useState("");
  // Modal xem chi tiết
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
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
    fetchProductData();
    fetchOrderStatusData();
  }, []);
  useEffect(() => {
    const totalquantity = items.length;
    const totalprice = items.reduce((acc, item) => acc + item.price, 0);
    setTotalQuantity(totalquantity);
    setTotalPrice(totalprice);
  }, [items]);
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
      const response = await axios.get("http://localhost:8084/api/order/");
      const allOrders = response.data;
      setOrders(allOrders);
      setFilteredOrders(allOrders);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách đơn hàng:", error);
    }
  };
  // Gọi API lấy chi tiết đơn hàng
  const fetchOrderDetailData = async (orderId) => {
    try {
      const response = await axios.get(
        `http://localhost:8084/api/order/${orderId}`
      );
      setSelectedOrder(response.data);
      setNewStatus(response.data.orderStatus.id);
      document.getElementById("order_detail_modal").showModal();
    } catch (error) {
      console.error("Lỗi khi gọi API lấy đơn hàng:", error);
    }
  };
  // Gọi API lấy danh sách sản phẩm
  const fetchProductData = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/product/");
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách sản phẩm:", error);
    }
  };
  // Gọi API lấy danh sách trạng thái đơn hàng
  const fetchOrderStatusData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8084/api/order_status/"
      );
      setOrderStatus(response.data);
    } catch (error) {
      console.error(
        "Lỗi khi gọi API lấy danh sách trạng thái đơn hàng:",
        error
      );
    }
  };
  // Gọi API xóa đơn hàng
  const DeleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:8084/api/order/${id}`);
      fetchOrderData();
    } catch (error) {
      console.error("Lỗi khi gọi API xóa đơn hàng:", error);
    }
  };
  // Gọi API thêm item
  const addItem = async (accountID) => {
    const product = products.find(
      (product) => product.id === Number(selectedProduct)
    );
    addItemFromDetail(product, selectedQuantity, accountID);
    setSelectedProduct("");
    setSelectedQuantity(1);
    fetchItemData(accountID);
  };
  // Gọi API tạo đơn hàng
  const createOrder = async (accountID, checkoutID) => {
    try {
      const response = await axios.post(
        `http://localhost:8084/api/order/add/${checkoutID}`,
        {
          accountId: accountID,
        }
      );
      console.log(response.data);
      setSelectedCheckout("");
      fetchItemData(accountID);
      fetchOrderData();
      document.getElementById("add_modal").close();
      toast.success("Thêm đơn hàng thành công!");
    } catch (error) {
      toast.error("Thêm đơn hàng thất bại!");
      console.error("Lỗi khi gọi API tạo đơn hàng:", error);
    }
  };
  // Xử lý nút xóa
  const handleDelete = (itemID) => {
    deleteItem(itemID);
  };
  // Xử lý nút tìm kiếm
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };
  // Gọi API cập nhật trạng thái đơn hàng
  const updateOrderStatus = async (orderId, statusId) => {
    try {
      await axios.put(`http://localhost:8084/api/order/${orderId}/${statusId}`);
      fetchOrderData();
      fetchOrderDetailData(orderId);
      toast.success("Cập nhật trạng thái đơn hàng thành công!");
    } catch (error) {
      toast.error("Cập nhật trạng thái đơn hàng thất bại!");
      console.error("Lỗi khi gọi API cập nhật trạng thái đơn hàng:", error);
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-fuchsia-900">
            Danh sách đơn hàng
          </h2>
          {/* Nút thêm */}
          <button
            className="btn btn-sm px-2"
            onClick={() => document.getElementById("add_modal").showModal()}
          >
            <Plus size={20} />
          </button>
          {/* Modal thêm */}
          <dialog id="add_modal" className="modal">
            <div className="modal-box relative w-full max-w-xl p-6 overflow-y-auto">
              <form method="dialog">
                <button className="btn btn-sm font-bold btn-circle btn-ghost absolute right-2 top-2 bg-red-400 hover:bg-red-500">
                  ✕
                </button>
              </form>
              <p className="font-bold text-xl text-center mb-5">Tạo đơn hàng</p>
              {/* Chọn sản phẩm */}
              <div className="flex justify-center space-x-10 mb-5">
                <div className="">
                  <label
                    htmlFor="product"
                    className="block mb-2 font-medium text-gray-900"
                  >
                    Sản phẩm
                  </label>
                  <select
                    id="product"
                    className="w-80 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      -- Chọn sản phẩm --
                    </option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Chọn số lượng */}
                <div>
                  <label
                    htmlFor="quantity"
                    className="block mb-2 font-medium text-gray-900"
                  >
                    Số lượng
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max="99"
                    className="w-24 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
                    value={selectedQuantity}
                    onChange={(e) =>
                      setSelectedQuantity(Number(e.target.value))
                    }
                    required
                  />
                </div>
              </div>
              {/* Thêm vào đơn hàng */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => addItem(account.id)}
                  className="btn text-white bg-sky-500 hover:bg-sky-700 px-7 font-bold rounded-lg text-sm w-full sm:w-auto py-2.5 text-center"
                >
                  Thêm vào đơn hàng
                </button>
              </div>
              {/* Danh sách sản phẩm đã thêm */}
              <div className="mt-5 mb-2.5">
                <p className="font-bold text-center">
                  Danh sách sản phẩm đã thêm
                </p>
              </div>
              <ul>
                {items.map((item) => (
                  <li key={item.id} className="ml-5 mb-2.5">
                    <div className="grid grid-cols-8 gap-1 items-center">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-12 h-12 rounded"
                      />
                      <span className="font-bold text-center col-span-3">
                        {item.productName}
                      </span>
                      <span className="font-bold text-center">
                        x{item.quantity}
                      </span>
                      <span className="font-bold text-center col-span-2">
                        {item.price.toLocaleString("vi-VN")}
                      </span>
                      <button
                        className="btn btn-square btn-outline btn-error btn-sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              {/* Chọn phương thức thanh toán và tổng tiền */}
              <div className="flex items-center justify-around mt-5 mb-5">
                <select
                  id="checkout"
                  className="w-60 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
                  value={selectedCheckout}
                  onChange={(e) => setSelectedCheckout(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    -- Chọn phương thức thanh toán --
                  </option>
                  {checkouts.map((checkout) => (
                    <option
                      key={checkout.id}
                      value={checkout.id}
                      disabled={checkout.id === 1 || checkout.id === 2}
                    >
                      {checkout.method}
                    </option>
                  ))}
                </select>
                <div>
                  <p className="font-semibold text-center">
                    Tổng tiền: {totalPrice.toLocaleString("vi-VN")}đ
                  </p>
                </div>
              </div>
              {/* Tạo đơn hàng */}
              <div className="flex justify-center mt-5">
                <button
                  type="button"
                  onClick={() => createOrder(account.id, selectedCheckout)}
                  className="btn text-white bg-sky-500 hover:bg-sky-700 px-7 font-bold rounded-lg text-sm w-full sm:w-auto py-2.5 text-center"
                >
                  Tạo đơn hàng
                </button>
              </div>
            </div>
          </dialog>
          {/* Modal chi tiết đơn hàng */}
          <dialog id="order_detail_modal" className="modal">
            <div className="modal-box relative w-full max-w-3xl p-6 overflow-y-auto">
              <form method="dialog">
                <button className="btn btn-sm font-bold btn-circle btn-ghost absolute right-2 top-2 bg-red-400 hover:bg-red-500">
                  ✕
                </button>
              </form>
              {selectedOrder && (
                <>
                  <h3 className="font-bold text-2xl text-center mb-5">
                    Chi tiết đơn hàng #{selectedOrder.id}
                  </h3>
                  {/* Thông tin đơn hàng */}
                  <div className="mb-5">
                    <p>
                      <strong>Ngày đặt:</strong> {selectedOrder.date}
                    </p>
                    <p>
                      <strong>Tổng tiền:</strong>{" "}
                      {selectedOrder.totalprice.toLocaleString("vi-VN")}đ
                    </p>
                    <p>
                      <strong>Phương thức thanh toán:</strong>{" "}
                      {selectedOrder.checkout.method}
                    </p>
                    <p>
                      <strong>Tình trạng:</strong>{" "}
                      {selectedOrder.orderStatus.status}
                    </p>
                    <p>
                      <strong>Account ID:</strong> {selectedOrder.accountId}
                    </p>
                  </div>
                  {/* Timeline cập nhật trạng thái */}
                  <div className="mb-5">
                    <h4 className="font-semibold mb-3.5">
                      Cập nhật trạng thái:
                    </h4>
                    <div className="flex justify-around mb-5">
                      {orderStatus.map((status) => (
                        <button
                          key={status.id}
                          className={`px-4 py-2 rounded ${
                            newStatus === status.id
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                          onClick={() => setNewStatus(status.id)}
                          disabled={status.id === selectedOrder.orderStatus.id}
                        >
                          {status.status}
                        </button>
                      ))}
                    </div>
                    {/* Nút cập nhật trạng thái */}
                    <div className="flex justify-center">
                      <button
                        className="btn text-white bg-sky-500 hover:bg-sky-700 px-5 font-bold rounded-lg text-sm w-full sm:w-auto py-2.5 text-center"
                        onClick={() =>
                          updateOrderStatus(selectedOrder.id, newStatus)
                        }
                      >
                        Cập nhật trạng thái
                      </button>
                    </div>
                  </div>
                  {/* Danh sách sản phẩm */}
                  <div className="mb-5">
                    <h4 className="font-semibold mb-2">Sản phẩm:</h4>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2">Ảnh</th>
                          <th className="px-4 py-2">Tên sản phẩm</th>
                          <th className="px-4 py-2">Số lượng</th>
                          <th className="px-4 py-2">Giá</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.itemOrdereds.map((item) => (
                          <tr key={item.id} className="text-center">
                            <td className="px-4 py-2">
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-12 h-12 rounded"
                              />
                            </td>
                            <td className="px-4 py-2">{item.productName}</td>
                            <td className="px-4 py-2">{item.quantity}</td>
                            <td className="px-4 py-2">
                              {item.price.toLocaleString("vi-VN")}đ
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </dialog>
          <div className="flex space-x-4">
            {/* Tìm kiếm */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm đơn hàng..."
                className="bg-gray-100 text-black placeholder-gray-500 border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:ring-blue-200"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-500"
                size={18}
              />
            </div>
            {/* Lọc theo trạng thái đơn hàng */}
            <div className="relative">
              <select
                id="filter_status"
                className="w-44 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">--Tất cả trạng thái--</option>
                {orderStatus.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Bảng đơn hàng */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  Checkout
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
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
                  <td className="px-4 py-2 whitespace-nowrap font-medium text-rose-950">
                    {order.id}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap font-medium text-rose-950">
                    {order.date}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap font-medium text-rose-950">
                    {order.totalprice.toLocaleString("vi-VN")}đ
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap font-medium text-rose-950">
                    {order.checkout.method}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
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
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      onClick={() => fetchOrderDetailData(order.id)}
                      className="text-indigo-400 hover:text-indigo-300 mr-5"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={() => DeleteOrder(order.id)}
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
            className={`px-4 py-2 text-white ${
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
      <ToastContainer />
    </>
  );
};
export default OrdersTable;
