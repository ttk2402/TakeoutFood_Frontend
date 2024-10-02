import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../components/Context/StoreContext";
import ProductList from "../components/ProductList/ProductList";

const ProductPage = () => {
  const { products } = useContext(StoreContext);
  const [selectedSort, setSelectedSort] = useState("0");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortedProducts, setSortedProducts] = useState([...products]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Sort products based on selected sort option
    let sortedArray = [...products];

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
        sortedArray = [...products]; // Default sorting
    }

    setSortedProducts(sortedArray);
  }, [selectedSort, products]);

  useEffect(() => {
    // Filter products based on search keyword
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

  return (
    <div className="mb-10">
      {/* Input search for products */}
      <div className="w-96 mx-auto mb-4">
        <div className="flex items-center space-x-2 w-full">
          <input
            type="text"
            placeholder="Nhập tên sản phẩm..."
            className="w-72 p-2 text-sm font-medium bg-gray-50 border rounded border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={searchKeyword}
            onChange={handleSearch}
          />
          <button className="py-2 px-3.5 border-2 border-l-0 rounded text-sm font-semibold bg-sky-400 text-white rounded-r hover:bg-sky-500">
            Tìm kiếm
          </button>
        </div>

        {/* Dropdown for displaying filtered products */}
        {filteredProducts.length > 0 && (
          <div className="absolute bg-white border rounded mt-1 w-72 shadow-lg z-10">
            {filteredProducts.map((product, index) => (
              <div key={index} className="p-2 hover:bg-gray-200 cursor-pointer">
                <div className="flex justify-start px-5 items-center">
                  <img
                    src={product.url_image_product}
                    alt=""
                    className="w-10 h-10"
                  />
                  <a
                    href={`/san-pham/${product.id}`}
                    className="px-5 font-bold text-cyan-700"
                  >
                    {product.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Select for sorting products */}
      <div className="flex justify-end items-center">
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

      {/* Display the sorted products list */}
      <div>
        <ProductList products={sortedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;
