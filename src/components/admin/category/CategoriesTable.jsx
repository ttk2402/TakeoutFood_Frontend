import React, { useState, useEffect } from "react";
import { Edit, Search, Trash2, Plus } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  // States for Editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryImage, setEditCategoryImage] = useState("");

  const PRODUCTS_PER_PAGE = 5;

  // Handle Search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  // Fetch Categories on Mount
  useEffect(() => {
    fetchCategoryData();
  }, []);

  // Fetch Categories Function
  const fetchCategoryData = async () => {
    try {
      const response = await axios.get("http://localhost:9091/api/category/");
      const allCategories = response.data;
      setCategories(allCategories);
      setFilteredCategories(allCategories);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách danh mục sản phẩm:", error);
    }
  };

  // Delete Category Function
  const DeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:9091/api/category/${id}`);
      fetchCategoryData();
    } catch (error) {
      console.error("Lỗi khi gọi API xóa danh mục sản phẩm:", error);
    }
  };

  // Add Category Function
  const addCategory = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9091/api/category/add",
        {
          title: categoryName,
          url_image_category: categoryImage,
        }
      );
      document.getElementById("add_modal").close();
      console.log(response.data);
      setCategoryName("");
      setCategoryImage("");
      fetchCategoryData();
    } catch (error) {
      console.error("Lỗi khi gọi API thêm danh mục:", error);
    }
  };

  // Handle Update Category
  const updateCategory = async () => {
    try {
      await axios.put(
        `http://localhost:9091/api/category/${selectedCategory.id}`,
        {
          title: editCategoryName,
          url_image_category: editCategoryImage,
        }
      );
      document.getElementById("edit_modal").close();
      setSelectedCategory(null);
      setEditCategoryName("");
      setEditCategoryImage("");
      fetchCategoryData();
    } catch (error) {
      console.error("Lỗi khi gọi API cập nhật danh mục:", error);
    }
  };

  // Handle Edit Button Click
  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setEditCategoryName(category.title);
    setEditCategoryImage(category.url_image_category);
    setIsEditModalOpen(true);
  };

  // Filtering Categories based on Search Term
  useEffect(() => {
    let filtered = categories;

    if (searchTerm) {
      filtered = filtered.filter((category) =>
        category.title.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredCategories(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, categories]);

  // Pagination Calculations
  const indexOfLastCategory = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstCategory = indexOfLastCategory - PRODUCTS_PER_PAGE;
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const totalPages = Math.ceil(filteredCategories.length / PRODUCTS_PER_PAGE);

  return (
    <motion.div
      className="bg-white backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-fuchsia-900">
          Danh sách danh mục
        </h2>

        {/* Add Category Button */}
        <button
          className="btn btn-sm px-2"
          onClick={() => document.getElementById("add_modal").showModal()}
        >
          <Plus size={20} />
        </button>

        {/* Add Category Modal */}
        <dialog id="add_modal" className="modal">
          <div
            className="modal-box"
            style={{
              position: "fixed",
              top: "40%",
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
            <p className="font-bold text-xl text-center mb-2">Thêm danh mục</p>
            <div className="mb-6">
              <label
                htmlFor="category_name"
                className="block mb-2 font-medium text-gray-900 dark:text-white"
              >
                Tên danh mục
              </label>
              <input
                type="text"
                id="category_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="category_image"
                className="block mb-2 font-medium text-gray-900 dark:text-white"
              >
                Hình ảnh
              </label>
              <input
                type="text"
                id="category_image"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                value={categoryImage}
                onChange={(e) => setCategoryImage(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={addCategory}
                className="btn text-white bg-sky-500 hover:bg-sky-700 px-7 focus:ring-sky-100 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Thêm
              </button>
            </div>
          </div>
        </dialog>

        {/* Edit Category Modal */}
        {isEditModalOpen && selectedCategory && (
          <dialog id="edit_modal" className="modal" open>
            <div
              className="modal-box"
              style={{
                position: "fixed",
                top: "40%",
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
                    setSelectedCategory(null);
                    setEditCategoryName("");
                    setEditCategoryImage("");
                  }}
                >
                  ✕
                </button>
              </form>
              <p className="font-bold text-xl text-center mb-2">
                Chỉnh sửa danh mục
              </p>
              <div className="mb-6">
                <label
                  htmlFor="edit_category_name"
                  className="block mb-2 font-medium text-gray-900 dark:text-white"
                >
                  Tên danh mục
                </label>
                <input
                  type="text"
                  id="edit_category_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập tên danh mục"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="edit_category_image"
                  className="block mb-2 font-medium text-gray-900 dark:text-white"
                >
                  Hình ảnh
                </label>
                <input
                  type="text"
                  id="edit_category_image"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="URL hình ảnh danh mục"
                  value={editCategoryImage}
                  onChange={(e) => setEditCategoryImage(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={updateCategory}
                  className="btn text-white bg-emerald-500 hover:bg-emerald-700 px-9 focus:ring-emerald-100 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                >
                  Lưu
                </button>
              </div>
            </div>
          </dialog>
        )}

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm danh mục..."
            className="bg-gray-100 text-black placeholder-gray-500 border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:ring-blue-200"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
        </div>
      </div>

      {/* Categories Table */}
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
                Category Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {currentCategories.map((category) => (
              <motion.tr
                key={category.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-2 whitespace-nowrap font-medium text-rose-950">
                  {category.id}
                </td>
                <td className="px-6 py-2 whitespace-nowrap font-medium text-rose-950">
                  <img
                    src={category.url_image_category}
                    alt={`Danh mục ${category.title}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-2 whitespace-nowrap font-medium text-rose-950">
                  {category.title}
                </td>
                <td className="px-6 py-2 whitespace-nowrap font-medium text-rose-950">
                  <button
                    className="text-indigo-400 hover:text-indigo-300 mr-5"
                    onClick={() => handleEditClick(category)}
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => DeleteCategory(category.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          className={`px-7 py-2 text-white ${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
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
              ? "bg-gray-400 cursor-not-allowed"
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

export default CategoriesTable;
