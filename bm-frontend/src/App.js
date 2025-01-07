import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginReg from "./pages/auth/LoginReg";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory/Inventory";
import AddProduct from "./pages/Inventory/AddProducts/AddProduct";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile/Profile";
import Homeies from "./pages/Homes/Homeies";
import "./App.css";
import SearchResults from "./pages/Inventory/SearchResults";

function App() {
  const { access_token } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes inside the Layout will include the Navbar */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route
            path="login"
            element={
              !access_token ? <LoginReg /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="sendpasswordresetemail"
            element={<SendPasswordResetEmail />}
          />
          <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />
          <Route
            path="dashboard"
            element={access_token ? <Homeies /> : <Navigate to="/login" />}
          />
          <Route
            path="profile"
            element={access_token ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="inventory"
            element={access_token ? <Inventory /> : <Navigate to="/login" />}
          />
          <Route
            path="AddProduct"
            element={access_token ? <AddProduct /> : <Navigate to="/login" />}
          />
          <Route
            path="SearchResults"
            element={
              access_token ? <SearchResults /> : <Navigate to="/login" />
            }
          />
        </Route>

        {/* Fallback Route for unknown paths */}
        <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
