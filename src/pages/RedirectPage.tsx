import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import FingerprintJS from "@fingerprintjs/fingerprintjs"

import { useAddCredentials, useAddScan, useCreateUser, useGetUser } from "../utils";
import { useMyContext } from "../providers/ContextProvider";
import { IAddCredentialsDto } from "../interfaces";

const RedirectPage = () => {

	const navigate = useNavigate();

	const { setResponse, response, setId, id } = useMyContext();

	const { mutate: createUser } = useCreateUser();
	const { mutateAsync: addCredentials } = useAddCredentials();
	const { mutateAsync: addScan } = useAddScan();
	const { data, refetch } = useGetUser(id);


	useEffect(() => {
		FingerprintJS.load()
			.then(fp => fp.get())
			.then(async (result: any) => {
				createUser(result.visitorId);
				setId(result.visitorId);
				refetch()
			})
	}, [])

	useEffect(() => {
		if (data && id) {
			fetchData(id);
		}
	}, [data])

	const fetchData = async (id: string) => {
		if (id) {
			try {
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
		const credentials: IAddCredentialsDto = { name: userDetails[0], surname: userDetails[1] };
		try {
			addCredentials({ id, credentials });
			return true
		} catch (error) {
			return false
		}
	}

	const handleScan = async (id: string): Promise<any> => {
		try {
			const result = await addScan(id);
			if ('message' in result && response === null) {
				setResponse(result.message);
			}
			navigate("/");
			return result;
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