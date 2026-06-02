import { Box, Card, Typography, Chip, Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRecentTasks } from "../../features/dashboard/dashboardSlice";
import RecentTaskTableSkeleton from "../skeletons/dashboard/RecentTasksSkeleton";
import { getPriorityColor } from "../../utils/priority";
import { getStatusColor } from "../../utils/status";

const RecentTaskTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const tableHeaders =
    user?.role === "manager"
      ? ["Task Title", "Priority", "Status", "Assigned To", "Due Date"]
      : ["Task Title", "Priority", "Status", "Due Date"];

  const tableColumns =
    user?.role === "manager"
      ? "1.87fr 1fr 1.5fr 1fr 1fr"
      : "2fr 1fr 1.8fr  1fr";
  const { recentTasks, recentTasksLoading, recentTasksError } = useSelector(
    (state) => state.dashboard,
  );

  //fetch recentTasks
  useEffect(() => {
    dispatch(fetchRecentTasks());
  }, [dispatch]);

  if (recentTasksLoading) {
    return <RecentTaskTableSkeleton />;
  }

  if (recentTasksError) {
    return <Typography color="error">{recentTasksError}</Typography>;
  }

  return (
    <Card
      elevation={0}
      sx={{
        mt: 3,
        borderRadius: "14px",
        border: "1px solid #eef2f7",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: "1px solid #f1f5f9",

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            color: "#111827",
            fontSize: "1rem",
          }}
        >
          Recent Tasks
        </Typography>

        <Button
          onClick={() => navigate("/tasks")}
          size="small"
          sx={{
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          View All
        </Button>
      </Box>

      {/* Table Head */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: tableColumns,

          px: 3,
          py: 1.5,

          backgroundColor: "#f8fafc",

          borderBottom: "1px solid #eef2f7",
        }}
      >
        {tableHeaders.map((head) => (
          <Typography
            key={head}
            sx={{
              fontSize: "0.9rem",
              fontWeight: 900,
              color: "#374151",
            }}
          >
            {head}
          </Typography>
        ))}
      </Box>

      {/* Rows */}
      {recentTasks?.map((task, index) => {
        const priority = getPriorityColor(task.priority);

        const status = getStatusColor(task.status);

        const isOverDue =
          new Date(task.dueDate) < new Date() &&
          !["done", "rejected"].includes(task.status);

        return (
          <Box
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: tableColumns,

              alignItems: "center",

              px: 3,
              py: 1.8,

              borderLeft: isOverDue
                ? "4px solid #ef4444"
                : "4px solid transparent",
              background: isOverDue ? "#fffafa" : "#fff",

              borderBottom:
                index !== recentTasks.length - 1 ? "1px solid #f8fafc" : "none",

              "&:hover": {
                backgroundColor: "#fafcff",
              },
            }}
          >
            <Typography
              onClick={() => navigate(`/tasks/${task._id}`)}
              sx={{
                fontSize: "0.88rem",
                color: "#111827",
                fontWeight: 700,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {task.title}
            </Typography>

            <Chip
              label={
                task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
              }
              size="small"
              sx={{
                bgcolor: priority.bg,
                color: priority.color,
                fontWeight: 600,
                fontSize: "0.88rem",
                width: "fit-content",
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: user?.role === "manager" ? 3 : 7,
                flexWrap: "wrap",
              }}
            >
              <Chip
                label={
                  task.status.charAt(0).toUpperCase() + task.status.slice(1)
                }
                size="small"
                sx={{
                  bgcolor: status.bg,
                  color: status.color,
                  fontWeight: 700,
                  borderRadius: "5px",
                  width: "fit-content",
                }}
              />

              {isOverDue && (
                <Box
                  sx={{
                    position: "relative",
                    display: "inline-flex",
                    borderRadius: "999px",
                    overflow: "hidden",
                    p: "1.5px",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: "-40%",
                      background:
                        "conic-gradient(from 0deg,transparent 0deg,transparent 90deg,rgba(239,68,68,.25) 140deg,rgba(239,68,68,.7) 220deg,#ef4444 280deg,rgba(239,68,68,.35) 330deg,transparent 360deg)",
                      animation: "rotateBorder 2.8s linear infinite",
                      filter: "blur(3px)",
                    },

                    "@keyframes rotateBorder": {
                      from: {
                        transform: "rotate(0deg)",
                      },

                      to: {
                        transform: "rotate(360deg)",
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      zIndex: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      px: 1.3,
                      height: 28,
                      borderRadius: "100px",
                      background: "#eedede",
                      color: "#dc2626",
                      fontWeight: 770,
                      fontSize: "0.82rem",
                      boxShadow: "0 2px 8px rgba(239,68,68,.08)",
                    }}
                  >
                    Overdue
                  </Box>
                </Box>
              )}
            </Box>

            {user?.role === "manager" && (
              <Typography
                sx={{
                  fontSize: "0.88rem",
                  color: "#374151",
                  fontWeight: 600,
                }}
              >
                {task.assignedTo?.name || "-"}
              </Typography>
            )}

            <Typography
              sx={{
                fontSize: "0.86rem",
                fontWeight: 600,
                color: "#475569",
              }}
            >
              {new Date(task?.dueDate).toLocaleString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </Typography>
          </Box>
        );
      })}
    </Card>
  );
};

export default RecentTaskTable;
