import React, { useState, useEffect } from "react";
import { Edit, Search, Trash2, Plus } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DiscountsTable = () => {
  const [discounts, setDiscounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDiscounts, setFilteredDiscounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // Modal thêm
  const [discountTitle, setDiscountTitle] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  // Modal chỉnh sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [editDiscounTitle, setEditDiscountTitle] = useState("");
  const [editDiscountPercent, setEditDiscountPercent] = useState("");
  // Phân trang
  const PRODUCTS_PER_PAGE = 5;
  const indexOfLastDiscount = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstDiscount = indexOfLastDiscount - PRODUCTS_PER_PAGE;
  const currentDiscounts = filteredDiscounts.slice(
    indexOfFirstDiscount,
    indexOfLastDiscount
  );
  const totalPages = Math.ceil(filteredDiscounts.length / PRODUCTS_PER_PAGE);
  useEffect(() => {
    fetchDiscountData();
  }, []);
  useEffect(() => {
    let filtered = discounts;
    if (searchTerm) {
      filtered = filtered.filter((discount) =>
        discount.title.toLowerCase().includes(searchTerm)
      );
    }
    setFilteredDiscounts(filtered);
    setCurrentPage(1);
  }, [searchTerm, discounts]);
  // Gọi API lấy khuyến mãi
  const fetchDiscountData = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/discount/");
      const allDiscounts = response.data;
      setDiscounts(allDiscounts);
      setFilteredDiscounts(allDiscounts);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách khuyến mãi:", error);
    }
  };
  // Gọi API xóa khuyến mãi
  const deleteDiscount = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/api/discount/${id}`);
      fetchDiscountData();
    } catch (error) {
      console.error("Lỗi khi gọi API xóa khuyến mãi:", error);
    }
  };
  // Gọi API thêm khuyến mãi
  const addDiscount = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8082/api/discount/add",
        {
          title: discountTitle,
          percent: discountPercent,
        }
      );
      document.getElementById("add_modal").close();
      console.log(response.data);
      setDiscountTitle("");
      setDiscountPercent("");
      fetchDiscountData();
      toast.success("Thêm khuyến mãi thành công!");
    } catch (error) {
      toast.error("Thêm khuyến mãi thất bại!");
      console.error("Lỗi khi gọi API thêm khuyến mãi:", error);
    }
  };
  // Gọi API cập nhật khuyến mãi
  const updateDiscount = async () => {
    try {
      await axios.put(
        `http://localhost:8082/api/discount/${selectedDiscount.id}`,
        {
          title: editDiscounTitle,
          percent: editDiscountPercent,
        }
      );
      document.getElementById("edit_modal").close();
      setSelectedDiscount(null);
      setEditDiscountTitle("");
      setEditDiscountPercent("");
      fetchDiscountData();
      toast.success("Chỉnh sửa khuyến mãi thành công!");
    } catch (error) {
      toast.success("Chỉnh sửa khuyến mãi thất bại!");
      console.error("Lỗi khi gọi API cập nhật khuyến mãi:", error);
    }
  };
  const handleEditClick = (discount) => {
    setSelectedDiscount(discount);
    setEditDiscountTitle(discount.title);
    setEditDiscountPercent(discount.percent);
    setIsEditModalOpen(true);
  };
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };
  return (
    <>
      <motion.div
        className="bg-white backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-fuchsia-900">
            Danh sách khuyến mãi
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
                <button className="btn btn-sm font-bold btn-circle btn-ghost absolute right-2 top-0 mt-2 bg-red-400 hover:bg-red-500">
                  ✕
                </button>
              </form>
              <p className="font-bold text-xl text-center mb-2">
                Thêm khuyến mãi
              </p>
              <div className="mb-6">
                <label
                  htmlFor="discount_title"
                  className="block mb-2 font-medium text-gray-900 dark:text-white"
                >
                  Tên khuyến mãi
                </label>
                <input
                  type="text"
                  id="discount_title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  value={discountTitle}
                  onChange={(e) => setDiscountTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="discount_percent"
                  className="block mb-2 font-medium text-gray-900 dark:text-white"
                >
                  Phần trăm
                </label>
                <input
                  type="text"
                  id="discount_percent"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={addDiscount}
                  className="btn text-white bg-sky-500 hover:bg-sky-700 px-7 focus:ring-sky-100 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Thêm
                </button>
              </div>
            </div>
          </dialog>
          {/* Modal chỉnh sửa */}
          {isEditModalOpen && selectedDiscount && (
            <dialog id="edit_modal" className="modal" open>
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
                      setIsEditModalOpen(false);
                      setSelectedDiscount(null);
                      setEditDiscountTitle("");
                      setEditDiscountPercent("");
                    }}
                  >
                    ✕
                  </button>
                </form>
                <p className="font-bold text-xl text-center mb-2">
                  Chỉnh sửa khuyến mãi
                </p>
                <div className="mb-6">
                  <label
                    htmlFor="edit_discount_title"
                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    Tên khuyến mãi
                  </label>
                  <input
                    type="text"
                    id="edit_discount_title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={editDiscounTitle}
                    onChange={(e) => setEditDiscountTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="edit_discount_percent"
                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    Phần trăm
                  </label>
                  <input
                    type="text"
                    id="edit_discount_percent"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={editDiscountPercent}
                    onChange={(e) => setEditDiscountPercent(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={updateDiscount}
                    className="btn text-white bg-emerald-500 hover:bg-emerald-700 px-9 focus:ring-emerald-100 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </dialog>
          )}
          {/* Tìm kiếm */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm khuyến mãi..."
              className="bg-gray-100 text-black placeholder-gray-500 border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:ring-blue-200"
              onChange={handleSearch}
              value={searchTerm}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-500"
              size={18}
            />
          </div>
        </div>
        {/* Bảng khuyến mãi */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  Percent
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentDiscounts.map((discount) => (
                <motion.tr
                  key={discount.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-2 whitespace-nowrap font-medium text-rose-950">
                    {discount.id}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap font-medium text-rose-950">
                    {discount.title}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap font-medium text-rose-950">
                    {discount.percent}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap font-medium text-rose-950">
                    <button
                      className="text-indigo-400 hover:text-indigo-300 mr-5"
                      onClick={() => handleEditClick(discount)}
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={() => deleteDiscount(discount.id)}
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
                ? "bg-gray-400 cursor-not-allowed"
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
                ? "bg-gray-400 cursor-not-allowed"
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
export default DiscountsTable;
