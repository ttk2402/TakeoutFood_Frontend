import Header from "../../components/admin/common/Header";
import ShipperrsTable from "../../components/admin/shipper/ShippersTable";
import Sidebar from "../../components/admin/common/Sidebar";

const ShippersPage = () => {
  return (
    <div className="flex h-screen text-black overflow-hidden">
      <Sidebar />
      <div className="bg-gray-100 flex-1 overflow-auto relative z-10 border-r-2 border-b-2 border-gray-200">
        <Header title="Quản lý tài khoản" />
        <main className="max-w-7xl mx-auto p-5">
          <ShipperrsTable />
        </main>
      </div>
    </div>
  );
};
export default ShippersPage;
