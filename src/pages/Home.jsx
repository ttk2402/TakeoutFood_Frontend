import React, { useContext } from "react";
import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import ProductList from "../components/ProductList/ProductList";
import CategoryList from "../components/CategoryList/CategoryList";
import { StoreContext } from "../components/Context/StoreContext";

const Home = () => {

  const { products } = useContext(StoreContext);

  return (
    <>
      <Header />
      <Title />
      <CategoryList />
      <ProductList products={products}/>
    </>
  );
};

export default Home;
