import ReactPaginate from 'react-paginate';
import { IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
	currentPage: number
	totalPages: number
	handlePageClick: (selectedItem: { selected: number }) => void
}

const Pagination = ({ currentPage, totalPages, handlePageClick }: PaginationProps) => {
	return (
		<ReactPaginate
			previousLabel={
				<div className='pag-arrow'>
					<IoIosArrowForward className='rotate-180' />
				</div>
			}
			nextLabel={
				<div className='pag-arrow'>
					<IoIosArrowForward />
				</div>
			}
			forcePage={currentPage - 1}
			breakLabel="..."
			breakClassName={'text-black hover:text-mainOrange transition-colors duration-300'}
			pageCount={totalPages}
			marginPagesDisplayed={1}
			pageRangeDisplayed={2}
			onPageChange={handlePageClick}
			containerClassName='w-full mb-[20px] flex items-center justify-center gap-3 sm:gap-4 md:gap-5 text-white bg-white p-2 rounded-xl drop-shadow-xl select-none outline-none'
			disabledLinkClassName='text-red-300'
			nextLinkClassName='text-mainOrange text-lg font-bold flex items-center justify-center transition-transform duration-100 active:scale-90'
			previousLinkClassName='text-mainOrange text-lg font-bold flex items-center justify-center transition-transform duration-100 active:scale-90'
			activeClassName="text-white bg-mainOrange hover:text-white"
			pageClassName='cursor-pointer w-[25px] sm:w-[30px] h-[25px] sm:h-[30px] rounded-lg text-[13px] sm:text-sm font-medium sm:font-semibold text-black hover:text-mainOrange flex items-center justify-center duration-300 border border-transparent hover:border-mainOrange transition-all active:scale-[85%]'
			pageLinkClassName='w-full h-full flex items-center justify-center'
		/>
	)
}

export default Pagination