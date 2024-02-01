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
		let delay: number = 0;
		let timeoutId: NodeJS.Timeout | null = null;

		function updateTimer() {
			const now = new Date();
			const hoursLeft = 23 - now.getHours();
			const minutesLeft = 59 - now.getMinutes();
			const secondsLeft = 59 - now.getSeconds();
			setTimeLeft(`${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`);

			if (delay === 0) {
				delay = 1000;
			}

			timeoutId = setTimeout(updateTimer, delay);
		}

		if (userScanTime === time) {
			updateTimer();
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [userScanTime, time]);

	return (
		<>
			{userScanTime && userScanTime === time && timeLeft ?
				<div className="absolute bg-white-opacity-40 inset-0 rounded-xl flex justify-center items-center backdrop-blur-sm bg-white-opacity-50">
					{timeLeft && <p className='text-2xl xl:text-3xl text-red-500 max-w-[250px] text-center'>You have already scanned today: {timeLeft}</p>}
				</div>
				: null
			}
		</>
	)
}

export default Timer