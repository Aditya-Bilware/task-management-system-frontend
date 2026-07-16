import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  InputAdornment,
  LinearProgress,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchEmployeesStats,
  setLoadingType,
  setPage,
  setSearch,
  resetEmployeeFilters,
} from "../../features/users/employeeSlice";

import EmployeeCardsSkeleton from "../skeletons/employees/EmployeeCardsSkeleton";
import EmptyState from "../common/EmptyState";
import EmployeesPageSkeleton from "../skeletons/employees/EmployeePageSkeleton";

const metricColors = {
  active: "#16a34a",
  completed: "#2563eb",
  overdue: "#ea580c",
  rejected: "#dc2626",
};

const Employees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    employeesStats,
    initialLoading,
    employeesStatsLoading,
    pagination,
    filters,
    loadingType,
  } = useSelector((state) => state.employee);

  const [searchInput, setSearchInput] = useState(filters.search || "");

  const handleChange = (e, value) => {
    dispatch(setLoadingType("pagination"));
    dispatch(setPage(value));
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    dispatch(setLoadingType("page"));

    dispatch(fetchEmployeesStats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEmployeesStats());
  }, [dispatch, filters.page, filters.search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setLoadingType("search"));
      if (searchInput !== filters.search) {
        dispatch(setSearch(searchInput));

        dispatch(setPage(1));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, filters.search, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetEmployeeFilters());
    };
  }, [dispatch]);

  if (initialLoading) {
    return <EmployeesPageSkeleton />;
  }

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          sm: 3,
          md: 4,
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
            lg: "flex-end",
            xs: "flex-start",
            md: "center",
          },
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 3,
          mb: 3,
        }}
      >
        <Box>
          {/* <Typography
            sx={{
              fontSize: "1.9rem",
              // fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.2,
            }}
          >
            Employees List
          </Typography> */}
        </Box>

        <Chip
          label={`Total Employees: ${employeesStats.length}`}
          sx={{
            height: "44px",
            borderRadius: "14px",
            px: 1.2,
            background: "#ffffff",
            border: "1px solid #dbe3ef",
            color: "#0f172a",
            fontWeight: 600,
            fontSize: "0.88rem",
          }}
        />
      </Box>

      {/* SEARCH */}

      <Card
        elevation={0}
        sx={{
          mb: 3,
          p: 2,
          borderRadius: "20px",
          border: "1px solid #dbe3ef",
          background: "#ffffff",
        }}
      >
        <TextField
          fullWidth
          placeholder="Search by employee name or employee code..."
          value={searchInput || ""}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    color: "#94a3b8",
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "50px",
              borderRadius: "16px",
              background: "#ffffff",
              fontSize: "0.9rem",
              "& fieldset": {
                borderColor: "#dbe3ef",
              },
              "&:hover fieldset": {
                borderColor: "#cbd5e1",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2563eb",
              },
            },
          }}
        />
        {employeesStatsLoading && loadingType === "search" && (
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
      </Card>

      {employeesStatsLoading && loadingType === "search" && (
        <LinearProgress
          sx={{
            mb: 2,
            borderRadius: "999px",
          }}
        />
      )}

      {employeesStatsLoading && loadingType === "pagination" ? (
        <EmployeeCardsSkeleton />
      ) : !initialLoading &&
        !employeesStatsLoading &&
        employeesStats.length === 0 ? (
        <Box
          sx={{
            minHeight: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <EmptyState
            title={
              filters.search
                ? "No matching employees found"
                : "No employees available"
            }
            subtitle={
              filters.search
                ? "Try changing search."
                : "Employees will appear here."
            }
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(1,1fr)",
              md: "repeat(2,1fr)",
              lg: "repeat(3,1fr)",
            },

            gap: 2.2,
          }}
        >
          {employeesStats.map((emp) => (
            <Card
              key={emp._id}
              elevation={0}
              sx={{
                borderRadius: "22px",
                border: "1px solid #dbe3ef",
                background: "#ffffff",
                p: 2.2,
                transition: "all .2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px rgba(15,23,42,0.05)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  mb: 2.4,
                }}
              >
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    mb: 1.4,
                    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    boxShadow: "0 8px 20px rgba(37,99,235,0.18)",
                  }}
                >
                  {emp?.name?.charAt(0)}
                </Avatar>

                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#0f172a",
                    lineHeight: 1.2,
                    mb: 0.45,
                  }}
                >
                  {emp?.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.76rem",
                    fontWeight: 700,
                    color: "#2563eb",
                    letterSpacing: "0.3px",
                    mb: 0.55,
                  }}
                >
                  {emp?.employeeCode}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.74rem",
                    color: "#64748b",
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {emp?.email}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(1,1fr)",
                    sm: "repeat(2,1fr)",
                  },

                  gap: 1.2,
                  mb: 2.3,
                }}
              >
                {[
                  {
                    key: "active",
                    label: "Active",
                    value: emp?.stats?.activeTasks,
                  },
                  {
                    key: "completed",
                    label: "Completed",
                    value: emp?.stats?.completedTasks,
                  },
                  {
                    key: "overdue",
                    label: "Overdue",
                    value: emp?.stats?.overdueTasks,
                  },

                  {
                    key: "rejected",
                    label: "Rejected",
                    value: emp?.stats?.rejectedTasks,
                  },
                ].map((item) => (
                  <Box
                    key={item.key}
                    sx={{
                      height: "64px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#ffffff",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.08rem",
                        fontWeight: 700,
                        color: metricColors[item.key],
                        lineHeight: 1,
                      }}
                    >
                      {item.value}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.65,
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        color: "#64748b",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  mt: 0.2,
                }}
              >
                <Button
                  onClick={() => {
                    navigate("/tasks", {
                      state: {
                        assignedTo: emp._id,
                      },
                    });
                  }}
                  variant="outlined"
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    height: "38px",
                    borderRadius: "11px",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    borderColor: "#bfdbfe",
                    color: "#2563eb",
                    background: "#ffffff",
                    px: 1.2,
                    "&:hover": {
                      borderColor: "#93c5fd",
                      background: "#eff6ff",
                    },
                  }}
                >
                  View Tasks
                </Button>

                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/tasks/create", {
                      state: {
                        employee: {
                          _id: emp._id,
                          name: emp.name,
                          employeeCode: emp.employeeCode,
                        },
                      },
                    });
                  }}
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    height: "38px",
                    borderRadius: "11px",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    background:
                      "linear-gradient(135deg, #237ff8 0%, #2172db 100%)",
                    boxShadow: "none",
                    px: 1.2,
                    "&:hover": {
                      background: "linear-gradient(135deg,#1d4ed8,#1e40af)",
                      boxShadow: "none",
                    },
                  }}
                >
                  Assign Task
                </Button>
              </Stack>
            </Card>
          ))}
        </Box>
      )}

      {/* PAGINATION */}

      {employeesStats.length > 0 && (
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
              pagination.totalEmployees,
            )}{" "}
            of {pagination.totalEmployees} employees
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
    </Box>
  );
};

export default Employees;
