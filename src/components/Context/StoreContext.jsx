import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [account, setAccount] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productInCategory, setProductInCategory] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedAccount = localStorage.getItem("account");
    const savedIsLogin = localStorage.getItem("isLogin");

    if (savedAccount && savedIsLogin === "true") {
      setAccount(JSON.parse(savedAccount));
      setIsLogin(true);
    }
    fetchCategoryData();
    fetchProductData();
  }, []);

  useEffect(() => {
    if (isLogin) {
      fetchItemData(account.id);
    }
  }, [isLogin]);

  /* Lấy dữ liệu và các xử lý liên quan đến Category */
  const fetchCategoryData = async () => {
    try {
      const response = await axios.get("http://localhost:9091/api/category/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /* Lấy dữ liệu và các xử lý liên quan đến Product */
  const fetchProductData = async () => {
    try {
      const response = await axios.get("http://localhost:9091/api/product/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /* Lấy dữ liệu và các xử lý liên quan đến Item */
  const fetchItemData = async (accountID) => {
    try {
      const response = await axios.get(
        `http://localhost:9092/api/item/all/account/${accountID}`
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /* Lấy dữ liệu sản phẩm theo danh mục */
  const fetchProductDataByCategory = async (categoryID) => {
    try {
      const response = await axios.get(
        `http://localhost:9091/api/product/category/${categoryID}`
      );
      setProductInCategory(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addItem = async (product, accountID) => {
    const existingItem = items.find((item) => item.productId === product.id);

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + 1;
      const updatedPrice = existingItem.productPrice * updatedQuantity;
      try {
        const response = await axios.put(
          `http://localhost:9092/api/item/${existingItem.id}`,
          {
            productId: product.id,
            quantity: updatedQuantity,
            price: updatedPrice,
          }
        );
        console.log("Item đã thêm rồi, tăng số lượng thêm 1", response.data);
      } catch (error) {
        console.error("Lỗi khi cập nhật item:", error);
      }
    } else {
      try {
        const response = await axios.post(
          `http://localhost:9092/api/item/add/${accountID}`,
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
        console.error("Lỗi khi thêm mới item:", error);
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
          `http://localhost:9092/api/item/${existingItem.id}`,
          {
            productId: product.id,
            quantity: updatedQuantity,
            price: updatedPrice,
          }
        );
        console.log("Item đã thêm rồi, tăng số lượng thêm 1", response.data);
      } catch (error) {
        console.error("Lỗi khi cập nhật item:", error);
      }
    } else {
      const updateQuantity = quantity;
      const updatePrice = product.price * quantity;
      try {
        const response = await axios.post(
          `http://localhost:9092/api/item/add/${accountID}`,
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
        console.error("Lỗi khi thêm mới item:", error);
      }
    }
    fetchItemData(account.id);
  };

  /* Xóa Item */
  const deleteItem = async (itemID) => {
    try {
      const response = await axios.delete(
        `http://localhost:9092/api/item/${itemID}`
      );
      console.log(response.data);
      setItems(items.filter((item) => item.id !== itemID));
    } catch (error) {
      console.error("Lỗi khi xóa item:", error);
    }
    fetchItemData(account.id);
  };

  /* Đăng nhập */
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9093/api/account/login",
        {
          username: username,
          password: password,
        }
      );
      const accountInfo = response.data;
      if (accountInfo.id != null) {
        console.log("Đăng nhập thành công:", accountInfo);
        localStorage.setItem("isLogin", true);
        localStorage.setItem("account", JSON.stringify(accountInfo));
        setIsLogin(true);
        setAccount(accountInfo);
        setUsername("");
        setPassword("");
        navigate("/");
      } else {
        console.log("Tài khoản hoặc mật khẩu không chính xác.");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
    }
  };

  /* Đăng xuất */
  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("account");
    setIsLogin(false);
    setAccount(null);
    setItems([]);
    navigate("/");
  };

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
    addItem,
    addItemFromDetail,
    deleteItem,
    fetchProductDataByCategory,
    fetchItemData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;