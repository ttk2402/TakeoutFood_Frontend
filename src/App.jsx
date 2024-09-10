import { React } from "react";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Product from "./components/Product/Product";
import ProductList from "./components/ProductList/ProductList";
import Category from "./components/Category/Category";
import CategoryList from "./components/CategoryList/CategoryList";
import Login from "./components/Login/Login";
import Registry from "./components/Registry/Registry";

function App() {
  return (
    <div className="w-4/5 mx-auto">
      <Registry />
      <Login />
      {/* <Navbar />
      <Footer />

      <CategoryList />
      <ProductList /> */}

      {/* <Category /> */}
      <Footer />
    </div>
  );
}

export default App;
