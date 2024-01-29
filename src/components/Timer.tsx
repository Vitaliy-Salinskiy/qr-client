import { useEffect, useState } from 'react'
import FingerprintJS from "@fingerprintjs/fingerprintjs"

import { getUser } from '../utils'
import { IUser } from '../interfaces'

const Timer = () => {
	const [time] = useState(new Date().toISOString().split('T')[0]);
	const [userScanTime, setUserScanTime] = useState<string>()
	const [timeLeft, setTimeLeft] = useState<string>()

	useEffect(() => {
		FingerprintJS.load()
			.then(fp => fp.get())
			.then(result => {
				getUser(result.visitorId).then((data: IUser) => setUserScanTime(data.lastScanned.split("T")[0]));
			})
	}, [])

	useEffect(() => {
		if (userScanTime === time) {
			const timer = setInterval(() => {
				const now = new Date();
				const hoursLeft = 23 - now.getHours();
				const minutesLeft = 59 - now.getMinutes();
				const secondsLeft = 59 - now.getSeconds();
				setTimeLeft(`${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`);
			}, 1000);

			return () => clearInterval(timer);
		}
	}, [userScanTime, time])

	return (
		<>
			{userScanTime && userScanTime === time && timeLeft ?
				<div className="absolute inset-0 bg-white-opacity-80 flex justify-center items-center">
					{timeLeft && <p className='text-2xl xl:text-3xl text-red-500 max-w-[250px] text-center'>You have already scanned today: {timeLeft}</p>}
				</div>
				: null
			}
		</>
	)
}

export default Timer