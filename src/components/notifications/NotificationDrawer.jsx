import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Avatar,
  Stack,
  Button,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import AlarmAddOutlinedIcon from "@mui/icons-material/AlarmAddOutlined";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepTwoTone";
import CircularProgress from "@mui/material/CircularProgress";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import EmptyState from "../common/EmptyState";

import {
  clearAllNotifications,
  fetchNotifications,
  fetchUnreadNotificationsCount,
  markNotificationRead,
} from "../../features/notifications/notificationsSlice";
import { getNotificationDetails } from "../../utils/notificationFormatter";
import NotificationDrawerSkeleton from "../skeletons/notifications/NotificationDrawerSkeleton";

const getNotificationConfig = (type) => {
  switch (type) {
    case "assigned":
      return {
        icon: <AssignmentIndOutlinedIcon />,
        bg: "rgba(59,130,246,.15)",
        color: "#60a5fa",
      };

    case "completed":
      return {
        icon: <AssignmentTurnedInOutlinedIcon />,
        bg: "rgba(34,197,94,.15)",
        color: "#4ade80",
      };

    case "status":
      return {
        icon: <UpdateOutlinedIcon />,
        bg: "rgba(99,102,241,.15)",
        color: "#818cf8",
      };
    case "priority":
      return {
        icon: <UpdateOutlinedIcon />,
        bg: "rgba(245,158,11,.15)",
        color: "#fbbf24",
      };

    case "rejected":
      return {
        icon: <HighlightOffOutlinedIcon />,
        bg: "rgba(239,68,68,.15)",
        color: "#fbbf24",
      };

    case "deleted":
      return {
        icon: <DeleteIcon />,
        bg: "rgba(239,68,68,.15)",
        color: "#ef4444",
      };

    case "dueDate":
      return {
        icon: <AlarmAddOutlinedIcon />,
        bg: "rgba(168,85,247,.15)",
        color: "#c084fc",
      };

    case "reassigned":
      return {
        icon: <SyncAltIcon />,
        bg: "rgba(14,165,233,.15)",
        color: "#38bdf8",
      };

    case "title":
      return {
        icon: <TitleIcon />,
        bg: "rgba(236,72,153,.15)",
        color: "#f472b6",
      };

    case "description":
      return {
        icon: <DescriptionIcon />,
        bg: "rgba(236,72,153,.15)",
        color: "#f472b6",
      };

    default:
      return {
        icon: <AssignmentIndOutlinedIcon />,
        bg: "#f8fafc",
        color: "#64748b",
      };
  }
};

const NotificationDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const panelRef = useRef(null);

  const {
    notifications,
    notificationsLoading,
    notificationsError,
    page,
    loadingMore,
    hasNextPage,
    totalNotifications,
  } = useSelector((state) => state.notification);

  // console.log(notifications?.activityLogId?.taskId?.taskNumber);

  const [clearingIds, setClearingIds] = useState([]);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    if (open) {
      dispatch(fetchNotifications({ page: 1, limit: 20 }));
      dispatch(fetchUnreadNotificationsCount());
    }
  }, [open, dispatch]);

  const handleNotificationClick = async (notification) => {
    try {
      await dispatch(markNotificationRead(notification._id)).unwrap();
      onClose();
      dispatch(fetchUnreadNotificationsCount());

      navigate(`/tasks/${notification.activityLogId.taskId?._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoadMore = () => {
    if (loadingMore || !hasNextPage) return;

    dispatch(
      fetchNotifications({
        page: page + 1,
        limit: 20,
      }),
    );
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleClearAll = async () => {
    if (!notifications.length || isClearing) return;
    try {
      if (panelRef.current) {
        panelRef.current.scrollTO({
          top: 0,
          behavior: "smooth",
        });
      }
      setIsClearing(true);
      const firstSix = notifications.slice(
        0,
        Math.min(6, notifications.length),
      );

      for (const notification of firstSix) {
        setClearingIds((prev) => [...prev, notification._id]);
        await sleep(150);
      }

      await sleep(300);

      await dispatch(clearAllNotifications()).unwrap();
      dispatch(fetchUnreadNotificationsCount());

      setClearingIds([]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: {
            xs: "100%",
            sm: 430,
            zIndex: (theme) => theme.zIndex.modal + 100,
          },
          zIndex: (theme) => theme.zIndex.modal + 100,

          background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",

          color: "#fff",

          borderLeft: "1px solid rgba(255,255,255,0.08)",
        },
      }}
    >
      {/* Header */}

      <Box
        sx={{
          px: 3,
          py: 2.5,
          mt: 7,

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          background: "rgba(255,255,255,0.03)",

          borderBottom: "1px solid rgba(255,255,255,0.08)",

          backdropFilter: "blur(12px)",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.05rem",
            color: "#fff",
          }}
        >
          Notifications
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {notifications.length !== 0 && (
            <Button
              onClick={handleClearAll}
              disabled={isClearing || !notifications.length}
              startIcon={<DeleteSweepOutlinedIcon sx={{ fontSize: 18 }} />}
              variant="text"
              size="small"
              sx={{
                background: "rgba(59,130,246,0.12)",

                border: "1px solid rgba(59,130,246,0.25)",

                color: "#60a5fa",

                textTransform: "none",

                borderRadius: "10px",

                fontWeight: 600,

                "&:hover": {
                  background: "rgba(59,130,246,0.2)",

                  border: "1px solid rgba(59,130,246,0.4)",
                },
              }}
            >
              {isClearing ? "Clearing" : "Clear All"}
            </Button>
          )}

          <IconButton
            onClick={onClose}
            sx={{
              ml: 1,

              color: "#94a3b8",

              width: 36,

              height: 36,

              borderRadius: "10px",

              transition: "all 0.2s ease",

              "&:hover": {
                color: "#f8fafc",

                background: "rgba(255,255,255,0.08)",

                transform: "rotate(90deg)",
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Body */}

      {notificationsError && (
        <Typography
          sx={{
            mx: "auto",
            my: 5,
            fontWeight: 800,
          }}
          color="error"
        >
          {notificationsError}
        </Typography>
      )}

      {!notificationsLoading &&
        !notificationsError &&
        notifications.length === 0 && (
          <EmptyState
            title="No Notifications Yet"
            subtitle="Task activity will appear here."
          />
        )}

      {notificationsLoading &&
        Array.from({ length: 5 }).map((_, index) => (
          <NotificationDrawerSkeleton key={index} />
        ))}

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
        }}
      >
        <Stack spacing={1.5}>
          {notifications.map((activity) => {
            const notification = getNotificationDetails(activity.activityLogId);

            const config = getNotificationConfig(notification.type);

            return (
              <Box
                key={activity._id}
                onClick={() => handleNotificationClick(activity)}
                sx={{
                  p: 2,

                  background: "rgba(255,255,255,0.04)",

                  border: "1px solid rgba(255,255,255,0.08)",

                  backdropFilter: "blur(8px)",
                  borderRadius: "16px",

                  transition: "all 0.35s ease",

                  cursor: "pointer",

                  opacity: clearingIds.includes(activity._id) ? 0 : 1,

                  transform: clearingIds.includes(activity._id)
                    ? "translateX(120px) scale(0.95)"
                    : "translateX(0) scale(1)",

                  filter: clearingIds.includes(activity._id)
                    ? "blur(2px)"
                    : "blur(0px)",

                  pointerEvents: isClearing ? "none" : "auto",

                  "&:hover": {
                    transform: "translateY(-2px)",

                    background: "rgba(255,255,255,0.06)",

                    boxShadow: "0 8px 30px rgba(0,0,0,.25)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: config.bg,
                      color: config.color,
                      width: 42,
                      height: 42,
                    }}
                  >
                    {config.icon}
                  </Avatar>

                  <Box flex={1}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#60a5fa",
                            fontSize: "0.95rem",
                            fontWeight: 900,
                          }}
                        >
                          [{activity?.activityLogId?.taskId?.taskNumber}]
                        </Typography>
                        &nbsp;
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            color: "#f8fafc",
                          }}
                        >
                          {notification.title}
                        </Typography>
                      </Box>
                      {/* {!activity.isRead && (
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            bgcolor: "#60a5fa",
                            boxShadow: "0 0 10px #60a5fa",
                          }}
                        />
                      )} */}
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "#e2e8f0",
                        lineHeight: 1.5,
                      }}
                    >
                      {notification.description}
                    </Typography>

                    {notification.subDescription && (
                      <Typography
                        sx={{
                          color: "#c9cfd8",
                          fontSize: "0.8rem",
                          fontWeight: 800,
                          mt: 1,
                        }}
                      >
                        {notification.subDescription}
                      </Typography>
                    )}
                    <Box
                      sx={{
                        mt: 1.5,
                        pt: 1,
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#94a3b8",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                        }}
                      >
                        By: {notification.performedBy} &nbsp;
                      </Typography>

                      <Typography
                        sx={{
                          color: "#94a3b8",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          fontStyle: "italic",
                        }}
                      >
                        {notification.timeAgo}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Stack>

        {hasNextPage && !notificationsLoading && !notifications.length && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // justifyContent: "center",
              gap: 1,
              mt: 2,
              mb: 1,
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                color: "#94a3b8",
                fontSize: "0.75rem",
                mb: 1,
              }}
            >
              {!!notifications.length &&
                `Showing ${notifications.length} of ${totalNotifications}`}{" "}
            </Typography>
            <Button
              variant="outlined"
              onClick={handleLoadMore}
              disabled={loadingMore}
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                minWidth: 140,
              }}
            >
              {loadingMore ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                "Load More"
              )}
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default NotificationDrawer;
