import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'

import { useMyContext } from '../providers/ContextProvider';
import { RequestItem } from '../components/RequestItem';
import ProductsItem from '../components/ProductsItem';
import CreateProducts from '../components/CreateProducts';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import Popup from '../components/Popup';
import { IProduct, IRequest, IRequestResponse } from '../interfaces';
import { getProducts, getProfile, getAllRequests, getPendingRequests } from '../utils';

const AdminPage = () => {

	const location = useLocation();
	const navigate = useNavigate();

	const [requests, setRequests] = useState<IRequest[]>([]);
	const [pendingRequests, setPendingRequests] = useState<IRequest[]>([]);
	const [totalPendingRequests, setTotalPendingRequests] = useState(0)

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1)

	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { response, setResponse } = useMyContext();

	useEffect(() => {
		getProfile()
			.then(() => {
				fetchRequests(currentPage);
				fetchProducts();
			})
			.catch(() => {
				setResponse("You are not authorized to view this page");
				navigate('/login')
			})
	}, []);


	useEffect(() => {
		fetchRequests(currentPage);
	}, [currentPage, location.pathname])

	useEffect(() => {
		setIsLoading(true);
		switch (true) {
			case location.pathname.includes('products'):
				setTimeout(() => {
					fetchProducts();
				}, 100)
				break;
			case location.pathname.includes('requests'):
			case location.pathname.includes('history'):
				setTimeout(() => {
					fetchRequests(1);
				}, 100)
				break;
			default:
				break;
		}
		setIsLoading(false);
	}, [location.pathname, isLoading]);

	const fetchRequests = async (requiredPage: number = 1) => {

		let response: Promise<IRequestResponse> | null = null;

		if (location.pathname.includes('requests')) {
			response = getPendingRequests(requiredPage)
		} else if (location.pathname.includes('history')) {
			response = getAllRequests(requiredPage)
		}

		if (response) {
			const data = await response;

			if (location.pathname.includes('requests')) {
				setPendingRequests(data.requests);
				if (data.totalPendingRequest) {
					setTotalPendingRequests(data.totalPendingRequest)
				}
			} else if (location.pathname.includes('history')) {
				setRequests(data.requests.sort((a: IRequest, b: IRequest) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
			}


			if (currentPage !== data.currentPage) {
				setCurrentPage(data.currentPage)
			}

			setTotalPages(data.totalPages)
		}

	};

	const fetchProducts = async () => {
		await getProducts().then((data) => {
			setProducts(data);
		})
	};

	const handlePageClick = ({ selected }: { selected: number }) => {
		setCurrentPage(++selected);
	}

	return (
		<div className="w-full min-h-screen flex flex-col pt-10 bg-red-500">

			{isLoading && <Loader />}

			{response && <Popup />}

			<div className='appContainer'>
				<Link to='/' className="outline-none text-[14px] font-bold text-center leading-[110%] bg-white text-red-500 p-2 rounded-xl m-4 top-0 left-0 cursor-pointer"> Back to QR-page</Link>
			</div>

			<h2 className="text-[36px] sm:text-[50px] font-bold text-center leading-[110%] w-full bg-white text-red-500  mt-10 mb-8 py-[20px]">Admin page</h2>

			<div className="appContainer flex flex-col gap-10 px-4 sm:px-3">
				<div className='flex gap-[20px] text-xl text-white justify-end'>
					<Link to='requests' className={`${location.pathname === '/admin/requests' && "font-bold"} admin-link`}>
						Requests
						<span className='absolute bg-red-900 h-[18px] w-[18px] text-[10px] flex items-center justify-center top-[-2px] right-[-12px] rounded-full'>{totalPendingRequests}</span>
					</Link>
					<Link to="history" className={`${location.pathname === '/admin/history' && "font-bold"} admin-link`}>History</Link>
					<Link to="products" className={`${location.pathname === '/admin/products' && "font-bold"} admin-link`}>
						Products
						<span className='absolute bg-red-900 h-[18px] w-[18px] text-[10px] flex items-center justify-center top-[-2px] right-[-12px] rounded-full'>{products.length}</span>
					</Link>
					<Link to="products/create" className={`${location.pathname === '/admin/products/create' && "font-bold"} admin-link`}>Create</Link>
				</div>

				<Routes>
					<Route path="/requests" element={
						<div className={`w-full flex flex-col justify-start ${!totalPendingRequests && "justify-center items-center"} gap-[20px] min-h-[525px] max-h-[525px] overflow-y-auto`}>
							{pendingRequests && pendingRequests.length !== 0 ?
								(
									<>
										{pendingRequests.map((item, index) => (
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
						<div className={`w-full flex flex-col justify-start ${!pendingRequests || pendingRequests.length === 0 && "justify-center items-center"} gap-[20px] min-h-[525px] max-h-[525px] overflow-y-auto`}>
							{requests && requests.length !== 0 ?
								(
									<>
										{requests.map((item, index) => (
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
				</Routes>
			</div>
		</div>
	)
}

export default AdminPage;