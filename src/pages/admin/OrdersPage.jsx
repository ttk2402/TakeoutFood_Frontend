import Header from "../../components/admin/common/Header";
import OrdersTable from "../../components/admin/orders/OrdersTable";
import Sidebar from "../../components/admin/common/Sidebar";

const OrdersPage = () => {
  return (
    <div className="flex h-screen text-black overflow-hidden">
      <Sidebar />
      <div className="bg-gray-100 flex-1 relative z-10 overflow-auto border-r-2 border-b-2 border-gray-200">
        <Header title={"Quản lý đơn hàng"} />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <OrdersTable />
        </main>
      </div>
    </div>
  );
};
export default OrdersPage;
