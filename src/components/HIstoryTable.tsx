import { useEffect, useState } from "react"
import FingerprintJS from "@fingerprintjs/fingerprintjs"

import { useMyContext } from "../providers/ContextProvider"
import { getUser } from "../utils"
import { IScanHistory, IUser } from "../interfaces"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

const HistoryTable = () => {

	const [data, setData] = useState<IScanHistory[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const { id, setId } = useMyContext();

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
		if (id) {
			setIsLoading(true)
			getUser(id)
				.then((data: IUser) => setData((data.scanHistory).reverse()))
				.finally(() => {
					setTimeout(() => {
						setIsLoading(false)
					}, 1500)
				})
		}
	}, [id])

	return (
		<div className='rounded-xl bg-white w-full py-5 px-3 flex gap-4 flex-col items-center border-[8px] border-white'>
			<h2 className="text-[34px] text-darkGrey underline underline-offset-8 font-bold">Історія сканувань</h2>
			{isLoading
				?
				<div className="w-full">
					{Array(3).fill(0).map((_, index) => (
						<div className="w-full flex flex-col" key={index}>
							<SkeletonTheme baseColor="#F5A006" highlightColor="#fadba7">
								<Skeleton className="w-full flex font-medium justify-between text-[8px] sm:text-[10px] md:text-lg lg:text-xl py-3 px-4 rounded-xl" />
							</SkeletonTheme>
						</div>
					))}
				</div>
				: data.length > 0
					? data.map((item, index) => (
						<tr key={item._id} className="w-full font-medium bg-mainOrange flex justify-between text-[8px] sm:text-[10px] md:text-lg lg:text-xl py-3 px-4 rounded-xl">
							<td>{index + 1}</td>
							<td>Загальні кількість: {item.totalScans}</td>
							<td>Дата: {item.date.slice(0, 10).split("-").reverse().join("/")}</td>
						</tr>
					))
					: <tr><td>Немає даних</td></tr>
			}
		</div>
	)
}

export default HistoryTable