import { useEffect, useState } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { motion } from "framer-motion"

import { useMyContext } from "../providers/ContextProvider"
import { fetchData } from "../utils"
import { IUser } from "../interfaces"

interface LeadersTableProps {
	isExtended?: boolean
}

const LeadersTable = ({ isExtended = true }: LeadersTableProps) => {

	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<IUser[]>([])
	const { id, response } = useMyContext()


	useEffect(() => {
		setIsLoading(true)
		fetchData()
			.then(data => setData(data))
			.finally(() => {
				setTimeout(() => {
					setIsLoading(false)
				}, 1000)
			})
	}, [id, response])

	return (
		<div className='rounded-xl bg-white w-full py-5 px-3 flex gap-4 flex-col items-center border-[8px] border-white'>
			<motion.h2 animate={{ scale: [0.1, 1] }} transition={{ type: "spring", duration: 0.7 }} className="text-[34px] text-darkGrey underline underline-offset-8 font-bold">Топ користувачів</motion.h2>
			{data.length > 0 ?
				<table className="w-full">
					<tbody className="flex flex-col gap-2">
						{isLoading
							? (
								Array(3).fill(0).map((_, index) => (
									<SkeletonTheme baseColor="#F5A006" highlightColor="#3F3D56" key={index}>
										<motion.div
											animate={{ opacity: [0, 1], height: [0, 52], scale: [0.8, 1] }}
											transition={{
												opacity: { type: "spring", delay: 0.15 * index },
												scale: { type: "spring", delay: 0.15 * index },
												height: { duration: 0.1 * index, type: "spring", delay: 0.075 * index }
											}}
										>
											<Skeleton className="h-[52px] rounded-xl" />
										</motion.div>
									</SkeletonTheme>
								))
							)
							: data.map((item, index) => (
								item.timesScanned > 0 && (
									<motion.tr animate={{ opacity: [0, 1], scale: [0.8, 1] }} transition={{ type: "spring", delay: 0.2 * index }} key={item.id} className={`w-full ${id === item.id ? "bg-mainOrange" : "bg-[#fabf55]"} flex text-lightGrey font-medium justify-between text-[14px] sm:text-[14px] md:text-lg lg:text-xl py-3 px-4 rounded-xl`}>
										<td>{index + 1}</td>
										{
											item.name && item.surname && (
												<td>{item.name} {item.surname}</td>
											)
										}
										{
											isExtended && (
												<td className="hidden sm:block">останнє сканування: {item.lastScanned?.slice(0, 10).split("-").reverse().join("/")}</td>
											)
										}
										<td>scans: {item.timesScanned}</td>
									</motion.tr>
								)
							))}
					</tbody>
				</table>
				: !isLoading && data.length === 0 && <h2 className="text-[20px] text-mainOrange">У вас є шанс бути першим</h2>
			}

		</div>
	)
}

export default LeadersTable;