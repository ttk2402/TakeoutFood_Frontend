import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Search, Eye, Edit, Trash2, Plus } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountsTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [roles, setRoles] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState(""); //moi them
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // Modal thêm
  const [selectedRole, setSelectedRole] = useState("");
  const [username, setUserName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  //Modal chỉnh sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editFirstname, setEditFirstname] = useState("");
  const [editLastname, setEditLastname] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  // Phân trang
  const itemsPerPage = 5;
  const indexOfLastAccount = currentPage * itemsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - itemsPerPage;
  const currentAccounts = filteredAccounts.slice(
    indexOfFirstAccount,
    indexOfLastAccount
  );
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  useEffect(() => {
    fetchAccountData();
    fetchRoleData();
  }, []);
  useEffect(() => {
    let filtered = accounts;
    if (searchTerm) {
      filtered = filtered.filter((account) =>
        account.username.toLowerCase().includes(searchTerm)
      );
    }
    if (filterRole) {
      filtered = filtered.filter(
        (account) => account.role.id === Number(filterRole)
      );
    }
    setFilteredAccounts(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterRole, accounts]);
  // Gọi API khóa tài khoản
  const blockAccount = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/api/account/block/${id}`
      );
      console.log(response.data);
      fetchAccountData();
    } catch (error) {
      console.error("Lỗi khi gọi API khóa tài khoản:", error);
    }
  };
  // Gọi API mở tài khoản
  const openAccount = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/api/account/open/${id}`
      );
      fetchAccountData();
    } catch (error) {
      console.error("Lỗi khi gọi API mở tài khoản:", error);
    }
  };
  // Gọi API xóa tài khoản
  const deleteAccount = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/account/${id}`);
      fetchAccountData();
    } catch (error) {
      console.error("Lỗi khi gọi API xóa tài khoản:", error);
    }
  };
  //Gọi API lấy tài khoản
  const fetchAccountData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/account/");
      const allAccounts = response.data;
      setAccounts(allAccounts);
      setFilteredAccounts(allAccounts);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách tài khoản:", error);
    }
  };
  // Gọi API thêm tài khoản
  const addAccount = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8081/api/account/add/${id}`,
        {
          username: username,
          firstname: firstname,
          lastname: lastname,
          password: password,
          email: email,
        }
      );
      document.getElementById("add_modal").close();
      console.log(response.data);
      setSelectedRole("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setUserName("");
      setEmail("");
      fetchAccountData();
      toast.success("Thêm tài khoản thành công!");
    } catch (error) {
      toast.error("Thêm tài khoản thất bại!");
      console.error("Lỗi khi gọi API thêm tài khoản:", error);
    }
  };
  // Gọi API lấy roles
  const fetchRoleData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/role/");
      setRoles(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách role:", error);
    }
  };
  // Gọi API cập nhật tài khoản
  const updateAccount = async () => {
    try {
      await axios.put(
        `http://localhost:8081/api/account/${selectedAccount.id}`,
        {
          username: editUsername,
          firstname: editFirstname,
          lastname: editLastname,
          password: editPassword,
          email: editEmail,
        }
      );
      document.getElementById("edit_modal").close();
      setSelectedAccount(null);
      setEditUsername("");
      setEditFirstname("");
      setEditLastname("");
      setEditEmail("");
      setEditPassword("");
      fetchAccountData();
      toast.success("Chỉnh sửa tài khoản thành công!");
    } catch (error) {
      toast.error("Chỉnh sửa tài khoản thất bại!");
      console.error("Lỗi khi gọi API cập nhật tài khoản:", error);
    }
  };
  // Chỉnh sửa
  const handleEditClick = (account) => {
    setSelectedAccount(account);
    setEditUsername(account.username);
    setEditFirstname(account.firstname);
    setEditLastname(account.lastname);
    setEditEmail(account.email);
    setEditPassword(account.password);
    setIsEditModalOpen(true);
  };
  // Ẩn/Hiện mật khẩu
  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
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
            Danh sách tài khoản
          </h2>
          {/* Modal thêm */}
          <button
            className="btn btn-sm px-2"
            onClick={() => document.getElementById("add_modal").showModal()}
          >
            <Plus size={20} />
          </button>
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
              <p className="font-bold text-xl text-center mb-5">
                Thêm tài khoản
              </p>
              {/* Chọn role */}
              <div className="mb-6">
                <label
                  htmlFor="role"
                  className="block mb-2 font-medium text-gray-900 dark:text-white"
                >
                  Role
                </label>
                <select
                  id="role"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    -- Choose role --
                  </option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="username_registry"
                  className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username_registry"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>{" "}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password_registry"
                  className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password_registry"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => addAccount(selectedRole)}
                  className="btn text-white bg-sky-500 hover:bg-sky-700  px-7 focus:ring-sky-100 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Thêm
                </button>
              </div>
            </div>
          </dialog>
          {/* Modal chỉnh sửa */}
          {isEditModalOpen && selectedAccount && (
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
                      setSelectedAccount(null);
                      setEditUsername("");
                      setEditFirstname("");
                      setEditLastname("");
                      setEditEmail("");
                      setEditPassword("");
                    }}
                  >
                    ✕
                  </button>
                </form>
                <p className="font-bold text-xl text-center mb-2">
                  Chỉnh sửa tài khoản
                </p>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      value={editFirstname}
                      onChange={(e) => setEditFirstname(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      value={editLastname}
                      onChange={(e) => setEditLastname(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="username_registry"
                    className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username_registry"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    required
                  />
                </div>{" "}
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={updateAccount}
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
                placeholder="Tìm kiếm tài khoản..."
                className="bg-gray-100 text-black placeholder-gray-500 border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:ring-blue-200"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-500"
                size={18}
              />
            </div>
            {/* Lọc theo role */}
            <div className="relative">
              <select
                id="filter_role"
                className="w-44 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="">--Tất cả vai trò--</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.role}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  Password
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  Block / Open
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-indigo-900 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentAccounts.map((account) => (
                <motion.tr
                  key={account.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-4 py-2 whitespace-nowrap font-medium text-rose-950">
                    {account.id}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap font-medium text-rose-950">
                    {account.username}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap flex items-center">
                    <span className="flex items-center text-rose-950 font-medium">
                      {visiblePasswords[account.id]
                        ? account.password
                        : "********"}
                      <button
                        className="text-indigo-400 hover:text-indigo-300 ml-1 mr-5"
                        onClick={() => togglePasswordVisibility(account.id)}
                      >
                        <Eye size={20} />
                      </button>
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full bg-blue-100 text-cyan-700">
                      {account.role.role}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-4 py-0.5 inline-flex text-xs font-semibold leading-5 rounded-full ${
                        account.account_status.status === "ACTIVED"
                          ? "bg-emerald-300 text-white"
                          : "bg-rose-300 text-white"
                      }`}
                    >
                      {account.account_status.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap flex justify-center">
                    {account.account_status.status === "ACTIVED" ? (
                      <button
                        disabled={account.role.role === "ADMIN"}
                        onClick={() => blockAccount(account.id)}
                        className="border-2 px-2 bg-red-50 rounded"
                      >
                        Khóa
                      </button>
                    ) : (
                      <button
                        onClick={() => openAccount(account.id)}
                        className="border-2 px-3.5 bg-green-50 rounded"
                      >
                        Mở
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap font-medium text-rose-950">
                    <button
                      className="text-indigo-400 hover:text-indigo-300 mr-5"
                      onClick={() => handleEditClick(account)}
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={() => deleteAccount(account.id)}
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
            className={`px-4 py-2 text-white ${
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
export default AccountsTable;
