import { useEffect, useRef, useState } from 'react';
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import Cookies from 'js-cookie';
import { GoodItem } from '../components/GoodItem';

import { IProduct } from '../interfaces';
import { getProducts } from '../utils';
import { useMyContext } from '../providers/ContextProvider';
import Loader from '../components/Loader';
import Popup from '../components/Popup';
import { Link } from 'react-router-dom';

const ShopPage: React.FC = (): JSX.Element => {

	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const initialRender = useRef<boolean>(true);

	const { id, setId, response } = useMyContext();

	useEffect(() => {
		if (!id) {
			FingerprintJS.load()
				.then(fp => fp.get())
				.then(result => {
					const existingCookie = Cookies.get('qr_unique_user_id');
					if (!existingCookie) {
						setId(result.visitorId);
					} else {
						setId(existingCookie);
					}
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
		<div className="container mx-auto px-[20px] max-w-screen-lg">
			<div className="min-h-screen flex flex-col items-center py-16 gap-10 text-white font-bold">

				<Link to='/' className="outline-none text-[14px] font-bold text-center leading-[110%] bg-white text-red-500 absolute p-2 rounded-xl m-4 top-0 left-0 cursor-pointer"> Back to QR-page</Link>
				<h2 className="text-[50px] font-bold text-center leading-[110%] w-full bg-white text-red-500 absolute mt-16 top-0 py-[20px]">Shop</h2>

				<div className="max-w-screen-lg w-full h-full flex flex-col justify-center items-center px-[10px] relative">

					<div className="flex flex-wrap justify-center items-center gap-[10px] md:gap-[30px] mt-[150px]">
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
		</div >
	)
}

export default ShopPage;