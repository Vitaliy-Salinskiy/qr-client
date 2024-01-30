import React, { createContext, useContext, useState } from 'react';

interface IContextType {
	message: string | null;
	setMessage: React.Dispatch<React.SetStateAction<string | null>>;
	id: string | null;
	setId: React.Dispatch<React.SetStateAction<string | null>>;
	response: string | null;
	setResponse: React.Dispatch<React.SetStateAction<string | null>>;
}

const MyContext = createContext<IContextType | null>(null);

export function ContextProvider({ children }: { children: React.ReactNode }) {

	const [message, setMessage] = useState<null | string>(null);
	const [id, setId] = useState<string | null>(null);
	const [response, setResponse] = useState<string | null>(null);


	return (
		<MyContext.Provider value={{ message, setMessage, id, setId, response, setResponse }}>
			{children}
		</MyContext.Provider>
	);
}

export function useMyContext() {
	const context = useContext(MyContext);
	if (!context) {
		throw new Error('Something went wrong with context');
	}
	return context;
}