import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "flowbite";

const Registry = () => {
  const [username, setUserName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegistry = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9093/api/account/add/3",
        {
          username: username,
          firstname: firstname,
          lastname: lastname,
          password: password,
          email: email,
        }
      );

      console.log("Đăng ký thành công:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Lỗi từ server:", error.response.data);
      } else {
        console.error("Lỗi kết nối:", error.message);
      }
    }
  };

  return (
    <div className="max-w-96 mx-auto my-10">
      <div className="py-5">
        <p className="text-3xl font-bold text-center text-blue-500">
          Đăng ký tài khoản
        </p>
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
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="confirm_password"
          className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
        >
          Confirm password
        </label>
        <input
          type="password"
          id="confirm_password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            required
          />
        </div>
        <label
          htmlFor="remember"
          className="ms-2 text-sm font-bold text-gray-900 dark:text-gray-300"
        >
          I agree with the{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            terms and conditions
          </a>
          .
        </label>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleRegistry}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
};

export default Registry;
