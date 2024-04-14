import { Dispatch } from "react";

import { IProduct } from "../interfaces";

const baseUlr = import.meta.env.VITE_APP_SERVER_URL;

interface GoodItemProps {
  product: IProduct;
  setCurrItem: Dispatch<IProduct | null>;
}

export const GoodItem = ({ product, setCurrItem }: GoodItemProps) => {
  return (
    <div className="good-item" onClick={() => setCurrItem(product)}>
      <div className="w-full h-[130px] px-2 py-0 flex justify-center items-center">
        <div className="w-full h-[130px] max-h-[130px] flex justify-center items-center bg-midDarkGrey rounded-md">
          <img
            src={`${baseUlr}/${product.image}`}
            alt="good img"
            className="object-cover h-[100px] rounded-md"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEcTP7Xdiuel5OammWjMZJwcerzXu7D0DZaw&usqp=CAU";
            }}
          />
        </div>
      </div>

      <h3 className="w-[calc(100%-16px)] px-[2px] bg-midDarkGrey text-white text-xl flex justify-center items-center text-center rounded-md h-[56px] max-h-[56px]">
        {product.name}
      </h3>
      <h2 className="text-2xl text-mainOrange font-bold">
        {product.price} балів
      </h2>
    </div>
  );
};
