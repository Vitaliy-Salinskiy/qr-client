import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import FingerprintJS from "@fingerprintjs/fingerprintjs"

import { addCredentials, addScan, createUser, getUser } from "../utils";
import { useMyContext } from "../providers/ContextProvider";

const RedirectPage = () => {

	const navigate = useNavigate();

	const { setResponse, response, setId } = useMyContext();

	useEffect(() => {
		FingerprintJS.load()
			.then(fp => fp.get())
			.then(async (result: any) => {
				await createUser(result.visitorId);
				setId(result.visitorId);
				await fetchData(result.visitorId);
			})
	}, [])

	const fetchData = async (id: string) => {
		if (id) {
			try {
				const data = await getUser(id)
				if (data && data.name && data.surname) {
					await handleScan(id);
					return;
				} else {
					const status = await getCredentials(id);
					if (status) {
						await handleScan(id);
						return;
					} else {
						if (data && (!data?.name && !data?.surname)) {
							setResponse("You have to enter valid name and surname to get a point");
						}
						navigate("/");
						return;
					}
				}
			} catch (error: any) {
				setResponse(error.message);
				navigate("/");
				return;
			}
		} else {
			navigate("/");
			return;
		}
	};

	const getCredentials = async (id: string) => {
		const userDetails = prompt("Enter your name and surname")?.trim().split(" ");
		if (userDetails?.length !== 2) {
			setResponse("You have to enter valid name and surname to get a point");
			return false;
		}
		const credentials = { name: userDetails[0], surname: userDetails[1] };
		const userData = await addCredentials(id, credentials);
		return userData;
	}

	const handleScan = async (id: string): Promise<any> => {
		try {
			const data = await addScan(id);
			if (data?.message && response === null) {
				setResponse(data.message);
			}
			navigate("/");
			return data;
		} catch (err) {
			setResponse("You have already scanned today");
			navigate("/");
			return err;
		}
	}

	return (
		<div className="bg-red-500">
			<div className="container mx-auto px-4">
				<div className="min-h-screen flex justify-center items-center">
					<h1 className="text-[32px] md:text-[48px] xl:text-[56px] 2xl:text-[64px] text-white font-bold text-center leading-[110%]">Processing your data...</h1>
				</div>
			</div>
		</div>
	)
}

export default RedirectPage