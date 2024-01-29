import { IProduct } from "../interfaces"
import { useMyContext } from "../providers/ContextProvider";
import { deleteProduct } from "../utils";

interface ProductsItemProps {
	product: IProduct;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductsItem = ({ product, setIsLoading }: ProductsItemProps) => {

	const { setResponse } = useMyContext();

	const handleRemove = async () => {
		setIsLoading(true);
		await deleteProduct(product._id)
			.then(() => setResponse("Product deleted successfully"))
			.catch(() => setResponse("Something went wrong"));
		setIsLoading(false);
	}

	return (
		<div className="w-full h-[120px] bg-white rounded-xl p-6 flex flex-row justify-between items-center text-xl">
			<div className="font-bold flex justify-center items-center">
				<img src={`${import.meta.env.VITE_APP_SERVER_URL}/${product?.image}`} alt={product._id + product.name} className="h-[45px] w-[45px]" />
				{product.name}
			</div>
			<div className="hidden md:block">{product._id}</div>
			<div className="font-bold text-red-500">{product.price} points</div>
			<button className="font-bold text-red-500" onClick={() => handleRemove()} >Remove</button>
		</div>
	)
}

export default ProductsItem