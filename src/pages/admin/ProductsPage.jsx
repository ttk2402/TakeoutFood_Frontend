import Header from "../../components/admin/common/Header";
import ProductsTable from "../../components/admin/products/ProductsTable";

const ProductsPage = () => {
	return (
		<div className='bg-gray-100 flex-1 overflow-auto relative z-10 border-r-2 border-b-2 border-gray-200'>
			<Header title='Quản lý sản phẩm' />
			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<ProductsTable />
			</main>
		</div>
	);
};
export default ProductsPage;