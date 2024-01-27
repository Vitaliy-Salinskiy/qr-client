import React from 'react'
import message_icon from '../assets/images/mail.png'
import { useState, useEffect } from 'react';

const Popup: React.FC = (): JSX.Element => {
	const [isVisible, setIsVisible] = useState(false);
	const [showInfo, setShowInfo] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsVisible(true);
			setTimeout(() => { setShowInfo(true); }, 1000);
		}, 2000);
	}, []);

	const closePopup = (): void => {
		setShowInfo(false);
		setTimeout(() => { setIsVisible(false); }, 1000);
	}

	return (
		<div
			className='w-300px h-[85px] p-[10px] cursor-pointer bg-white fixed transition-all overflow-hidden duration-500 bottom-[30px] right-[-100%] rounded-lg shadow-white drop-shadow-xl shadow-sm flex justify-between items-center gap-[20px]'
			style={!isVisible ? { right: '-100%' } : { right: '30px' }}
			onClick={() => {
				closePopup();
			}}
		>
			<div>
				<img height={50} width={50} src={message_icon} alt="mail" />
			</div>
			<div
				className="w-[200px] flex flex-col transition-all duration-1000 justify-between items-start"
				style={showInfo ? { transform: 'scale(1)', width: '200px' } : { transform: 'scale(0)', width: '0px' }}
			>

				<h3 className='text-lg font-medium'>New message</h3>
				<p className='h-[48px] text-md text-gray-500 font-normal text-ellipsis'>Lorem ipsum dolor sit amet consectetur.</p>
			</div>
		</div>
	)
}

export default Popup;