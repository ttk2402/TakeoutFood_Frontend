import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AccountDetail = () => {
  const { accountID } = useParams();
  const [id, setID] = useState("");
  const [username, setUseName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchProductDetail = async (accountID) => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/account/get/${accountID}`
        );
        const account = response.data;
        setID(account.id);
        setUseName(account.username);
        setEmail(account.email)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProductDetail(accountID);
  }, []);

  return (
    <div className="mt-10 mb-16">
      <p className="text-center text-xl font-bold">Thông tin tài khoản</p>
      <div className="flex justify-center my-5">
        <div className="flex flex-col items-end">
          <div className="mb-3.5">
            ID tài khoản:
            <input
              type="text"
              id="disabled-input"
              aria-label="disabled input"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 w-96 ml-5 rounded cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={id}
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
              value={username}
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
              value={email}
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
              value={phone}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;
