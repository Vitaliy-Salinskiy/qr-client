import { useEffect, useRef, useState } from 'react';
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import { Link } from 'react-router-dom';

import { useMyContext } from '../providers/ContextProvider';
import { GoodItem } from '../components/GoodItem';
import { IProduct, IUser } from '../interfaces';
import { getProducts, getUser, createRequest } from '../utils';
import Popup from '../components/Popup';
import Skeleton  from 'react-loading-skeleton';

const ShopPage = () => {

	const { setResponse, id, setId } = useMyContext();

	const [user, setUser] = useState<IUser>();
	const [products, setProducts] = useState<IProduct[]>([]);
	const [currentItem, setCurrentItem] = useState<IProduct | null>();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const initialRender = useRef<boolean>(true);

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
		await getProducts().then(data => setProducts(data)).finally(() => {
			setTimeout(() => {
				setIsLoading(false);
			}, 1500);
		})
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
				setResponse((prevState) => [...prevState, "Request has been successfully sent"]);
			} catch (error) {
				setResponse((prevState) => [...prevState, "You do not have enough points"]);
				setCurrentItem(null);
			} finally {
				setIsLoading(false);
			}
		}
	};

	const handleYesClick = async () => {
		await handleRequestSend(user?.id as string, currentItem?._id as string);
		await getUserData(user?.id as string);
		setCurrentItem(null);
	};

	const handleNoClick = () => {
		setCurrentItem(null);
	};

	return (
		<div className="pt-5">

			<Popup />

			<div className='w-full appContainer flex justify-between items-center px-2'>
				<Link to='/' className="outline-none text-[14px] font-bold text-center leading-[110%] bg-white text-mainOrange p-2 rounded-xl cursor-pointer"> Назад на QR-сторінку</Link>

				{user?.name && user?.surname &&
					<div className='text-midDarkGrey text-lg bg-white py-1 px-2 rounded-lg font-bold shadow-white shadow-sm'><span className='text-mainOrange'>{user?.name} {user?.surname} </span>: {user?.timesScanned} points</div>
				}
			</div>

			<h2 className="text-[36px] sm:text-[50px] font-bold text-center leading-[110%] w-full bg-white text-midDarkGrey mt-6 py-[20px]">Магазин</h2>

			{currentItem ? (
				<div className="w-full h-screen flex items-center justify-center backdrop-blur-sm fixed top-0">
					<div className="max-w-[300px] bg-white shadow-sm shadow-white rounded-lg flex flex-col justify-around items-center gap-[20px] p-[20px]">
						<h2 className='max-w-[280px] text-center whitespace-normal'>Ви впевнені, що купите <span className='text-mainOrange'>{currentItem.name}</span>?</h2>
						<div className='flex gap-[20px]'>
							<button className='w-[70px] h-[30px] border-2 border-mainOrange bg-mainOrange hover:bg-transparent outline-none text-white hover:text-mainOrange rounded-md transition-colors disabled:opacity-75'
								onClick={handleYesClick}
							>Так</button>
							<button className='w-[70px] h-[30px] border-2 border-midDarkGrey bg-midDarkGrey hover:bg-transparent outline-none text-white hover:text-midDarkGrey rounded-md transition-colors disabled:opacity-75'
								onClick={handleNoClick}
							>Ні</button>
						</div>
					</div>
				</div>
			) : null}

			<div className='appContainer mt-20 mb-10'>
				<div className="flex flex-wrap justify-around items-center gap-[20px] md:gap-[30px]">
					{isLoading
						? Array(5).fill(0).map((_, index) => (
							<Skeleton key={index} className='h-[240px] w-[150px] bg-white flex flex-col justify-around items-center rounded-xl border-mainOrange transition-all duration-300 border-[1px] cursor-pointer hover:border-[5px]' />
						))
						: products && products.length !== 0
							? products.map((item: IProduct, index: number) => (
								<GoodItem key={index} product={item} setCurrItem={setCurrentItem} />
							))
							: <h2 className='text-[34px] text-white font-bold'>There are no products so far</h2>
					}
				</div>
			</div>

		</div>
	)
}

export default ShopPage;