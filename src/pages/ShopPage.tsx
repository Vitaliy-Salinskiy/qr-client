import { useEffect, useRef, useState } from 'react';
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import { Link } from 'react-router-dom';
import { createRequest } from '../utils';
import { useMyContext } from '../providers/ContextProvider';

import { GoodItem } from '../components/GoodItem';
import Loader from '../components/Loader';
import Popup from '../components/Popup';
import { IProduct, IUser } from '../interfaces';
import { getProducts, getUser } from '../utils';

const ShopPage = () => {

	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const initialRender = useRef<boolean>(true);
	const [user, setUser] = useState<IUser>();
	const { setResponse } = useMyContext();
	const [currentItem, setCurrentItem] = useState<IProduct | null>();

	const { id, setId, response } = useMyContext();

	useEffect(() => {
		if (!id) {
			FingerprintJS.load()
				.then(fp => fp.get())
				.then(result => {
					setId(result.visitorId);
					getUserData(result.visitorId);
				})
		}
	}, [id])

	useEffect(() => {
		if (id) {
			getUserData(id);
		}
	}, [isLoading])

	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false;
			fetchData();
		}
	}, []);

	const fetchData = async () => {
		setIsLoading(true);
		await getProducts().then(data => setProducts(data)).finally(() => setIsLoading(false));
	}

	const getUserData = async (id: string) => {
		await getUser(id)
			.then((data) => setUser(data))
			.catch(() => { })
	}

	const handleRequestSend = async (userId: string | null, productId: string) => {
		if (userId) {
			try {
				await createRequest(userId, productId);
				setResponse("Request has been successfully sent");
			} catch (error) {
				setResponse("You do not have enough points");
				setCurrentItem(null);
			} finally {
				setIsLoading(false);
			}
		}
	};

	const handleYesClick = () => {
		handleRequestSend(user?.id as string, currentItem?._id as string);
	};

	const handleNoClick = () => {
		setCurrentItem(null);
	};

	return (
		<div className="bg-red-500 pt-5">

			<div className='w-full appContainer flex justify-between items-center px-2'>
				<Link to='/' className="outline-none text-[14px] font-bold text-center leading-[110%] bg-white text-red-500 p-2 rounded-xl cursor-pointer"> Back to QR-page</Link>

				{user?.name && user?.surname &&
					<div className='text-white text-lg'>{user?.name} {user?.surname}: {user?.timesScanned} points</div>
				}
			</div>

			<h2 className="text-[36px] sm:text-[50px] font-bold text-center leading-[110%] w-full bg-white text-red-500  mt-6 py-[20px]">Shop</h2>

			{currentItem ? (
				<div className="w-full h-screen flex items-center justify-center backdrop-blur-sm fixed top-0">
					<div className="max-w-[300px] bg-white shadow-sm shadow-white rounded-lg flex flex-col justify-around items-center gap-[20px] p-[20px]">
						<h2 className='max-w-[280px] text-center whitespace-normal'>Are you sure to buy <span className='text-red-500'>{currentItem.name}</span>?</h2>
						<div className='flex gap-[20px]'>
							<button className='w-[70px] h-[30px] border-2 border-red-500 bg-red-500 hover:bg-transparent outline-none text-white hover:text-red-500 rounded-md transition-colors disabled:opacity-75'
								onClick={handleYesClick}
							>Yes</button>
							<button className='w-[70px] h-[30px] border-2 border-red-600 bg-red-600 hover:bg-transparent outline-none text-white hover:text-red-600 rounded-md transition-colors disabled:opacity-75'
								onClick={handleNoClick}
							>No</button>
						</div>
					</div>
				</div>
			) : null}


			<div className='appContainer mt-20 mb-10'>
				<div className="flex flex-wrap justify-around items-center gap-[20px] md:gap-[30px]">
					{products && products.length !== 0 ? products.map((item: IProduct, index: number) => (
						<GoodItem key={index} product={item} setCurrItem={setCurrentItem} />
					)) : (
						<h2 className='text-[34px] text-white font-bold'>There are no products so far</h2>
					)}
				</div>

			</div>

			{isLoading &&
				<Loader />
			}

			{response && <Popup />}

		</div>
	)
}

export default ShopPage;