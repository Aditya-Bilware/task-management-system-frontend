import { Grid, Card, Typography, Box, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import { useEffect } from "react";
import { fetchStats } from "../../features/dashboard/dashboardSlice";
import StatsCardsSkeleton from "../skeletons/dashboard/StatsSkeleton";
import { useNavigate } from "react-router-dom";

const StatsCards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stats, statsLoading, statsError } = useSelector(
    (state) => state.dashboard,
  );
  console.log(stats);

  //fetch stats
  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  if (statsLoading) {
    return <StatsCardsSkeleton />;
  }

  if (statsError) {
    return <Typography color="error">{statsError}</Typography>;
  }

  const statsData = [
    {
      title: "Total Tasks",
      value: stats?.totalTasks || 0,
      subtitle: "Overall workload",
      icon: <AssignmentOutlinedIcon />,
      color: "#2563eb",
      bg: "#dbeafe",
      onclick: () =>
        navigate("/tasks", {
          state: {
            status: "",
          },
        }),
    },
    {
      title: "Overdue Tasks",
      value: stats?.overdueTasks || 0,
      subtitle: "Deadline passed",
      icon: <AccessTimeFilledRoundedIcon />,
      color: "#dc2626",
      bg: "#fee2e2",
      onclick: () =>
        navigate("/tasks", {
          state: {
            status: "overdue",
          },
        }),
    },
    {
      title: "In Progress",
      value: stats?.activeTasks || 0,
      subtitle: "Active tasks",
      icon: <AutorenewOutlinedIcon />,
      color: "#7c3aed",
      bg: "#ede9fe",
      onclick: () =>
        navigate("/tasks", {
          state: {
            status: "active",
          },
        }),
    },
    {
      title: "Critical",
      value: stats?.criticalTasks || 0,
      subtitle: "Immediate Attention",
      icon: <PriorityHighOutlinedIcon />,
      color: "#dc2626",
      bg: "#fee2e2",
      onclick: () =>
        navigate("/tasks", {
          state: {
            priority: "critical",
          },
        }),
    },
    {
      title: "Completed",
      value: stats?.completedTasks || 0,
      subtitle: "Successfully completed",
      icon: <CheckCircleOutlineOutlinedIcon />,
      color: "#16a34a",
      bg: "#dcfce7",
      onclick: () =>
        navigate("/tasks", {
          state: {
            status: "done",
          },
        }),
    },
  ];

  return (
    <Grid container spacing={2}>
      {statsData.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.title}>
          <Card
            elevation={0}
            onClick={item.onclick}
            sx={{
              borderRadius: "14px",
              border: "1px solid #eef2f7",
              p: 2.5,
              backgroundColor: "#fff",

              transition: "all 1s ease",
              "@keyframes flowAccent": {
                "0%": {
                  backgroundPosition: "-200% 0",
                },

                "100%": {
                  backgroundPosition: "200% 0",
                },
              },
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 10px 30px rgba(15,23,42,.08)",

                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              },

              "&::before": {
                content: '""',

                position: "absolute",

                top: 0,

                left: 0,

                width: "100%",

                height: "4px",

                background: `linear-gradient(
                            90deg,
                            transparent 0%,
                            ${item.color} 20%,
                            ${item.color} 50%,
                            transparent 100%
                          )`,
                backgroundSize: "200% 100%",
                boxShadow: `0 0 10px ${item.color}`,

                animation: "flowAccent 3s linear infinite",
                borderTopLeftRadius: "inherit",

                borderTopRightRadius: "inherit",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                // justifyContent: "space-between",
                gap: 0.5,
                alignItems: "flex-start",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "#6b7280",
                    mb: 1,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "2rem",
                    fontWeight: 800,
                    lineHeight: 1,
                    color: "#111827",
                    mb: 0.8,
                  }}
                >
                  {item.value}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    color: "#9ca3af",
                  }}
                >
                  {item.subtitle}
                </Typography>
              </Box>

              <Avatar
                sx={{
                  bgcolor: item.bg,
                  color: item.color,
                  width: 46,
                  height: 46,
                }}
              >
                {item.icon}
              </Avatar>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;
