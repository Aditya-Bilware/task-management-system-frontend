import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  Typography,
  Button,
} from "@mui/material";

import EditTaskModal from "./EditTaskModal";

import { fetchTaskById } from "../../features/tasks/taskSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ActivityTimeline from "../../components/tasks/ActivityTimeline";
import TaskDetailsSkeleton from "../../components/skeletons/tasks/TaskDetailsSkeleton";
import { getPriorityColor } from "../../utils/priority";
import { getStatusColor } from "../../utils/status";
import { isTaskOverdue } from "../../utils/overdue";
const TaskDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedTask, selectedTaskLoading, selectedTaskError } = useSelector(
    (state) => state.tasks,
  );

  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchTaskById(id));
    }
  }, [dispatch, id]);

  console.log("selectedTaskLoading", selectedTaskLoading);
  console.log("selectedTask", selectedTask);
  console.log("selectedTaskError", selectedTaskError);

  if (selectedTaskLoading) {
    return <TaskDetailsSkeleton />;
  }

  if (selectedTaskError) {
    return <Typography color="error">{selectedTaskError}</Typography>;
  }

  const priority = getPriorityColor(selectedTask.priority);

  const status = getStatusColor(selectedTask.status);

  const isOverDue = isTaskOverdue(selectedTask);

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 2,
        },
        maxWidth: "1400px",
        mx: "auto",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
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
                md: "1.5rem",
              },

              fontWeight: 700,
              color: "#111827",
            }}
          >
            Task Details
          </Typography>
        </Box>

        {/* RIGHT */}
        <Button
          onClick={() => setEditOpen(true)}
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
          Edit Task
        </Button>
      </Box>
      {/* Main Card */}
      <Card
        elevation={0}
        sx={{
          borderRadius: "10px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        {/* TOP SECTION */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: {
              xs: "column",
              lg: "row",
            },
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 4,
          }}
        >
          {/* LEFT */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2.5,
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.9rem",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                {selectedTask?.title}
              </Typography>

              <Chip
                label={
                  selectedTask?.priority.charAt(0).toUpperCase() +
                  selectedTask?.priority.slice(1)
                }
                size="small"
                sx={{
                  bgcolor: priority.bg,
                  color: priority.color,
                  fontSize: "1rem",
                  fontWeight: 700,
                  borderRadius: "8px",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Chip
                label={selectedTask.status
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
                size="small"
                sx={{
                  bgcolor: status.bg,
                  color: status.color,
                  fontSize: {
                    xs: "0.82rem",
                    sm: "0.92rem",
                    md: "1rem",
                  },

                  fontWeight: 700,

                  borderRadius: "6px",

                  height: {
                    xs: 28,
                    sm: 30,
                  },

                  "& .MuiChip-label": {
                    px: 1.2,
                  },
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

                    flexShrink: 0,

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

                      px: {
                        xs: 1,
                        sm: 1.3,
                      },

                      height: {
                        xs: 28,
                        sm: 30,
                      },

                      borderRadius: "100px",

                      background: "#fef2f2",

                      color: "#dc2626",

                      fontSize: {
                        xs: "0.8rem",
                        sm: "0.92rem",
                        md: "1rem",
                      },

                      fontWeight: 700,

                      whiteSpace: "nowrap",

                      boxShadow: "0 2px 8px rgba(239,68,68,.08)",
                    }}
                  >
                    Overdue
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          {/* RIGHT */}
          <Card
            elevation={0}
            sx={{
              width: {
                xs: "100%",
                lg: "auto",
              },
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
              p: 2.5,
              backgroundColor: "#f8fafc",
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              alignItems: "center",
              gap: 3,
            }}
          >
            {/* ASSIGNED TO */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "#64748b",
                  fontWeight: 700,
                  mb: 1.5,
                }}
              >
                Assigned To
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: 44,
                    height: 44,
                    bgcolor: "#dbeafe",
                    color: "#1d4ed8",
                    fontWeight: 700,
                  }}
                >
                  {selectedTask?.assignedTo?.name.charAt(0)}
                </Avatar>

                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.92rem",
                      color: "#111827",
                      fontWeight: 700,
                    }}
                  >
                    {selectedTask?.assignedTo?.name}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.82rem",
                      color: "#64748b",
                    }}
                  >
                    {selectedTask?.assignedTo?.employeeCode}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: { xs: "none", sm: "block" },
                alignSelf: "stretch",
              }}
            />
            <Divider
              orientation="horizontal"
              sx={{
                display: { xs: "block", sm: "none" },
                width: "100%",
              }}
            />
            {/* DUE DATE */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: "120px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "#64748b",
                  fontWeight: 700,
                  mb: 1.5,
                }}
              >
                Due Date
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", height: 44 }}>
                <Typography
                  sx={{
                    fontSize: "0.92rem",
                    color: "#111827",
                    fontWeight: 700,
                  }}
                >
                  {new Date(selectedTask?.dueDate).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Box>

        <Divider />

        {/* DESCRIPTION */}
        <Box
          sx={{
            p: {
              xs: 2.5,
              md: 4,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#111827",
              mb: 2,
            }}
          >
            Description
          </Typography>

          <Typography
            sx={{
              fontSize: "0.88rem",
              fontWeight: 700,
              color: "#475569",
              lineHeight: 1.8,
              maxWidth: "900px",
            }}
          >
            {selectedTask?.description}
          </Typography>
        </Box>

        <Divider />

        {/* META INFO */}
        <Box
          sx={{
            p: {
              xs: 2.5,
              md: 4,
            },
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "0.85rem",
                color: "#64748b",
                fontWeight: 700,
                mb: 1,
              }}
            >
              Created By
            </Typography>

            <Typography
              sx={{
                fontSize: "0.92rem",
                color: "#111827",
                fontWeight: 700,
              }}
            >
              {selectedTask?.createdBy?.name}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "0.85rem",
                color: "#64748b",
                fontWeight: 700,
                mb: 1,
              }}
            >
              Created At
            </Typography>

            <Typography
              sx={{
                fontSize: "0.92rem",
                color: "#111827",
                fontWeight: 700,
              }}
            >
              {new Date(selectedTask?.createdAt).toLocaleString("en-IN", {
                day: "2-digit",

                month: "2-digit",

                year: "numeric",
              })}{" "}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "0.85rem",
                color: "#64748b",
                fontWeight: 700,
                mb: 1,
              }}
            >
              Last Updated
            </Typography>

            <Typography
              sx={{
                fontSize: "0.92rem",
                color: "#111827",
                fontWeight: 700,
              }}
            >
              {new Date(selectedTask?.updatedAt).toLocaleString("en-IN", {
                day: "2-digit",

                month: "2-digit",

                year: "numeric",

                hour: "2-digit",

                minute: "2-digit",

                hour12: true,
              })}
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* ACTIVITY TIMELINE */}
        <ActivityTimeline taskId={id} />
      </Card>
      <EditTaskModal
        open={editOpen}
        taskId={id}
        onClose={() => setEditOpen(false)}
        shouldFetchTask={false}
      />
    </Box>
  );
};

export default TaskDetails;
