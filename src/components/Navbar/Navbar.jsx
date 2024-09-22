import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import cart from "../../assets/cart.png";
import user from "../../assets/user.png";
import bag from "../../assets/bag.png";
import logout from "../../assets/logout.png";
import userset from "../../assets/user-setting.png";
import { StoreContext } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { categories, items, isLogin, account, handleLogout, deleteItem } =
    useContext(StoreContext);

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const quantity = items.length;
    const price = items.reduce((acc, item) => acc + item.price, 0);
    setTotalQuantity(quantity);
    setTotalPrice(price);
  }, [items]);

  const handleDelete = (itemID) => {
    deleteItem(itemID);
  };

  const handleCartClick = () => {
    navigate("/gio-hang");
  };

  const handleAccountClick = (id) => {
    navigate(`/tai-khoan/${id}`);
  };

  return (
    <div className="navbar">
      <div className="navbar-start w-1/5 justify-start">
        <Link to="/" className="w-full">
          <img src={logo} alt="" className="w-full" />
        </Link>
      </div>
      <div className="navbar-center w-2/3 justify-around">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/trang-chu" className="text-base font-bold">
              Trang chủ
            </Link>
          </li>
          <li>
            <details>
              <summary className="text-base font-bold">Danh mục</summary>
              <ul className="p-2 w-64 z-10">
                {categories.map((category) => (
                  <li key={category.id} className="flex items-start p-2 w-full">
                    <Link
                      to={`/danh-muc/${category.id}`}
                      className="text-base font-medium w-full"
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li>
            <Link to="/san-pham" className="text-base font-bold">
              Sản phẩm
            </Link>
          </li>
          <li>
            <Link to="/gioi-thieu" className="text-base font-bold">
              Giới thiệu
            </Link>
          </li>
          <li>
            <Link to="/lien-he" className="text-base font-bold">
              Liên hệ
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end justify-around">
        <div className="indicator">
          <span className="indicator-item badge bg-gray-50 text-green-700 font-bold">
            {totalQuantity}
          </span>
          <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="btn bg-transparent">
              <img src={cart} alt="" className="" />
            </div>
            {isLogin && (
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[10] w-96 p-2 shadow"
              >
                {items.map((item) => (
                  <li key={item.id} className="flex items-start p-2 w-full">
                    <div>
                      <img
                        src={item.productImage}
                        alt=""
                        className="w-10 h-10"
                      />
                      <a
                        href={`/san-pham/${item.productId}`}
                        className="px-2.5 font-bold text-cyan-700"
                      >
                        {item.productName}
                      </a>
                      <span className="px-2.5 font-bold text-center">
                        x{item.quantity}
                      </span>
                      <span className="px-2.5 mr-5 font-bold text-center">
                        {item.price.toLocaleString("vi-VN")}
                      </span>

                      <button
                        className="btn btn-square btn-outline btn-error btn-sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
                <p className="text-sm font-bold text-center my-2.5">
                  Tổng tiền: {totalPrice.toLocaleString("vi-VN")}
                  <span>đ</span>
                </p>
                <button
                  className="btn btn-outline btn-info text-sm font-bold"
                  onClick={handleCartClick}
                >
                  Xem giỏ hàng
                </button>
              </ul>
            )}
          </div>
        </div>
        {!isLogin && (
          <div className="">
            <Link
              to="/dang-nhap"
              className="btn btn-outline btn-sm text-base font-bold mx-1.5 bg-gray-50"
            >
              Đăng nhập
            </Link>
            <span>|</span>
            <Link
              to="/dang-ky"
              className="btn btn-outline btn-sm text-base font-bold ml-1.5 bg-gray-50"
            >
              Đăng ký
            </Link>
          </div>
        )}
        {isLogin && (
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn bg-transparent">
              <img src={user} alt="" className="" />
              <p>Xin chào, {account.lastname} !</p>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[10] w-52 shadow"
            >
              <li className="w-full" onClick={()=>handleAccountClick(account.id)}>
                <div>
                  <img src={userset} alt="" />
                  <p>Thông tin tài khoản</p>
                </div>
              </li>
              <li className="w-full">
                <div>
                  <img src={bag} alt="" />
                  <p>Quản lý đơn hàng</p>
                </div>
              </li>
              <li className="w-full" onClick={handleLogout}>
                <div>
                  <img src={logout} alt="" />
                  <p>Đăng xuất</p>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
