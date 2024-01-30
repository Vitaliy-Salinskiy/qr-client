import { Link } from "react-router-dom"

import HistoryTable from "../components/HIstoryTable"

const StatisticPage = () => {
	return (
		<div className="bg-red-500">

			<div className="container mx-auto px-[20px] items-start">
				<div className="min-h-screen flex flex-col justify-start items-start py-16 gap-10 text-white font-bold">
					<Link to='/' className="outline-none text-[14px] font-bold text-center leading-[110%] bg-white text-red-500 p-2 rounded-xl cursor-pointer"> Back to QR-page</Link>
					<HistoryTable />
				</div>
			</div>
		</div>
	)
}

export default StatisticPage