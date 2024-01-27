import message_icon from '../assets/images/mail.png'
import { useState, useEffect } from 'react';
import { useMyContext } from '../providers/ContextProvider';

const Popup = () => {
	const [isVisible, setIsVisible] = useState(false);
	const { response, setResponse } = useMyContext();

	useEffect(() => {
		setTimeout(() => {
			setIsVisible(true);
			setTimeout(() => {
				setIsVisible(false);
				setTimeout(() => {
					setResponse(null);
				}, 1000)
			}, 2000);
		}, 1);
	}, []);

	return (
		<div className='w-[80%] sm:w-[320px] min-h-[85px] p-[10px] cursor-pointer bg-white fixed transition-all overflow-hidden duration-500 bottom-[30px] right-[-100%] rounded-lg shadow-black drop-shadow-md shadow-md flex items-center gap-[20px]'
			style={!isVisible ? { right: '-100%' } : { right: '20px' }}>
			<div>
				<img height={50} width={50} src={message_icon} alt="mail" />
			</div>
			<div className=" flex flex-col transition-all duration-1000 justify-between items-start"	>
				<p className='h-[48px] text-md text-black font-normal text-ellipsis'>{response}</p>
			</div>
		</div >
	)
}

export default Popup;