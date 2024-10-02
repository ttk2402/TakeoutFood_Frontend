import { User } from "lucide-react";
import SettingSection from "./SettingSection";

const Profile = () => {
	return (
		<SettingSection icon={User} title={"Thông tin tài khoản"}>
			<div className='flex flex-col sm:flex-row items-center mb-6'>
				<img
					src='https://randomuser.me/api/portraits/men/3.jpg'
					alt='Profile'
					className='rounded-full w-20 h-20 object-cover mr-4'
				/>

				<div>
					<h3 className='text-lg font-bold text-gray-500'>Kiên Trần</h3>
					<p className='font-semibold text-gray-900'>trantrungkien2402@gmail.com</p>
				</div>
			</div>

			<button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'>
				Đăng xuất
			</button>

		</SettingSection>
	);
};
export default Profile;
