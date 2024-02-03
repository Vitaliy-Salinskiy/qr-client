import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

import history_image from "../assets/images/qr-code-orange.png"
import shop_image from "../assets/images/shop-orange.png"

import { getUser } from "../utils";
import { IUser } from "../interfaces";
import Popup from "../components/Popup";


const ProfilePage = () => {

	const [isLoading, setIsLoading] = useState(true);
	const [userData, setUserData] = useState<IUser>();

	useEffect(() => {
		fetchUserData();
	}, [])

	const fetchUserData = () => {
		setIsLoading(true);
		FingerprintJS.load()
			.then(fp => fp.get())
			.then((result) => {
				getUser(result.visitorId)
					.then((data) => setUserData(data))
					.finally(() => setTimeout(() => {
						setIsLoading(false)
					}, 1000))
			})
	}

	return (
		<div className='w-full flex justify-center items-center'>

			<Popup />

			<div className="container max-w-screen-2xl w-full min-h-screen md:h-screen flex flex-col justify-around items-center md:flex-row px-[10px] md:px-[0px] md:justify-between gap-10 py-10 md:py-0">
				<div className=" md:h-full flex flex-col gap-[10px] md:w-[250px] md:bg-[#2b2942] md:pt-[50px]">
					<div className="flex flex-col justify-center items-center gap-[10px]">
						<div className="h-[100px] w-[100px] bg-mainOrange flex justify-center items-center rounded-full">
							<div className="w-[80%] h-[80%] bg-white rounded-full flex justify-center items-center">
								<FaUser className="text-5xl text-midDarkGrey" />
							</div>
						</div>
						<h2 className="text-white text-lg font-medium">{isLoading ? "Hacking..." : userData?.name ? userData.name : "???"}</h2>
					</div>

					<div className="max-w-[640px] w-full flex justify-between items-center flex-wrap gap-[10px] md:px-[10px] mt-[20px] md:justify-center">
						<Link to="/users" className="h-[100px] w-[100px] p-[15px] bg-[#2b2942] md:bg-midDarkGrey rounded-lg">
							<img src={history_image} alt="profile-history-link" />
						</Link>
						<Link to="/shop" className="h-[100px] w-[100px] p-[15px] bg-[#2b2942] md:bg-midDarkGrey rounded-lg">
							<img src={shop_image} alt="profile-shop-link" />
						</Link>
					</div>
				</div>

				<div className="max-w-[640px] w-full h-[400px] bg-white-opacity-50 rounded-t-xl flex flex-col justify-around gap-[10px] md:w-[400px] md:h-[350px] md:mr-[10%] lg:mr-[200px] xl:mr-[400px]">
					<h2 className="text-center mt-[20px] text-3xl font-medium text-midDarkGrey">Your SC points</h2>
					<div className="flex justify-around">
						{isLoading
							? Array(1).fill(0).map((_, index) => (
								<SkeletonTheme key={index}>
									<motion.div animate={{ scale: [0, 1] }} transition={{ delay: 0.2 * index }}>
										<Skeleton className="h-[90px] w-[90px] rounded-xl" />
									</motion.div>
								</SkeletonTheme>
							))
							: userData?.timesScanned ? userData?.timesScanned.toString().split("").map((_, index) => {
								return (
									<motion.div
										key={index}
										animate={{ scale: [0, 1] }}
										transition={{ delay: 0.2 * index }}
										className={`bg-[#2b2942] text-mainOrange flex justify-center items-center rounded-xl text-[72px] xl:text-[90px] h-[90px] w-[90px]`}
									>
										<p>{_}</p>
									</motion.div>
								)
							})
								: <motion.div
									animate={{ scale: [0, 1] }}
									transition={{ delay: 0.2 }}
									className={`bg-[#2b2942] text-mainOrange flex justify-center items-center rounded-xl text-[72px] xl:text-[90px] h-[90px] w-[90px]`}
								>
									<p>{0}</p>
								</motion.div>
						}
					</div>
					<div className="flex flex-col justify-center items-center gap-[10px]">
						<h2 className="mt-[20px] text-lg">Your last scan</h2>
						<p className="text-xl font-bold">{isLoading ? "Wait a minute" : userData?.name ? userData?.lastScanned.split("T")[0].split("-").reverse().join("/") : "You haven't scanned yet"}</p>
					</div>
					<Link to="/" className="bg-midDarkGrey text-lg font-bold text-mainOrange w-full text-center py-2 uppercase cursor-pointer transition-all">
						Go to QR page
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ProfilePage;