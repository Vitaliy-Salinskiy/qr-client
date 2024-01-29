import { useEffect, useRef, useState } from 'react';
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import { Link } from 'react-router-dom';

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

	return (
		<div className="bg-red-500 pt-5">

			<div className='appContainer flex justify-between items-center'>
				<Link to='/' className="outline-none text-[14px] font-bold text-center leading-[110%] bg-white text-red-500 p-2 rounded-xl  cursor-pointer"> Back to QR-page</Link>

				{user &&
					<div className='text-white text-lg'>{user?.name} {user?.surname}: {user?.timesScanned} points</div>
				}

			</div>

			<h2 className="text-[50px] font-bold text-center leading-[110%] w-full bg-white text-red-500  mt-6 py-[20px]">Shop</h2>

			<div className='appContainer mt-20'>

				<div className="flex flex-wrap justify-center items-center gap-[20px] md:gap-[30px]">
					{products && products.length !== 0 ? products.map((item: IProduct, index: number) => (
						<GoodItem key={index} product={item} userId={id} setIsLoading={setIsLoading} />
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