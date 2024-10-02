import { React, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/HomePage";
import Login from "./components/Login/Login";
import Registry from "./components/Registry/Registry";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import AccountDetail from "./components/AccountDetail/AccountDetail";
import Order from "./components/Order/Order";
import Test from "./pages/Test/Test";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <>
      {/* <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trang-chu" element={<Home />} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/dang-ky" element={<Registry />} />
        <Route path="/danh-muc/:categoryID" element={<CategoryPage />} />
        <Route path="/san-pham/:productID" element={<ProductDetailPage />} />
        <Route path="/gio-hang" element={<Cart />} />
        <Route path="/san-pham" element={<ProductPage />} />
        <Route path="/tai-khoan/:accountID" element={<AccountDetail />} />
        <Route path="/don-hang" element={<Order />} />
      </Routes>
      <Footer /> */}
      
      <Test />
    </>
  );
}

export default App;
