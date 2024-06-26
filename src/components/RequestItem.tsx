import { useState } from "react";

import { IRequest } from "../interfaces";
import { allowRequest, denyRequest, formatDate, playPop } from "../utils";

interface RequestItemProps {
  req: IRequest;
  changeable?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RequestItem = ({
  req,
  changeable = false,
  setIsLoading,
}: RequestItemProps) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleAllow = async () => {
    if (setIsLoading) {
      playPop();
      setIsLoading(true);
      setIsDisabled(true);
      await allowRequest(req._id).finally(() => setIsDisabled(false));
      setIsLoading(false);
    }
  };

  const handleDeny = async () => {
    if (setIsLoading) {
      playPop();
      setIsLoading(true);
      setIsDisabled(true);
      await denyRequest(req._id).finally(() => setIsDisabled(false));
      setIsLoading(false);
    }
  };
  return (
    <div className="req-item">
      <div className="w-full flex justify-between gap-[10px]">
        <h2 className="text-base sm:text-lg font-medium">
          {req.userId?.name + " " + req.userId?.surname}
        </h2>
        <h3
          className={`hidden  ${
            changeable ? "lg:flex" : "md:flex"
          } text-md text-gray-500`}
        >
          id: {req.userId.id}
        </h3>
        <div className="flex flex-col gap-[5px] sm:flex-row sm:gap-[20px] text-center whitespace-nowrap">
          <h2 className="text-base sm:text-xl font-bold">
            {req.productId?.name}
          </h2>
          <h2 className="font-bold text-base sm:text-xl text-mainOrange">
            {req.productId?.price} балів
          </h2>
        </div>
        {changeable && (
          <div className="flex flex-col gap-1 md:gap-4 md:flex-row justify-center items-center text-center whitespace-nowrap">
            <h2
              className={`font-bold text-base lg:text-xl ${
                req?.status === "pending"
                  ? "text-yellow-400"
                  : req?.status === "allowed"
                  ? "text-green-500"
                  : "text-mainOrange"
              }`}
            >
              {req?.status}
            </h2>
            <h2 className={`font-bold text-base`}>
              {formatDate(req.updatedAt)}
            </h2>
          </div>
        )}
      </div>
      <div
        className={`${
          changeable && "hidden"
        } w-full flex justify-center sm:justify-end gap-[10px] mt-[5px]`}
      >
        <button
          disabled={isDisabled}
          className="w-[100px] sm:w-[120px] h-[26px] sm:h-[30px] border border-mainOrange bg-mainOrange hover:bg-transparent outline-none text-white hover:text-mainOrange rounded-md transition-colors disabled:opacity-75"
          onClick={handleAllow}
        >
          Прийняти
        </button>
        <button
          disabled={isDisabled}
          className="w-[100px] sm:w-[120px] h-[26px] sm:h-[30px] border border-darkGrey bg-darkGrey hover:bg-transparent outline-none text-white hover:text-darkGrey rounded-md transition-colors disabled:opacity-75"
          onClick={handleDeny}
        >
          Відхилити
        </button>
      </div>
    </div>
  );
};
