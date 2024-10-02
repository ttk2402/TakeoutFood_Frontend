import { Route, Routes } from "react-router-dom";

import Sidebar from "../../components/admin/common/Sidebar";

import OverviewPage from "../admin/OverviewPage";
import ProductsPage from "../admin/ProductsPage";
import SalesPage from "../admin/SalesPage";
import OrdersPage from "../admin/OrdersPage";
import SettingsPage from "../admin/SettingsPage";
import CategoriesPage from "../admin/CategoriesPage";
import AccountsPage from "../admin/AccountsPage";

const Test = () => {
	return (
		<div className='flex h-screen text-black overflow-hidden'>
			{/* BG */}
			{/* <div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div> */}

			<Sidebar />
			<Routes>
				<Route path='/' element={<OverviewPage />} />
				<Route path='/categories' element={<CategoriesPage />} />
				<Route path='/products' element={<ProductsPage />} />
				<Route path='/users' element={<AccountsPage />} />
				<Route path='/sales' element={<SalesPage />} />
				<Route path='/orders' element={<OrdersPage />} />
				<Route path='/settings' element={<SettingsPage />} />
			</Routes>
		</div>
	);
}

export default Test;
