import { Box, CssBaseline, Toolbar } from "@mui/material";

import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import { useState } from "react";

const MainLayout = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f8fafc" }}>
      <CssBaseline />

      <Sidebar profileOpen={profileOpen} setProfileOpen={setProfileOpen} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          backgroundColor: "#f3f4f6",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar setProfileOpen={setProfileOpen} />

        <Toolbar sx={{ minHeight: "64px !important" }} />

        <Box
          sx={{
            padding: "24px",
            // maxWidth: "100%",
            // margin: "0 auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
