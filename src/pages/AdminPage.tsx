import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react'

import { useMyContext } from '../providers/ContextProvider';
import { RequestItem } from '../components/RequestItem';
import ProductsItem from '../components/ProductsItem';
import CreateProducts from '../components/CreateProducts';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import Popup from '../components/Popup';
import { useGetProfile, useGetAllRequests, useGetPendingRequests, useFetchProducts } from '../utils';

const AdminPage = () => {

	const location = useLocation();
	const navigate = useNavigate();

	const { response, setResponse } = useMyContext();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1)

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { refetch: refetchProfile } = useGetProfile();

	const { data: products, refetch: refetchProducts, isLoading: isProductsLoading } = useFetchProducts();
	const { data: allRequestsResponse, refetch: refetchAllRequests, } = useGetAllRequests(currentPage);
	const { data: pendingRequestsResponse, refetch: refetchPendingRequests } = useGetPendingRequests(currentPage);

	useEffect(() => {
		refetchProfile()
			.then(() => {
				setCurrentPage(1)
				refetchProducts();
			})
			.catch(() => {
				setResponse("You are not authorized to visit this page");
				navigate("/login");
			})
	}, []);


	useEffect(() => {
		fetchRequests();
	}, [currentPage, isLoading]);

	useEffect(() => {
		if (location.pathname.includes('products') && !location.pathname.includes('create')) {
			refetchProducts()
		} else {
			setCurrentPage(1)
			fetchRequests();
		}
	}, [location.pathname]);

	const fetchRequests = async () => {

		await refetchPendingRequests()

		if (location.pathname.includes('history')) {
			await refetchAllRequests().then((result) => {
				setCurrentPage(result.data?.currentPage || 1);
				setTotalPages(result.data?.totalPages || 0);
			})
		} else if (location.pathname.includes('requests')) {
			await refetchPendingRequests().then((result) => {
				setCurrentPage(result.data?.currentPage || 1);
				setTotalPages(result.data?.totalPages || 0)
			})
		}

	};

	const handlePageClick = async ({ selected }: { selected: number }) => {
		const newPage = ++selected;
		setCurrentPage(newPage);
	}

	return (
		<div className="w-full min-h-screen flex flex-col pt-10 bg-red-500">

			{isLoading || isProductsLoading && <Loader />}

			{response && <Popup />}

			<div className='appContainer'>
				<Link to='/' className="outline-none text-[14px] font-bold text-center leading-[110%] bg-white text-red-500 p-2 rounded-xl m-4 top-0 left-0 cursor-pointer"> Back to QR-page</Link>
			</div>

			<h2 className="text-[36px] sm:text-[50px] font-bold text-center leading-[110%] w-full bg-white text-red-500  mt-10 mb-8 py-[20px]">Admin page</h2>

			<div className="appContainer flex flex-col gap-10 px-4 sm:px-3">
				<div className='flex gap-[20px] text-xl text-white justify-end'>
					<Link to='requests' className={`${location.pathname === '/admin/requests' && "font-bold"} admin-link`}>
						Requests
						<span className='absolute bg-red-900 h-[18px] w-[18px] text-[10px] flex items-center justify-center top-[-2px] right-[-12px] rounded-full'>{pendingRequestsResponse?.totalPendingRequest}</span>
					</Link>
					<Link to="history" className={`${location.pathname === '/admin/history' && "font-bold"} admin-link`}>History</Link>
					<Link to="products" className={`${location.pathname === '/admin/products' && "font-bold"} admin-link`}>
						Products
						<span className='absolute bg-red-900 h-[18px] w-[18px] text-[10px] flex items-center justify-center top-[-2px] right-[-12px] rounded-full'>{products?.length}</span>
					</Link>
					<Link to="products/create" className={`${location.pathname === '/admin/products/create' && "font-bold"} admin-link`}>Create</Link>
				</div>

				<Routes>
					<Route path="/requests" element={
						<div className={`w-full flex flex-col justify-start ${!pendingRequestsResponse?.totalPendingRequest && "justify-center items-center"} gap-[20px] min-h-[525px] max-h-[525px] overflow-y-auto`}>
							{pendingRequestsResponse && pendingRequestsResponse?.requests.length !== 0 ?
								(
									<>
										{pendingRequestsResponse?.requests.map((item, index) => (
											<RequestItem key={index + item._id} req={item} setIsLoading={setIsLoading} />
										))}
										<Pagination
											currentPage={currentPage}
											totalPages={totalPages}
											handlePageClick={handlePageClick}
										/>
									</>
								)
								: <h2 className='text-3xl text-white font-bold text-center bg-red-'>There are no requests so far</h2>
							}

						</div>
					} />
					<Route path="history" element={
						<div className={`w-full flex flex-col justify-start ${!allRequestsResponse?.requests || allRequestsResponse?.requests.length === 0 && "justify-center items-center"} gap-[20px] min-h-[525px] max-h-[525px] overflow-y-auto`}>
							{allRequestsResponse && allRequestsResponse?.requests.length !== 0 ?
								(
									<>
										{allRequestsResponse?.requests.map((item, index) => (
											<RequestItem key={index + item._id} req={item} changeable={true} />
										))}
										<Pagination
											currentPage={currentPage}
											totalPages={totalPages}
											handlePageClick={handlePageClick}
										/>
									</>
								)
								: <h2 className='text-3xl text-white font-bold text-center'>There are no requests so far</h2>
							}
						</div>
					} />
					<Route path="products" element={
						<div className={`w-full flex flex-col justify-start ${!products || products.length === 0 && "justify-center items-center"} gap-[20px] min-h-[525px] max-h-[525px] overflow-y-auto`}>
							{products && products.length !== 0 ?
								products.map((item, index) => (
									<ProductsItem key={index + item._id} product={item} setIsLoading={setIsLoading} />
								))
								: <h2 className='text-3xl text-white font-bold text-center'>There are no products so far</h2>
							}
						</div>
					} />
					<Route path="products/create" element={
						<CreateProducts setIsLoading={setIsLoading} />
					} />
					<Route path="*" element={<Navigate to="/admin/requests" />} />
				</Routes>
			</div>
		</div>
	)
}

export default AdminPage;