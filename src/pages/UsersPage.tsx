import { useEffect } from 'react';
import FingerprintJS from "@fingerprintjs/fingerprintjs"

import { useMyContext } from '../providers/ContextProvider';
import LeadersTable from '../components/LeadersTable'
import LinkButton from '../components/LinkButton'

const UsersPage = () => {

	const { id, setId } = useMyContext();

	useEffect(() => {
		if (!id) {
			FingerprintJS.load()
				.then(fp => fp.get())
				.then(result => {
					setId(result.visitorId);
				})
		}
	}, [id])

	return (
		<div className="bg-red-500">
			<div className="container mx-auto px-4 max-w-screen-2xl">
				<div className="min-h-screen flex gap-9 flex-col justify-start items-center py-16 text-white">
					<LinkButton to="/">Back To QR</LinkButton>
					<LeadersTable />
				</div>
			</div>
		</div>
	)
}

export default UsersPage