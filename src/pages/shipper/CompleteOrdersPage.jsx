import Header from "../../components/shipper/common/Header";
import Sidebar from "../../components/shipper/common/Sidebar";
import CompleteOrdersTable from "../../components/shipper/completeOrders/CompleteOrdersTable";

const CompleteOrdersPage = () => {
  return (
    <div className="flex h-screen text-black overflow-hidden">
      <Sidebar />
      <div className="bg-gray-100 flex-1 relative z-10 overflow-auto border-r-2 border-b-2 border-gray-200">
        <Header title={"Lịch sử giao hàng"} />
        <main className="max-w-8xl mx-auto py-6 px-2 lg:px-6">
          <CompleteOrdersTable />
        </main>
      </div>
    </div>
  );
};
export default CompleteOrdersPage;
