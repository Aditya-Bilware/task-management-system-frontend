import {
  Dialog,
  DialogContent,
  TextField,
  Typography,
  Box,
  MenuItem,
  Button,
  IconButton,
  Fade,
  Avatar,
} from "@mui/material";
import { useSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getStatusColor } from "../../utils/status";
import { getPriorityColor } from "../../utils/priority";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  clearUpdatingTaskId,
  fetchTaskById,
  setUpdatingTaskId,
  updateTask,
} from "../../features/tasks/taskSlice";
import { fetchEmployees } from "../../features/users/employeeSlice";

// Global Label Sub-Component
const LabelText = ({ children }) => (
  <Typography
    sx={{
      fontSize: "0.8rem",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      mb: 1,
      color: "#475569",
    }}
  >
    {children}
  </Typography>
);

const EditTaskModal = ({ open, taskId, onClose, shouldFetchTask = false }) => {
  const id = taskId;

  // const from = location.state?.from || "table";
  const dispatch = useDispatch();
  const { selectedTask, updateTaskLoading } = useSelector(
    (state) => state.tasks,
  );
  const { employees } = useSelector((state) => state.employee);
  const { user } = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();

  const isSelfCreated = selectedTask?.createdBy?._id === user?._id;

  const canFullyEdit =
    user?.role === "manager" || (user?.role === "employee" && isSelfCreated);

  const canEditStatusOnly = user?.role === "employee" && !isSelfCreated;

  const handleClose = () => {
    onClose();
  };

  const [formData, setFormData] = useState(() => ({
    title: selectedTask?.title || "",

    description: selectedTask?.description || "",

    status: selectedTask?.status || "",

    priority: selectedTask?.priority || "",

    assignedTo: selectedTask?.assignedTo?._id || "",

    dueDate: selectedTask?.dueDate ? new Date(selectedTask.dueDate) : null,
  }));

  const originalDueDate = selectedTask?.dueDate
    ? new Date(selectedTask.dueDate).toISOString()
    : null;

  useEffect(() => {
    if (!open) return;

    if (user?.role === "manager") {
      dispatch(fetchEmployees());
    }

    if (shouldFetchTask && id) {
      dispatch(fetchTaskById(id));
    }
  }, [open, id, user, shouldFetchTask, dispatch]);

  useEffect(() => {
    if (!selectedTask) {
      return;
    }
    setFormData({
      title: selectedTask.title || "",
      description: selectedTask.description || "",
      status: selectedTask.status || "",
      priority: selectedTask.priority || "",
      assignedTo: selectedTask.assignedTo?._id || "",
      dueDate: selectedTask.dueDate ? new Date(selectedTask.dueDate) : null,
    });
  }, [selectedTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    let payload;

    if (canEditStatusOnly) {
      if (formData.status === selectedTask.status) {
        enqueueSnackbar("No changes detected", {
          variant: "info",
        });

        return;
      }

      payload = {
        status: formData.status,
      };
    } else {
      payload = {};

      if (formData.title !== selectedTask.title) payload.title = formData.title;
      if (formData.description !== selectedTask.description)
        payload.description = formData.description;
      if (formData.status !== selectedTask.status)
        payload.status = formData.status;
      if (formData.priority !== selectedTask.priority)
        payload.priority = formData.priority;
      if (
        user?.role === "manager" &&
        formData.assignedTo !== selectedTask.assignedTo?._id
      ) {
        payload.assignedTo = formData.assignedTo;
      }
      if (formData.dueDate?.toISOString() !== originalDueDate)
        payload.dueDate = formData.dueDate;
    }

    // frontend due date validation

    const dueDateChanged = formData.dueDate?.toISOString() !== originalDueDate;
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const selectedDate = formData.dueDate ? new Date(formData.dueDate) : null;

    if (dueDateChanged && selectedDate) {
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        enqueueSnackbar("Due date can not be in the past", {
          variant: "error",
        });

        return;
      }
    }

    // backend call

    const res = await dispatch(
      updateTask({
        id: selectedTask._id,

        details: payload,
      }),
    );

    // ERROR
    if (updateTask.rejected.match(res)) {
      enqueueSnackbar(res.payload, {
        variant: "error",
      });

      return;
    }

    await dispatch(fetchTaskById(id));
    onClose();

    // no skeleton for no changes
    if (res.payload.message !== "No changes detected") {
      dispatch(setUpdatingTaskId(selectedTask._id));

      setTimeout(() => {
        dispatch(clearUpdatingTaskId());
      }, 1000);
    }
    enqueueSnackbar(res.payload.message, {
      variant:
        res.payload.message === "No changes detected" ? "info" : "success",
    });
  };

  const enterpriseInputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      background: "#ffffff",
      fontSize: "0.875rem",
      color: "#0f172a",
      transition: "all 0.15s ease-in-out",
      "& fieldset": { borderColor: "#cbd5e1" },
      "&:hover fieldset": { borderColor: "#94a3b8" },
      "&.Mui-focused fieldset": {
        borderColor: "#2563eb",
        borderWidth: "1.5px",
        boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
      },
    },
    "& .MuiSelect-select": {
      display: "flex",
      alignItems: "center",
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        transitionDuration={{ enter: 240, exit: 180 }}
        maxWidth="xs"
        fullWidth
        BackdropProps={{
          sx: {
            background: "rgba(15, 23, 42, 0.62)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          },
        }}
        PaperProps={{
          sx: {
            width: "520px",
            borderRadius: "24px",
            overflow: "hidden",
            background: "#ffffff",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            border: "1px solid #e2e8f0",
            animation: "modalReveal 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
            "@keyframes modalReveal": {
              "0%": { opacity: 0, transform: "translateY(16px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
          },
        }}
      >
        <Box
          sx={{
            height: "6px",

            position: "relative",

            overflow: "hidden",

            "@keyframes flowAccent": {
              "0%": {
                backgroundPosition: "-200% 0",
              },

              "100%": {
                backgroundPosition: "200% 0",
              },
            },

            "&::before": {
              content: '""',

              position: "absolute",

              top: 0,

              left: 0,

              width: "100%",

              height: "100%",

              background: `
        linear-gradient(
          90deg,
          transparent 0%,
          #2563eb 20%,
          #2563eb 50%,
          transparent 100%
        )
      `,

              backgroundSize: "200% 100%",

              animation: "flowAccent 3s linear infinite",

              boxShadow: "0 0 12px #2563eb",
            },
          }}
        />

        <DialogContent sx={{ p: 0 }}>
          {/* HEADER */}
          <Box
            sx={{
              px: 3,
              py: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.05rem",
                letterSpacing: "-0.01em",
                color: "#0f172a",
              }}
            >
              Update Task
            </Typography>
            <IconButton
              size="small"
              onClick={handleClose}
              sx={{
                color: "#64748b",
                transition: "all 0.15s",
                "&:hover": { color: "#0f172a", background: "#f1f5f9" },
              }}
            >
              <CloseIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          </Box>
          {canEditStatusOnly && (
            <Typography
              sx={{
                fontSize: "0.85rem",
                color: "#92400e",
                background: "#fef3c7",
                p: 1.5,
                borderRadius: "8px",
                mb: 2,
              }}
            >
              This task was assigned by a manager. Only status can be updated.
            </Typography>
          )}{" "}
          {/* BODY */}
          <Box
            sx={{
              px: 3,
              py: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
              background: "#fcfcfd",
            }}
          >
            {/* TASK TITLE */}
            {canFullyEdit && (
              <Box>
                <LabelText>Task Title</LabelText>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter task title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  sx={enterpriseInputStyles}
                />
              </Box>
            )}

            {/* STATUS & PRIORITY ROW */}
            <Box sx={{ display: "flex", gap: 2 }}>
              {canFullyEdit && (
                <Box sx={{ flex: 1 }}>
                  <LabelText>Priority</LabelText>

                  <TextField
                    select
                    fullWidth
                    size="small"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    sx={enterpriseInputStyles}
                  >
                    {[
                      "critical",
                      "major",
                      "medium",
                      "minor",
                      "blocker",
                      "unassigned",
                    ].map((item) => {
                      const colors = getPriorityColor(item);

                      return (
                        <MenuItem key={item} value={item}>
                          <Box
                            sx={{
                              px: 1.2,

                              py: 0.45,

                              borderRadius: "6px",

                              bgcolor: colors.bg,

                              color: colors.color,

                              fontSize: "0.9rem",

                              fontWeight: 700,

                              textTransform: "capitalize",
                            }}
                          >
                            {item}
                          </Box>
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Box>
              )}
              {/* STATUS */}
              <Box sx={{ flex: 1 }}>
                <LabelText>Status</LabelText>

                <TextField
                  select
                  fullWidth
                  size="small"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  sx={enterpriseInputStyles}
                >
                  {[
                    "in-progress",
                    "next",
                    "on-hold",
                    "done",
                    "backlog",
                    "rejected",
                  ].map((item) => {
                    const colors = getStatusColor(item);

                    return (
                      <MenuItem key={item} value={item}>
                        <Box
                          sx={{
                            px: 1.2,

                            py: 0.45,

                            borderRadius: "6px",

                            bgcolor: colors.bg,

                            color: colors.color,

                            fontSize: "0.9rem",

                            fontWeight: 700,

                            textTransform: "capitalize",
                          }}
                        >
                          {item.replace("-", " ")}
                        </Box>
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Box>
            </Box>

            {/*  ASSIGNED TO  */}
            {user?.role === "manager" && (
              <Box>
                <LabelText>Assign To</LabelText>

                <TextField
                  select
                  fullWidth
                  size="small"
                  name="assignedTo"
                  value={formData.assignedTo || ""}
                  onChange={handleChange}
                  sx={enterpriseInputStyles}
                  SelectProps={{
                    renderValue: (selected) => {
                      const user = employees.find((u) => u._id === selected);

                      return (
                        <Box
                          sx={{
                            display: "flex",

                            alignItems: "center",

                            gap: 1,
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 22,

                              height: 22,

                              fontSize: "0.7rem",

                              fontWeight: 700,

                              bgcolor: "#2563eb",
                            }}
                          >
                            {user?.name?.charAt(0)}
                          </Avatar>

                          <Typography
                            sx={{
                              fontSize: "0.875rem",

                              fontWeight: 600,
                            }}
                          >
                            {user?.name || ""}
                          </Typography>
                        </Box>
                      );
                    },
                  }}
                >
                  {employees.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      <Box
                        sx={{
                          display: "flex",

                          alignItems: "center",

                          gap: 1.2,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 24,

                            height: 24,

                            fontSize: "0.72rem",

                            fontWeight: 700,

                            bgcolor: "#2563eb",
                          }}
                        >
                          {user.name?.charAt(0)}
                        </Avatar>

                        <Box>
                          <Typography
                            sx={{
                              fontSize: "0.875rem",

                              fontWeight: 600,
                            }}
                          >
                            {user.name}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: "0.72rem",

                              color: "#64748b",
                            }}
                          >
                            {user.employeeCode}
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            )}

            {/* DUE DATE */}
            {canFullyEdit && (
              <Box>
                <LabelText>Due Date</LabelText>
                <DatePicker
                  format="dd-MM-yyyy"
                  value={formData.dueDate}
                  disablePast
                  onChange={(newValue) =>
                    setFormData((prev) => ({ ...prev, dueDate: newValue }))
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      sx: enterpriseInputStyles,
                    },
                  }}
                />
              </Box>
            )}

            {/* DESCRIPTION */}
            {canFullyEdit && (
              <Box>
                <LabelText>Description</LabelText>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  size="small"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  sx={enterpriseInputStyles}
                />
              </Box>
            )}
          </Box>
          {/* FOOTER */}
          <Box
            sx={{
              px: 3,
              py: 2.2,
              display: "flex",
              justifyContent: "flex-end",
              gap: 1.5,
              borderTop: "1px solid #e2e8f0",
              background: "#ffffff",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                px: 2.5,
                fontSize: "0.875rem",
                fontWeight: 600,
                borderColor: "#cbd5e1",
                color: "#475569",
                "&:hover": { borderColor: "#94a3b8", background: "#f8fafc" },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disableElevation
              disabled={updateTaskLoading}
              onClick={handleSubmit}
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                px: 3,
                fontSize: "0.875rem",
                fontWeight: 600,
                background: "#2563eb",
                "&:hover": { background: "#1d4ed8" },
              }}
            >
              {updateTaskLoading ? "Updating..." : "Update Task"}{" "}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
};

export default EditTaskModal;
