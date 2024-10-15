import React, { useState, useEffect } from "react";
import { Edit, Search, Trash2, Plus } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // Modal thêm
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  // Modal chỉnh sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProductName, setEditProductName] = useState("");
  const [editProductPrice, setEditProductPrice] = useState("");
  const [editProductDescription, setEditProductDescription] = useState("");
  const [editProductImage, setEditProductImage] = useState("");
  // Phân trang
  const PRODUCTS_PER_PAGE = 5;
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  // State để lưu trữ khuyến mãi được chọn cho từng sản phẩm
  const [selectedDiscounts, setSelectedDiscounts] = useState({});
  useEffect(() => {
    fetchProductData();
    fetchCategoryData();
    fetchDiscountData();
  }, []);
  useEffect(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }
    if (filterCategory) {
      filtered = filtered.filter(
        (product) => product.category.id === Number(filterCategory)
      );
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterCategory, products]);

  // Gọi API lấy sản phẩm
  const fetchProductData = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/product/");
      const allProducts = response.data;
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách sản phẩm:", error);
    }
  };

  // Gọi API lấy danh mục
  const fetchCategoryData = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/category/");
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách danh mục sản phẩm:", error);
    }
  };

  // Gọi API lấy khuyến mãi
  const fetchDiscountData = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/discount/");
      setDiscounts(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách khuyến mãi:", error);
    }
  };

  // Gọi API xóa sản phẩm
  const DeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/api/product/${id}`);
      fetchProductData();
      toast.success("Xóa sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi gọi API xóa sản phẩm", error);
      toast.error("Xóa sản phẩm thất bại.");
    }
  };
  // Gọi API thêm sản phẩm
  const addProduct = async (categoryId) => {
    try {
      const response = await axios.post(
        `http://localhost:8082/api/product/add/${categoryId}`,
        {
          name: productName,
          price: productPrice,
          description: productDescription,
          url_image_product: productImage,
        }
      );
      document.getElementById("add_modal").close();
      console.log(response.data);
      setSelectedCategory("");
      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setProductImage("");
      fetchProductData();
      toast.success("Thêm sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi gọi API thêm sản phẩm:", error);
      toast.error("Thêm sản phẩm thất bại.");
    }
  };
  // Gọi API cập nhật sản phẩm
  const updateProduct = async () => {
    try {
      await axios.put(
        `http://localhost:8082/api/product/${selectedProduct.id}`,
        {
          name: editProductName,
          price: editProductPrice,
          description: editProductDescription,
          url_image_product: editProductImage,
        }
      );
      document.getElementById("edit_modal").close();
      setSelectedProduct(null);
      setEditProductName("");
      setEditProductPrice("");
      setEditProductDescription("");
      setEditProductImage("");
      fetchProductData();
      toast.success("Cập nhật sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi gọi API cập nhật sản phẩm:", error);
      toast.error("Cập nhật sản phẩm thất bại.");
    }
  };
  // Hàm xử lý khi người dùng chọn khuyến mãi từ select
  const handleDiscountSelectChange = (productId, discountId) => {
    setSelectedDiscounts((prev) => ({
      ...prev,
      [productId]: discountId === "" ? null : Number(discountId),
    }));
  };
  // Gọi API áp dụng khuyến mãi
  const handleApplyDiscount = async (productId) => {
    const discountId = selectedDiscounts[productId];
    try {
      await axios.put(
        `http://localhost:8082/api/product/applyDiscount/${productId}/${discountId}`
      );
      toast.success("Cập nhật khuyến mãi thành công!");
      // Xóa giá trị đã chọn sau khi áp dụng
      setSelectedDiscounts((prev) => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });
      fetchProductData();
    } catch (error) {
      console.error("Lỗi khi cập nhật khuyến mãi cho sản phẩm:", error);
      toast.error("Cập nhật khuyến mãi thất bại.");
    }
  };

  // Gọi API loại bỏ khuyến mãi
  const handleCancelDiscount = async (productId) => {
    try {
      await axios.put(
        `http://localhost:8082/api/product/removeDiscount/${productId}`
      );
      toast.success("Đã hủy khuyến mãi thành công!");
      fetchProductData();
    } catch (error) {
      console.error("Lỗi khi hủy khuyến mãi cho sản phẩm:", error);
      toast.error("Hủy khuyến mãi thất bại.");
    }
  };
  // Tìm kiếm
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };
  // Chỉnh sửa
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditProductName(product.name);
    setEditProductPrice(product.price);
    setEditProductDescription(product.description);
    setEditProductImage(product.url_image_product);
    setIsEditModalOpen(true);
  };
  return (
    <>
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
          {/* Nút thêm */}
          <button
            className="btn btn-sm px-2"
            onClick={() => document.getElementById("add_modal").showModal()}
          >
            <Plus size={20} />
          </button>
          {/* Modal thêm */}
          <dialog id="add_modal" className="modal">
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
              <p className="font-bold text-xl text-center mb-2">
                Thêm sản phẩm
              </p>
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
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => addProduct(selectedCategory)}
                  className="btn text-white bg-sky-500 hover:bg-sky-700 px-7 focus:ring-sky-100 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Thêm
                </button>
              </div>
            </div>
          </dialog>
          {/* Modal chỉnh sửa */}
          {isEditModalOpen && selectedProduct && (
            <dialog id="edit_modal" className="modal" open>
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
                  <button
                    type="button"
                    className="btn btn-sm font-bold btn-circle btn-ghost absolute right-2 top-0 mt-2 bg-red-400 hover:bg-red-500"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setSelectedProduct(null);
                      setEditProductName("");
                      setEditProductPrice("");
                      setEditProductDescription("");
                      setEditProductImage("");
                    }}
                  >
                    ✕
                  </button>
                </form>
                <p className="font-bold text-xl text-center mb-2">
                  Chỉnh sửa sản phẩm
                </p>
                <div className="mb-6">
                  <label
                    htmlFor="edit_product_name"
                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    Tên sản phẩm
                  </label>
                  <input
                    type="text"
                    id="edit_product_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nhập tên sản phẩm"
                    value={editProductName}
                    onChange={(e) => setEditProductName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="edit_product_price"
                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    Giá
                  </label>
                  <input
                    type="text"
                    id="edit_product_price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={editProductPrice}
                    onChange={(e) => setEditProductPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="edit_product_description"
                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    Mô tả
                  </label>
                  <input
                    type="text"
                    id="edit_product_description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={editProductDescription}
                    onChange={(e) => setEditProductDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="edit_product_image"
                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    Hình ảnh
                  </label>
                  <input
                    type="text"
                    id="edit_product_image"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={editProductImage}
                    onChange={(e) => setEditProductImage(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={updateProduct}
                    className="btn text-white bg-emerald-500 hover:bg-emerald-700 px-9 focus:ring-emerald-100 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </dialog>
          )}
          <div className="flex space-x-4">
            {/* Tìm kiếm */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="bg-gray-100 text-black placeholder-gray-500 border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:ring-blue-200"
                onChange={handleSearch}
                value={searchTerm}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-500"
                size={18}
              />
            </div>
            {/* Lọc theo danh mục */}
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
                  Discount
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
                    {Number(product.price).toLocaleString("vi-VN")}đ
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap font-medium text-rose-950">
                    {/* Luôn hiển thị select, nhưng nút bên cạnh thay đổi */}
                    <div className="flex items-center space-x-2">
                      <select
                        id={`discount-${product.id}`}
                        className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={
                          product.discount
                            ? product.discount.id
                            : selectedDiscounts[product.id] || ""
                        }
                        onChange={
                          product.discount
                            ? null // Không cho phép thay đổi khi đã có khuyến mãi
                            : (e) =>
                                handleDiscountSelectChange(
                                  product.id,
                                  e.target.value
                                )
                        }
                        disabled={!!product.discount} // Vô hiệu hóa select khi đã có khuyến mãi
                      >
                        <option value="">--Chọn khuyến mãi--</option>
                        {discounts.map((discount) => (
                          <option key={discount.id} value={discount.id}>
                            {discount.title}
                          </option>
                        ))}
                      </select>
                      {product.discount ? (
                        <button
                          className="btn px-7 btn-sm bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => handleCancelDiscount(product.id)}
                        >
                          Hủy
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                          onClick={() => handleApplyDiscount(product.id)}
                          disabled={!selectedDiscounts[product.id]} // Vô hiệu hóa nếu chưa chọn khuyến mãi
                        >
                          Áp dụng
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap font-medium text-rose-950">
                    <button
                      className="text-indigo-400 hover:text-indigo-300 mr-5"
                      onClick={() => handleEditClick(product)}
                    >
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
              currentPage === 1
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
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
      <ToastContainer />
    </>
  );
};

export default ProductsTable;
