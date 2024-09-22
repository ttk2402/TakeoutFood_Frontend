import { React, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Login from "./components/Login/Login";
import CategoryList from "./components/CategoryList/CategoryList";
import Registry from "./components/Registry/Registry";
import Cart from "./pages/Cart";
import ProductCategory from "./pages/ProductCategory";
import ProductAll from "./pages/ProductAll";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ProductDetailPage from "./pages/ProductDetailPage";
import AccountDetail from "./components/AccountDetail/AccountDetail";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trang-chu" element={<Home />} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/dang-ky" element={<Registry />} />
        <Route path="/danh-muc/:categoryID" element={<ProductCategory />} />
        <Route path="/san-pham/:productID" element={<ProductDetailPage />} />
        <Route path="/gio-hang" element={<Cart />} />
        <Route path="/san-pham" element={<ProductAll />} />
        <Route path="/tai-khoan/:accountID" element={<AccountDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
