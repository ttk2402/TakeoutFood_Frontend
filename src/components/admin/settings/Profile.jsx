import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { User } from "lucide-react";
import SettingSection from "./SettingSection";

const Profile = () => {
  const { account, handleLogout } = useContext(StoreContext);
  const safeAccount = account || {
    id: "",
    username: "",
    email: "",
    phone: "",
  };
  return (
    <SettingSection icon={User} title={"Thông tin tài khoản"}>
      <div className="flex justify-center my-5">
        <div className="flex flex-col items-end">
          <div className="mb-3.5">
            ID tài khoản:
            <input
              type="text"
              id="disabled-input"
              aria-label="disabled input"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 w-96 ml-5 rounded cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={safeAccount.id}
              disabled
            />
          </div>
          <div className="mb-3.5">
            Tên tài khoản:
            <input
              type="text"
              id="disabled-input"
              aria-label="disabled input"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 w-96 ml-5 rounded cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={safeAccount.username}
              disabled
            />
          </div>
          <div className="mb-3.5">
            E-Mail:
            <input
              type="text"
              id="disabled-input"
              aria-label="disabled input"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 w-96 ml-5 rounded cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={safeAccount.email}
              disabled
            />
          </div>
          <div className="">
            Số điện thoại:
            <input
              type="text"
              id="disabled-input"
              aria-label="disabled input"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 w-96 ml-5 rounded cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={safeAccount.phone}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
        >
          Đăng xuất
        </button>
      </div>
    </SettingSection>
  );
};

export default Profile;
