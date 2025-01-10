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

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access_token } = getToken();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [financialMenuAnchor, setFinancialMenuAnchor] = useState(null);
  const [productAnchorEl, setProductAnchorEl] = useState(null);
  const [orderAnchorEl, setOrderAnchorEl] = useState(null);

  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: "", email: "" }));
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    navigate("/login");
  };

  const handleProductMenuOpen = (event) => {
    setProductAnchorEl(event.currentTarget);
  };

  const handleProductMenuClose = () => {
    setProductAnchorEl(null);
  };

  const handleOrderMenuOpen = (event) => {
    setOrderAnchorEl(event.currentTarget);
  };

  const handleOrderMenuClose = () => {
    setOrderAnchorEl(null);
  };

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
              <>
                {/* Product Management Dropdown */}
                <Button
                  aria-controls="product-menu"
                  aria-haspopup="true"
                  onClick={handleProductMenuOpen}
                  sx={{ color: "white", textTransform: "none" }}
                >
                  Product Management
                </Button>
                <Menu
                  id="product-menu"
                  anchorEl={productAnchorEl}
                  open={Boolean(productAnchorEl)}
                  onClose={handleProductMenuClose}
                >
                  <MenuItem
                    onClick={handleProductMenuClose}
                    component={NavLink}
                    to="/Inventory"
                  >
                    Inventory
                  </MenuItem>
                  <MenuItem
                    onClick={handleProductMenuClose}
                    component={NavLink}
                    to="/AddProduct"
                  >
                    Product Entry
                  </MenuItem>
                </Menu>

                {/* Order Management Dropdown */}
                <Button
                  aria-controls="order-menu"
                  aria-haspopup="true"
                  onClick={handleOrderMenuOpen}
                  sx={{ color: "white", textTransform: "none" }}
                >
                  Order Management
                </Button>
                <Menu
                  id="order-menu"
                  anchorEl={orderAnchorEl}
                  open={Boolean(orderAnchorEl)}
                  onClose={handleOrderMenuClose}
                >
                  <MenuItem
                    onClick={handleOrderMenuClose}
                    component={NavLink}
                    to="/Add_Order"
                  >
                    Add Orders
                  </MenuItem>
                  <MenuItem
                    onClick={handleOrderMenuClose}
                    component={NavLink}
                    to="/OrderHistory"
                  >
                    Order History
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
