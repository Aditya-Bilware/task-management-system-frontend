import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  //   Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Pagination,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { enqueueSnackbar } from "notistack";

import { getWorkLogsService } from "../../services/tasks/taskWorkLogService";

const formatDateTime = (value) => {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(date);
};

const formatWorkDate = (value) => {
  if (!value) return "Not available";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
};

const formatDuration = (minutes = 0) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes}m`;
};

const WorkLogs = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchWorkLogs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getWorkLogsService(id, {
          page,
          limit: 10,
        });

        if (active) setData(response);
      } catch (err) {
        if (active) {
          const message = err?.message || "Failed to fetch work logs.";

          setError(message);
          enqueueSnackbar(message, { variant: "error" });
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchWorkLogs();

    return () => {
      active = false;
    };
  }, [id, page]);

  const task = data?.task;
  const workLogs = data?.workLogs || [];
  const pagination = data?.pagination;

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        minHeight: "100vh",
        width: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        backgroundColor: "#f8fafc",
      }}
    >
      <Button
        startIcon={<ArrowBackRoundedIcon />}
        onClick={() => navigate(`/tasks/${id}`)}
        sx={{
          textTransform: "none",
          mb: 2,
          fontSize: "1rem",
          fontWeight: 700,
        }}
      >
        Back To Task
      </Button>

      <Typography
        sx={{
          fontSize: { xs: "1.5rem", md: "1.8rem" },
          fontWeight: 700,
          color: "#111827",
          mb: 0.5,
        }}
      >
        Work Logs
      </Typography>

      {/* <Typography sx={{ color: "#64748b", mb: 3 }}>
        View work history for this task.
      </Typography> */}

      {loading && !data ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error && !data ? (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Typography color="error">{error}</Typography>
          <Button onClick={() => setPage((current) => current)}>Retry</Button>
        </Card>
      ) : data ? (
        <>
          <Card
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              mb: 3,
              borderRadius: 3,
              border: "1px solid #e2e8f0",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{ color: "#64748b", fontSize: "1.2rem", fontWeight: 700 }}
              >
                {task?.taskNumber || "Task"}
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#111827",
                  overflowWrap: "anywhere",
                }}
              >
                {task?.title || "Task details unavailable"}
              </Typography>
            </Box>

            <Box
              sx={{
                p: 2,
                minWidth: 150,
                borderRadius: 2,
                backgroundColor: "#eff6ff",
              }}
            >
              <Typography
                sx={{ color: "#64748b", fontSize: "0.8rem", fontWeight: 700 }}
              >
                Total Time Spent
              </Typography>
              <Typography
                sx={{ fontSize: "1.5rem", fontWeight: 700, color: "#2563eb" }}
              >
                {formatDuration(data.totalTimeSpentMinutes)}
              </Typography>
            </Box>
          </Card>

          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #e2e8f0",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                p: 2.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 700 }}>
                Work-log History
              </Typography>

              <Typography
                sx={{ color: "#64748b", fontSize: "0.85rem", fontWeight: 700 }}
              >
                {pagination?.totalWorkLogs || 0} entries
              </Typography>
            </Box>

            <Divider />

            {workLogs.length === 0 ? (
              <Box sx={{ p: 5, textAlign: "center" }}>
                <AccessTimeRoundedIcon
                  sx={{ fontSize: 40, color: "#94a3b8", mb: 1 }}
                />
                <Typography sx={{ fontWeight: 600 }}>
                  No work logs yet
                </Typography>
                <Typography sx={{ color: "#64748b", mt: 0.5 }}>
                  Work logged against this task will appear here.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ p: { xs: 1.5, md: 2.5 } }}>
                {workLogs.map((log, index) => {
                  const user =
                    log.userId && typeof log.userId === "object"
                      ? log.userId
                      : null;

                  const userName = user?.name || "Unknown user";

                  return (
                    <Card
                      key={log._id}
                      elevation={0}
                      sx={{
                        mb: index === workLogs.length - 1 ? 0 : 2,
                        p: { xs: 2, md: 2.5 },
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        backgroundColor: "#ffffff",
                        transition:
                          "box-shadow 0.2s ease, border-color 0.2s ease",
                        "&:hover": {
                          borderColor: "#cbd5e1",
                          boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)",
                        },
                      }}
                    >
                      {/* Description and duration */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 2,
                          //   mb: 2.5,
                        }}
                      >
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography
                            sx={{
                              fontSize: "0.9rem",
                              fontWeight: 700,
                              color: "#111827dc",
                              overflowWrap: "anywhere",
                              mb: 0.5,
                            }}
                          >
                            {log.description || "No description"}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            flexShrink: 0,
                            px: 1.5,
                            py: 0.75,
                            borderRadius: "8px",
                            backgroundColor: "#eff6ff",
                            color: "#2563eb",
                            mb: 1,
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "0.9rem", fontWeight: 700 }}
                          >
                            {formatDuration(log.timeSpentMinutes)}
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ mb: 2 }} />

                      {/* Compact metadata row */}
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: {
                            xs: "1fr",
                            sm: "minmax(0, 1.3fr) minmax(0, 1fr) minmax(0, 1fr)",
                          },
                          gap: { xs: 2, sm: 2.5 },
                          alignItems: "start",
                        }}
                      >
                        {/* Logged By */}
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontSize: "0.85rem",
                              color: "#64748b",
                              fontWeight: 700,
                              mb: 1,
                            }}
                          >
                            Logged By
                          </Typography>

                          {/* <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          > */}
                          {/* <Avatar
                              sx={{
                                width: 34,
                                height: 34,
                                bgcolor: "#ede9fe",
                                color: "#6d28d9",
                                fontSize: "0.85rem",
                                fontWeight: 700,
                              }}
                            >
                              {userName.charAt(0).toUpperCase()}
                            </Avatar> */}

                          <Box sx={{ minWidth: 0 }}>
                            <Typography
                              sx={{
                                fontSize: "0.9rem",
                                fontWeight: 600,
                                color: "#111827",
                                overflowWrap: "anywhere",
                              }}
                            >
                              {userName}
                            </Typography>

                            {/* {user?.employeeCode && (
                                <Typography
                                  sx={{ color: "#64748b", fontSize: "0.78rem" }}
                                >
                                  {user.employeeCode}
                                </Typography>
                              )} */}
                          </Box>
                        </Box>
                        {/* </Box> */}

                        {/* Logged At */}
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontSize: "0.85rem",
                              color: "#64748b",
                              fontWeight: 700,
                              mb: 1,
                            }}
                          >
                            Logged At
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: "0.88rem",
                              fontWeight: 600,
                              color: "#334155",
                            }}
                          >
                            {formatDateTime(log.createdAt)}
                          </Typography>
                        </Box>

                        {/* Work Date */}
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontSize: "0.85rem",
                              color: "#64748b",
                              fontWeight: 700,
                              mb: 1,
                            }}
                          >
                            Work Date
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: "0.88rem",
                              fontWeight: 600,
                              color: "#334155",
                            }}
                          >
                            {formatWorkDate(log.workLogDate)}
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  );
                })}
              </Box>
            )}

            {pagination?.totalPages > 1 && (
              <>
                <Divider />
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ color: "#64748b", fontSize: "0.85rem" }}>
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </Typography>

                  <Pagination
                    count={pagination.totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                    shape="rounded"
                  />
                </Box>
              </>
            )}
          </Card>
        </>
      ) : null}
    </Box>
  );
};

export default WorkLogs;
