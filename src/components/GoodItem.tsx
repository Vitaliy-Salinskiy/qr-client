import React from 'react';

import { createRequest } from '../utils';
import { IProduct } from '../interfaces';
import { useMyContext } from '../providers/ContextProvider';

const baseUlr = import.meta.env.VITE_APP_SERVER_URL;

interface GoodItemProps {
	product: IProduct;
	userId: string | null;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

}

export const GoodItem = ({ product, userId, setIsLoading }: GoodItemProps) => {

	const { setResponse } = useMyContext();

	const handleRequestSend = async (userId: string | null, productId: string) => {
		if (userId) {
			setIsLoading(true)
			const response = await createRequest(userId, productId)
				.then(() => {
					setResponse(null)
					setResponse("Request has been successfully send")
				})
				.catch(() => {
					setResponse(null)
					setResponse("You do not have enough points")
				})
				.finally(() => setIsLoading(false))
			return response;
		}
		return null;
	}

	return (
		<div
			className="h-[240px] w-[150px] bg-white flex flex-col justify-around items-center rounded-xl border-red-400 transition-all duration-300 border-[1px] cursor-pointer hover:border-[5px]"
			onClick={() => handleRequestSend(userId, product._id)}
		>

			<div className='w-full h-[130px] px-2 py-0'>
				<img
					src={`${baseUlr}/${product.image}`}
					alt="good img"
					className='object-cover h-full w-full'
					onError={(e) => {
						(e.target as HTMLImageElement).src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEcTP7Xdiuel5OammWjMZJwcerzXu7D0DZaw&usqp=CAU';
					}}
				/>			</div>

			<h3 className='w-full bg-red-400 text-white text-xl flex justify-center text-center'>{product.name}</h3>
			<h2 className='text-2xl text-red-500 font-bold'>{product.price} points</h2>
		</div>
	);
}