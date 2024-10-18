import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import ProductList from "../ProductList/ProductList";

const ProductInHome = () => {
  const { products, categories } = useContext(StoreContext);

  const getFourProductInCategory = (categoryId) => {
    const filteredProducts = products.filter(
      (product) => product.category.id === categoryId
    );
    return filteredProducts.slice(0, 4); // Lấy tối đa 4 sản phẩm
  };

  return (
    <div>
      {categories.map((category) => {
        return (
          <div key={category.id} className="mb-7">
            <div className="flex justify-center py-4 bg-gray-100">
              <p className=" text-lg font-extrabold text-red-600">
                {category.title.toUpperCase()}
              </p>
            </div>
            <div>
              <ProductList products={getFourProductInCategory(category.id)} />
            </div>
            <div className="flex justify-center my-7">
              <div>
                <Link
                  to={`/danh-muc/${category.id}`}
                  className="border-2 px-2.5 py-1 rounded-full border-emerald-50 text-emerald-700 font-medium w-full bg-emerald-50 hover:border-emerald-400 hover:bg-emerald-400 hover:text-white"
                >
                  Xem tất cả &gt;
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductInHome;
