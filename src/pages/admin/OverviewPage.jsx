import {
  BarChart2,
  ShoppingBag,
  Users,
  Zap,
  ShoppingCart,
  Package,
  UserCheck,
  UserPlus,
  UsersIcon,
  UserX,
} from "lucide-react";
import { motion } from "framer-motion";

import Header from "../../components/admin/common/Header";
import StatCard from "../../components/admin/common/StatCard";
import SalesOverviewChart from "../../components/admin/overview/SalesOverviewChart";
import CategoryDistributionChart from "../../components/admin/overview/CategoryDistributionChart";

const OverviewPage = () => {
  return (
    <div className="bg-gray-100 flex-1 overflow-auto relative z-10 border-r-2 border-b-2 border-gray-200">
      <Header title="Tổng quan" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Tổng Doanh Thu"
            icon={BarChart2}
            value="$12,345"
            color="#10B981"
          />
          <StatCard
            name="Tổng Số Khách Hàng"
            icon={Users}
            value="1,234"
            color="#8B5CF6"
          />
          <StatCard
            name="Tổng Số Sản Phẩm"
            icon={Package}
            value={100}
            color="#6366F1"
          />
          <StatCard
            name="Tổng Số Danh Mục"
            icon={ShoppingBag}
            value={5}
            color="#6366F1"
          />
          {/* <StatCard
            name="Tổng Số Đơn Hàng"
            icon={ShoppingCart}
            value="1024"
            color="#6366F1"
          />
          <StatCard
            name="Tổng Số Tài Khoản"
            icon={UsersIcon}
            value='10000'
            color="#6366F1"
          />
          <StatCard
            name="Tài Khoản Kích Hoạt"
            icon={UserCheck}
            value='100'
            color="#F59E0B"
          />
          <StatCard
            name="Tài Khoản Bị Khóa"
            icon={UserX}
            value='5'
            color="#EF4444"
          /> */}
        </motion.div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <CategoryDistributionChart />
        </div>
      </main>
    </div>
  );
};
export default OverviewPage;
