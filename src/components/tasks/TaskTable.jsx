import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  IconButton,
  LinearProgress,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";

import {
  fetchTasks,
  setLoadingType,
  setPage,
  setSearch,
  setPriority,
  setStatus,
  setAssignedTo,
} from "../../features/tasks/taskSlice";

import { getPriorityColor } from "../../utils/priority";

import { getStatusColor } from "../../utils/status";

import TasksTableSkeleton from "../skeletons/tasks/TasksTableSkeleton";

import TaskRowSkeleton from "../skeletons/tasks/TaskRowSkeleton";
import EmptyState from "../common/EmptyState";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditTaskModal from "../../pages/tasks/EditTaskModal";
import SingleRowSkeleton from "../skeletons/tasks/SingleRowSkeleton";
import DeleteTaskModal from "../../pages/tasks/DeleteTaskModal";
import { resetTaskFilters } from "../../features/tasks/taskSlice";
import { fetchEmployees } from "../../features/users/employeeSlice";
import { formatDate } from "../../utils/formatdate";
import { isTaskOverdue } from "../../utils/overdue";
const TaskTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const assignedEmployeeFromState = location.state?.assignedTo || "";
  const statusFromState = location.state?.status || "";
  const priorityFromState = location.state?.priority || "";

  const {
    tasks,
    pagination,
    filters,
    updatingTaskId,
    deletingTaskId,
    initialLoading,
    tasksLoading,
    loadingType,
    tasksError,
  } = useSelector((state) => state.tasks);

  const { user } = useSelector((state) => state.auth);

  const tableColumns =
    user?.role === "manager"
      ? "1fr 2.2fr 1fr 1.8fr 1.2fr 1.2fr 1fr"
      : "1fr 2.4fr 1.2fr 2fr 1.2fr 1.2fr 1fr";

  const tableHeaders =
    user?.role === "manager"
      ? [
          "Task ID",
          "Task Title",
          "Priority",
          "Status",
          "Assigned To",
          "Due Date",
          "Actions",
        ]
      : [
          "Task ID",
          "Task Title",
          "Priority",
          "Status",
          "Created By",
          "Due Date",
          "Actions",
        ];

  const { employees } = useSelector((state) => state.employee);

  const [searchInput, setSearchInput] = useState(filters.search || "");

  const [editTaskId, setEditTaskId] = useState(null);

  // pagination
  const handleChange = (e, value) => {
    dispatch(setLoadingType("pagination"));
    // window.scrollTo(0, 0);

    dispatch(setPage(value));
  };

  // search
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  //   priority filter
  const handlePriority = (e) => {
    dispatch(setLoadingType("filter"));
    dispatch(
      setPriority(e.target.value === "all-priority" ? "" : e.target.value),
    );
    dispatch(setPage(1));
  };

  //   status filter
  const handleStatus = (e) => {
    const value = e.target.value;
    dispatch(setLoadingType("filter"));
    dispatch(setStatus(value === "all-status" ? "" : value));
    dispatch(setPage(1));
  };

  // assignedTo filter
  const handleAssignedTo = (e) => {
    dispatch(setLoadingType("filter"));
    dispatch(
      setAssignedTo(e.target.value === "all-users" ? "" : e.target.value),
    );
    dispatch(setPage(1));
  };

  // first skeleton rendering
  useEffect(() => {
    dispatch(setLoadingType("page"));
  }, [dispatch]);

  // search debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setLoadingType("search"));

      dispatch(setSearch(searchInput));

      dispatch(setPage(1));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput, dispatch]);

  useEffect(() => {
    let hasFilter = false;

    if (statusFromState) {
      dispatch(setStatus(statusFromState));
      hasFilter = true;
    }

    if (priorityFromState) {
      dispatch(setPriority(priorityFromState));
      hasFilter = true;
    }

    if (assignedEmployeeFromState) {
      dispatch(setAssignedTo(assignedEmployeeFromState));
      hasFilter = true;
    }

    if (hasFilter) {
      dispatch(setPage(1));
    }
  }, [assignedEmployeeFromState, statusFromState, priorityFromState, dispatch]);

  useEffect(() => {
    if (user?.role === "manager") {
      dispatch(fetchEmployees());
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [
    dispatch,
    filters.page,
    filters.search,
    filters.status,
    filters.priority,
    filters.assignedTo,
  ]);

  useEffect(() => {
    return () => {
      dispatch(resetTaskFilters());
    };
  }, [dispatch]);

  // initial loading
  if (initialLoading) {
    return <TasksTableSkeleton />;
  }

  // error
  if (tasksError) {
    return <Typography color="error">{tasksError}</Typography>;
  }

  const filteredTasks = tasks;

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 3,
        },

        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "stretch",
            sm: "flex-start",
          },

          flexDirection: {
            xs: "column",
            sm: "row",
          },

          gap: 2,
          mb: 3,
        }}
      >
        {/* LEFT */}
        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: "1.4rem",
                md: "1.7rem",
              },

              fontWeight: 700,
              color: "#111827",
            }}
          >
            Task List
          </Typography>
        </Box>

        {/* RIGHT */}
        {(user?.role === "manager" || user?.role === "employee") && (
          <Button
            onClick={() => navigate(`/tasks/create`)}
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              px: 2.5,
              py: 1,
              fontWeight: 600,
              boxShadow: "none",
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            + Create Task
          </Button>
        )}
      </Box>
      {/* FILTER BAR */}
      <Card
        elevation={0}
        sx={{
          mb: 3,
          borderRadius: "14px",
          border: "1px solid #eef2f7",
          p: 2.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: {
              xs: "stretch",
              md: "center",
            },

            flexDirection: {
              xs: "column",
              md: "row",
            },

            gap: 2,
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
              placeholder="Search tasks..."
              size="small"
              value={searchInput || ""}
              onChange={handleSearch}
              sx={{
                width: "100%",

                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />

            {/* SEARCH LOADING */}
            {tasksLoading && loadingType === "search" && (
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

          {/* FILTERS */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              width: {
                xs: "100%",
                md: "auto",
              },
            }}
          >
            {/* PRIORITY */}
            <Select
              size="small"
              value={filters.priority || "all-priority"}
              onChange={handlePriority}
              sx={{
                minWidth: {
                  xs: "100%",
                  sm: 150,
                },

                flex: 1,
                borderRadius: "10px",
              }}
            >
              <MenuItem value="all-priority">All Priority</MenuItem>
              <MenuItem value="critical">Critical</MenuItem>
              <MenuItem value="major">Major</MenuItem>
              <MenuItem value="minor">Minor</MenuItem>
              <MenuItem value="blocker">Blocker</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="unassigned">Unassigned</MenuItem>
            </Select>

            {/* STATUS */}
            <Select
              size="small"
              value={filters.status || "all-status"}
              onChange={handleStatus}
              sx={{
                minWidth: {
                  xs: "100%",
                  sm: 150,
                },

                flex: 1,
                borderRadius: "10px",
              }}
            >
              <MenuItem value="all-status">All Status</MenuItem>
              <MenuItem value="active">Active Tasks</MenuItem>
              <MenuItem value="overdue">Overdue Tasks</MenuItem>
              <MenuItem value="backlog">Backlog</MenuItem>
              <MenuItem value="next">Next</MenuItem>
              <MenuItem value="on-hold">On-Hold</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>

            {/* USERS */}
            {user?.role === "manager" && (
              <Select
                size="small"
                onChange={handleAssignedTo}
                value={filters.assignedTo || "all-users"}
                sx={{
                  minWidth: {
                    xs: "100%",
                    sm: 150,
                  },

                  flex: 1,

                  borderRadius: "10px",
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
        </Box>
      </Card>
      {/* TABLE CARD */}
      <Card
        elevation={0}
        sx={{
          borderRadius: "14px",
          border: "1px solid #eef2f7",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        {/* TOP LOADING */}
        {tasksLoading && loadingType !== "pagination" && <LinearProgress />}

        {/* TABLE HEAD */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: tableColumns,
            minWidth: "900px",
            px: 4,
            py: 1.8,
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

        {/* ROWS */}
        {tasksLoading && loadingType === "pagination" ? (
          <TaskRowSkeleton />
        ) : filteredTasks.length === 0 ? (
          <EmptyState
            title={
              filters.search || filters.priority || filters.status
                ? "No Matching Tasks found"
                : "No Tasks Available"
            }
            subtitle={
              filters.search || filters.priority || filters.status
                ? "Try changing search or filters."
                : "Tasks will appear here once created."
            }
          />
        ) : (
          filteredTasks.map((task, index) => {
            const priority = getPriorityColor(task.priority);

            const status = getStatusColor(task.status);

            const isOverDue = isTaskOverdue(task);

            if (updatingTaskId === task._id) {
              return <SingleRowSkeleton key={index} />;
            }

            if (deletingTaskId === task._id) {
              return <SingleRowSkeleton key={index} />;
            }

            return (
              <Box
                key={index}
                sx={{
                  display: "grid",
                  gridTemplateColumns: tableColumns,
                  minWidth: "900px",
                  alignItems: "center",
                  px: 3,
                  py: 2.2,

                  borderLeft: isOverDue
                    ? "4px solid #ef4444"
                    : "4px solid transparent",

                  borderBottom:
                    index !== filteredTasks.length - 1
                      ? "1px solid #f8fafc"
                      : "none",

                  background: isOverDue ? "#fff5f5e4" : "#fff",

                  "&:hover": {
                    transition: "all .2s ease",
                    backgroundColor: "#f7f9fc",
                  },
                  opacity: location.pathname.includes(`/tasks/${task._id}/edit`)
                    ? 0.7
                    : 1,
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
                  onClick={() => navigate(`/tasks/${task._id}`)}
                  sx={{
                    fontSize: "0.92rem",
                    color: "#111827",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    cursor: "pointer",
                  }}
                >
                  {task?.title}
                </Typography>

                {/* PRIORITY */}
                <Chip
                  label={
                    task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)
                  }
                  size="small"
                  sx={{
                    bgcolor: priority.bg,
                    color: priority.color,
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    borderRadius: "8px",
                    width: "fit-content",
                  }}
                />

                {/* STATUS */}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
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
                      fontSize: "0.82rem",
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
                          gap: 0.7,
                          px: 1.3,
                          height: 24,
                          borderRadius: "100px",
                          background: "#fef2f2",
                          color: "#dc2626",
                          fontWeight: 700,
                          fontSize: "0.82rem",
                          boxShadow: "0 2px 8px rgba(239,68,68,.08)",
                        }}
                      >
                        Overdue
                      </Box>
                    </Box>
                  )}
                </Box>

                {/* ASSIGNED */}
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

                {user?.role === "employee" && (
                  <Typography
                    sx={{
                      fontSize: "0.88rem",
                      color: "#374151",
                      fontWeight: 600,
                    }}
                  >
                    {task.createdBy?.name || "-"}
                  </Typography>
                )}

                {/* DUE DATE */}
                <Typography
                  sx={{
                    fontSize: "0.86rem",
                    fontWeight: 600,
                    color: "#475569",
                  }}
                >
                  {formatDate(task?.dueDate)}
                </Typography>

                {/* ACTIONS */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {/* VIEW */}
                  <Tooltip title="View Task" arrow>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/tasks/${task._id}`)}
                      sx={{
                        width: 34,
                        height: 34,
                        border: "1px solid #e5e7eb",
                        backgroundColor: "#f8fafc",
                        color: "#475569",
                        "&:hover": {
                          backgroundColor: "#f1f5f9",
                        },
                      }}
                    >
                      <VisibilityOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  {/* EDIT */}
                  <Tooltip title="Edit Task" arrow>
                    <IconButton
                      size="small"
                      onClick={() => setEditTaskId(task._id)}
                      sx={{
                        color: "#2563eb",
                        opacity: 0.7,
                        "&:hover": {
                          backgroundColor: "#eff6ff",
                        },
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  {/* DELETE */}
                  {(user?.role === "manager" ||
                    (user?.role === "employee" &&
                      task.createdBy?._id === user._id)) && (
                    <Tooltip title="Delete Task" arrow>
                      <IconButton
                        size="small"
                        onClick={() => {
                          navigate(`/tasks/${task._id}/delete`);
                        }}
                        sx={{
                          color: "#dc2626",
                          "&:hover": {
                            backgroundColor: "#fef2f2",
                          },
                        }}
                      >
                        <DeleteOutlineOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Box>
            );
          })
        )}

        {/* PAGINATION */}
        {filteredTasks.length > 0 && (
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
                color: "#6b7280",
                fontWeight: 500,
              }}
            >
              Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
              {Math.min(
                pagination.currentPage * pagination.limit,
                pagination.totalTasks,
              )}{" "}
              of {pagination.totalTasks} tasks
            </Typography>

            <Pagination
              count={pagination.totalPages || 1}
              page={pagination.currentPage || 1}
              onChange={handleChange}
              color="primary"
              shape="rounded"
            />
          </Box>
        )}
      </Card>
      {/* {location.pathname.includes("/edit") && <EditTaskModal taskId={id} />} */}
      <EditTaskModal
        open={Boolean(editTaskId)}
        taskId={editTaskId}
        onClose={() => setEditTaskId(null)}
        shouldFetchTask={true}
      />
      {location.pathname.includes("/delete") && <DeleteTaskModal taskId={id} />}
    </Box>
  );
};

export default TaskTable;
