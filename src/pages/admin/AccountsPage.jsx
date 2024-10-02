import Header from "../../components/admin/common/Header";
import AccountsTable from "../../components/admin/accounts/AccountsTable";

const AccountsPage = () => {
  return (
    <div className="bg-gray-100 flex-1 overflow-auto relative z-10 border-r-2 border-b-2 border-gray-200">
      <Header title="Quản lý tài khoản" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <AccountsTable />
      </main>
    </div>
  );
};
export default AccountsPage;
