import { IProduct } from '../interfaces';
const baseUlr = import.meta.env.VITE_APP_SERVER_URL;
import { Dispatch } from 'react';

interface GoodItemProps {
	product: IProduct;
	setCurrItem: Dispatch<IProduct | null>;
}

export const GoodItem = ({ product, setCurrItem }: GoodItemProps) => {
	return (
		<div
			className="h-[240px] w-[150px] bg-white flex flex-col justify-around items-center rounded-xl border-red-400 transition-all duration-300 border-[1px] cursor-pointer hover:border-[5px]"
			onClick={() => setCurrItem(product)}
		>

			<div className='w-full h-[130px] px-2 py-0'>
				<img
					src={`${baseUlr}/${product.image}`}
					alt="good img"
					className='object-cover h-full w-full rounded-md'
					onError={(e) => {
						(e.target as HTMLImageElement).src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEcTP7Xdiuel5OammWjMZJwcerzXu7D0DZaw&usqp=CAU';
					}}
				/>
			</div>

			<h3 className='w-full bg-red-400 text-white text-xl flex justify-center text-center'>{product.name}</h3>
			<h2 className='text-2xl text-red-500 font-bold'>{product.price} points</h2>
		</div>
	);
}