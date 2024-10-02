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
          <div key={category.id} className="rounded-lg mb-10">
            <div className="flex justify-center py-5 bg-zinc-400 rounded-t-lg">
              <p className=" text-xl font-extrabold text-white">
                {category.title.toUpperCase()}
              </p>
            </div>
            <div>
              <ProductList products={getFourProductInCategory(category.id)} />
            </div>
            <div className="flex justify-center p-5">
              <div>
                <Link
                  to={`/danh-muc/${category.id}`}
                  className="btn btn-outline btn-sm rounded-full text-base font-medium w-full border-red-700 hover:border-red-700 hover:bg-red-700 hover:text-white"
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
