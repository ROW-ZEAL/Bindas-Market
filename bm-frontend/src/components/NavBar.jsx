import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  AccountCircle as ProfileIcon,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../services/LocalStorageService";
import { unSetUserToken } from "../features/authSlice";
import { unsetUserInfo } from "../features/userSlice";
import logo from "../images/logo.png";
import Inventory from "../pages/Inventory/Inventory";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access_token } = getToken();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [financialMenuAnchor, setFinancialMenuAnchor] = useState(null);

  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: "", email: "" }));
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    navigate("/login");
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleFinancialMenuOpen = (event) => {
    setFinancialMenuAnchor(event.currentTarget);
  };

  const handleFinancialMenuClose = () => {
    setFinancialMenuAnchor(null);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isActive = true;

  return (
    <Box>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#2C3E50",
          color: "#FFFFFF",
          width: "100%",
          left: 0,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          {/* Logo and Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img src={logo} alt="Logo" style={{ height: "50px" }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#FFFFFF",
              }}
            >
              Bindass Market
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Button
              component={NavLink}
              to="/"
              sx={{
                color: "#FFFFFF",
                textTransform: "none",
                "&.active": {
                  borderBottom: "2px solid #FFFFFF",
                },
              }}
            >
              Home
            </Button>
            <Button
              component={NavLink}
              to="/contact"
              sx={{
                color: "#FFFFFF",
                textTransform: "none",
                "&.active": {
                  borderBottom: "2px solid #FFFFFF",
                },
              }}
            >
              Contact
            </Button>
            {access_token && (
              <Button
                component={NavLink}
                to="/dashboard"
                sx={{
                  color: "#FFFFFF",
                  textTransform: "none",
                  "&.active": {
                    borderBottom: "2px solid #FFFFFF",
                  },
                }}
              >
                Dashboard
              </Button>
            )}
            {access_token && (
              <>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  sx={{ color: "white", textTransform: "none" }}
                >
                  Product Management
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={handleClose}
                    component={NavLink}
                    to="/Inventory"
                  >
                    Inventory
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={NavLink}
                    to="/AddProduct"
                  >
                    Product Entry
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={NavLink}
                    to="/total-savings"
                  >
                    Total Savings
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={NavLink}
                    to="/individual-contribution"
                  >
                    Individual Contribution
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={NavLink}
                    to="/monthly-deposit-summary"
                  >
                    Monthly Deposit Summary
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>

          {/* User Actions */}
          {access_token ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <IconButton
                sx={{ color: "#FFFFFF" }}
                component={NavLink}
                to="/profile"
              >
                <ProfileIcon />
              </IconButton>
              <IconButton sx={{ color: "#FFFFFF" }} onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Box>
          ) : (
            <Button
              component={NavLink}
              to="/login"
              sx={{
                color: "#FFFFFF",
                backgroundColor: "#333333",
                textTransform: "none",
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "#444444",
                },
              }}
            >
              Login/Register
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
