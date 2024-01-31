import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'

import App from './App.tsx'
import './index.scss'
import { ContextProvider } from './providers/ContextProvider.tsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<ContextProvider>
			<App />
		</ContextProvider>
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
)
