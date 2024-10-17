import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "flowbite";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registry = () => {
  const [username, setUserName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [agreement, setAgreement] = useState(false); // New state for agreement checkbox
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateUsername = (username) => {
    if (username.trim().length < 8) {
      return "Username phải có ít nhất 8 ký tự.";
    }
    return "";
  };
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!regex.test(password)) {
      return "Mật khẩu phải có ít nhất 8 ký tự, bao gồm số, chữ cái và ký tự đặc biệt.";
    }
    return "";
  };
  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== password) {
      return "Mật khẩu xác nhận không khớp.";
    }
    return "";
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email.trim())) {
      return "Vui lòng nhập một địa chỉ email hợp lệ.";
    }
    return "";
  };
  const validateAgreement = (agreement) => {
    if (!agreement) {
      return "Bạn phải đồng ý với điều khoản.";
    }
    return "";
  };
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUserName(value);
    setErrors((prev) => ({ ...prev, username: validateUsername(value) }));
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({
      ...prev,
      password: validatePassword(value),
      confirmPassword: validateConfirmPassword(confirmPassword),
    }));
  };
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrors((prev) => ({
      ...prev,
      confirmPassword: validateConfirmPassword(value),
    }));
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };
  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
  };
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
  };
  const handleAgreementChange = (e) => {
    const isChecked = e.target.checked;
    setAgreement(isChecked);
    setErrors((prev) => ({
      ...prev,
      agreement: validateAgreement(isChecked),
    }));
  };
  const handleRegistry = async () => {
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);
    const emailError = validateEmail(email);
    const agreementError = validateAgreement(agreement);

    if (
      usernameError ||
      passwordError ||
      confirmPasswordError ||
      emailError ||
      agreementError
    ) {
      setErrors({
        username: usernameError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        email: emailError,
        agreement: agreementError,
      });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8081/api/account/add/3",
        {
          username: username.trim(),
          firstname: firstname.trim(),
          lastname: lastname.trim(),
          password: password,
          email: email.trim(),
        }
      );
      const account = response.data;
      console.log(account);
      if (account.id === null) {
        toast.error("Đăng ký tài khoản thất bại!");
        setUserName("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        setAgreement(false);
        setErrors({});
        navigate("/dang-ky");
      } else {
        toast.success("Đăng ký tài khoản thành công!");
        setUserName("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        setAgreement(false);
        setErrors({});
        navigate("/dang-ky");
      }
    } catch (error) {
      if (error.response) {
        console.error("Lỗi từ server:", error.response.data);
        setErrors((prev) => ({
          ...prev,
          server: error.response.data.message || "Đăng ký thất bại.",
        }));
      } else {
        console.error("Lỗi kết nối:", error.message);
        setErrors((prev) => ({
          ...prev,
          server: "Lỗi kết nối. Vui lòng thử lại sau.",
        }));
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
            value={firstname}
            onChange={handleFirstNameChange}
            className={`bg-gray-50 border ${
              errors.firstname ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder=""
            required
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
          )}
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
            value={lastname}
            onChange={handleLastNameChange}
            className={`bg-gray-50 border ${
              errors.lastname ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder=""
            required
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
          )}
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
          value={username}
          onChange={handleUsernameChange}
          className={`bg-gray-50 border ${
            errors.username ? "border-red-500" : "border-gray-300"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          placeholder=""
          required
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username}</p>
        )}
      </div>
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
          value={email}
          onChange={handleEmailChange}
          className={`bg-gray-50 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          placeholder=""
          required
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
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
          value={password}
          onChange={handlePasswordChange}
          className={`bg-gray-50 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          placeholder=""
          required
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
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
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={`bg-gray-50 border ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          placeholder=""
          required
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="agreement"
            type="checkbox"
            checked={agreement}
            onChange={handleAgreementChange}
            className={`w-4 h-4 border ${
              errors.agreement ? "border-red-500" : "border-gray-300"
            } rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800`}
            required
          />
        </div>
        <label
          htmlFor="agreement"
          className={`ms-2 text-sm font-bold text-gray-900 dark:text-gray-300 ${
            errors.agreement ? "text-red-500" : ""
          }`}
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
      {errors.server && (
        <p className="text-red-500 text-sm mb-4 text-center">{errors.server}</p>
      )}
      <div className="flex justify-center">
        <button
          onClick={handleRegistry}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Đăng ký
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Flip
      />
    </div>
  );
};
export default Registry;
