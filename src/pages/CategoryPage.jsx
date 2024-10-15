import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../components/Context/StoreContext";
import ProductList from "../components/ProductList/ProductList";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const CategoryPage = () => {
  const { fetchProductDataByCategory, productInCategory } =
    useContext(StoreContext);
  const { categoryID } = useParams();
  const [selectedSort, setSelectedSort] = useState("0");
  const [sortedProducts, setSortedProducts] = useState([...productInCategory]);
  useEffect(() => {
    fetchProductDataByCategory(categoryID);
    console.log(productInCategory);
  }, [categoryID]);
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
    <>
      <Navbar />
      <div className="mb-10">
        {/* sắp xếp */}
        <div className="flex justify-between items-center px-5">
          <div>
            {productInCategory.length > 0 ? (
              <p className="font-medium">
                Danh mục:{" "}
                <span className="font-bold">
                  {productInCategory[0].category.title}
                </span>
              </p>
            ) : (
              <p></p>
            )}
          </div>

          <div className="flex items-center">
            <p className="mr-2 text-sm font-medium">Sắp xếp:</p>
            <div className="w-48">
              <select
                id="sortProduct"
                className="w-full text-sm font-semibold bg-gray-50 border rounded border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedSort}
                onChange={handleSelectSort}
              >
                <option value="0" className="text-sm font-semibold">
                  Mặc định
                </option>
                <option value="1" className="text-sm font-semibold">
                  Tên sản phẩm (A - Z)
                </option>
                <option value="2" className="text-sm font-semibold">
                  Tên sản phẩm (Z - A)
                </option>
                <option value="3" className="text-sm font-semibold">
                  Giá (thấp đến cao)
                </option>
                <option value="4" className="text-sm font-semibold">
                  Giá (cao đến thấp)
                </option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <ProductList products={sortedProducts} />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default CategoryPage;
