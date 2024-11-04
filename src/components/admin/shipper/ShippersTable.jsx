import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Edit, Trash2, Search } from "lucide-react";

const ShipperrsTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [shippers, setShippers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số lượng shipper trên mỗi trang
  const [searchTerm, setSearchTerm] = useState(""); // Tạo state cho giá trị tìm kiếm

  useEffect(() => {
    fetchShipperData();
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/account/role/4"
      );
      setAccounts(response.data);
    } catch (error) {
      console.error(
        "Lỗi khi gọi API lấy danh sách tài khoản có role SHIPPER:",
        error
      );
    }
  };

  const fetchShipperData = async () => {
    try {
      const response = await axios.get("http://localhost:8086/api/shipper/");
      setShippers(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách shipper:", error);
    }
  };

  const getAccountNameById = (accountId) => {
    const account = accounts.find((acc) => acc.id === accountId);
    return account ? `${account.firstname} ${account.lastname}` : "";
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Đặt lại trang về 1 khi tìm kiếm
  };

  // Lọc danh sách shipper theo searchTerm
  const filteredShippers = shippers.filter((shipper) =>
    shipper.id.toString().includes(searchTerm)
  );

  // Tính toán các chỉ số phân trang
  const indexOfLastShipper = currentPage * itemsPerPage;
  const indexOfFirstShipper = indexOfLastShipper - itemsPerPage;
  const currentShippers = filteredShippers.slice(
    indexOfFirstShipper,
    indexOfLastShipper
  );

  const totalPages = Math.ceil(filteredShippers.length / itemsPerPage);

  // Modal chỉnh sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedShipper, setSelectedShipper] = useState(null);
  const handleEditClick = (shipper) => {
    setSelectedShipper(shipper);
    setIsEditModalOpen(true);
  };

  const updateIncome = async (shipperId) => {
    try {
      const income = 0;
      await axios.put(
        `http://localhost:8086/api/shipper/resetIncome/${shipperId}`,
        {
          amount: income,
        }
      );
      fetchShipperData();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi gọi API để cập nhật 0Đ thu nhập:", error);
    }
  };

  return (
    <>
      <motion.div
        className="bg-white backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-fuchsia-900">
            Danh sách shipper
          </h2>

          {/* Tìm kiếm */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm shipper..."
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

        {/* Modal chỉnh sửa */}
        {isEditModalOpen && selectedShipper && (
          <dialog id="edit_modal" className="modal" open>
            <div
              className="modal-box"
              style={{
                position: "fixed",
                top: "60%",
                left: "40%",
                transform: "translate(-50%, -50%)",
                width: "375px",
              }}
            >
              <form method="dialog">
                <button
                  type="button"
                  className="btn btn-sm font-bold btn-circle btn-ghost absolute right-2 top-0 mt-2 bg-red-400 hover:bg-red-500"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedShipper(null);
                  }}
                >
                  ✕
                </button>
              </form>
              <p className="font-bold text-xl text-center mb-2">
                Thông tin chuyển khoản
              </p>
              <div className="flex justify-center space-x-2 mt-5 mb-2.5">
                <div>
                  <p className="font-medium">Ngân hàng:</p>
                  <p className="font-medium">Số tài khoản:</p>
                  <p className="font-medium">Tên chủ thẻ:</p>
                </div>
                <div>
                  <p className="text-center font-medium">
                    {selectedShipper.payment && selectedShipper.payment.bankName
                      ? selectedShipper.payment.bankName
                      : "____"}
                  </p>
                  <p className="font-medium">
                    {selectedShipper.payment &&
                    selectedShipper.payment.numberCard
                      ? selectedShipper.payment.numberCard
                      : "____"}
                  </p>
                  <p className="text-center font-medium">
                    {selectedShipper.payment &&
                    selectedShipper.payment.cardHolderName
                      ? selectedShipper.payment.cardHolderName
                      : "____"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-center font-light mb-3.5">
                Vui lòng nhấn hoàn tất khi chuyển khoản thành công.
              </p>

              <div className="flex justify-center space-x-10">
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedShipper(null);
                  }}
                  className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-300 to-blue-500 group-hover:from-green-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-100 dark:focus:ring-green-600"
                >
                  <span className="relative px-7 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Hủy
                  </span>
                </button>
                <button
                  onClick={() => updateIncome(selectedShipper.id)}
                  className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-300 to-blue-500 group-hover:from-green-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-100 dark:focus:ring-green-600"
                >
                  <span className="relative px-4 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Hoàn tất
                  </span>
                </button>
              </div>
            </div>
          </dialog>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider text-center">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider text-center">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider text-center">
                  Credential ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider text-center">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider text-center">
                  Income
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentShippers.map((shipper) => (
                <motion.tr
                  key={shipper.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-4 py-2 whitespace-nowrap font-medium text-rose-950">
                    {shipper.id}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap font-medium text-rose-950 text-center">
                    {getAccountNameById(shipper.accountId)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-center">
                    {shipper.credentialCode || "_"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-center">
                    {shipper.phoneNumber || "_"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-center">
                    {shipper.amount.toLocaleString("vi-VN")} VNĐ
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap font-medium text-rose-950 text-center">
                    <button
                      onClick={() => handleEditClick(shipper)}
                      className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-300 to-blue-500 group-hover:from-green-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-green-100 dark:focus:ring-green-600"
                    >
                      <span className="relative px-4 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Chuyển khoản
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
    </>
  );
};

export default ShipperrsTable;
