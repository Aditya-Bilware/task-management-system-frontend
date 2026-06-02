import { useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const EMPLOYEES = [
  {
    _id: "1",
    name: "Rahul Sharma",
    employeeCode: "EMP001",
    color: "#3b82f6",
  },

  {
    _id: "2",
    name: "Priya Verma",
    employeeCode: "EMP002",
    color: "#10b981",
  },

  {
    _id: "3",
    name: "Aman Gupta",
    employeeCode: "EMP003",
    color: "#f59e0b",
  },
];

const priorities = ["critical", "major", "medium", "minor"];

const statuses = [
  "backlog",
  "next",
  "on-hold",
  "in-progress",
  "done",
  "rejected",
];

const DUMMY_LOGS = [
  {
    _id: "log1",

    employee: EMPLOYEES[0],

    actionType: "create",

    actionPerformed: "Created a new core epic ticket:",

    targetTask: "Configure OAuth2 Secure Authentication Engine",

    timestamp: "22-May-2026 • 02:45 PM",
  },

  {
    _id: "log2",

    employee: EMPLOYEES[1],

    actionType: "status_change",

    actionPerformed: "Transitioned workflow status path to",

    statusVal: "in-progress",

    targetTask: "Integrate Stripe Webhooks Core Routing API",

    timestamp: "22-May-2026 • 01:15 PM",
  },

  {
    _id: "log3",

    employee: EMPLOYEES[2],

    actionType: "priority_change",

    actionPerformed: "Escalated issue response priority rating to",

    priorityVal: "critical",

    targetTask: "Fix Redis Database Memory Leak Fault",

    timestamp: "21-May-2026 • 11:00 AM",
  },

  {
    _id: "log4",

    employee: EMPLOYEES[0],

    actionType: "update",

    actionPerformed: "Modified the description field payload items on",

    targetTask: "Update System Architecture Operational Markdown Docs",

    timestamp: "20-May-2026 • 04:20 PM",
  },
];

const enterpriseInputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",

    background: "#ffffff",

    fontSize: "0.875rem",

    color: "#0f172a",

    transition: "all .15s ease-in-out",

    "& fieldset": {
      borderColor: "#cbd5e1",
    },

    "&:hover fieldset": {
      borderColor: "#94a3b8",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#2563eb",

      borderWidth: "1.5px",

      boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
    },
  },
};

const getActionIcon = (type) => {
  switch (type) {
    case "create":
      return (
        <AddCircleRoundedIcon
          sx={{
            color: "#2563eb",
            fontSize: "18px",
          }}
        />
      );

    case "status_change":
      return (
        <CheckCircleRoundedIcon
          sx={{
            color: "#16a34a",
            fontSize: "18px",
          }}
        />
      );

    case "priority_change":
      return (
        <ErrorRoundedIcon
          sx={{
            color: "#dc2626",
            fontSize: "18px",
          }}
        />
      );

    default:
      return (
        <EditRoundedIcon
          sx={{
            color: "#7c3aed",
            fontSize: "18px",
          }}
        />
      );
  }
};

const ActivityLogs = () => {
  const [searchTitle, setSearchTitle] = useState("");

  const [status, setStatus] = useState("");

  const [priority, setPriority] = useState("");

  const [assignedTo, setAssignedTo] = useState("");

  const [startDate, setStartDate] = useState(null);

  const [endDate, setEndDate] = useState(null);

  const handleClearFilters = () => {
    setSearchTitle("");
    setStatus("");
    setPriority("");
    setAssignedTo("");
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },

          background: "#f8fafc",

          minHeight: "100vh",

          display: "flex",

          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {/* HEADER */}

          <Box sx={{ mb: 4 }}>
            <Typography
              sx={{
                fontSize: "1.6rem",

                fontWeight: 800,

                color: "#0f172a",

                letterSpacing: "-0.02em",
              }}
            >
              Activity Audit Logs
            </Typography>

            <Typography
              sx={{
                mt: 0.5,

                color: "#64748b",

                fontSize: "0.875rem",
              }}
            >
              Track real-time system mutations, workflows and task updates
              across teams.
            </Typography>
          </Box>

          {/* FILTER CARD */}

          <Card
            elevation={0}
            sx={{
              p: 2.5,

              mb: 3,

              borderRadius: "16px",

              border: "1px solid #e2e8f0",

              background: "#ffffff",

              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <Grid container spacing={2} alignItems="flex-end">
              {/* SEARCH */}

              <Grid item xs={12} sm={6} md={3}>
                <Typography
                  sx={{
                    fontSize: "0.75rem",

                    fontWeight: 700,

                    textTransform: "uppercase",

                    color: "#475569",

                    mb: 0.8,
                  }}
                >
                  Search Title
                </Typography>

                <TextField
                  fullWidth
                  size="small"
                  placeholder="Filter task string..."
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  sx={enterpriseInputStyles}
                  InputProps={{
                    startAdornment: (
                      <SearchIcon
                        sx={{
                          color: "#94a3b8",

                          fontSize: "18px",

                          mr: 1,
                        }}
                      />
                    ),
                  }}
                />
              </Grid>

              {/* STATUS */}

              <Grid item xs={12} sm={6} md={2}>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#475569",
                    mb: 0.8,
                  }}
                >
                  Workflow Status
                </Typography>

                <TextField
                  select
                  fullWidth
                  size="small"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  sx={enterpriseInputStyles}
                >
                  <MenuItem value="">All Statuses</MenuItem>

                  {statuses.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s.replace("-", " ")}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* PRIORITY */}

              <Grid item xs={12} sm={6} md={2}>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#475569",
                    mb: 0.8,
                  }}
                >
                  Priority Rating
                </Typography>

                <TextField
                  select
                  fullWidth
                  size="small"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  sx={enterpriseInputStyles}
                >
                  <MenuItem value="">All Priorities</MenuItem>

                  {priorities.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* PERFORMED BY */}

              <Grid item xs={12} sm={6} md={2.5}>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#475569",
                    mb: 0.8,
                  }}
                >
                  Performed By
                </Typography>

                <TextField
                  select
                  fullWidth
                  size="small"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  sx={enterpriseInputStyles}
                >
                  <MenuItem value="">All Accounts</MenuItem>

                  {EMPLOYEES.map((emp) => (
                    <MenuItem key={emp._id} value={emp._id}>
                      {emp.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* CLEAR */}

              <Grid item xs={12} md={2.5}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<RotateLeftIcon />}
                  onClick={handleClearFilters}
                  sx={{
                    height: "40px",

                    textTransform: "none",

                    borderRadius: "8px",

                    fontWeight: 600,
                  }}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>

            {/* DATE ROW */}

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#475569",
                    mb: 0.8,
                  }}
                >
                  Start Date
                </Typography>

                <DatePicker
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  format="dd-MMM-yyyy"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      sx: enterpriseInputStyles,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#475569",
                    mb: 0.8,
                  }}
                >
                  End Date
                </Typography>

                <DatePicker
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  format="dd-MMM-yyyy"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      sx: enterpriseInputStyles,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Card>

          {/* ACTIVITY CARD */}

          <Card
            elevation={0}
            sx={{
              borderRadius: "16px",

              border: "1px solid #e2e8f0",

              background: "#ffffff",

              overflow: "hidden",
            }}
          >
            {/* HEADER */}

            <Box
              sx={{
                p: 2.5,

                borderBottom: "1px solid #f1f5f9",

                display: "flex",

                alignItems: "center",

                gap: 1,
              }}
            >
              <FilterAltIcon
                sx={{
                  color: "#64748b",
                  fontSize: "18px",
                }}
              />

              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#334155",
                  fontSize: "0.9rem",
                }}
              >
                Operational System Activity Thread
              </Typography>
            </Box>

            {/* LOGS */}

            <Stack
              divider={
                <Divider
                  sx={{
                    borderColor: "#f1f5f9",
                  }}
                />
              }
            >
              {DUMMY_LOGS.map((log) => (
                <Box
                  key={log._id}
                  sx={{
                    p: 2.5,

                    display: "flex",

                    flexDirection: {
                      xs: "column",
                      sm: "row",
                    },

                    alignItems: {
                      xs: "flex-start",
                      sm: "center",
                    },

                    justifyContent: "space-between",

                    gap: 3,

                    transition: "background 0.2s",

                    "&:hover": {
                      background: "#fafbfc",
                    },
                  }}
                >
                  {/* LEFT */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      minWidth: "220px",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        fontSize: "0.85rem",
                        bgcolor: log.employee.color,
                        fontWeight: 700,
                      }}
                    >
                      {log.employee.name[0]}
                    </Avatar>

                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.9rem",

                          fontWeight: 700,

                          color: "#0f172a",
                        }}
                      >
                        {log.employee.name}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "0.75rem",

                          fontWeight: 600,

                          color: "#64748b",

                          mt: 0.1,
                        }}
                      >
                        {log.employee.employeeCode}
                      </Typography>
                    </Box>
                  </Box>

                  {/* MIDDLE */}

                  <Box
                    sx={{
                      flex: 1,

                      display: "flex",

                      alignItems: "center",

                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,

                        borderRadius: "50%",

                        background: "#f1f5f9",

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",

                        flexShrink: 0,
                      }}
                    >
                      {getActionIcon(log.actionType)}
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "0.875rem",

                        color: "#334155",

                        lineHeight: 1.5,
                      }}
                    >
                      {log.actionPerformed}{" "}
                      {log.statusVal && (
                        <Box
                          component="span"
                          sx={{
                            px: 1,
                            py: 0.1,
                            mx: 0.5,
                            borderRadius: "5px",
                            background: "#ede9fe",
                            color: "#7c3aed",
                            fontSize: "0.72rem",
                            fontWeight: 800,
                            textTransform: "uppercase",
                          }}
                        >
                          {log.statusVal}
                        </Box>
                      )}
                      {log.priorityVal && (
                        <Box
                          component="span"
                          sx={{
                            px: 1,
                            py: 0.1,
                            mx: 0.5,
                            borderRadius: "5px",
                            background: "#fee2e2",
                            color: "#dc2626",
                            fontSize: "0.72rem",
                            fontWeight: 800,
                            textTransform: "uppercase",
                          }}
                        >
                          {log.priorityVal}
                        </Box>
                      )}
                      <Box
                        component="span"
                        sx={{
                          fontWeight: 700,
                          color: "#0f172a",
                          ml: log.statusVal || log.priorityVal ? 0 : 0.5,
                        }}
                      >
                        "{log.targetTask}"
                      </Box>
                    </Typography>
                  </Box>

                  {/* RIGHT */}

                  <Typography
                    sx={{
                      fontSize: "0.8rem",

                      fontWeight: 600,

                      color: "#94a3b8",

                      whiteSpace: "nowrap",

                      alignSelf: {
                        xs: "flex-end",
                        sm: "center",
                      },
                    }}
                  >
                    {log.timestamp}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Card>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default ActivityLogs;
