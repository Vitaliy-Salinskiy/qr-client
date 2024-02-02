import ReactDOM from 'react-dom/client'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton'

import App from './App.tsx'
import './index.scss'

import { ContextProvider } from './providers/ContextProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ContextProvider>
		<SkeletonTheme baseColor="#fff" highlightColor="#F5A006">
			<App />
		</SkeletonTheme>
	</ContextProvider>
)
