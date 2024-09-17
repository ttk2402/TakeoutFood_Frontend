import React from "react";

const Checkout = () => {
  return (
    <div className="w-full">
      <div className="py-5">
        <p className="text-xl font-bold text-center text-blue-500">
          Xác nhận đặt hàng
        </p>
      </div>
      <div className="mb-6 border-2 p-2.5">
        <p className="">Thông tin địa chỉ nhận hàng</p>
        <p>Tên + Sđt</p>
        <p>Địa chỉ</p>
      </div>
      <div className="mb-6 border-2 p-2.5">
        <label
          htmlFor="discount"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nhập mã giảm giá của Bạn vào đây
        </label>
        <input
          type="text"
          id="discount"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          required
        />
        <button className="btn">Áp dụng</button>
      </div>

      <div className="mb-6 border-2 p-2.5">
        <p>Phương thức thanh toán</p>
        <div>
          <input type="radio" name="radio-1" className="radio" defaultChecked />
          <span>Thanh toán COD khi nhận hàng</span>
        </div>
        <div>
          <input type="radio" name="radio-2" className="radio" />
          <span>Thanh toán VN Pay</span>
        </div>
        <div>
          <input type="radio" name="radio-3" className="radio" />
          <span>Chuyển khoản ngân hàng</span>
        </div>
      </div>

      <div className="mb-6">
        <div>
          <span className="">Tổng số sản phẩm:</span> <span>5</span>
        </div>
        <div>
          <span className="">Tổng tiền hàng:</span> <span>100000</span>
        </div>
        <div>
          <span className="">Phí vận chuyển:</span> <span>25000</span>
        </div>
        <div>
          <span className="">Tổng cộng giảm giá:</span> <span>0</span>
        </div>
        <div>
          <span className="">Tổng thanh toán:</span> <span>0</span>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Xác nhận đặt hàng
        </button>
      </div>
    </div>
  );
};

export default Checkout;
