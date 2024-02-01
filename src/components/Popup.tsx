import { useState, useEffect } from 'react';

import message_icon from '../assets/images/mail.png'
import { useMyContext } from '../providers/ContextProvider';

const Popup = () => {

	const { response, setResponse } = useMyContext();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(false);

		return () => {
			setIsVisible(false);
		}
	}, []);

	useEffect(() => {
		if (response.length !== 0 && !isVisible) {
			setTimeout(() => {
				setIsVisible(true)
				setTimeout(() => {
					setResponse((prevState: string[]) => {
						if (prevState.length !== 0) {
							prevState.splice(0, 1);
							setIsVisible(false)
							return [...prevState];
						}
						setIsVisible(false)
						return [];
					});
				}, 3000)
			}, 500)
		}
	}, [response]);

	return (
		<div className='z-20 w-[80%] sm:w-[320px] min-h-[85px] p-[10px] cursor-pointer bg-white fixed transition-all overflow-hidden duration-500 bottom-[30px] right-[-100%] rounded-lg shadow-white drop-shadow-sm shadow-sm flex items-center gap-[20px]'
			style={!isVisible ? { right: '-100%' } : { right: '20px' }}>
			<div>
				<img height={50} width={50} src={message_icon} alt="mail" />
			</div>
			<div className=" flex flex-col transition-all duration-1000 justify-between items-start">
				{isVisible && response.length !== 0 &&
					<p className='h-[48px] text-md text-gray-500 font-medium text-ellipsis'>{response[0]}</p>
				}
			</div>
		</div >
	)
}

export default Popup;