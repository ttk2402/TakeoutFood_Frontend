import Header from "../../components/admin/common/Header";
import ProductsTable from "../../components/admin/products/ProductsTable";
import Sidebar from "../../components/admin/common/Sidebar";

const ProductsPage = () => {
  return (
    <div className="flex h-screen text-black overflow-hidden">
      <Sidebar />
      <div className="bg-gray-100 flex-1 overflow-auto relative z-10 border-r-2 border-b-2 border-gray-200">
        <Header title="Quản lý sản phẩm" />
        <main className="max-w-7xl mx-auto p-5">
          <ProductsTable />
        </main>
      </div>
    </div>
  );
};
export default ProductsPage;
