import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react'
import { RequestItem } from '../components/RequestItem';
import { IProduct, IRequest } from '../interfaces';
import { getRequests, getProducts } from '../utils';

import Loader from '../components/Loader';
import { useMyContext } from '../providers/ContextProvider';
import Popup from '../components/Popup';
import CreateProducts from './CreateProducts';
import ProductsItem from '../components/ProductsItem';

const AdminPage: React.FC = (): JSX.Element => {

	const location = useLocation();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [requests, setRequests] = useState<IRequest[]>([]);
	const [products, setProducts] = useState<IProduct[]>([]);
	const [pendingRequests, setPendingRequests] = useState<IRequest[]>([]);
	const initialRender = useRef(true)

	const { admin, response, setResponse } = useMyContext();

	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false;
			if (!admin.current) {
				setResponse("You are not authorized to view this page");
				navigate('/login')
			}
			fetchRequests();
			fetchProducts();
		}
	}, []);

	useEffect(() => {
		setIsLoading(true);
		if (location.pathname.includes("admin/products") && isLoading) {
			setTimeout(() => {
				fetchProducts();
			}, 500)
		} else if (location.pathname.includes("admin/requests") || location.pathname.includes("admin/history") && isLoading) {
			setTimeout(() => {
				fetchRequests();
			}, 500)
		}
		setIsLoading(false);
	}, [location.pathname, isLoading]);

	const fetchRequests = async () => {
		await getRequests().then((data) => {
			setRequests(data.sort((a: IRequest, b: IRequest) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
			setPendingRequests(data.filter((item: IRequest) => item.status === "pending"));
		})
	};

	const fetchProducts = async () => {
		await getProducts().then((data) => {
			setProducts(data);
		})
	};

	return (
		<div className="w-full min-h-screen flex flex-col pt-10 bg-red-500">

			<div className='appContainer'>
				<Link to='/' className="outline-none text-[14px] font-bold text-center leading-[110%] bg-white text-red-500 p-2 rounded-xl m-4 top-0 left-0 cursor-pointer"> Back to QR-page</Link>
			</div>

			<h2 className="text-[42px] sm:text-[50px] font-bold text-center leading-[110%] w-full bg-white text-red-500  mt-10 mb-8 py-[20px]">Admin page</h2>

			<div className="appContainer flex flex-col gap-10 px-4 sm:px-3">
				<div className='flex gap-[20px] text-xl text-white justify-end'>
					<Link to='requests' className={`${location.pathname === '/admin/requests' && "font-bold"} admin-link`}>
						Requests
						<span className='absolute bg-red-900 h-[18px] w-[18px] text-[10px] flex items-center justify-center top-[-2px] right-[-12px] rounded-full'>{pendingRequests.length}</span>
					</Link>
					<Link to="history" className={`${location.pathname === '/admin/history' && "font-bold"} admin-link`}>History</Link>
					<Link to="products" className={`${location.pathname === '/admin/products' && "font-bold"} admin-link`}>
						Products
						<span className='absolute bg-red-900 h-[18px] w-[18px] text-[10px] flex items-center justify-center top-[-2px] right-[-12px] rounded-full'>{products.length}</span>
					</Link>
					<Link to="products/create" className={`${location.pathname === '/admin/products/create' && "font-bold"} admin-link`}>Create Product</Link>
				</div>

				<Routes>
					<Route path="/requests" element={
						<div className={`w-full flex flex-col justify-start ${!pendingRequests || pendingRequests.length === 0 && "justify-center items-center"} gap-[20px] min-h-[525px] max-h-[525px] overflow-y-auto`}>
							{pendingRequests && pendingRequests.length !== 0 ?
								pendingRequests.map((item, index) => (
									<RequestItem key={index + item._id} req={item} setIsLoading={setIsLoading} />
								))
								: <h2 className='text-3xl text-white font-bold text-center'>There are no requests so far</h2>
							}
						</div>
					} />
					<Route path="history" element={
						<div className={`w-full flex flex-col justify-start ${!pendingRequests || pendingRequests.length === 0 ? "justify-center items-center" : "items-start justify-start"} gap-[20px] min-h-[525px] max-h-[525px] overflow-y-auto`}>
							{requests && requests.length !== 0 ?
								requests.map((item, index) => (
									<RequestItem key={index + item._id} req={item} changeable={true} />
								))
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
						<CreateProducts />
					} />
				</Routes>
			</div>

			{isLoading && <Loader />}

			{response && <Popup />}

		</div>
	)
}

export default AdminPage;