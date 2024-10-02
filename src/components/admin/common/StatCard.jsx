import { motion } from "framer-motion";

const StatCard = ({ name, icon: Icon, value, color }) => {
	return (
		<motion.div
			className='bg-white bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 flex justify-center'
			whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
		>
			<div className='px-2 py-5 sm:py-5'>
				<span className='flex items-center text-sm font-bold text-gray-900'>
					<Icon size={20} className='mr-2' style={{ color }} />
					{name}
				</span>
				<p className='mt-1 text-3xl font-bold text-gray-500 text-center'>{value}</p>
			</div>
		</motion.div>
	);
};
export default StatCard;
