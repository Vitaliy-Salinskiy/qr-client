import { useEffect, useRef, useState } from 'react';
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

import { useMyContext } from '../providers/ContextProvider';
import { GoodItem } from '../components/GoodItem';
import Loader from '../components/Loader';
import Popup from '../components/Popup';
import { IProduct } from '../interfaces';
import { getProducts } from '../utils';

const ShopPage = () => {

	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const initialRender = useRef<boolean>(true);

	const { id, setId, response } = useMyContext();

	useEffect(() => {
		if (!id) {
			FingerprintJS.load()
				.then(fp => fp.get())
				.then(result => {
					setId(result.visitorId);
				})
		}
	}, [id])

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

	return (
		<div className="bg-red-500 pt-5">

			<div className='appContainer'>
				<Link to='/' className="outline-none text-[14px] font-bold text-center leading-[110%] bg-white text-red-500 p-2 rounded-xl m-4 top-0 left-0 cursor-pointer"> Back to QR-page</Link>
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

		</div >
	)
}

export default ShopPage;