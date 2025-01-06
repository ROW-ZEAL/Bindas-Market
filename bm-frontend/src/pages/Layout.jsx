import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <div>
        <Navbar />
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
