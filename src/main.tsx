import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { ContextProvider } from './providers/ContextProvider.tsx'
// import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ContextProvider>
		{/* <FpjsProvider
				loadOptions={{
					apiKey: "Sxo5ybLHCSKalzI9SWpu",
					region: "eu"
				}}
			> */}
		<App />
		{/* </FpjsProvider> */}
	</ContextProvider>
)
