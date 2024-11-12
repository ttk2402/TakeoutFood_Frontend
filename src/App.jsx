import { React } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import LoginPage from "./pages/LoginPage";
import RegistryPage from "./pages/RegistryPage";
import AccountDetailPage from "./pages/AccountDetailPage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import DiscountsPage from "./pages/admin/DiscountsPage";
import ProductsPage from "./pages/admin/ProductsPage";
import AccountsPage from "./pages/admin/AccountsPage";
import SalesPage from "./pages/admin/SalesPage";
import OrdersPage from "./pages/admin/OrdersPage";
import SettingsPage from "./pages/admin/SettingsPage";
import SuccessPayment from "./pages/SuccessPayment";
import FailurePayment from "./pages/FailurePayment";
import ReceiveOrderPage from "./pages/shipper/ReceiveOrdersPage"
import ProfilePage from "./pages/shipper/ProfilePage";
import CurrentOrdersPage from "./pages/shipper/CurrentOrdersPage";
import CompleteOrdersPage from "./pages/shipper/CompleteOrdersPage";
import ShippersPage from "./pages/admin/ShippersPages";
import DeliveryPage from "./pages/admin/DeliveryPage";

function App() {
  return (
    <>
      <Routes>
        {/* Người dùng */}
        <Route path="/" element={<HomePage />} />
        <Route path="/trang-chu" element={<HomePage />} />
        <Route path="/gio-hang" element={<CartPage />} />
        <Route path="/san-pham" element={<ProductPage />} />
        <Route path="/danh-muc/:categoryID" element={<CategoryPage />} />
        <Route path="/san-pham/:productID" element={<ProductDetailPage />} />
        <Route path="/don-hang" element={<OrderPage />} />
        <Route path="/dang-nhap" element={<LoginPage />} />
        <Route path="/dang-ky" element={<RegistryPage />} />
        <Route path="/tai-khoan/:accountID" element={<AccountDetailPage />} />
        <Route path="/thanh-toan-thanh-cong/*" element={<SuccessPayment />} />
        <Route path="/thanh-toan-that-bai/*" element={<FailurePayment />} />
        {/* Người quản trị */}
        <Route path="/quan-tri/danh-muc" element={<CategoriesPage />} />
        <Route path="/quan-tri/khuyen-mai" element={<DiscountsPage />} />
        <Route path="/quan-tri/san-pham" element={<ProductsPage />} />
        <Route path="/quan-tri/tai-khoan" element={<AccountsPage />} />
        <Route path="/quan-tri/don-hang" element={<OrdersPage />} />
        <Route path="/quan-tri/shipper" element={<ShippersPage />} />
        <Route path="/quan-tri/giao-hang" element={<DeliveryPage />} />
        <Route path="/quan-tri/doanh-thu/*" element={<SalesPage />} />
        <Route path="/quan-tri/cai-dat" element={<SettingsPage />} />
        {/* Người quản trị */}
        <Route path="/giao-hang/nhan-don-hang" element={<ReceiveOrderPage />} />
        <Route path="/giao-hang/don-hang-hien-tai" element={<CurrentOrdersPage />} />
        <Route path="/giao-hang/lich-su-giao-hang" element={<CompleteOrdersPage />} />
        <Route path="/giao-hang/thong-tin-ca-nhan" element={<ProfilePage />} />
      </Routes>
    </>
  );
}
export default App;
