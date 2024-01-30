import { useEffect, useState } from "react"
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import QRCode from 'qrcode.react';
import { Link } from "react-router-dom";
// import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";

import scansHistory from '../assets/images/scans-history.png'
import shopIcon from '../assets/images/shop.png'
import { useMyContext } from "../providers/ContextProvider";
import LinkButton from "../components/LinkButton";
import Popup from "../components/Popup";
import { createUser, getScansValue } from "../utils";
import Timer from "../components/Timer";

function QrPage() {

	const [size, setSize] = useState<number>(310);
	const [scans, setScans] = useState<string[]>([]);
	const { message, setMessage, id, setId, response, setResponse } = useMyContext();

	// const { isLoading, error, data, getData } = useVisitorData(
	// 	{ extendedResult: true },
	// 	{ immediate: true }
	// )

	useEffect(() => {
		if (id) {
			getScansValue().then((data) => setScans(data))
		}
	}, [id, message])

	useEffect(() => {
		let timeoutId: any;

		if (message !== null) {
			timeoutId = setTimeout(() => {
				setResponse(message);
				setMessage(null)
			}, 200);
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [message]);

	useEffect(() => {
		FingerprintJS.load()
			.then(fp => fp.get())
			.then(result => {
				createUser(result.visitorId);
				setId(result.visitorId);
			})
	}, [])

	useEffect(() => {
		const handleResize = () => {
			setSize(window.innerWidth >= 1024 ? 340 : 230);
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className="bg-red-500 relative">

			{/* <div>
				<button onClick={() => getData({ ignoreCache: true })}>
					Reload data
				</button>
				<p>VisitorId: {isLoading ? 'Loading...' : data?.visitorId}</p>
			</div> */}

			{response && <Popup />}

			<div className="container mx-auto px-[20px] max-w-screen-lg">
				<div className="min-h-screen flex flex-col items-center py-16 gap-10 text-white font-bold">

					<h1 className="text-[36px] sm:text-[50px] font-bold text-center leading-[110%] w-full bg-white text-red-500 absolute py-[20px]">ScPoints Farmer</h1>

					<div className="text-[50px] text-transparent select-none">
						empty
					</div>

					<div className="flex gap-10 flex-col w-full items-center mt-[40px] lg:flex-row lg:items-center lg:justify-between">

						<div className="flex flex-col justify-center items-center gap-2">
							<h3 className="text-[30px] text-center max-w-[225px]">Scan this code to get a point</h3>
							<div className="h-[300px] w-[300px] lg:h-[400px] lg:w-[400px] bg-white rounded-xl flex justify-center items-center border-[4px] border-gray-300 relative">
								<QRCode
									size={size}
									value={`${window.location.origin}/redirect`}
									bgColor="#fff"
									fgColor="#ef4444"
								/>
								<Timer />
							</div>
						</div>

						<div className="flex flex-col gap-[20px]">

							<div className="flex flex-col gap-[10px]">
								<div className="gap-3 flex justify-center">
									{scans ? scans.map((item, index) => (
										<div key={`${index}-${item}`} className="text-[72px] xl:text-[110px] h-[90px] xl:h-[140px] w-[90px] xl:w-[140px] bg-[#a50d05] flex justify-center items-center rounded-xl">
											<p>{item}</p>
										</div>
									)) : <p>Wait a minutew</p>}
								</div>
								<h4 className="text-[32px] text-center">Total ScPoints</h4>
							</div>
							<div className="flex justify-center gap-[40px]">
								<Link to={`statistic/${id}`} className="h-[135px] sm:h-[150px] w-[135px] sm:w-[150px] bg-white rounded-xl flex flex-col justify-around items-center transition-all duration-200 cursor-pointer hover:scale-105">
									<img height={80} width={80} src={scansHistory} alt="icon" />
									<p className="text-black">History Scans</p>
								</Link>
								<Link to="shop" className="h-[135px] sm:h-[150px] w-[135px] sm:w-[150px] bg-white rounded-xl flex flex-col justify-around items-center transition-all duration-200 cursor-pointer hover:scale-105">
									<img height={80} width={80} src={shopIcon} alt="icon" />
									<p className="text-black">QR Shop</p>
								</Link>
							</div>
							<div className="flex justify-center mx-auto items-center w-[310px] sm:w-[340px]">
								<LinkButton to="/users">See users</LinkButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default QrPage;