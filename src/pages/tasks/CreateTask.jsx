import {
  Box,
  Card,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack,
  Avatar,
  Autocomplete,
  Divider,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getPriorityColor } from "../../utils/priority";
import { getStatusColor } from "../../utils/status";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { useSnackbar } from "notistack";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { fetchEmployees } from "../../features/users/employeeSlice";
import { createTask } from "../../features/tasks/taskSlice";
import CreateTaskSkeleton from "../../components/skeletons/tasks/CreateTaskSkeleton";

const priorities = [
  "critical",
  "major",
  "minor",
  "blocker",
  "medium",
  "unassigned",
];

// const statuses = [
//   "in-progress",
//   "next",
//   "on-hold",
//   "done",
//   "backlog",
//   "rejected",
// ];

const enterpriseInputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",

    background: "#ffffff",

    fontSize: "0.92rem",

    fontWeight: 700,

    color: "#111827",

    transition: "all .2s ease",

    "& fieldset": {
      borderColor: "#e2e8f0",
    },

    "&:hover fieldset": {
      borderColor: "#cbd5e1",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#2563eb",
      boxShadow: "0 0 0 4px rgba(37,99,235,0.10)",
    },
  },
};

const LabelText = ({ children }) => (
  <Typography
    sx={{
      fontSize: "1rem",

      fontWeight: 700,
      letterSpacing: "0.01em",

      color: "#334155",

      mb: 1,
    }}
  >
    {children}
  </Typography>
);

const CreateTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedEmployee = location.state?.employee || null;

  const { enqueueSnackbar } = useSnackbar();

  const { user } = useSelector((state) => state.auth);

  const { employees, employeesLoading } = useSelector(
    (state) => state.employee,
  );

  const { createTaskLoading } = useSelector((state) => state.tasks);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "unassigned",
    status: "next",
    assignedTo: selectedEmployee || null,
    dueDate: null,
  });

  const isFormValid =
    user?.role === "manager"
      ? formData.title.trim() && formData.priority && formData.assignedTo
      : formData.title.trim() && formData.priority;

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  if (employeesLoading) return <CreateTaskSkeleton />;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
      assignedTo: formData.assignedTo?._id,
      dueDate: formData.dueDate?.toISOString(),
    };

    const res = await dispatch(createTask(payload));

    if (createTask.rejected.match(res)) {
      enqueueSnackbar(res.payload, {
        variant: "error",
      });
      return;
    }
    enqueueSnackbar(res.payload.message, {
      variant: "success",
    });
    navigate("/tasks");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          px: {
            xs: 2,
            sm: 3,
            md: 3,
            lg: 7,
          },
          py: {
            xs: 2,
            md: 3,
          },

          background: "#f8fafc",

          minHeight: "100vh",
        }}
      >
        {/* PAGE HEADER */}
        <Box
          sx={{
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "1.4rem",
                md: "1.7rem",
              },

              fontWeight: 800,

              color: "#0f172a",
            }}
          >
            Create Task
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              xl: "1.8fr 0.9fr",
            },

            gap: 3,

            alignItems: "start",
          }}
        >
          {/* LEFT SIDE */}
          <Card
            elevation={0}
            sx={{
              borderRadius: "24px",

              border: "1px solid #e2e8f0",

              overflow: "hidden",
            }}
          >
            {/* HEADER */}
            <Box
              sx={{
                px: 3,
                py: 2.2,

                borderBottom: "1px solid #f1f5f9",

                display: "flex",

                alignItems: "center",

                gap: 1.5,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,

                    color: "#0f172a",

                    fontSize: "1.5rem",
                  }}
                >
                  Task Information
                </Typography>

                <Typography
                  sx={{
                    color: "#64748bde",

                    fontSize: "0.9rem",

                    mt: 0.2,
                  }}
                >
                  Fill all required task details
                </Typography>
              </Box>
            </Box>

            {/* FORM */}
            <Box
              sx={{
                p: {
                  xs: 2,
                  md: 3,
                },
              }}
            >
              <Stack spacing={3}>
                {/* TITLE */}
                <Box
                  sx={{
                    fontWeight: "700",
                  }}
                >
                  <LabelText>
                    Task Title <span style={{ color: "red" }}>*</span>
                  </LabelText>
                  <TextField
                    fullWidth
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter task title"
                    sx={enterpriseInputStyles}
                  />
                </Box>

                {/* DESCRIPTION */}
                <Box>
                  <LabelText>Description</LabelText>

                  <TextField
                    fullWidth
                    multiline
                    minRows={5}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter task description"
                    sx={enterpriseInputStyles}
                  />
                </Box>

                {/* PRIORITY + STATUS */}
                <Box
                  sx={{
                    display: "grid",

                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "1fr 1fr",
                    },

                    gap: 2,
                  }}
                >
                  <Box>
                    <LabelText>
                      Priority <span style={{ color: "red" }}>*</span>
                    </LabelText>
                    <TextField
                      select
                      fullWidth
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      placeholder="Select priority"
                      sx={enterpriseInputStyles}
                    >
                      {priorities.map((priority) => (
                        <MenuItem key={priority} value={priority}>
                          <Box
                            sx={{
                              px: 1.4,
                              py: 0.5,

                              borderRadius: "8px",

                              fontSize: "0.9rem",

                              fontWeight: 900,

                              textTransform: "capitalize",

                              ...getPriorityColor(priority),
                            }}
                          >
                            {priority}
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>

                  <Box>
                    <LabelText>Status</LabelText>

                    <Box
                      sx={{
                        height: 56,
                        border: "1px solid #e2e8f0",
                        borderRadius: "14px",
                        px: 2,
                        display: "flex",
                        alignItems: "center",
                        background: "#fff",
                      }}
                    >
                      <Box
                        sx={{
                          px: 1.4,
                          py: 0.5,
                          borderRadius: "8px",
                          fontSize: "0.9rem",
                          fontWeight: 900,
                          textTransform: "capitalize",
                          ...getStatusColor("next"),
                        }}
                      >
                        Next
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* ASSIGN + DUE DATE */}
                <Box
                  sx={{
                    display: "grid",

                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "1fr 1fr",
                    },

                    gap: 2,
                  }}
                >
                  {/* ASSIGNED TO */}
                  <Box>
                    <LabelText>
                      Assign To <span style={{ color: "red" }}>*</span>
                    </LabelText>{" "}
                    {user?.role === "manager" ? (
                      <Autocomplete
                        options={employees}
                        value={formData.assignedTo}
                        onChange={(e, value) => {
                          setFormData((prev) => ({
                            ...prev,
                            assignedTo: value,
                          }));
                        }}
                        getOptionLabel={(emp) => emp.name}
                        renderOption={(props, emp) => {
                          const { key, ...optionProps } = props;

                          return (
                            <Box
                              key={key}
                              component={"li"}
                              {...optionProps}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                py: 1,
                              }}
                            >
                              <Avatar
                                sx={{
                                  width: 32,
                                  height: 32,
                                  fontSize: "0.78rem",
                                  bgcolor: "#2563eb",
                                  fontWeight: 600,
                                }}
                              >
                                {emp.name[0]}
                              </Avatar>
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: "0.88rem",
                                    fontWeight: 600,
                                    color: "#0f172a",
                                  }}
                                >
                                  {emp.name}
                                </Typography>
                                <Typography
                                  sx={{ fontSize: "0.75rem", color: "#64748b" }}
                                >
                                  {emp.employeeCode}
                                </Typography>
                              </Box>
                            </Box>
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select Employee"
                            sx={enterpriseInputStyles}
                          />
                        )}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        value={`${user.name}`}
                        disabled
                        sx={enterpriseInputStyles}
                      />
                    )}
                  </Box>

                  {/* DUE DATE */}
                  <Box>
                    <LabelText>Due Date</LabelText>

                    <DatePicker
                      format="dd-MM-yyyy"
                      value={formData.dueDate}
                      disablePast
                      onChange={(newValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          dueDate: newValue,
                        }))
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                        },
                      }}
                    />
                  </Box>
                </Box>

                <Divider />

                {/* ACTIONS */}
                <Box
                  sx={{
                    display: "flex",

                    justifyContent: "flex-end",

                    gap: 1.5,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!isFormValid || createTaskLoading}
                    sx={{
                      borderRadius: "12px",

                      textTransform: "none",

                      px: 4,

                      py: 1,
                      height: 48,

                      fontWeight: 700,
                      fontSize: "0.92rem",
                      letterSpacing: "0.01em",
                      boxShadow: "none",

                      background: "#2563eb",

                      "&:hover": {
                        background: "#1d4ed8",

                        boxShadow: "none",
                      },
                    }}
                  >
                    {createTaskLoading ? "Creating" : "Create Task"}
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Card>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default CreateTask;
