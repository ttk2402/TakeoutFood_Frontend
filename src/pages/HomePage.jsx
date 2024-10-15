import React from "react";
import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import CategoryList from "../components/CategoryList/CategoryList";
import ProductInHome from "../components/ProductInHome/ProductInHome";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ProductDiscount from "../components/ProductDiscount/ProductDiscount";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Title />
      <CategoryList />
      <ProductDiscount />
      <ProductInHome />
      <Footer />
    </>
  );
};
export default HomePage;
