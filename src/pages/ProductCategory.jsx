import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../components/Context/StoreContext";
import ProductList from "../components/ProductList/ProductList";

const ProductCategory = () => {
  const { account, fetchProductDataByCategory, productInCategory } = useContext(StoreContext);
  const { categoryID } = useParams(); // Get the category ID from the URL
  const [selectedSort, setSelectedSort] = useState("0");
  const [sortedProducts, setSortedProducts] = useState([...productInCategory]);

  useEffect(() => {
    fetchProductDataByCategory(categoryID); // Gọi API với id của category
  }, [categoryID]); // Chạy lại mỗi khi id thay đổi

  useEffect(() => {
    let sortedArray = [...productInCategory];
    switch (selectedSort) {
      case "1":
        sortedArray.sort((a, b) => a.name.localeCompare(b.name)); // Sort A - Z
        break;
      case "2":
        sortedArray.sort((a, b) => b.name.localeCompare(a.name)); // Sort Z - A
        break;
      case "3":
        sortedArray.sort((a, b) => a.price - b.price); // Sort by price (low to high)
        break;
      case "4":
        sortedArray.sort((a, b) => b.price - a.price); // Sort by price (high to low)
        break;
      default:
        sortedArray = [...productInCategory]; // Default sorting
    }
    setSortedProducts(sortedArray);
  }, [selectedSort, productInCategory]);

  const handleSelectSort = (event) => {
    setSelectedSort(event.target.value);
  };

  return (
    <div className="mb-10">
      <div className="max-w-48 mx-auto">
        <select
          id="ortProduct"
          className="bg-gray-50 border rounded border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={selectedSort}
          onChange={handleSelectSort}
        >
          <option value="0">Mặc định</option>
          <option value="1">Tên sản phẩm (A - Z)</option>
          <option value="2">Tên sản phẩm (Z - A)</option>
          <option value="3">Giá (thấp đến cao)</option>
          <option value="4">Giá (cao đến thấp)</option>
        </select>
      </div>
      <div>
        <ProductList products={sortedProducts} />
      </div>
    </div>
  );
};

export default ProductCategory;
