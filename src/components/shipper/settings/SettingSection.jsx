import { motion } from "framer-motion";

const SettingSection = ({ icon: Icon, title, children }) => {
	return (
		<motion.div
			className='bg-white backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-5 border border-gray-200 mb-5'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className='flex items-center justify-center mb-4'>
				<Icon className='text-indigo-400 mr-4' size='24' />
				<h2 className='text-xl font-bold text-gray-900'>{title}</h2>
			</div>
			{children}
		</motion.div>
	);
};
export default SettingSection;
