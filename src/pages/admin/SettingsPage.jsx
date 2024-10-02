import Header from "../../components/admin/common/Header";
import Profile from "../../components/admin/settings/Profile";

const SettingsPage = () => {
	return (
		<div className='bg-gray-100 flex-1 overflow-auto relative z-10border-r-2 border-b-2 border-gray-200'>
			<Header title='Cài đặt' />
			<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
				<Profile />
			</main>
		</div>
	);
};
export default SettingsPage;
