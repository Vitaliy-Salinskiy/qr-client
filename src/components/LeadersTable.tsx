import { useEffect } from "react"

import { useMyContext } from "../providers/ContextProvider"
import { useFetchUsers } from "../utils"
import { IUser } from "../interfaces"
import Loader from "./Loader"

interface LeadersTableProps {
	isExtended?: boolean
}

const LeadersTable = ({ isExtended = true }: LeadersTableProps) => {

	const { id, message } = useMyContext()

	const { data: leaders, refetch, isLoading } = useFetchUsers();

	useEffect(() => {
		refetch()
	}, [message, id])

	return (
		<div className='rounded-xl bg-white w-full py-5 px-3 flex gap-4 flex-col items-center border-[8px] border-white'>

			{isLoading && <Loader />}

			<h2 className="text-[34px] text-red-500 underline underline-offset-8 font-bold">Top Users</h2>
			{leaders && leaders.length > 0 ?
				<table className="w-full">
					<tbody className="flex flex-col gap-2">
						{leaders.map((item: IUser, index: number) => (
							item.timesScanned > 0 && (
								<tr key={item.id} className={`w-full ${id === item.id ? "bg-red-400" : "bg-red-200"} flex justify-between text-[14px] sm:text-[14px] md:text-lg lg:text-2xl py-3 px-4 rounded-xl`}>
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
				: <h2 className="text-[20px] text-red-500">You have the chance to be the first</h2>
			}
		</div>
	)
}

export default LeadersTable;