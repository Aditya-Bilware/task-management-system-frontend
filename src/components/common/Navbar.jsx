import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  // Avatar,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Badge,
} from "@mui/material";
import { useEffect, useState } from "react";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { clearCredentials } from "../../features/auth/authSlice";
import { resetAppState } from "../../app/appActions";
import NotificationDrawer from "../notifications/NotificationDrawer";
import OverdueTasksSection from "../overdueTasks/OverdueTasksSection";
import {
  fetchUnreadNotificationsCount,
  resetNotifications,
} from "../../features/notifications/notificationsSlice";
import {
  fetchOverdueTasksCount,
  resetOverdueTasks,
} from "../../features/overdueTasks/overdueTasksSlice";

const drawerWidth = 250;

const Navbar = ({ setProfileOpen }) => {
  const { user } = useSelector((state) => state.auth);

  const { unreadCount } = useSelector((state) => state.notification);
  const { count } = useSelector((state) => state.overdueTask);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const [anchor, setAnchor] = useState(null);

  const [notificationOpen, setNotificationOpen] = useState(false);

  const [overdueOpen, setOverdueOpen] = useState(false);

  const open = Boolean(anchor);

  const getTitle = (path) => {
    const titles = {
      "/dashboard": "Dashboard",
      "/tasks/:id": "Task Details",
      "/tasks/create": "Create Task",
      "/tasksHistory": "Task History",
    };

    if (titles[path]) {
      return titles[path];
    }

    if (path.startsWith("/tasks/") && path !== "/tasks/create") {
      return "Task Details";
    }
    const segment = path.split("/")[1];

    return (
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchUnreadNotificationsCount());
      dispatch(fetchOverdueTasksCount());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(clearCredentials());
    dispatch(resetAppState());
    dispatch(resetNotifications());
    dispatch(resetOverdueTasks());
    navigate("/", {
      replace: true,
    });
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #f1f5f9",
          color: "#111827",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: "64px !important",
            paddingX: "24px",
          }}
        >
          {/* Left Section */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#111827",
                fontSize: "1.1rem",
              }}
            >
              {getTitle(location.pathname)}
            </Typography>
          </Box>

          {/* Right Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2.5,
            }}
          >
            {/* Overdue */}
            <IconButton
              sx={{ color: "#64748b" }}
              onClick={() => {
                setOverdueOpen(true);
                setNotificationOpen(false);
              }}
            >
              <Badge
                badgeContent={count > 99 ? "99+" : count}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.65rem",
                    height: 16,
                    minWidth: 16,
                  },
                }}
              >
                <AccessTimeIcon fontSize="small" />
              </Badge>
            </IconButton>

            {/* Notification */}
            <IconButton
              sx={{ color: "#64748b" }}
              onClick={() => {
                setOverdueOpen(false);
                setNotificationOpen(true);
              }}
            >
              <Badge
                badgeContent={unreadCount > 99 ? "99+" : unreadCount}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.65rem",
                    height: 16,
                    minWidth: 16,
                  },
                }}
              >
                <NotificationsNoneIcon fontSize="small" />
              </Badge>
            </IconButton>

            {/* User Info */}
            {/* <Box
              onClick={(e) => setAnchor(e.currentTarget)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "pointer",
                p: 0.8,
                borderRadius: "14px",
                transition: "all .2s ease",
                "&:hover": {
                  background: "#f8fafc",
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#2563eb",
                  width: 32,
                  height: 32,
                  fontSize: "0.85rem",
                }}
              >
                {user?.name?.charAt(0) || "U"}
              </Avatar>

              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    lineHeight: 1,
                    color: "#1e293b",
                  }}
                >
                  {user?.name || "User"}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    color: "#64748b",
                    textTransform: "capitalize",
                    fontSize: "0.7rem",
                    fontWeight: "500",
                  }}
                >
                  {user?.employeeCode}
                </Typography>
              </Box>
            </Box> */}
          </Box>
        </Toolbar>
        <Menu
          anchorEl={anchor}
          open={open}
          onClose={() => setAnchor(null)}
          PaperProps={{
            elevation: 0,

            sx: {
              mt: 1.5,

              borderRadius: "18px",

              minWidth: 220,

              border: "1px solid #e2e8f0",

              boxShadow: "0 10px 40px rgba(15,23,42,.08)",

              overflow: "hidden",
            },
          }}
        >
          {/* USER INFO */}

          <Box
            sx={{
              px: 2,

              py: 1.8,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,

                fontSize: "0.92rem",
              }}
            >
              {user?.name}
            </Typography>

            <Typography
              sx={{
                fontSize: "0.78rem",

                color: "#64748b",
              }}
            >
              {user?.email}
            </Typography>
          </Box>

          <Divider />

          {/* VIEW PROFILE */}

          <MenuItem
            onClick={() => {
              setAnchor(null);

              setTimeout(() => {
                setProfileOpen((prev) => !prev);
              }, 100);
            }}
            sx={{
              py: 1.5,

              fontSize: "0.92rem",

              fontWeight: 500,
            }}
          >
            View Profile
          </MenuItem>

          {/* LOGOUT */}

          <MenuItem
            onClick={handleLogout}
            sx={{
              py: 1.5,

              fontSize: "0.92rem",

              fontWeight: 500,

              color: "#dc2626",
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </AppBar>
      <NotificationDrawer
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
      ></NotificationDrawer>

      <OverdueTasksSection
        open={overdueOpen}
        onClose={() => setOverdueOpen(false)}
      ></OverdueTasksSection>
    </>
  );
};

export default Navbar;
