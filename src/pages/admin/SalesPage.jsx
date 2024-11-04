import Header from "../../components/admin/common/Header";
import Sidebar from "../../components/admin/common/Sidebar";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import RevenueChart from "../../components/admin/revenue/RevenueChart";
import RevenueMonthChart from "../../components/admin/revenue/RevenueMonthChart";
import RevenueYearChart from "../../components/admin/revenue/RevenueYearChart";
import { useEffect } from "react";

const SalesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Điều hướng mặc định đến "ngay" khi trang được tải
  useEffect(() => {
    if (location.pathname === "/quan-tri/doanh-thu") {
      navigate("ngay");
    }
  }, [location, navigate]);

  return (
    <div className="flex h-screen text-black overflow-hidden">
      <Sidebar />
      <div className="bg-gray-100 flex-1 overflow-auto relative z-10 border-r-2 border-b-2 border-gray-200">
        <Header title="Thống kê doanh thu" />
        <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
          <div className="flex justify-center mb-4">
            <button
              onClick={() => navigate("ngay")}
              className={`relative mx-2 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group ${
                location.pathname.endsWith("/ngay") ? "text-gray-700 bg-gradient-to-br from-green-400 to-blue-400" : "text-gray-900 bg-gradient-to-br from-green-200 to-blue-200"
              } hover:bg-blue-400 focus:ring-2 focus:outline-none focus:ring-green-100`}
            >
              <span className="relative px-2 py-1.5 transition-all ease-in duration-75 rounded-md">
                Thống kê theo ngày
              </span>
            </button>
            <button
              onClick={() => navigate("thang")}
              className={`relative mx-2 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group ${
                location.pathname.endsWith("/thang") ? "text-gray-700 bg-gradient-to-br from-green-400 to-blue-400" : "text-gray-900 bg-gradient-to-br from-green-200 to-blue-200"
              } hover:bg-blue-400 focus:ring-2 focus:outline-none focus:ring-green-100`}
            >
              <span className="relative px-2 py-1.5 transition-all ease-in duration-75 rounded-md">
                Thống kê theo tháng
              </span>
            </button>
            <button
              onClick={() => navigate("nam")}
              className={`relative mx-2 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group ${
                location.pathname.endsWith("/nam") ? "text-gray-700 bg-gradient-to-br from-green-400 to-blue-400" : "text-gray-900 bg-gradient-to-br from-green-200 to-blue-200"
              } hover:bg-blue-400 focus:ring-2 focus:outline-none focus:ring-green-100`}
            >
              <span className="relative px-2 py-1.5 transition-all ease-in duration-75 rounded-md">
                Thống kê theo năm
              </span>
            </button>
          </div>
          <div className="flex flex-col">
            <Routes>
              {/* Định nghĩa các route con */}
              <Route path="ngay" element={<RevenueChart />} />
              <Route path="thang" element={<RevenueMonthChart />} />
              <Route path="nam" element={<RevenueYearChart />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SalesPage;
