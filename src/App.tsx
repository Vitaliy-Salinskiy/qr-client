import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import QrPage from "./pages/QrPage";
import RedirectPage from "./pages/RedirectPage";
import UsersPage from "./pages/UsersPage";
import ShopPage from "./pages/ShopPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import StatisticPage from "./pages/StatisticPage";
import ProfilePage from "./pages/ProfilePage";
import WheelPage from "./pages/WheelPage";

function App() {
  return (
    <div className="font-regular">
      <Router>
        <Routes>
          <Route path="/" element={<QrPage />} />
          <Route path="/redirect" element={<RedirectPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/statistic/:id" element={<StatisticPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/wheel" element={<WheelPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
