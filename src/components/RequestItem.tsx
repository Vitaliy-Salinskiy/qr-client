import { useState } from 'react';

import { IRequest } from '../interfaces';
import { allowRequest, denyRequest } from '../utils';

interface RequestItemProps {
	req: IRequest,
	changeable?: boolean,
	setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

export const RequestItem = ({ req, changeable = false, setIsLoading }: RequestItemProps) => {

	const [isDisabled, setIsDisabled] = useState<boolean>(false);

	const handleAllow = async () => {
		if (setIsLoading) {
			setIsLoading(true);
			setIsDisabled(true);
			await allowRequest(req._id)
				.finally(() => setIsDisabled(false));
			setIsLoading(false);
		}
	};

	const handleDeny = async () => {
		if (setIsLoading) {
			setIsLoading(true);
			setIsDisabled(true);
			await denyRequest(req._id)
				.finally(() => setIsDisabled(false));
			setIsLoading(false);
		}
	};
	return (
		<div className="w-full h-[120px] bg-white rounded-xl p-4 flex flex-col justify-between items-center">
			<div className="w-full flex justify-between gap-[10px]">
				<h2 className='text-base sm:text-lg font-medium'>{req.userId?.name + " " + req.userId?.surname}</h2>
				<h3 className={`hidden  ${changeable ? "lg:flex" : "md:flex"} text-md text-gray-500`}>id: {req.userId.id}</h3>
				<div className='flex flex-col gap-[5px] sm:flex-row sm:gap-[20px] text-center whitespace-nowrap'>
					<h2 className='text-base sm:text-xl font-bold'>{req.productId?.name}</h2>
					<h2 className='font-bold text-base sm:text-xl text-red-500'>{req.productId?.price} Points</h2>
				</div>
				{changeable &&
					<div className='flex flex-col gap-1 md:gap-4 md:flex-row justify-center items-center text-center whitespace-nowrap'>
						<h2 className={`font-bold text-base lg:text-xl ${req?.status === "pending" ? "text-yellow-400" : req?.status === "allowed" ? "text-green-500" : "text-red-500"}`}>{req?.status}</h2>
						<h2 className={`font-bold text-base`}>{req.updatedAt?.slice(0, 10).split("-").reverse().join("/")}</h2>
					</div>
				}
			</div>
			<div className={`${changeable && "hidden"} w-full flex justify-center sm:justify-end gap-[10px] mt-[5px]`}>
				<button
					disabled={isDisabled}
					className='w-[100px] sm:w-[120px] h-[26px] sm:h-[30px] border border-red-500 bg-red-500 hover:bg-transparent outline-none text-white hover:text-red-500 rounded-md transition-colors disabled:opacity-75'
					onClick={handleAllow}
				>
					Accept
				</button>
				<button
					disabled={isDisabled}
					className='w-[100px] sm:w-[120px] h-[26px] sm:h-[30px] border border-red-600 bg-red-600 hover:bg-transparent outline-none text-white hover:text-red-600 rounded-md transition-colors disabled:opacity-75'
					onClick={handleDeny}
				>
					Decline
				</button>
			</div>
		</div>
	)
}
