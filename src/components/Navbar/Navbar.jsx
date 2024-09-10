import React, { useState } from "react";
import logo from "../../assets/logo.png";
import cart from "../../assets/cart.png";

const Navbar = () => {

    const [quantity, setQuantity] = useState(0)

  return (
    <div className="navbar bg-rose-50">
      <div className="navbar-start w-1/5 justify-start">
        <a className="w-full">
          <img src={logo} alt="" className="w-full" />
        </a>
      </div>
      <div className="navbar-center w-2/3 justify-around">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/trangchu" className=" text-base font-bold">
              Trang chủ
            </a>
          </li>
          <li>
            <details>
              <summary className=" text-base font-bold">Danh mục</summary>
              <ul className="p-2 w-64 z-10">
                <li>
                  <a href="/thucan" className=" text-base font-bold">
                    <img src={cart} alt="" />
                    Thức ăn
                  </a>
                </li>
                <li>
                  <a href="/nuocuong" className=" text-base font-bold">
                    <img src={cart} alt="" />
                    Nước uống
                  </a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a href="/donhang" className=" text-base font-bold">
              Đơn hàng
            </a>
          </li>
          <li>
            <a href="/lienhe" className=" text-base font-bold">
              Liên hệ
            </a>
          </li>
        </ul>
      </div>
      <div className="navbar-end justify-around">
        <div className="indicator">
          <span className="indicator-item badge badge-info ">{quantity}</span>
          <a href="/cart" className="btn btn-ghost">
            <img src={cart} alt="" />
          </a>
        </div>
        <div className="">
          <a href="/dangnhap" className="btn btn-ghost text-base">
            Đăng nhập
          </a>
          <span>|</span>
          <a href="/dangky" className="btn btn-ghost text-base">
            Đăng ký
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
