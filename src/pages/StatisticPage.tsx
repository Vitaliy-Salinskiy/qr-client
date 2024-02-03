import LinkButton from "../components/LinkButton"
import HistoryTable from "../components/HIstoryTable"

const StatisticPage = () => {
	return (
		<div>

			<div className="container mx-auto px-[20px] items-start">
				<div className="min-h-screen flex flex-col justify-start items-start py-16 gap-10 text-white font-bold">
					<LinkButton to="/">Назад до QR</LinkButton>
					<HistoryTable />
				</div>
			</div>
		</div>
	)
}

export default StatisticPage