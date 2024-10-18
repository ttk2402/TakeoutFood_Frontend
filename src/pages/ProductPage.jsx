import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../components/Context/StoreContext";
import ProductList from "../components/ProductList/ProductList";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const ProductPage = () => {
  const { categories, products } = useContext(StoreContext);
  const [selectedSort, setSelectedSort] = useState("0");
  const [selectedCategory, setSelectedCategory] = useState("0"); // State cho danh mục đã chọn
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortedProducts, setSortedProducts] = useState([...products]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    // Clone sản phẩm để tránh thay đổi trực tiếp
    let filteredArray = [...products];
    // Lọc theo danh mục đã chọn nếu không phải "0" (Tất cả)
    if (selectedCategory !== "0") {
      const categoryId = Number(selectedCategory); // Chuyển đổi sang số
      filteredArray = filteredArray.filter(
        (product) => product.category && product.category.id === categoryId
      );
    }
    // Sắp xếp sản phẩm dựa trên lựa chọn sắp xếp
    switch (selectedSort) {
      case "1":
        filteredArray.sort((a, b) => a.name.localeCompare(b.name)); // Tên A - Z
        break;
      case "2":
        filteredArray.sort((a, b) => b.name.localeCompare(a.name)); // Tên Z - A
        break;
      case "3":
        filteredArray.sort((a, b) => a.price - b.price); // Giá thấp đến cao
        break;
      case "4":
        filteredArray.sort((a, b) => b.price - a.price); // Giá cao đến thấp
        break;
      default:
        break;
    }
    setSortedProducts(filteredArray);
  }, [selectedSort, selectedCategory, products]);
  useEffect(() => {
    // Lọc sản phẩm dựa trên từ khóa tìm kiếm
    if (searchKeyword) {
      const results = sortedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchKeyword, sortedProducts]);
  const handleSelectSort = (event) => {
    setSelectedSort(event.target.value);
  };
  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };
  const handleSelectCategory = (event) => {
    setSelectedCategory(event.target.value); // Cập nhật danh mục đã chọn
  };
  // Xác định danh sách sản phẩm hiển thị: nếu có từ khóa tìm kiếm, hiển thị filteredProducts, ngược lại sortedProducts
  const displayedProducts = searchKeyword ? filteredProducts : sortedProducts;
  return (
    <>
      <Navbar />
      <div className="mt-5 mb-10">
        {/* Lọc sản phẩm */}
        <div className="flex justify-between px-5">
          <div className="flex items-center">
            <p className="mr-2 text-sm font-medium">Danh mục:</p>
            <div className="w-48">
              <select
                id="filterCategory"
                className="w-full text-sm font-semibold bg-gray-50 border rounded border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedCategory}
                onChange={handleSelectCategory}
              >
                <option value="0" className="text-sm font-semibold">
                  --Tất cả--
                </option>
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                      className="text-sm font-semibold"
                    >
                      {category.title}
                    </option>
                  ))
                ) : (
                  <option disabled>Không có danh mục</option>
                )}
              </select>
            </div>
          </div>
          {/* Sắp xếp */}
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
                  --Mặc định--
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
        {/* Hiển thị danh sách sản phẩm */}
        <div>
          <ProductList products={displayedProducts} />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ProductPage;
