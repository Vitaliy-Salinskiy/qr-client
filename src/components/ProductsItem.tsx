import { useState } from "react";

import { IProduct } from "../interfaces";
import { deleteProduct, playPop } from "../utils";
import { useStore } from "../store/store";

interface ProductsItemProps {
  product: IProduct;
  invalidateFns?: Array<() => void>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductsItem = ({
  product,
  setIsLoading,
  invalidateFns,
}: ProductsItemProps) => {
  const { setResponse } = useStore();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleRemove = async () => {
    playPop();
    setIsLoading(true);
    setIsDisabled(true);
    await deleteProduct(product._id)
      .catch(() => setResponse("Щось пішло не так"))
      .finally(() => {
        invalidateFns && invalidateFns.forEach((fn) => fn());
        setIsDisabled(false);
      });
    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-[80px] h-auto bg-white rounded-xl p-[10px] flex flex-row justify-between items-center text-xl">
      <div className="font-bold flex justify-start items-center gap-[10px] md:gap-[30px] md:w-[20%]">
        <img
          src={`${import.meta.env.VITE_APP_SERVER_URL}/${product?.image}`}
          alt={product._id + product.name}
          className="bg-mainOrange h-[45px] w-[45px] rounded-lg text-[6px]"
        />
        <p className="text-base max-w-[75px] sm:max-w-[125px] md:max-w-[175px] sm:text-lg overflow-hidden overflow-ellipsis whitespace-nowrap">
          {product.name}
        </p>
      </div>
      <div className="hidden md:block md:max-w-[30%] text-center text-[16px]">
        {product._id}
      </div>
      <div className="font-bold text-mainOrange md:w-[10%] text-center text-sm md:text-lg sm:text-lg sm:font-medium">
        {product.price} балів
      </div>
      <button
        className="w-[70px] text-sm sm:w-[120px] h-[26px] sm:h-[30px] sm:text-lg border border-darkGrey bg-darkGrey hover:bg-transparent outline-none text-white hover:text-darkGrey rounded-md transition-colors disabled:opacity-75"
        onClick={() => handleRemove()}
        disabled={isDisabled}
      >
        Видалити
      </button>
    </div>
  );
};

export default ProductsItem;
