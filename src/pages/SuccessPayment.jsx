import React from "react";
import { useLocation } from "react-router-dom";
import success from "../assets/success.png";
import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // Lấy tham số từ search

  // Lấy thông tin từ query parameters
  const message = "Thanh toán thành công !";
  const transactionId = queryParams.get("transactionId");
  const amount = queryParams.get("amount");
  const orderInfo = queryParams.get("orderInfo");
  const bankCode = queryParams.get("bankCode");
  const payDate = queryParams.get("payDate");

  const formatDate = (dateString) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const hours = dateString.substring(8, 10);
    const minutes = dateString.substring(10, 12);
    const seconds = dateString.substring(12, 14);
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };
  const formattedPayDate = formatDate(payDate);

  const handleHomeClick = () => {
    navigate("/trang-chu");
  };

  return (
    <div className="flex items-center h-[100vh]">
      <div className="flex flex-col justify-center px-5 items-center w-3/4 bg-white rounded-lg border-2 border-slate-100 mx-auto h-[70vh]">
        <img src={success} alt="Logo" className="w-24 h-24" />
        <h1 className="text-green-600 text-center text-2xl font-bold mt-2">
          {message}
        </h1>
        <table className="w-full border-collapse mt-10 mb-7">
          <tbody>
            <tr>
              <th className="text-left p-2 border-b bg-gray-100">
                Mã Giao Dịch:
              </th>
              <td className="p-2 border-b font-semibold">{transactionId}</td>
            </tr>
            <tr>
              <th className="text-left p-2 border-b bg-gray-100">Số Tiền:</th>
              <td className="p-2 border-b font-semibold">{amount}</td>
            </tr>
            <tr>
              <th className="text-left p-2 border-b bg-gray-100">
                Thông Tin Đơn Hàng:
              </th>
              <td className="p-2 border-b font-semibold">{orderInfo}</td>
            </tr>
            <tr>
              <th className="text-left p-2 border-b bg-gray-100">
                Mã Ngân Hàng:
              </th>
              <td className="p-2 border-b font-semibold">{bankCode}</td>
            </tr>
            <tr>
              <th className="text-left p-2 border-b bg-gray-100">
                Ngày Thanh Toán:
              </th>
              <td className="p-2 border-b font-semibold">{formattedPayDate}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={handleHomeClick}
          className="text-white font-bold bg-slate-500 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
};
export default SuccessPayment;
