import Header from "../../components/admin/common/Header";
import CategoriesTable from "../../components/admin/category/CategoriesTable";
import Sidebar from "../../components/admin/common/Sidebar";

const CategoriesPage = () => {
  return (
    <div className="flex h-screen text-black overflow-hidden">
      <Sidebar />
      <div className="bg-gray-100 flex-1 overflow-auto relative z-10 border-r-2 border-b-2 border-gray-200">
        <Header title="Quản lý danh mục" />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <CategoriesTable />
        </main>
      </div>
    </div>
  );
};
export default CategoriesPage;
