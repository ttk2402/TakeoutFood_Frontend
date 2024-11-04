import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import shopping_basket from "../../assets/shopping-basket.png";
import profile_user from "../../assets/profile-user.png";
import bag from "../../assets/shopping-bag.png";
import logout from "../../assets/logout.png";
import userset from "../../assets/user-setting.png";
import { StoreContext } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const {
    categories,
    products,
    items,
    isLogin,
    account,
    handleLogout,
    deleteItem,
  } = useContext(StoreContext);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    // Lọc sản phẩm dựa trên từ khóa tìm kiếm
    if (searchKeyword) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchKeyword]);
  // Xử lý tìm kiếm
  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };
  useEffect(() => {
    const quantity = items.length;
    const price = items.reduce((acc, item) => acc + item.price, 0);
    setTotalQuantity(quantity);
    setTotalPrice(price);
  }, [items]);
  // Gọi đến Context để call API xóa item
  const handleDelete = (itemID) => {
    deleteItem(itemID);
  };
  //Xử lý chuyển đến trang giỏ hàng
  const handleCartClick = () => {
    navigate("/gio-hang");
  };
  // Xử lý chuyển đến trang chi tiết tài khoản
  const handleAccountClick = (id) => {
    navigate(`/tai-khoan/${id}`);
  };
  //  Xử lý chuyển đến trang đơn hàng
  const handleOrderClick = () => {
    navigate("/don-hang");
  };
  return (
    <div className="navbar bg-gray-50 flex flex-col mb-1.5">
      <div className="w-full flex justify-between">
        {/* Logo */}
        <div>
          <Link to="/" className="">
            <img src={logo} alt="" className="w-24" />
          </Link>
        </div>
        {/* Tìm kiểm */}
        <div className="ml-32">
          <div className="relative">
            <input
              type="text"
              placeholder="Nhập tên sản phẩm..."
              className="w-96 text-black placeholder-gray-700 font-semibold border-gray-300 rounded-full pl-5 pr-4 py-2 focus:ring-blue-200"
              value={searchKeyword}
              onChange={handleSearch}
            />
            <Search
              className="absolute right-3.5 top-3 text-gray-900"
              size={18}
            />
          </div>
          {/* Kết quả tìm kiếm */}
          {filteredProducts.length > 0 && (
            <div className="absolute bg-white border rounded mt-20 w-96 top-0 shadow-lg z-10">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  <div className="flex justify-start px-5 items-center">
                    <img
                      src={product.url_image_product}
                      alt={product.name}
                      className="w-10 h-10"
                    />
                    <Link
                      to={`/san-pham/${product.id}`}
                      className="px-5 font-bold text-cyan-700"
                    >
                      {product.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Giở hàng và thông tin tài khoản / đăng nhập, đăng ký */}
        <div className="flex justify-between items-center">
          {/* Giỏ hàng */}
          <div className="indicator mr-3.5">
            <span className="indicator-item badge bg-gray-50 text-green-700 font-bold">
              {totalQuantity}
            </span>
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn bg-transparent">
                <img src={shopping_basket} alt="" className="" />
              </div>
              {/* Item đang có trong giỏ hàng */}
              {isLogin && (
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[10] w-96 p-2 shadow left-1/2 transform -translate-x-1/2 mt-2.5"
                >
                  {items.map((item) => (
                    <li key={item.id} className="flex items-start p-2 w-full">
                      <div>
                        <img
                          src={item.productImage}
                          alt=""
                          className="w-10 h-10"
                        />
                        <Link
                          to={`/san-pham/${item.productId}`}
                          className="px-2.5 font-bold text-cyan-700"
                        >
                          {item.productName}
                        </Link>
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
                    type="button"
                    onClick={handleCartClick}
                    className="text-white font-bold rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800"
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
                <img src={profile_user} alt="" className="" />
                <p>Xin chào, {account.lastname} !</p>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[10] w-52 shadow"
              >
                <li
                  className="w-full"
                  onClick={() => handleAccountClick(account.id)}
                >
                  <div>
                    <img src={userset} alt="" />
                    <p className="font-medium">Thông tin tài khoản</p>
                  </div>
                </li>
                <li className="w-full" onClick={handleOrderClick}>
                  <div>
                    <img src={bag} alt="" />
                    <p className="font-medium">Quản lý đơn hàng</p>
                  </div>
                </li>
                <li className="w-full" onClick={handleLogout}>
                  <div>
                    <img src={logout} alt="" />
                    <p className="font-medium">Đăng xuất</p>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* Taskbar điều hướng trang */}
      <div className="flex justify-around">
        <ul className="menu menu-horizontal px-1">
          <li className="mx-2.5">
            <Link to="/trang-chu" className="text-base font-bold">
              Trang chủ
            </Link>
          </li>
          <li className="mx-2.5">
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
          <li className="mx-2.5">
            <Link to="/san-pham" className="text-base font-bold">
              Sản phẩm
            </Link>
          </li>
          <li className="mx-2.5">
            <Link to="/gioi-thieu" className="text-base font-bold">
              Giới thiệu
            </Link>
          </li>
          <li className="mx-2.5">
            <Link to="/lien-he" className="text-base font-bold">
              Liên hệ
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
