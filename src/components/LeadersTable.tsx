import { useEffect, useState } from "react"

import { useMyContext } from "../providers/ContextProvider"
import { fetchData } from "../utils"
import { IUser } from "../interfaces"

interface LeadersTableProps {
	isExtended?: boolean
}

const LeadersTable = ({ isExtended = true }: LeadersTableProps) => {
	const [data, setData] = useState<IUser[]>([])
	const { id, response } = useMyContext()

	useEffect(() => {
		fetchData().then(data => setData(data))
	}, [id, response])

	return (
		<div className='rounded-xl bg-white w-full py-5 px-3 flex gap-4 flex-col items-center border-[8px] border-white'>
			<h2 className="text-[34px] text-darkGrey underline underline-offset-8 font-bold">Top Users</h2>
			{data.length > 0 ?
				<table className="w-full">
					<tbody className="flex flex-col gap-2">
						{data.map((item, index) => (
							item.timesScanned > 0 && (
								<tr key={item.id} className={`w-full ${id === item.id ? "bg-mainOrange" : "bg-[#fabf55]"} flex text-lightGrey font-medium justify-between text-[14px] sm:text-[14px] md:text-lg lg:text-xl py-3 px-4 rounded-xl`}>
									<td>{index + 1}</td>
									{
										item.name && item.surname && (
											<td>{item.name} {item.surname}</td>
										)
									}
									{
										isExtended && (
											<td className="hidden sm:block">last scan: {item.lastScanned?.slice(0, 10).split("-").reverse().join("/")}</td>
										)
									}
									<td>scans: {item.timesScanned}</td>
								</tr>
							)
						))}
					</tbody>
				</table>
				: <h2 className="text-[20px] text-mainOrange">You have the chance to be the first</h2>
			}
			
		</div>
	)
}

export default LeadersTable;