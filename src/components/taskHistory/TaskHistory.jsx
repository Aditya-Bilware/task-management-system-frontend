import {
  Box,
  Card,
  Chip,
  CircularProgress,
  LinearProgress,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import { enqueueSnackbar } from "notistack";

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";

import {
  fetchTaskHistory,
  resetTaskHistoryFilters,
  setFilter,
  setLoadingType,
  setPage,
  setSearch,
  setAssignedTo,
} from "../../features/tasks/taskHistorySlice";
import TasksHistoryRowSkeleton from "../skeletons/taskHistory/TasksHistoryRowSkeleton";
import { getPriorityColor } from "../../utils/priority";
import TasksHistorySkeleton from "../skeletons/taskHistory/TasksHistorySkeleton";
import { fetchEmployees } from "../../features/users/employeeSlice";
import { useNavigate } from "react-router-dom";

import { exportCompletedTasksService } from "../../services/tasks/taskHistoryService";

import EmptyState from "../common/EmptyState";
import ExportTaskHistoryModal from "../../pages/taskHistory/ExportTaskHistoryModal";
import { reportDate } from "../../utils/reportDate";

const getStatusStyles = (status) => {
  switch (status) {
    case "completed":
      return {
        bg: "#dcfce7",
        color: "#166534",
      };

    case "rejected":
      return {
        bg: "#fee2e2",
        color: "#991b1b",
      };

    case "deleted":
      return {
        bg: "#e2e8f0",
        color: "#475569",
      };

    default:
      return {
        bg: "#f1f5f9",
        color: "#334155",
      };
  }
};

const TaskHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    historyTasks,
    historyTasksLoading,
    historyTasksError,
    initialLoading,
    pagination,
    filters,
    loadingType,
  } = useSelector((state) => state.taskHistory);

  const { user } = useSelector((state) => state.auth);

  const { employees } = useSelector((state) => state.employee);

  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const handleExport = async ({ fromDate, toDate }) => {
    try {
      setExportLoading(true);

      const response = await exportCompletedTasksService(fromDate, toDate);

      const blob = new Blob([response.data]);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `CompletedTasks_Report_${reportDate}.xlsx`;

      document.body.appendChild(link);

      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      enqueueSnackbar("Report downloaded successfully", {
        variant: "success",
      });
    } catch (err) {
      // console.log(err);
      enqueueSnackbar(err?.message || "Failed to export report", {
        variant: "error",
      });
    } finally {
      setExportLoading(false);
    }
  };

  const tableColumns =
    user?.role === "manager"
      ? "1fr 2.3fr 1fr 1fr 1.3fr 1.3fr 1fr"
      : "1fr 2.3fr 1.2fr 1fr 1fr 1fr";

  const tableHeaders =
    user?.role === "manager"
      ? [
          "Task ID",
          "Task Title",
          "Priority",
          "Final Status",
          "Assigned To",
          "Performed By",
          "Action Date",
        ]
      : [
          "Task ID",
          "Task Title",
          "Priority",
          "Final Status",
          "Performed By",
          "Action Date",
        ];

  const [searchInput, setSearchInput] = useState(filters.search);

  // FETCH TASKS

  useEffect(() => {
    dispatch(fetchTaskHistory(filters));
    window.scrollTo(0, 0);
  }, [dispatch, filters]);

  // SEARCH DEBOUNCE

  useEffect(() => {
    const timer = setTimeout(
      () => {
        dispatch(setLoadingType("search"));

        if (searchInput !== filters.search) {
          dispatch(setSearch(searchInput));

          dispatch(setPage(1));
        }
      },

      500,
    );

    return () => clearTimeout(timer);
  }, [searchInput, filters.search, dispatch]);

  useEffect(() => {
    if (user?.role === "manager") {
      dispatch(fetchEmployees());
    }
  }, [dispatch, user]);

  // RESET FILTERS

  useEffect(() => {
    return () => {
      dispatch(resetTaskHistoryFilters());
    };
  }, [dispatch]);

  const taskCount =
    filters.filter === "completed"
      ? "Completed Tasks"
      : filters.filter === "rejected"
        ? "Rejected Tasks"
        : filters.filter === "deleted"
          ? "Deleted Tasks"
          : "Total Tasks";

  // INITIAL LOADING

  if (initialLoading) {
    return <TasksHistorySkeleton />;
  }

  if (historyTasksError) {
    return <Typography color="error">{historyTasksError}</Typography>;
  }

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 3,
        },
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            md: "center",
          },

          flexDirection: {
            xs: "column",
            md: "row",
          },

          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          {/* <Typography
            sx={{
              fontSize: {
                xs: "1.45rem",
                md: "1.8rem",
              },

              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            Task History
          </Typography> */}

          <Typography
            sx={{
              mt: 0.5,
              color: "#64748b",
              fontSize: "0.92rem",
            }}
          >
            View completed, rejected and deleted tasks
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            disabled={exportLoading}
            onClick={() => setExportModalOpen(true)}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              px: 2,
              py: 1,
            }}
          >
            Export Report
          </Button>

          <Chip
            icon={<HistoryOutlinedIcon />}
            label={`${pagination?.totalTasks || 0} ${taskCount}`}
            sx={{
              borderRadius: "10px",
              fontWeight: 700,
              background: "#eff6ff",
              color: "#2563eb",
              px: 1,
            }}
          />
        </Box>
      </Box>

      {/* FILTER BAR */}

      <Card
        elevation={0}
        sx={{
          mb: 3,
          borderRadius: "18px",
          border: "1px solid #e2e8f0",
          p: 2.2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            gap: 2,
            justifyContent: "space-between",
            alignItems: {
              xs: "stretch",
              md: "center",
            },
          }}
        >
          {/* SEARCH */}

          <Box
            sx={{
              position: "relative",
              width: {
                xs: "100%",
                md: 320,
              },
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Search task title..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon
                    sx={{
                      mr: 1,
                      color: "#94a3b8",
                      fontSize: "1.1rem",
                    }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />

            {historyTasksLoading && loadingType === "search" && (
              <CircularProgress
                size={18}
                sx={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            )}
          </Box>

          {/* FILTER */}

          <Select
            size="small"
            value={filters.filter}
            onChange={(e) => {
              dispatch(setLoadingType("filter"));
              dispatch(setFilter(e.target.value));
              dispatch(setPage(1));
            }}
            sx={{
              minWidth: {
                xs: "100%",
                sm: 220,
              },
              borderRadius: "12px",
            }}
          >
            <MenuItem value="all-history">All History</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
            <MenuItem value="deleted">Deleted</MenuItem>
          </Select>

          {user?.role === "manager" && (
            <Select
              size="small"
              value={filters.assignedTo || "all-users"}
              onChange={(e) => {
                dispatch(setLoadingType("filter"));

                dispatch(
                  setAssignedTo(
                    e.target.value === "all-users" ? "" : e.target.value,
                  ),
                );

                dispatch(setPage(1));
              }}
              sx={{
                minWidth: {
                  xs: "100%",
                  sm: 220,
                },
                borderRadius: "12px",
              }}
            >
              <MenuItem value="all-users">All Users</MenuItem>

              {employees.map((emp) => (
                <MenuItem key={emp._id} value={emp._id}>
                  {emp.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </Box>
      </Card>

      {/* TABLE */}

      {(historyTasksLoading && loadingType === "search") ||
      loadingType === "filter" ? (
        <LinearProgress />
      ) : null}
      <Card
        elevation={0}
        sx={{
          borderRadius: "18px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          overflowX: "auto",
        }}
      >
        {/* TABLE HEADER */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: tableColumns,
            minWidth: "950px",
            px: 3,
            py: 1.8,
            background: "#f8fafc",
            borderBottom: "1px solid #eef2f7",
          }}
        >
          {tableHeaders.map((head) => (
            <Typography
              key={head}
              sx={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#475569",
              }}
            >
              {head}
            </Typography>
          ))}
        </Box>

        {!historyTasks?.length ? (
          <EmptyState
            title={
              filters.search ||
              filters.filter !== "all-history" ||
              filters.assignedTo
                ? "No Matching History Found"
                : "No Task History Available"
            }
            subtitle={
              filters.search ||
              filters.filter !== "all-history" ||
              filters.assignedTo
                ? "Try adjusting your search or filters."
                : "Completed, rejected, and deleted tasks will appear here."
            }
          />
        ) : historyTasksLoading && loadingType === "pagination" ? (
          <TasksHistoryRowSkeleton />
        ) : (
          historyTasks.map((task, index) => {
            const priorityStyles = getPriorityColor(task.priority);
            const statusStyles = getStatusStyles(task.finalStatus);

            return (
              <Box
                key={task._id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: tableColumns,
                  minWidth: "950px",
                  alignItems: "center",
                  px: 2,
                  py: 2.1,
                  borderBottom:
                    index !== historyTasks.length - 1
                      ? "1px solid #f1f5f9"
                      : "none",

                  transition: "all .2s ease",
                  cursor: "pointer",
                  "&:hover": {
                    background: "#fafcff",
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
                  {task.taskNumber}
                </Typography>
                {/* TITLE */}

                <Typography
                  onClick={() => {
                    navigate(`/tasks/${task._id}`);
                  }}
                  sx={{
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    color: "#111827",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {task.title}
                </Typography>

                {/* PRIORITY */}

                <Chip
                  label={task.priority}
                  size="small"
                  sx={{
                    width: "fit-content",
                    fontWeight: 700,
                    borderRadius: "8px",
                    textTransform: "capitalize",
                    bgcolor: priorityStyles.bg,
                    color: priorityStyles.color,
                  }}
                />

                {/* STATUS */}

                <Chip
                  label={task.finalStatus}
                  size="small"
                  sx={{
                    width: "fit-content",
                    fontWeight: 700,
                    borderRadius: "8px",
                    textTransform: "capitalize",
                    bgcolor: statusStyles.bg,
                    color: statusStyles.color,
                  }}
                />

                {/* ASSIGNED TO */}

                {user?.role === "manager" && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        color: "#334155",
                      }}
                    >
                      {task?.assignedTo?.name}
                    </Typography>
                  </Box>
                )}

                {/* PERFORMED BY */}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: "#334155",
                    }}
                  >
                    {task?.performedBy?.name}
                  </Typography>
                </Box>

                {/* ACTION DATE */}

                <Typography
                  sx={{
                    fontSize: "0.86rem",
                    fontWeight: 600,
                    color: "#475569",
                  }}
                >
                  {task.actionDate
                    ? new Date(task?.actionDate).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "-"}
                </Typography>
              </Box>
            );
          })
        )}

        {/* PAGINATION */}

        {historyTasks.length > 0 && (
          <Box
            sx={{
              px: 3,
              py: 2,
              borderTop: "1px solid #f1f5f9",
              display: "flex",
              justifyContent: "space-between",
              alignItems: {
                xs: "flex-start",
                sm: "center",
              },

              flexDirection: {
                xs: "column",
                sm: "row",
              },

              gap: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.9rem",
                color: "#64748b",
                fontWeight: 500,
              }}
            >
              Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
              {Math.min(
                pagination.currentPage * pagination.limit,
                pagination.totalTasks,
              )}{" "}
              of {pagination.totalTasks} archived tasks
            </Typography>

            <Pagination
              count={pagination.totalPages || 1}
              page={pagination.currentPage || 1}
              onChange={(e, value) => {
                dispatch(setLoadingType("pagination"));
                dispatch(setPage(value));
              }}
              color="primary"
              shape="rounded"
            />
          </Box>
        )}
      </Card>
      <ExportTaskHistoryModal
        open={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        onExport={handleExport}
        loading={exportLoading}
      />
    </Box>
  );
};

export default TaskHistory;
