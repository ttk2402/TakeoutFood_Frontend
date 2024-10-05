import { motion } from "framer-motion";
import Header from "../../components/admin/common/Header";
import StatCard from "../../components/admin/common/StatCard";
import { DollarSign, ShoppingCart } from "lucide-react";
import SalesOverviewChart from "../../components/admin/sales/SalesOverviewChart";
import SalesByCategoryChart from "../../components/admin/sales/SalesByCategoryChart";
import Sidebar from "../../components/admin/common/Sidebar";

const salesStats = {
  totalRevenue: "$1,234,567",
  averageOrderValue: "$78.90",
  conversionRate: "3.45%",
  salesGrowth: "12.3%",
};

const SalesPage = () => {
  return (
    <div className='flex h-screen text-black overflow-hidden'>
      <Sidebar />
    <div className="bg-gray-100 flex-1 overflow-auto relative z-10 border-r-2 border-b-2 border-gray-200">
      <Header title="Thống kê doanh thu" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* SALES STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Tổng Doanh Thu"
            icon={DollarSign}
            value={salesStats.totalRevenue}
            color="#6366F1"
          />
          <StatCard
            name="Tổng Số Đơn Hàng"
            icon={ShoppingCart}
            value="1024"
            color="#6366F1"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <SalesByCategoryChart />
        </div>
      </main>
    </div>
    </div>
  );
};
export default SalesPage;
