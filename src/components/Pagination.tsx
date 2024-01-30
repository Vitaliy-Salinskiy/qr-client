import ReactPaginate from 'react-paginate';

interface PaginationProps {
	currentPage: number
	totalPages: number
	handlePageClick: (selectedItem: { selected: number }) => void
}

const Pagination = ({ currentPage, totalPages, handlePageClick }: PaginationProps) => {
	return (
		<ReactPaginate
			previousLabel="<"
			nextLabel=">"
			forcePage={currentPage - 1}
			breakLabel="..."
			breakClassName={'text-black hover:text-red-500 transition-colors duration-300'}
			pageCount={totalPages}
			marginPagesDisplayed={1}
			pageRangeDisplayed={2}
			onPageChange={handlePageClick}
			containerClassName='flex items-center justify-center gap-3 sm:gap-4 md:gap-5 text-white bg-white p-1 sm:p-2 rounded-xl shadow-lg drop-shadow-xl select-none outline-none'
			disabledLinkClassName='text-red-300'
			nextLinkClassName='text-red-500 text-lg font-bold flex items-center justify-center transition-transform duration-100 active:scale-90'
			previousLinkClassName='text-red-500 text-lg font-bold flex items-center justify-center transition-transform duration-100 active:scale-90'
			activeClassName="text-white bg-red-500 hover:text-white"
			pageClassName='cursor-pointer w-[25px] sm:w-[30px] h-[25px] sm:h-[30px] rounded-lg text-[13px] sm:text-sm font-medium sm:font-semibold text-black hover:text-red-500 flex items-center justify-center duration-300 border border-transparent hover:border-red-500 transition-all active:scale-[85%]'
		/>
	)
}

export default Pagination