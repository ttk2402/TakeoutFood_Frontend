import {
  BarChart2,
  DollarSign,
  Menu,
  Settings,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
  Package,
  Truck,
  Percent,
  Tag,
} from "lucide-react";
import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import profile_user from "../../../assets/profile-user.png";

const SIDEBAR_ITEMS = [
  // {
  //   name: "Tổng quan",
  //   icon: BarChart2,
  //   color: "#6366f1",
  //   href: "/quan-tri/",
  // },
  {
    name: "Thống kê doanh thu",
    icon: DollarSign,
    color: "#10B981",
    href: "/quan-tri/doanh-thu",
  },
  {
    name: "Quản lý danh mục",
    icon: ShoppingBag,
    color: "#1E88E5",
    href: "/quan-tri/danh-muc",
  },
  {
    name: "Quản lý khuyến mãi",
    icon: Tag,
    color: "#616161",
    href: "/quan-tri/khuyen-mai",
  },
  {
    name: "Quản lý sản phẩm",
    icon: Package,
    color: "#8E24AA",
    href: "/quan-tri/san-pham",
  },
  {
    name: "Quản lý đơn hàng",
    icon: ShoppingCart,
    color: "#FB8C00",
    href: "/quan-tri/don-hang",
  },
  {
    name: "Quản lý tài khoản",
    icon: Users,
    color: "#EC4899",
    href: "/quan-tri/tai-khoan",
  },
  {
    name: "Quản lý shipper",
    icon: Users,
    color: "#43A047",
    href: "/quan-tri/shipper",
  },
  {
    name: "Quản lý giao hàng",
    icon: Truck,
    color: "#F44336",
    href: "/quan-tri/giao-hang",
  },
  {
    name: "Cài đặt",
    icon: Settings,
    color: "#6D4C41",
    href: "/quan-tri/cai-dat",
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isLogin, account } = useContext(StoreContext);
  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-white backdrop-blur-md p-4 flex flex-col border-2 border-gray-200">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-300 transition-colors max-w-fit"
        >
          <Menu size={25} style={{ color: "black" }} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 font-bold text-black rounded-lg hover:bg-gray-300 transition-colors">
                <item.icon
                  size={24}
                  style={{ color: item.color, minWidth: "24px" }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
        {isLogin && (
          <div className="flex flex-col items-center">
            <img src={profile_user} alt="" className="" />
            <p className="font-bold text-center text-cyan-600 mt-2">
              {account.username}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
export default Sidebar;
