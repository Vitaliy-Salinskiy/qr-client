import React, { createContext, useContext, useState } from 'react';

interface IContextType {
	id: string | null;
	setId: React.Dispatch<React.SetStateAction<string | null>>;
	response: string[];
	setResponse: React.Dispatch<React.SetStateAction<string[]>>;
}

const MyContext = createContext<IContextType | null>(null);

export function ContextProvider({ children }: { children: React.ReactNode }) {

	const [id, setId] = useState<string | null>(null);
	const [response, setResponse] = useState<string[]>([]);


	return (
		<MyContext.Provider value={{ id, setId, response, setResponse }}>
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