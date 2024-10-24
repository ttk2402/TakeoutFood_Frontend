import {
  Menu,
  Settings,
  ShoppingCart,
  Package,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import profile_user from "../../../assets/profile-user.png";

const SIDEBAR_ITEMS = [
  {
    name: "Nhận đơn hàng",
    icon: Package,
    color: "#10B981",
    href: "/giao-hang/nhan-don-hang",
  },
  {
    name: "Đơn hàng hiện tại",
    icon: ShoppingCart,
    color: "#8B5CF6",
    href: "/giao-hang/don-hang-hien-tai",
  },
  {
    name: "Lịch sử giao hàng",
    icon: ShoppingBag,
    color: "#F59E0B",
    href: "/giao-hang/lich-su-giao-hang",
  },
  {
    name: "Thông tin cá nhân",
    icon: Settings,
    color: "#EC4899",
    href: "/giao-hang/thong-tin-ca-nhan",
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isLogin, account, shipper, handleLogout } = useContext(StoreContext);

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
          <div
            onClick={handleLogout}
            className="flex items-center p-4 font-bold text-black rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
          >
            <LogOut
              size={24}
              style={{ color: "#6366f1", minWidth: "24px" }}
              className=""
            />
            <p className="ml-4">Đăng xuất</p>
          </div>
        </nav>
        {isLogin && (
          <>
            <div className="flex flex-col items-center">
              <img src={profile_user} alt="" className="" />
              <p className="font-bold text-lg text-center text-cyan-600 mt-2">
                {account ? account.username : ""}
              </p>
            </div>
            <div className="mt-5">
              <p className="font-bold text-xl text-center text-rose-700">
                {shipper ? shipper.amount.toLocaleString("vi-VN") : "0"} VNĐ
              </p>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};
export default Sidebar;
