import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [account, setAccount] = useState(null);
  const [shipper, setShipper] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productInCategory, setProductInCategory] = useState([]);
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [checkouts, setCheckouts] = useState([]);

  useEffect(() => {
    const savedAccount = sessionStorage.getItem("account");
    const savedIsLogin = sessionStorage.getItem("isLogin");

    if (savedAccount && savedIsLogin === "true") {
      setAccount(JSON.parse(savedAccount));
      setIsLogin(true);
    }
    fetchCategoryData();
    fetchProductData();
    fetchCheckoutData();
  }, []);

  useEffect(() => {
    if (isLogin) {
      fetchItemData(account.id);
      fetchOrderData(account.id);
      if(account.role.role === "SHIPPER"){
        fetchShipperInfo(account.id);
      }
    }
  }, [isLogin]);

  /* Lấy dữ liệu và các xử lý liên quan đến Category */
  const fetchCategoryData = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/category/");
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách danh mục:", error);
    }
  };

  /* Lấy dữ liệu và các xử lý liên quan đến Product */
  const fetchProductData = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/product/");
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách sản phẩm:", error);
    }
  };

  /* Lấy dữ liệu và các xử lý liên quan đến Item */
  const fetchItemData = async (accountID) => {
    try {
      const response = await axios.get(
        `http://localhost:8083/api/item/all/account/${accountID}`
      );
      setItems(response.data);
    } catch (error) {
      console.error(
        "Lỗi khi gọi API lấy danh sách item trong giỏ hàng:",
        error
      );
    }
  };

  /* Lấy dữ liệu đơn hàng và xử lý liên quan đến đơn hàng */
  const fetchOrderData = async (accountID) => {
    try {
      const response = await axios.get(
        `http://localhost:8084/api/order/account/${accountID}`
      );
      setOrders(response.data);
    } catch (error) {
      console.error(
        "Lỗi khi gọi API lấy danh sách đơn hàng của người dùng:",
        error
      );
    }
  };

  /* Lấy dữ liệu phương thức thanh toán */
  const fetchCheckoutData = async () => {
    try {
      const response = await axios.get("http://localhost:8084/api/checkout/");
      setCheckouts(response.data);
    } catch (error) {
      console.error(
        "Lỗi khi gọi API lấy danh sách phương thức thanh toán:",
        error
      );
    }
  };
  /* Lấy dữ liệu sản phẩm theo danh mục */
  const fetchProductDataByCategory = async (categoryID) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/product/category/${categoryID}`
      );
      setProductInCategory(response.data);
    } catch (error) {
      console.error(
        "Lỗi khi gọi API lấy danh sách sản phẩm theo danh mục:",
        error
      );
    }
  };

  const addItem = async (product, accountID) => {
    const existingItem = items.find((item) => item.productId === product.id);

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + 1;
      const updatedPrice = existingItem.productPrice * updatedQuantity;
      try {
        const response = await axios.put(
          `http://localhost:8083/api/item/${existingItem.id}`,
          {
            productId: product.id,
            quantity: updatedQuantity,
            price: updatedPrice,
          }
        );
        console.log("Item đã thêm rồi, tăng số lượng thêm 1", response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API cập nhật item:", error);
      }
    } else {
      try {
        const response = await axios.post(
          `http://localhost:8083/api/item/add/${accountID}`,
          {
            productId: product.id,
            quantity: 1,
            price: product.price,
            productName: product.name,
            productPrice: product.price,
            productImage: product.url_image_product,
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API thêm mới item:", error);
      }
    }
    fetchItemData(account.id);
  };

  const addItemFromDetail = async (product, quantity, accountID) => {
    const existingItem = items.find((item) => item.productId === product.id);

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + quantity;
      const updatedPrice = existingItem.productPrice * updatedQuantity;
      try {
        const response = await axios.put(
          `http://localhost:8083/api/item/${existingItem.id}`,
          {
            productId: product.id,
            quantity: updatedQuantity,
            price: updatedPrice,
          }
        );
        console.log("Item đã thêm rồi, tăng số lượng thêm 1", response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API cập nhật item:", error);
      }
    } else {
      const updateQuantity = quantity;
      const updatePrice = product.price * quantity;
      try {
        const response = await axios.post(
          `http://localhost:8083/api/item/add/${accountID}`,
          {
            productId: product.id,
            quantity: updateQuantity,
            price: updatePrice,
            productName: product.name,
            productPrice: product.price,
            productImage: product.url_image_product,
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API thêm mới item:", error);
      }
    }
    fetchItemData(account.id);
  };

  /* Xóa Item */
  const deleteItem = async (itemID) => {
    try {
      const response = await axios.delete(
        `http://localhost:8083/api/item/${itemID}`
      );
      console.log(response.data);
      setItems(items.filter((item) => item.id !== itemID));
    } catch (error) {
      console.error("Lỗi khi gọi API xóa item:", error);
    }
    fetchItemData(account.id);
  };


   /* Lấy dữ liệu shipper */
   const fetchShipperInfo = async (accountID) => {
    try {
      const response = await axios.get(
        `http://localhost:8086/api/shipper/account/${accountID}`
      );
      setShipper(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy thông tin shipper:", error);
    }
  };

  /* Đăng nhập */
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/account/login",
        {
          username: username,
          password: password,
        }
      );
      const accountInfo = response.data;
      if (accountInfo.id != null) {
        console.log("Đăng nhập thành công:", accountInfo);
        sessionStorage.setItem("isLogin", true);
        sessionStorage.setItem("account", JSON.stringify(accountInfo));
        setIsLogin(true);
        setAccount(accountInfo);
        setUsername("");
        setPassword("");
        if (accountInfo.role.role === "CUSTOMER") {
          navigate("/");
        } else if (accountInfo.role.role === "SHIPPER") {
          navigate("/giao-hang/nhan-don-hang");
        } else {
          navigate("/quan-tri/");
        }
      } else {
        console.log("Mật khẩu không chính xác hoặc tài khoản đã bị khóa");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API đăng nhập:", error);
    }
  };

  /* Đăng xuất */
  const handleLogout = () => {
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("account");
    setIsLogin(false);
    setAccount(null);
    setItems([]);
    navigate("/");
  };

  /* Dành cho giao diện quản trị */

  const contextValue = {
    isLogin,
    setIsLogin,
    account,
    setAccount,
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    handleLogout,
    categories,
    products,
    productInCategory,
    items,
    orders,
    checkouts,
    addItem,
    addItemFromDetail,
    deleteItem,
    fetchProductDataByCategory,
    fetchItemData,
    fetchOrderData,
    shipper,
    fetchShipperInfo,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
