import {
  Button,
  CssBaseline,
  Grid,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../../services/LocalStorageService";
import ChangePassword from "../auth/ChangePassword";
import { useGetLoggedUserQuery } from "../../services/userAuthApi";
import { useEffect, useState } from "react";
// import {
//   setUserInfo,
//   unsetUserInfo,
//   selectUserInfo,
// } from "../features/userSlice";

import { setUserInfo, selectUserInfo } from "../../features/userSlice";

const Dashboard = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  const userInfo = useSelector(selectUserInfo);
  const kakashiImageUrl =
    "https://imgs.search.brave.com/5FVuab4hqplxgD8PN4AtuDQl94G7JUitoKhET2MWQFA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDI2NzMy/MzcuanBn";

  // Rule for monthly savings
  const monthlySavingsRule = "Each member is required to save $500 per month.";

  const handleShowChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  // Store User Data in Redux Store
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          email: data.email,
          name: data.name,
        })
      );
    }
  }, [data, isSuccess, dispatch]);

  return (
    <>
      <CssBaseline />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              bgcolor: "#fff",
              p: 4,
              borderRadius: 4,
              textAlign: "center",
              boxShadow: 3,
              mt: "20px",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Welcome, {userInfo.name}!
            </Typography>
            <Avatar
              alt={userInfo.name}
              src={kakashiImageUrl}
              sx={{ width: 100, height: 100, mb: 2, mx: "auto" }}
            />
            <Typography variant="body1" sx={{ mb: 1 }}>
              Email: {userInfo.email}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {monthlySavingsRule}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleShowChangePassword}
              sx={{ mt: 2 }}
            >
              {showChangePassword ? "Hide Change Password" : "Change Password"}
            </Button>
            {showChangePassword && <ChangePassword />}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
