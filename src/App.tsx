import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import QrPage from './pages/QrPage';
import RedirectPage from './pages/RedirectPage';
import UsersPage from './pages/UsersPage';
import ShopPage from './pages/ShopPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import StatisticPage from './pages/StatisticPage';
import CreateProducts from './pages/CreateProducts';

function App() {

	return (
		<Router>
			<Routes>
				<Route path="/" element={<QrPage />} />
				<Route path="/redirect" element={<RedirectPage />} />
				<Route path="/users" element={<UsersPage />} />
				<Route path="/shop" element={<ShopPage />} />
				<Route path="/statistic/:id" element={<StatisticPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/admin/*" element={<AdminPage />}>
					<Route path="requests" element={<></>} />
					<Route path="history" element={<></>} />
					{/* <Route path="*" element={<Navigate to="/admin/requests" replace />} /> */}
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
				<Route path="products/create" element={<CreateProducts />} />
			</Routes>
		</Router>
	);
}

export default App;