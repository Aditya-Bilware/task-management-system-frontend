import { Box, CssBaseline, Toolbar } from "@mui/material";

import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import { useState } from "react";
import IdleTimer from "../components/session/IdleTimer";

const MainLayout = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f8fafc" }}>
      <CssBaseline />

      <IdleTimer />

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
            p: 3,
            // width: "100%",
            // flex: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
