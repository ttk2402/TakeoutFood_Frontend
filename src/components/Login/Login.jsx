import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";

const Login = () => {
  const { username, setUsername, password, setPassword, handleLogin } =
    useContext(StoreContext);
  return (
    <div className="max-w-96 mx-auto my-10 border-2 border-zinc-100 pt-5 pb-7 px-10 rounded">
      <div className="mb-2.5">
        <p className="text-2xl font-bold text-center text-sky-600">Đăng nhập</p>
      </div>
      <div className="mb-6">
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
          placeholder=""
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
            required
          />
        </div>
        <label
          htmlFor="remember"
          className="ms-2 text-sm font-medium text-gray-900"
        >
          Ghi nhớ mật khẩu
        </label>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleLogin}
          className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-7 py-2 text-center"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};
export default Login;
