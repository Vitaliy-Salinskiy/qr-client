import { useEffect, useState } from "react"
import FingerprintJS from "@fingerprintjs/fingerprintjs"

import { useMyContext } from "../providers/ContextProvider"
import { getUser } from "../utils"
import { IScanHistory, IUser } from "../interfaces"

const HistoryTable = () => {

	const [data, setData] = useState<IScanHistory[]>([])

	const { id, setId, message } = useMyContext();

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
			getUser(id).then((data: IUser) => setData((data.scanHistory).reverse()))
		}
	}, [message, id])

	return (
		<div className='rounded-xl bg-white w-full py-5 px-3 flex gap-4 flex-col items-center border-[8px] border-white'>
			<h2 className="text-[34px] text-red-500 underline underline-offset-8 font-bold">History</h2>
			{data.length > 0 ?
				<table className="w-full">
					<tbody className="flex flex-col gap-2">
						{data.map((item, index) => (
							<tr key={item._id} className="w-full bg-red-200 flex justify-between text-[8px] sm:text-[10px] md:text-lg lg:text-2xl py-3 px-4 rounded-xl">
								<td>{index + 1}</td>
								<td>total scans: {item.totalScans}</td>
								<td>date: {item.date.slice(0, 10).split("-").reverse().join("/")}</td>
							</tr>
						))}
					</tbody>
				</table>
				: <h2 className="text-[20px] text-red-500">Empty</h2>
			}
		</div>
	)
}

export default HistoryTable