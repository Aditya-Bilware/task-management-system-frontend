import dayjs from "dayjs";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmptyState from "../common/EmptyState";
import { useEffect } from "react";
import {
  fetchOverdueTasks,
  fetchOverdueTasksCount,
} from "../../features/overdueTasks/overdueTasksSlice";

const OverdueTasksSection = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    overdueTasks,
    overdueTasksLoading,
    overdueTasksError,
    page,
    loadingMore,
    hasNextPage,
    totalOverdueTasks,
  } = useSelector((state) => state.overdueTask);
  console.log(overdueTasks);

  const getSeverityColor = (days) => {
    if (days >= 7) return "#fb923c";

    if (days >= 3) return "#fbbf24";

    return "#60a5fa"; // blue
  };

  useEffect(() => {
    if (open) {
      dispatch(fetchOverdueTasks({ page: 1, limit: 20 }));
      dispatch(fetchOverdueTasksCount());
    }
  }, [dispatch, open]);

  const handleOverdueTaskClick = async (task) => {
    try {
      onClose();
      dispatch(fetchOverdueTasksCount());
      navigate(`/tasks/${task?._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoadMore = () => {
    if (loadingMore || !hasNextPage) return;

    dispatch(
      fetchOverdueTasks({
        page: page + 1,
        limit: 20,
      }),
    );
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
          },

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
          Overdue Tasks
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
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
      {overdueTasksLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 6,
          }}
        >
          <CircularProgress
            size={32}
            sx={{
              color: "#60a5fa",
            }}
          />
        </Box>
      )}

      {overdueTasksError && (
        <Typography
          sx={{
            mx: "auto",
            my: 5,
            fontWeight: 800,
          }}
          color="error"
        >
          {overdueTasksError}
        </Typography>
      )}

      {!overdueTasksLoading &&
        !overdueTasksError &&
        overdueTasks.length === 0 && (
          <EmptyState
            title="All Tasks On Schedule"
            subtitle="No overdue tasks require attention right now."
          />
        )}

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
        }}
      >
        <Stack spacing={1.5}>
          {!overdueTasksLoading &&
            overdueTasks.map((task) => {
              const overdueDays = dayjs().diff(task.dueDate, "day");

              const severityColor = getSeverityColor(overdueDays);

              return (
                <Box
                  key={task._id}
                  onClick={() => handleOverdueTaskClick(task)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,

                    p: 2,

                    background: "rgba(255,255,255,0.04)",

                    border: "1px solid rgba(255,255,255,0.08)",

                    borderRadius: 3,

                    cursor: "pointer",

                    transition: "all .2s ease",

                    "&:hover": {
                      background: "rgba(255,255,255,0.06)",

                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: severityColor,

                      boxShadow: `
                                0 0 0 4px rgba(255,255,255,0.04),
                                0 0 12px ${severityColor}
                              `,
                    }}
                  />
                  {/* Title */}
                  <Box flex={1}>
                    <Typography
                      sx={{
                        color: "#60a5fa",
                        fontWeight: 700,
                        mb: 1,
                      }}
                    >
                      {task.taskNumber}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#f8fafc",
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      {task.title}
                    </Typography>
                    {/* Bottom Row */}
                    {/* <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  > */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: severityColor,
                        fontWeight: 500,
                      }}
                    >
                      {overdueDays} day
                      {overdueDays > 1 ? "s" : ""}
                      {" overdue"}
                    </Typography>
                    {/* </Box> */}
                  </Box>
                </Box>
              );
            })}
        </Stack>
        {hasNextPage && !overdueTasksLoading && (
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
              Showing {overdueTasks.length} of {totalOverdueTasks}
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

export default OverdueTasksSection;
