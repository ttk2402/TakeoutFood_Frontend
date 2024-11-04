import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { User, CreditCard } from "lucide-react";
import SettingSection from "./SettingSection";
import axios from "axios";

const Profile = () => {
  const { account, shipper, fetchShipperInfo } = useContext(StoreContext);

  // Modal chỉnh sửa thông tin
  const [editPhoneNumber, setEditPhoneNumber] = useState("");
  const [editCredentialCode, setEditCredentialCode] = useState("");

  // Modal chỉnh sửa thanh toán
  const [editBankName, setEditBankName] = useState("");
  const [editNumberCard, setEditNumberCard] = useState("");
  const [editCardHolderName, setEditCardHolderName] = useState("");

  useEffect(() => {
    if (shipper) {
      setEditPhoneNumber(shipper.phoneNumber || "");
      setEditCredentialCode(shipper.credentialCode || "");
      setEditBankName(shipper?.payment?.bankName || "");
      setEditNumberCard(shipper?.payment?.numberCard || "");
      setEditCardHolderName(shipper?.payment?.cardHolderName || "");
    }
  }, [shipper]);

  // Gọi API cập nhật thông tin
  const updateInfo = async () => {
    try {
      await axios.put(`http://localhost:8086/api/shipper/${shipper.id}`, {
        phoneNumber: editPhoneNumber,
        credentialCode: editCredentialCode,
      });
      document.getElementById("edit_info_modal").close();
      fetchShipperInfo(account.id);
    } catch (error) {
      console.error("Lỗi khi gọi API cập nhật thông tin:", error);
    }
  };

  // Gọi API cập nhật thanh toán
  const updatePayment = async () => {
    if (shipper.payment == null) {
      try {
        const response = await axios.post(
          `http://localhost:8086/api/payment/add`,
          {
            bankName: editBankName,
            numberCard: editNumberCard,
            cardHolderName: editCardHolderName,
          }
        );
        const paymentId = response.data.id;
        try {
          await axios.put(
            `http://localhost:8086/api/shipper/${shipper.id}/${paymentId}`
          );
          document.getElementById("edit_payment_modal").close();
          fetchShipperInfo(account.id);
        } catch (error) {
          console.error("Lỗi khi gọi API cập nhật lại thanh toán:", error);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API thêm thông tin thanh toán:", error);
      }
    } else {
      const old_paymentId = shipper.payment.id;
      try {
        const response = await axios.post(
          `http://localhost:8086/api/payment/add`,
          {
            bankName: editBankName,
            numberCard: editNumberCard,
            cardHolderName: editCardHolderName,
          }
        );
        const paymentId = response.data.id;
        try {
          await axios.put(
            `http://localhost:8086/api/shipper/${shipper.id}/${paymentId}`
          );
          try {
            await axios.delete(
              `http://localhost:8086/api/payment/${old_paymentId}`
            );
            document.getElementById("edit_payment_modal").close();
            fetchShipperInfo(account.id);
          } catch (error) {
            console.error(
              "Lỗi khi gọi API xóa thông tin thanh toán cũ:",
              error
            );
          }
        } catch (error) {
          console.error("Lỗi khi gọi API cập nhật lại thanh toán:", error);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API thêm thông tin thanh toán:", error);
      }
    }
  };

  return (
    <>
      <SettingSection icon={User} title={"Thông tin cá nhân"}>
        <div className="flex justify-center my-5">
          <div className="flex flex-col items-end">
            <div className="mb-3.5">
              Số điện thoại:
              <input
                type="text"
                id="disabled-input"
                aria-label="disabled input"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 w-96 ml-5 rounded cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={
                  shipper && shipper.phoneNumber ? shipper.phoneNumber : ""
                }
                disabled
              />
            </div>
            <div className="">
              Căn cước công dân:
              <input
                type="text"
                id="disabled-input"
                aria-label="disabled input"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 w-96 ml-5 rounded cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={
                  shipper && shipper.credentialCode
                    ? shipper.credentialCode
                    : ""
                }
                disabled
              />
            </div>
          </div>
        </div>
        {/* Modal thêm */}
        <dialog id="edit_info_modal" className="modal">
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
            <p className="font-bold text-xl text-center mb-2">
              Cập nhật thông tin
            </p>
            <div className="mb-6">
              <label
                htmlFor="discount_title"
                className="block mb-2 font-medium text-gray-900 dark:text-white"
              >
                Số điện thoại
              </label>
              <input
                type="text"
                id="discount_title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                defaultValue={editPhoneNumber}
                onChange={(e) => setEditPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="discount_percent"
                className="block mb-2 font-medium text-gray-900 dark:text-white"
              >
                Căn cước công dân
              </label>
              <input
                type="text"
                id="discount_percent"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                defaultValue={editCredentialCode}
                onChange={(e) => setEditCredentialCode(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={updateInfo}
                className="btn text-white bg-sky-500 hover:bg-sky-700 px-7 focus:ring-sky-100 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Lưu
              </button>
            </div>
          </div>
        </dialog>
        <div className="flex justify-center">
          <button
            onClick={() =>
              document.getElementById("edit_info_modal").showModal()
            }
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
          >
            Cập nhật
          </button>
        </div>
      </SettingSection>
      <SettingSection icon={CreditCard} title={"Thông tin thanh toán"}>
        <div className="flex justify-center my-5">
          <div className="flex flex-col items-end">
            <div className="mb-3.5">
              Tên ngân hàng:
              <input
                type="text"
                id="disabled-input"
                aria-label="disabled input"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 w-96 ml-5 rounded cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={shipper?.payment?.bankName || ""}
                disabled
              />
            </div>
            <div className="mb-3.5">
              Số tài khoản:
              <input
                type="text"
                id="disabled-input"
                aria-label="disabled input"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 w-96 ml-5 rounded cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={shipper?.payment?.numberCard || ""}
                disabled
              />
            </div>
            <div className="">
              Tên chủ tài khoản:
              <input
                type="text"
                id="disabled-input"
                aria-label="disabled input"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 w-96 ml-5 rounded cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={shipper?.payment?.cardHolderName || ""}
                disabled
              />
            </div>
          </div>
        </div>
        {/* Modal thêm */}
        <dialog id="edit_payment_modal" className="modal">
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
            <p className="font-bold text-xl text-center mb-2">
              Cập nhật thanh toán
            </p>
            <div className="mb-6">
              <label
                htmlFor="discount_title"
                className="block mb-2 font-medium text-gray-900 dark:text-white"
              >
                Tên ngân hàng
              </label>
              <input
                type="text"
                id="discount_title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                value={editBankName}
                onChange={(e) => setEditBankName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="discount_percent"
                className="block mb-2 font-medium text-gray-900 dark:text-white"
              >
                Số tài khoản
              </label>
              <input
                type="text"
                id="discount_percent"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                value={editNumberCard}
                onChange={(e) => setEditNumberCard(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="discount_percent"
                className="block mb-2 font-medium text-gray-900 dark:text-white"
              >
                Tên chủ tài khoản
              </label>
              <input
                type="text"
                id="discount_percent"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                value={editCardHolderName}
                onChange={(e) => setEditCardHolderName(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={updatePayment}
                className="btn text-white bg-sky-500 hover:bg-sky-700 px-7 focus:ring-sky-100 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Lưu
              </button>
            </div>
          </div>
        </dialog>
        <div className="flex justify-center">
          <button
            onClick={() =>
              document.getElementById("edit_payment_modal").showModal()
            }
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
          >
            Cập nhật
          </button>
        </div>
      </SettingSection>
    </>
  );
};

export default Profile;
