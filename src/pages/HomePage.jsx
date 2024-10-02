import React, { useContext } from "react";
import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import CategoryList from "../components/CategoryList/CategoryList";
import { StoreContext } from "../components/Context/StoreContext";
import ProductInHome from "../components/ProductInHome/ProductInHome";

const HomePage = () => {

  const { products } = useContext(StoreContext);

  return (
    <>
      <Header />
      <Title />
      <CategoryList />
      <ProductInHome />
    </>
  );
};

export default HomePage;
