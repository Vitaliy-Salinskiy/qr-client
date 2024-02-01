import { useState } from "react";

import { IProduct } from "../interfaces"
import { useMyContext } from "../providers/ContextProvider";
import { deleteProduct } from "../utils";

interface ProductsItemProps {
	product: IProduct;
	invalidateFns?: Array<() => void>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductsItem = ({ product, setIsLoading, invalidateFns }: ProductsItemProps) => {

	const { setResponse } = useMyContext();
	const [isDisabled, setIsDisabled] = useState<boolean>(false);

	const handleRemove = async () => {
		setIsLoading(true);
		setIsDisabled(true);
		await deleteProduct(product._id)
			.then(() => setResponse("Product deleted successfully"))
			.catch(() => setResponse("Something went wrong"))
			.finally(() => {
				invalidateFns && invalidateFns.forEach((fn) => fn());
				setIsDisabled(false)
			});
		setIsLoading(false);
	}

	return (
		<div className="w-full h-[120px] bg-white rounded-xl p-[10px] flex flex-row justify-between items-center text-xl">
			<div className="font-bold flex justify-start items-center gap-[10px] md:gap-[30px] md:w-[20%]">
				<img src={`${import.meta.env.VITE_APP_SERVER_URL}/${product?.image}`} alt=
					{product._id + product.name}
					className="bg-red-500 h-[45px] w-[45px] rounded-lg text-[6px]" />
				<p className="text-[16px] max-w-[75px] sm:text-lg">{product.name}</p>
			</div>
			<div className="hidden md:block md:max-w-[30%] text-center text-[16px]">{product._id}</div>
			<div className="font-bold text-red-500 md:w-[10%] text-center text-sm md:text-lg sm:text-lg sm:font-medium">{product.price} points</div>
			<button className="w-[70px] text-sm sm:w-[120px] h-[26px] sm:h-[30px] sm:text-lg border border-red-600 bg-red-600 hover:bg-transparent outline-none text-white hover:text-red-600 rounded-md transition-colors disabled:opacity-75" onClick={() => handleRemove()} disabled={isDisabled}>Remove</button>
		</div>
	)
}

export default ProductsItem