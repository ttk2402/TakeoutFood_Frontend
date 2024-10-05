import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const ProductDetailPage = () => {
  const { productID } = useParams(); // Get the category ID from the URL
  const [product, setProduct] = useState("");

  useEffect(() => {
    const fetchProductDetail = async (productID) => {
      try {
        const response = await axios.get(
          `http://localhost:9091/api/product/${productID}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProductDetail(productID);
  }, []);

  return (
    <>
      <Navbar />
      <ProductDetail
        id={product.id}
        name={product.name}
        price={product.price}
        description={product.description}
        url_image_product={product.url_image_product}
      />
      <Footer />
    </>
  );
};

export default ProductDetailPage;
