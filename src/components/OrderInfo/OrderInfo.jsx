import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { StoreContext } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import location_pin from "../../assets/location-pin.png";
import card_pin from "../../assets/card-pin.png";

const ReceiveInfo = () => {
  const navigate = useNavigate();
  const { account, items, fetchItemData, fetchOrderData, setOrderInfoID } =
    useContext(StoreContext);
  const [selectedRadio, setSelectedRadio] = useState("1");

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
  };

  const [selectedProvince, setSelectedProvince] = useState({
    id: "0",
    name: "---Vui lòng chọn---",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    id: "0",
    name: "---Vui lòng chọn---",
  });
  const [selectedWard, setSelectedWard] = useState({
    id: "0",
    name: "---Vui lòng chọn---",
  });

  const [street, setStreet] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      /* Gọi API lấy danh sách tỉnh */
      try {
        const response = await axios.get(
          "https://vapi.vnappmob.com/api/province/"
        );
        setProvinces(response.data.results);
      } catch (error) {
        console.error("Lỗi khi gọi API lấy tỉnh, thành phố:", error);
      }
    };
    fetchProvinces();
  }, []);

  const handleProvinceChange = async (event) => {
    const provinceId = event.target.value;
    const provinceName = event.target.options[event.target.selectedIndex].text;
    setSelectedProvince({ id: provinceId, name: provinceName });
    /* Gọi API lấy danh sách quận, huyện với tham số ID của tỉnh đã chọn */
    try {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${provinceId}`
      );
      setDistricts(response.data.results);
      setWards([]);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy quận, huyện:", error);
    }
  };

  const handleDistrictChange = async (event) => {
    const districtId = event.target.value;
    const districtName = event.target.options[event.target.selectedIndex].text;
    setSelectedDistrict({ id: districtId, name: districtName });
    /* Gọi API lấy danh sách xã, phường với tham số ID của quận, huyện đã chọn */
    try {
      const response = await axios.get(
        `https://vapi.vnappmob.com//api/province/ward/${districtId}`
      );
      setWards(response.data.results);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy xã, phường:", error);
    }
  };

  const handleWardChange = (event) => {
    const wardId = event.target.value;
    const wardName = event.target.options[event.target.selectedIndex].text;
    setSelectedWard({ id: wardId, name: wardName });
  };

  const handleSubmit = async () => {
    if (
      items &&
      items.length > 0 &&
      selectedWard.id != 0 &&
      selectedDistrict.id != 0 &&
      selectedProvince.id != 0 &&
      name.trim() !== "" &&
      phone.trim() !== "" &&
      street.trim() !== ""
    ) {
      console.log(street);
      const checkoutID = selectedRadio;
      if (checkoutID === "2") {
        /* Gọi API để thêm OrderInfo để có OrderInfoID truyền cho API thêm Order */
        try {
          const response = await axios.post(
            "http://localhost:8084/api/delivery_information/add",
            {
              recipientName: name,
              phoneNumber: phone,
              commune: selectedWard.name,
              district: selectedDistrict.name,
              province: selectedProvince.name,
              description: street,
            }
          );
          const orderInfoID = response.data.id;
          setOrderInfoID(orderInfoID);
          // addNewOrder(checkoutID, orderInfoID);
          // navigate("/trang-chu");
        } catch (error) {
          console.error("Lỗi khi gọi API thêm thông tin Order:", error);
        }
        const price = items.reduce((acc, item) => acc + item.price, 0) + 15000;
        /* Gọi API để lấy thông tin thanh toán VNPAY */
        try {
          const response = await axios.get(
            `http://localhost:8085/api/v1/payment/vn-pay?amount=${price}`
          );
          const paymentUrl = response.data.data.paymentUrl;
          /* Chuyển đến trang thanh toán VNPAY*/
          // window.open(paymentUrl, "_blank");
          window.location.href = paymentUrl;
        } catch (error) {
          console.error(
            "Lỗi khi gọi API lấy thông tin thanh toán VNPAY:",
            error
          );
        }
      } else {
        /* Gọi API để thêm OrderInfo để có OrderInfoID truyền cho API thêm Order */
        try {
          const response = await axios.post(
            "http://localhost:8084/api/delivery_information/add",
            {
              recipientName: name,
              phoneNumber: phone,
              commune: selectedWard.name,
              district: selectedDistrict.name,
              province: selectedProvince.name,
              description: street,
            }
          );
          const orderInfoID = response.data.id;
          addNewOrder(checkoutID, orderInfoID);
          // navigate("/trang-chu");
        } catch (error) {
          console.error("Lỗi khi gọi API thêm thông tin Order:", error);
        }
      }
    } else {
      console.log("Đầy đủ thông mới đặt hàng được !");
    }
  };

  const addNewOrder = async (checkoutID, orderInfoID) => {
    /* Gọi API để thêm Order với tham số CheckoutID và OrderInfoID */
    try {
      const response = await axios.post(
        `http://localhost:8084/api/order/add/${checkoutID}/${orderInfoID}`,
        {
          accountId: account.id,
        }
      );
      console.log(response.data);
      /* Cập nhật lại danh sách Item */
      fetchItemData(account.id);
      /* Cập nhật lại danh sách Order */
      fetchOrderData(account.id);
    } catch (error) {
      console.error("Lỗi khi gọi API thêm Order:", error);
    }
  };

  const total_p =
    items && items.length > 0
      ? items.reduce((acc, item) => acc + item.price, 0)
      : 0;
  const shippingCost = 15000;
  return (
    <div className="w-full">
      <div className="border-2 border-zinc-100 px-4 pt-2.5">
        <div className="mb-3">
          <p className="text-xl font-bold text-center text-cyan-700">
            Thông tin đặt hàng
          </p>
        </div>
        <hr className="border-t border-gray-300 my-2" />
        <div>
          <div className="mb-2.5">
            <div className="flex items-center">
              <img src={location_pin} alt="" className="w-4 h-4" />
              <p className="text-sm font-bold ml-1.5">
                Thông tin địa chỉ nhận hàng
              </p>
            </div>
          </div>
          <div className="mb-2.5">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-bold text-gray-900"
            >
              <span className="text-red-500 mr-1.5">*</span>Tỉnh / Thành phố
            </label>
            <select
              defaultValue="0"
              id="city"
              onChange={handleProvinceChange}
              className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-200 focus:border-blue-200 block w-full p-2"
            >
              <option value="0">---Vui lòng chọn---</option>
              {provinces.map((province) => (
                <option key={province.province_id} value={province.province_id}>
                  {province.province_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2.5">
            <label
              htmlFor="district"
              className="block mb-2 text-sm font-bold text-gray-900"
            >
              <span className="text-red-500 mr-1.5">*</span>Quận / Huyện
            </label>
            <select
              defaultValue="0"
              id="district"
              onChange={handleDistrictChange}
              className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-200 focus:border-blue-200 block w-full p-2"
            >
              <option value="0">---Vui lòng chọn---</option>
              {districts.map((district) => (
                <option key={district.district_id} value={district.district_id}>
                  {district.district_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2.5">
            <label
              htmlFor="ward"
              className="block mb-2 text-sm font-bold text-gray-900"
            >
              <span className="text-red-500 mr-1.5">*</span>Phường / Xã
            </label>
            <select
              defaultValue="0"
              id="ward"
              onChange={handleWardChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-200 focus:border-blue-200 block w-full p-2"
            >
              <option value="0">---Vui lòng chọn---</option>
              {wards.map((ward) => (
                <option key={ward.ward_id} value={ward.ward_id}>
                  {ward.ward_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2.5">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-bold text-gray-900"
            >
              <span className="text-red-500 mr-1.5">*</span>Địa chỉ nhận hàng
            </label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-200 focus:border-blue-200 block w-full p-2"
              placeholder=""
              required
            />
          </div>

          <div className="mb-2.5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-bold text-gray-900"
            >
              <span className="text-red-500 mr-1.5">*</span>Số điện thoại liên
              lạc
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-200 focus:border-blue-200 block w-full p-2"
              placeholder=""
              required
            />
          </div>
          <div className="mb-2.5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-bold text-gray-900"
            >
              <span className="text-red-500 mr-1.5">*</span>Tên người nhận hàng
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-200 focus:border-blue-200 block w-full p-2"
              placeholder=""
              required
            />
          </div>
        </div>
        <hr className="border-t border-gray-300 mt-4" />
        <div className="mb-2.5">
          <div className="pt-2 pb-1">
            <div className="flex items-center">
              <img src={card_pin} alt="" className="w-5 h-5" />
              <p className="text-sm font-bold ml-1.5">
                Chọn phương thức thanh toán
              </p>
            </div>
          </div>
          <div className="flex items-center py-1.5 ml-1">
            <input
              id="default-radio-1"
              type="radio"
              value="1"
              name="default-radio"
              checked={selectedRadio === "1"}
              onChange={handleRadioChange}
              className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-200 focus:ring-2"
            />
            <label
              htmlFor="default-radio-1"
              className="text-sm font-bold ms-2 font-medium text-gray-900"
            >
              Thanh toán COD khi nhận hàng
            </label>
          </div>

          <div className="flex items-center py-1.5 ml-1">
            <input
              id="default-radio-2"
              type="radio"
              value="2"
              name="default-radio"
              checked={selectedRadio === "2"}
              onChange={handleRadioChange}
              className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-200 focus:ring-2"
            />
            <label
              htmlFor="default-radio-2"
              className="text-sm font-bold ms-2 font-medium text-gray-900"
            >
              Thanh toán VNPAY
            </label>
          </div>
          <div className="flex items-center py-1.5 ml-1">
            <input
              id="default-radio-3"
              type="radio"
              value="3"
              name="default-radio"
              checked={selectedRadio === "3"}
              disabled={true}
              onChange={handleRadioChange}
              className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-200 focus:ring-2"
            />
            <label
              htmlFor="default-radio-2"
              className="text-sm font-bold ms-2 font-medium text-gray-900"
            >
              Chuyển khoản ngân hàng
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end mt-5">
        <p className="text-sm font-medium p-1">
          Tổng tiền hàng: {total_p.toLocaleString("vi-VN")}
          <span className="font-semibold underline">đ</span>
        </p>
        <p className="text-sm font-medium p-1">
          Phí vận chuyển:{" "}
          {(total_p === 0 ? 0 : shippingCost).toLocaleString("vi-VN")}
          <span className="font-semibold underline">đ</span>
        </p>
        <p className="font-semibold text-orange-600 p-1">
          TỔNG THANH TOÁN:{" "}
          {(total_p === 0 ? 0 : total_p + shippingCost).toLocaleString("vi-VN")}
          <span className="text-sm font-semibold underline">đ</span>
        </p>
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={handleSubmit}
          className="text-white font-bold bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2 text-center"
        >
          Đặt hàng
        </button>
      </div>
    </div>
  );
};
export default ReceiveInfo;
