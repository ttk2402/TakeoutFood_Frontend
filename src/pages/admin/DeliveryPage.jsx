import Header from "../../components/admin/common/Header";
import DeliveryTable from "../../components/admin/delivery/DeliveryTable";
import Sidebar from "../../components/admin/common/Sidebar";

const DeliveryPage = () => {
  return (
    <div className="flex h-screen text-black overflow-hidden">
      <Sidebar />
      <div className="bg-gray-100 flex-1 overflow-auto relative z-10 border-r-2 border-b-2 border-gray-200">
        <Header title="Quản lý giao hàng" />
        <main className="max-w-7xl mx-auto p-5">
          <DeliveryTable />
        </main>
      </div>
    </div>
  );
};
export default DeliveryPage;
