import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TaskIcon from "@mui/icons-material/TaskOutlined";
import Create from "@mui/icons-material/AddCircleOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import Employees from "@mui/icons-material/PeopleAltOutlined";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";

import { NavLink, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

// import { clearCredentials } from "../../features/auth/authSlice";
// import { resetAppState } from "../../app/appActions";
import { useRef } from "react";
import { useDispatch } from "react-redux";

import SidebarProfile from "./SidebarProfile";
import { logoutUser } from "../../utils/logOutUser";
// import { resetNotifications } from "../../features/notifications/notificationsSlice";
// import { resetOverdueTasks } from "../../features/overdueTasks/overdueTasksSlice";

const drawerWidth = 250;

const Sidebar = ({ profileOpen, setProfileOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const profileButtonRef = useRef(null);

  // Manager Menu
  const managerMenu = [
    {
      text: "Dashboard",
      icon: <HomeOutlinedIcon />,
      path: "/dashboard",
    },
    {
      text: "Tasks",
      icon: <TaskIcon />,
      path: "/tasks",
    },
    {
      text: "Create Task",
      icon: <Create />,
      path: "/tasks/create",
    },

    {
      text: "Employees",
      icon: <Employees />,
      path: "/employees",
    },
    {
      text: "Task History",
      icon: <ChecklistOutlinedIcon />,
      path: "/tasksHistory",
    },
  ];

  // Employee Menu
  const employeeMenu = [
    {
      text: "Dashboard",
      icon: <HomeOutlinedIcon />,
      path: "/dashboard",
    },
    {
      text: "My Tasks",
      icon: <TaskIcon />,
      path: "/tasks",
    },
    {
      text: "Create Task",
      icon: <Create />,
      path: "/tasks/create",
    },
    {
      text: "Task History",
      icon: <ChecklistOutlinedIcon />,
      path: "/tasksHistory",
    },
  ];

  const menuItems = user?.role === "manager" ? managerMenu : employeeMenu;

  return (
    <Drawer
      variant="permanent"
      paperprops={{
        className: "no-scrollbar",
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
          color: "#fff",
          borderRight: "none",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", p: 2, gap: 1.5 }}>
        <GroupsIcon
          sx={{
            color: "#4f69f8",
            fontSize: "30px",
          }}
        />

        <Typography
          variant="h6"
          sx={{
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "1.2rem",
            whiteSpace: "nowrap",
            overflow: "auto",
            textOverflow: "ellipsis",
          }}
        >
          Team Name
        </Typography>
      </Box>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.1)",
        }}
      />

      {/* Menu Section */}
      <List sx={{ padding: "16px 10px", flexGrow: 1 }}>
        {/* Section Header */}
        <Typography
          variant="caption"
          sx={{
            color: "#6b7280",
            fontWeight: "bold",
            letterSpacing: "1px",
            paddingLeft: "14px",
            display: "block",
            marginBottom: "12px",
            textTransform: "uppercase",
          }}
        >
          {user?.role === "manager" ? "Management" : "Workspace"}
        </Typography>

        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            end={item.path === "/tasks"}
            sx={{
              borderRadius: "12px",
              marginBottom: "8px",
              padding: "10px 14px",
              color: "#d1d5db",

              "&.active": {
                backgroundColor: "rgba(79, 105, 248, 0.15)",
                color: "#4f69f8",
                borderRight: "3px solid #4f69f8",
                borderRadius: "0 12px 12px 0",
              },

              "&.active .MuiListItemIcon-root": {
                color: "#fff",
              },

              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "#9ca3af",
                minWidth: "40px",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      {/* Bottom Section */}

      <Box
        sx={{
          padding: "16px 10px",
          position: "relative",
        }}
      >
        <Divider
          sx={{
            marginBottom: "16px",
            borderColor: "rgba(255,255,255,0.1)",
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: "#6b7280",
            fontWeight: "bold",
            letterSpacing: "1px",
            paddingLeft: "14px",
            display: "block",
            textTransform: "uppercase",
          }}
        >
          Account
        </Typography>

        <SidebarProfile
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
          profileButtonRef={profileButtonRef}
        />

        {/* Profile */}

        <ListItemButton
          ref={profileButtonRef}
          onClick={() => setProfileOpen(!profileOpen)}
          sx={{
            borderRadius: "16px",

            backgroundColor: profileOpen
              ? "rgba(255,255,255,0.06)"
              : "transparent",

            transition: "all .2s ease",

            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.08)",
            },
          }}
        >
          {" "}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "#4f69f8", width: 32, height: 32 }}>
              {user.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {user?.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#9ca3af", textTransform: "capitalize" }}
              >
                {user?.employeeCode}
              </Typography>
            </Box>
          </Box>
        </ListItemButton>

        {/* Logout */}
        <ListItemButton
          onClick={() => logoutUser(dispatch, navigate)}
          sx={{
            borderRadius: "12px",
            color: "#d1d5db",

            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.08)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: "#9ca3af",
              minWidth: "40px",
            }}
          >
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
