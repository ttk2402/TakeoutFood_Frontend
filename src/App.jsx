import { React } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Product from "./components/Product/Product";
import ProductList from "./components/ProductList/ProductList";
import Category from "./components/Category/Category";
import CategoryList from "./components/CategoryList/CategoryList";
import Login from "./components/Login/Login";
import Registry from "./components/Registry/Registry";
import Item from "./components/Item/Item";
import ItemList from "./components/ItemList/ItemList";
import Cart from "./components/Cart/Cart";
import ReceiveInfo from "./components/InfoReceive/ReceiveInfo";
import Title from "./components/Title/Title";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <div className="w-4/5 mx-auto">
      <HomePage />
      <ProductDetailPage />
    </div>
  );
}

export default App;
