import React from "react";
import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ProductList from '../components/ProductList/ProductList'
import CategoryList from "../components/CategoryList/CategoryList";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Title />
      <CategoryList />
      <ProductList />
      <Footer />
    </>
  );
};

export default Home;
