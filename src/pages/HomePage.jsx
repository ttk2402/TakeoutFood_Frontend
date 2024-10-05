import React, { useContext } from "react";
import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import CategoryList from "../components/CategoryList/CategoryList";
import { StoreContext } from "../components/Context/StoreContext";
import ProductInHome from "../components/ProductInHome/ProductInHome";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Title />
      <CategoryList />
      <ProductInHome />
      <Footer />
    </>
  );
};

export default HomePage;
