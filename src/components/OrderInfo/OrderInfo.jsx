import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const ReceiveInfo = () => {
  const [selectedRadio, setSelectedRadio] = useState("1");

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
  };

  const [selectedProvince, setSelectedProvince] = useState({
    id: "0",
    name: "",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    id: "0",
    name: "",
  });
  const [selectedWard, setSelectedWard] = useState({
    id: "0",
    name: "",
  });

  const [street, setStreet] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "https://vapi.vnappmob.com/api/province/"
        );
        setProvinces(response.data.results);
      } catch (error) {
        console.error("Lỗi khi xóa item:", error);
      }
    };
    fetchProvinces();
  }, []);

  const handleProvinceChange = async (event) => {
    const provinceId = event.target.value;
    const provinceName = event.target.options[event.target.selectedIndex].text;
    setSelectedProvince({ id: provinceId, name: provinceName });
    
    try {
      const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`);
      setDistricts(response.data.results);
      setWards([]);
    } catch (error) {
      console.error("Lỗi khi lấy quận:", error);
    }
  };

  const handleDistrictChange = async (event) => {
    const districtId = event.target.value;
    const districtName = event.target.options[event.target.selectedIndex].text;
    setSelectedDistrict({ id: districtId, name: districtName });
    
    try {
      const response = await axios.get(`https://vapi.vnappmob.com//api/province/ward/${districtId}`);
      setWards(response.data.results);
    } catch (error) {
      console.error("Lỗi khi lấy quận:", error);
    }
  };

  const handleWardChange = (event) => {
    const wardId = event.target.value;
    const wardName = event.target.options[event.target.selectedIndex].text;
    setSelectedWard({ id: wardId, name: wardName });
  };

  const handleSubmit = () => {
    const info = {
      Province: selectedProvince.name,
      District: selectedDistrict.name,
      Ward: selectedWard.name,
      Street: street,
      PhoneNumber: phone,
      RecipientName: name,
      CheckoutID: selectedRadio,
    };

    console.log("Thông tin đặt hàng:", info);
  };

  return (
    <div className="w-full">
      <div className="pb-5">
        <p className="text-xl font-bold text-center text-blue-500">
          Thông tin đặt hàng
        </p>
      </div>
      <div>
        <div className="mb-2">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
          >
            Tỉnh / Thành phố
          </label>
          <select
            defaultValue="0"
            id="city"
            onChange={handleProvinceChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="0">---Vui lòng chọn---</option>
            {provinces.map((province) => (
              <option key={province.province_id} value={province.province_id}>
                {province.province_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label
            htmlFor="district"
            className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
          >
            Quận / Huyện
          </label>
          <select
            defaultValue="0"
            id="district"
            onChange={handleDistrictChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="0">---Vui lòng chọn---</option>
            {districts.map((district) => (
              <option key={district.district_id} value={district.district_id}>
                {district.district_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label
            htmlFor="ward"
            className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
          >
            Phường / Xã
          </label>
          <select
            defaultValue="0"
            id="ward"
            onChange={handleWardChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="0">---Vui lòng chọn---</option>
            {wards.map((ward) => (
              <option key={ward.ward_id} value={ward.ward_id}>
                {ward.ward_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
          >
            Địa chỉ nhận hàng
          </label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
          >
            Số điện thoại liên lạc
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
          >
            Tên người nhận hàng
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
          />
        </div>
      </div>

      <div className="my-2.5">
        <div className="pt-2 pb-1">
          <p className="text-sm font-bold">Phương thức thanh toán</p>
        </div>
        <div className="flex items-center py-1.5">
          <input
            id="default-radio-1"
            type="radio"
            value="1"
            name="default-radio"
            checked={selectedRadio === "1"}
            onChange={handleRadioChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-radio-1"
            className="text-sm font-bold ms-2 font-medium text-gray-900 dark:text-gray-300"
          >
            Thanh toán COD khi nhận hàng
          </label>
        </div>

        <div className="flex items-center py-1.5">
          <input
            id="default-radio-2"
            type="radio"
            value="2"
            name="default-radio"
            checked={selectedRadio === "2"}
            onChange={handleRadioChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-radio-2"
            className="text-sm font-bold ms-2 font-medium text-gray-900 dark:text-gray-300"
          >
            Thanh toán VN Pay
          </label>
        </div>
        <div className="flex items-center py-1.5">
          <input
            id="default-radio-3"
            type="radio"
            value="3"
            name="default-radio"
            checked={selectedRadio === "3"}
            onChange={handleRadioChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-radio-2"
            className="text-sm font-bold ms-2 font-medium text-gray-900 dark:text-gray-300"
          >
            Chuyển khoản Banking
          </label>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button onClick={handleSubmit}
        className="text-white font-bold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Tiếp tục đặt hàng
        </button>
      </div>
    </div>
  );
};

export default ReceiveInfo;
