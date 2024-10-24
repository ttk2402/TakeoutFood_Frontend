import Header from "../../components/shipper/common/Header";
import Profile from "../../components/shipper/settings/Profile";
import Sidebar from "../../components/shipper/common/Sidebar";

const ProfilePage = () => {
  return (
    <div className="flex h-screen text-black overflow-hidden">
      <Sidebar />
      <div className="bg-gray-100 flex-1 overflow-auto relative z-10border-r-2 border-b-2 border-gray-200">
        <Header title="Thông tin cá nhân" />
        <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
          <Profile />
        </main>
      </div>
    </div>
  );
};
export default ProfilePage;
