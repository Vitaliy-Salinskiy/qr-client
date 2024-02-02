import { useEffect, useState } from "react"
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import QRCode from 'qrcode.react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMediaQuery } from 'react-responsive';

import { useMyContext } from "../providers/ContextProvider";
import LinkButton from "../components/LinkButton";
import Popup from "../components/Popup";
import { createUser, getScansValue } from "../utils";
import Timer from "../components/Timer";
import qrWhite from "../assets/images/qr-code-white.png";
import shopWhite from "../assets/images/shop-white.png";
import Skeleton from "react-loading-skeleton";

function QrPage() {

	const [size, setSize] = useState<number>(310);
	const [scans, setScans] = useState<string[]>([]);
	const { id, setId, response } = useMyContext();
	const [loading, setLoading] = useState(true);

	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-width: 1024px)'
	});

	const isMobile = useMediaQuery({
		query: '(max-width: 768px)'
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1200);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (id) {
			getScansValue().then((data) => setScans(data))
		}
	}, [id, response])

	useEffect(() => {
		FingerprintJS.load()
			.then(fp => fp.get())
			.then(result => {
				createUser(result.visitorId);
				setId(result.visitorId);
			})
	}, [])

	useEffect(() => {
		setSize(isDesktopOrLaptop ? 340 : 230);
	}, [isDesktopOrLaptop]);

	return (
		<div className="bg-red-500 pt-20">

			<Popup />

			<motion.div animate={{ x: ["-100%", "0%"], scale: [0.2, 1] }} transition={{ type: "spring", duration: 1 }} className="text-[36px] sm:text-[50px] font-bold text-center leading-[110%] w-full bg-white text-red-500  py-[20px]">
				<motion.h1 animate={{ scale: [0.8, 1] }} transition={{ type: "spring", delay: 0.5 }}>ScPoints Farmer</motion.h1>
			</motion.div>

			<div className="container mx-auto  max-w-screen-lg">
				<div className="min-h-[calc(100vh-175px)] flex flex-col items-center py-16 gap-10 text-white font-bold">


					<div className="flex gap-10 flex-col w-full items-center  lg:flex-row lg:items-center lg:justify-between">

						<div className="flex flex-col justify-center items-center gap-2">
							<motion.div
								className="h-[300px] w-[300px] lg:h-[400px] lg:w-[400px] bg-white rounded-xl flex justify-center items-center border-[4px] border-gray-300 relative"
								animate={{
									x: ["-70%", "0%"],
									rotate: [-180, 0],
									scale: [0, 1]
								}}
								transition={{
									type: "spring",
									delay: 0.1,
									duration: 1
								}}
							>
								<QRCode
									size={size}
									value={`${window.location.origin}/redirect`}
									bgColor="#fff"
									fgColor="#ef4444"
								/>
								<Timer />
							</motion.div>
						</div>

						<motion.div animate={{ opacity: [0, 1], scale: [0.5, 1] }} transition={{ type: "spring", duration: 0.4 }} className="flex flex-col gap-[20px]">

							<motion.div animate={{ x: ["100%", "0%"] }} transition={{ duration: 0.5 }} className="flex flex-col gap-[10px]">
								<div className="gap-3 flex justify-center">
									{loading ? (
										Array(3).fill(0).map((_, index) => (
											<motion.div animate={{ scale: [0, 1] }} transition={{ delay: 0.2 * index, type: "spring" }} key={index}>
												<Skeleton
													className="text-[72px] xl:text-[110px] h-[90px] xl:h-[140px] w-[90px] xl:w-[140px]  rounded-xl"
												/>
											</motion.div>
										))
									) : (
										scans && scans.length !== 0 ? scans.map((item, index) => (
											<motion.div animate={{ scale: [0, 1] }} key={`${index}-${item}`}
												className={`bg-[#a50d05] flex justify-center items-center rounded-xl ${scans.length > 3 ? "text-[35px] h-[50px] w-[50px] lg:text-[60px] xl:text-[60px] lg:h-[90px] xl:h-[90px] lg:w-[90px] xl:w-[90px]" : "text-[72px] xl:text-[110px] h-[90px] xl:h-[140px] w-[90px] xl:w-[140px]"}`}
											>
												<p>{item}</p>
											</motion.div>
										)) : null
									)}
								</div>
								<h4 className="text-[32px] text-center">Total ScPoints</h4>
							</motion.div>
							<motion.div animate={{ x: ["200%", "0%"] }} transition={{ duration: 0.5 }} className="flex justify-center mx-auto items-center w-[300px] sm:w-[340px]">
								<LinkButton to="/users">See users</LinkButton>
							</motion.div>
						</motion.div>
					</div>

					<motion.div
						animate={{
							x: isMobile ? [] : ["220%", "0%"],
							y: isMobile ? ["100%", "0%"] : []
						}}
						transition={{ type: "spring", duration: 1 }}
						className="w-[95px] flex justify-center gap-[5px] p-[5px] bg-white fixed shadow-red-500 drop-shadow-lg rounded-t-3xl shadow-sm md:rounded-3xl bottom-0 left-[50%] ml-[-47.5px] md:bottom-[40px] md:right-[40px] md:left-auto"
					>
						<Link to={`statistic/${id}`} className="h-[40px] w-[40px] flex justify-center items-center bg-red-500 rounded-full shadow-red-500 shadow-sm cursor-pointer border-2 border-white transition-all duration-300 hover:scale-125 hover:translate-y-[-15px] hover:translate-x-[-8px]">
							<img height={25} width={25} src={qrWhite} alt="qr image" />
						</Link>
						<Link to="shop" className="h-[40px] w-[40px] flex justify-center items-center bg-red-500 rounded-full shadow-red-500 shadow-sm cursor-pointer border-2 border-white transition-all duration-300 hover:scale-125 hover:translate-y-[-15px] hover:translate-x-[8px]">
							<img height={25} width={25} src={shopWhite} alt="shop image" />
						</Link>
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default QrPage;