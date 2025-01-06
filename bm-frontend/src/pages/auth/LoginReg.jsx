import { Grid, Card, Tabs, Tab, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import Pic1 from "../../images/logo.png";
import Registration from "./Registration";
import UserLogin from "./UserLogin";

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ mt: 2 }}>{children}</Box>}
    </div>
  );
};

const LoginReg = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        bgcolor: "#fafafa",
      }}
    >
      <Grid item xs={12} sm={8} md={5} lg={4}>
        <Card
          sx={{
            padding: 4,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: 2,
            textAlign: "center",
            bgcolor: "#ffffff",
            width: "100%", // Ensures responsiveness
            height: "600px", // Fixed height for static view
            overflow: "hidden", // Prevents content overflow
          }}
        >
          <img
            src={Pic1}
            alt="Logo"
            style={{
              width: "150px",
              margin: "0 auto",
              display: "block",
              marginBottom: "1rem",
            }}
          />
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
                color: "#888",
              },
              "& .MuiTab-root.Mui-selected": {
                color: "#000",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#000",
              },
            }}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          <Box
            sx={{
              mt: 3,
              height: "calc(100% - 150px)", // Adjust for consistent layout
              overflowY: "auto", // Scroll if content overflows
            }}
          >
            <TabPanel value={value} index={0}>
              <UserLogin />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Registration />
            </TabPanel>
          </Box>
          <Typography variant="body2" sx={{ mt: 3, color: "#888" }}>
            {value === 0 ? (
              <>
                Don't have an account?{" "}
                <Button
                  variant="text"
                  onClick={() => setValue(1)}
                  sx={{ textTransform: "none", padding: 0, minWidth: 0 }}
                >
                  Sign up
                </Button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Button
                  variant="text"
                  onClick={() => setValue(0)}
                  sx={{ textTransform: "none", padding: 0, minWidth: 0 }}
                >
                  Log in
                </Button>
              </>
            )}
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LoginReg;
