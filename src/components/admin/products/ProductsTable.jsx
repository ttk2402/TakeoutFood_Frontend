import React, { useState, useEffect } from "react";
import { Edit, Search, Trash2, Plus } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState(""); // Danh mục được chọn để lọc
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 5;

  // Hàm xử lý tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Hàm lấy dữ liệu sản phẩm
  const fetchProductData = async () => {
    try {
      const response = await axios.get("http://localhost:9091/api/product/");
      const allProducts = response.data;
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách sản phẩm:", error);
    }
  };

  // Hàm lấy dữ liệu danh mục
  const fetchCategoryData = async () => {
    try {
      const response = await axios.get("http://localhost:9091/api/category/");
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách danh mục sản phẩm:", error);
    }
  };

  // Hàm xóa sản phẩm
  const DeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:9091/api/product/${id}`);
      fetchProductData();
    } catch (error) {
      console.error("Lỗi khi gọi API lấy xóa sản phẩm", error);
    }
  };

  // Hàm thêm sản phẩm
  const addProduct = async (categoryId) => {
    try {
      const response = await axios.post(
        `http://localhost:9091/api/product/add/${categoryId}`,
        {
          name: productName,
          price: productPrice,
          description: productDescription,
          url_image_product: productImage,
        }
      );
      document.getElementById("my_modal_3").close();
      console.log(response.data);
      fetchProductData();
      setSelectedCategory("");
      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setProductImage("");
    } catch (error) {
      console.error("Lỗi khi gọi API thêm sản phẩm:", error);
    }
  };

  // State cho modal thêm sản phẩm
  const [selectedCategory, setSelectedCategory] = useState(""); // Danh mục được chọn trong modal
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");

  // useEffect để lấy dữ liệu sản phẩm và danh mục khi component mount
  useEffect(() => {
    fetchProductData();
    fetchCategoryData();
  }, []);

  // useEffect để lọc sản phẩm khi searchTerm hoặc filterCategory thay đổi
  useEffect(() => {
    let filtered = products;

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }

    // Lọc theo danh mục
    if (filterCategory) {
      filtered = filtered.filter(product => product.category.id === Number(filterCategory));
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset về trang đầu khi lọc
  }, [searchTerm, filterCategory, products]);

  // Tính toán sản phẩm hiển thị dựa trên trang hiện tại
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Tính số trang
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  return (
    <motion.div
      className="bg-white backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-fuchsia-900">
          Danh sách sản phẩm
        </h2>

        {/* Thêm sản phẩm */}
        <button
          className="btn btn-sm px-2"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          <Plus size={20} />
        </button>
        <dialog id="my_modal_3" className="modal">
          <div
            className="modal-box"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "450px",
            }}
          >
            <form method="dialog">
              <button className="btn btn-sm font-bold btn-circle btn-ghost absolute right-2 top-0 mt-2 bg-red-400 hover:bg-red-500">
                ✕
              </button>
            </form>
            <p className="font-bold text-xl text-center mb-2">Thêm sản phẩm</p>

            {/* Chọn danh mục */}
            <div className="mb-6">
              <label
                htmlFor="product_category"
                className="block mb-2 font-medium text-gray-900 dark:text-white"
              >
                Chọn danh mục
              </label>
              <select
                id="product_category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                <option value="" disabled>
                  -- Chọn danh mục --
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Nhập tên sản phẩm */}
            <div className="mb-6">
              <label
                htmlFor="product_name"
                className="block mb-2 font-medium text-gray-900 dark:text-white"
              >
                Tên sản phẩm
              </label>
              <input
                type="text"
                id="product_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            {/* Nhập giá sản phẩm */}
            <div className="mb-6">
              <label
                htmlFor="product_price"
                className="block mb-2 font-medium text-gray-900 dark:text-white"
              >
                Giá
              </label>
              <input
                type="text"
                id="product_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
              />
            </div>

            {/* Nhập mô tả sản phẩm */}
            <div className="mb-6">
              <label
                htmlFor="product_description"
                className="block mb-2 font-medium text-gray-900 dark:text-white"
              >
                Mô tả
              </label>
              <input
                type="text"
                id="product_description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                required
              />
            </div>

            {/* Nhập hình ảnh sản phẩm */}
            <div className="mb-6">
              <label
                htmlFor="product_image"
                className="block mb-2 font-medium text-gray-900 dark:text-white"
              >
                Hình ảnh
              </label>
              <input
                type="text"
                id="product_image"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                value={productImage}
                onChange={(e) => setProductImage(e.target.value)}
                required
              />
            </div>

            {/* Nút thêm sản phẩm */}
            <div className="flex justify-center">
              <button
                onClick={() => addProduct(selectedCategory)}
                className="btn text-white bg-sky-500 hover:bg-sky-700 px-7 focus:ring-sky-100 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Thêm
              </button>
            </div>
          </div>
        </dialog>

        {/* Ô tìm kiếm và Select lọc danh mục */}
        <div className="flex space-x-4">
          {/* Ô tìm kiếm */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="bg-gray-100 text-black placeholder-gray-500 border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:ring-blue-200"
              onChange={handleSearch}
              value={searchTerm}
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          </div>

          {/* Select lọc danh mục */}
          <div className="relative">
            <select
              id="filter_category"
              className="w-44 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">--Tất cả danh mục--</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bảng sản phẩm */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                Category Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {currentProducts.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-2 whitespace-nowrap font-medium text-rose-950">
                  {product.id}
                </td>
                <td className="px-6 py-2 whitespace-nowrap font-medium text-rose-950">
                  <img
                    src={product.url_image_product}
                    alt="Product Image"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-2 whitespace-nowrap font-medium text-rose-950">
                  {product.name}
                </td>
                <td className="px-6 py-2 whitespace-nowrap font-medium text-rose-950">
                  {Number(product.price).toLocaleString("vi-VN")} đ
                </td>
                <td className="px-6 py-2 whitespace-nowrap font-medium text-rose-950">
                  {product.category.title}
                </td>
                <td className="px-6 py-2 whitespace-nowrap font-medium text-rose-950">
                  <button className="text-indigo-400 hover:text-indigo-300 mr-5">
                    <Edit size={20} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => DeleteProduct(product.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex justify-between mt-4">
        <button
          className={`px-7 py-2 text-white ${
            currentPage === 1 ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } rounded`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Trước
        </button>
        <span className="text-black">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          className={`px-4 py-2 text-white ${
            currentPage === totalPages
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          } rounded`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Tiếp theo
        </button>
      </div>
    </motion.div>
  );
};

export default ProductsTable;
