import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react'
import { RequestItem } from '../components/RequestItem';
import { IRequest } from '../interfaces';
import { getRequests } from '../utils';

import Loader from '../components/Loader';
import { useMyContext } from '../providers/ContextProvider';
import Popup from '../components/Popup';

const AdminPage: React.FC = (): JSX.Element => {

	const location = useLocation();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [requests, setRequests] = useState<IRequest[]>([]);
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
			fetchData();
		}
	}, []);

	useEffect(() => {
		if (isLoading) {
			fetchData();
		}
	}, [isLoading]);

	const fetchData = async () => {
		setIsLoading(true);
		await getRequests().then((data) => {
			setRequests(data.sort((a: IRequest, b: IRequest) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
			setPendingRequests(data.filter((item: IRequest) => item.status === "pending"));
		})
		setIsLoading(false);
	};

	return (
		<div className="w-full max-h-[800px] h-screen flex justify-center items-center bg-red-500">
			<h2 className="text-[42px] sm:text-[50px] font-bold text-center leading-[110%] w-full bg-white text-red-500 absolute mt-16 top-0 py-[20px]">Admin page</h2>
			<div className="max-w-screen-lg w-full h-full flex flex-col justify-around items-center px-[10px] relative">

				<Link to='/' className="outline-none text-[14px] font-bold text-center leading-[110%] bg-white text-red-500 absolute p-2 rounded-xl m-4 top-0 left-0 cursor-pointer"> Back to QR-page</Link>

				<div className="text-[50px] text-transparent select-none">
					empty
				</div>

				<div className='flex gap-[20px] text-xl text-white absolute top-[170px] right-4'>
					<Link to='requests' className={`${location.pathname === '/admin/requests' && "font-bold"} cursor-pointer transition-all duration-100 relative`}>Requests
						<span className='absolute bg-red-900 h-[18px] w-[18px] text-[10px] flex items-center justify-center top-[-2px] right-[-12px] rounded-full'>{pendingRequests.length}</span>
					</Link>
					<Link to="history" className={`${location.pathname === '/admin/history' && "font-bold"} cursor-pointer transition-all duration-100`}>History</Link>
				</div>

				<Routes>
					<Route path="/requests" element={
						<div className="w-full flex flex-col justify-start gap-[20px] max-h-[525px] pr-2 overflow-y-auto">
							{pendingRequests && pendingRequests.length !== 0 ?
								pendingRequests.map((item, index) => (
									<RequestItem key={index + item._id} req={item} setIsLoading={setIsLoading} />
								))
								: <h2 className='text-3xl text-white font-bold text-center'>There are no requests so far</h2>
							}
						</div>
					} />
					<Route path="history" element={
						<div className="w-full flex flex-col justify-start gap-[20px] max-h-[525px] pr-2 overflow-y-auto">
							{requests && requests.length !== 0 ?
								requests.map((item, index) => (
									<RequestItem key={index + item._id} req={item} changeable={true} />
								))
								: <h2 className='text-3xl text-white font-bold text-center'>There are no requests so far</h2>
							}
						</div>
					} />
				</Routes>
			</div>

			{isLoading &&
				<Loader />
			}

			{response && <Popup />}

		</div>
	)
}

export default AdminPage;