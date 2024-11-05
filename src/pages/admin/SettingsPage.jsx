import Header from "../../components/admin/common/Header";
import Profile from "../../components/admin/settings/Profile";
import Sidebar from "../../components/admin/common/Sidebar";

const SettingsPage = () => {
  return (
    <div className="flex h-screen text-black overflow-hidden">
      <Sidebar />
      <div className="bg-gray-100 flex-1 overflow-auto relative z-10border-r-2 border-b-2 border-gray-200">
        <Header title="Cài đặt" />
        <main className="p-5">
          <Profile />
        </main>
      </div>
    </div>
  );
};
export default SettingsPage;
