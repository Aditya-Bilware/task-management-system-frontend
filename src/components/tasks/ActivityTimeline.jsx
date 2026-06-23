import { Box, Card, Typography } from "@mui/material";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchTaskActivities } from "../../features/tasks/taskSlice";

const getActivityColor = (field) => {
  switch (field) {
    case "status":
      return "#3b82f6";

    case "priority":
      return "#f59e0b";

    case "dueDate":
      return "#14b8a6";

    case "title":
      return "#8b5cf6";

    default:
      return "#6b7280";
  }
};

const formatValue = (value, fieldChanged) => {
  if (!value) return "-";

  // DUE DATE
  if (fieldChanged === "dueDate") {
    return new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // NORMAL STRING
  return String(value)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const renderActivityText = (activity) => {
  // CREATED
  if (activity.action === "created") {
    return (
      <>
        <Box
          component="span"
          sx={{
            fontWeight: 700,
          }}
        >
          {activity.performedBy?.name}
        </Box>

        {` created ${activity?.taskId?.title}`}
      </>
    );
  }

  if (activity.action === "deleted") {
    return (
      <>
        <Box
          component="span"
          sx={{
            fontWeight: 700,
          }}
        >
          {activity.performedBy?.name}
        </Box>

        {" deleted "}

        <Box
          component="span"
          sx={{
            fontWeight: 700,
            color: "#dc2626",
          }}
        >
          {activity.taskId?.title}
        </Box>
      </>
    );
  }

  // UPDATED
  return (
    <>
      <Box
        component="span"
        sx={{
          fontWeight: 700,
        }}
      >
        {activity.performedBy?.name}
      </Box>

      {" changed "}

      <Box
        component="span"
        sx={{
          fontWeight: 700,
        }}
      >
        {formatValue(activity.fieldChanged)}
      </Box>

      {" from "}

      <Box
        component="span"
        sx={{
          fontWeight: 700,
          color: "#dc2626",
        }}
      >
        {formatValue(
          activity.oldValue,

          activity.fieldChanged,
        )}
      </Box>

      {" to "}

      <Box
        component="span"
        sx={{
          fontWeight: 700,
          color: "#16a34a",
        }}
      >
        {formatValue(
          activity.newValue,

          activity.fieldChanged,
        )}
      </Box>
    </>
  );
};

const ActivityTimeline = ({ taskId }) => {
  const dispatch = useDispatch();

  const {
    activities,

    activitiesLoading,

    activitiesError,
  } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (taskId) {
      dispatch(fetchTaskActivities(taskId));
    }
  }, [dispatch, taskId]);

  if (activitiesError) {
    return <Typography color="error">{activitiesError}</Typography>;
  }

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "10px",
        border: "1px solid #eef2f7",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            color: "#111827",
            fontSize: "1rem",
          }}
        >
          Activity Timeline
        </Typography>
      </Box>

      {/* EMPTY */}
      {!activitiesLoading && activities.length === 0 && (
        <Box
          sx={{
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: "#94a3b8",
              fontSize: "0.9rem",
            }}
          >
            No activity found
          </Typography>
        </Box>
      )}

      {/* ACTIVITIES */}
      <Box sx={{ p: 3 }}>
        {activities?.map((activity, index) => (
          <Box
            key={activity._id}
            sx={{
              display: "flex",
              gap: 2,
              pb: index !== activities.length - 1 ? 3 : 0,
            }}
          >
            {/* TIMELINE */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* DOT */}
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: getActivityColor(activity.fieldChanged),
                  mt: "6px",
                }}
              />

              {/* LINE */}
              {index !== activities.length - 1 && (
                <Box
                  sx={{
                    flex: 1,
                    minHeight: "10px",
                    borderLeft: "2px dashed #d1d5db",
                    mt: 1,
                  }}
                />
              )}
            </Box>

            {/* CONTENT */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              {/* TEXT */}
              <Typography
                sx={{
                  fontSize: "0.88rem",
                  color: "#374151",
                  lineHeight: 1.7,
                  wordBreak: "break-word",
                }}
              >
                {renderActivityText(activity)}
              </Typography>

              {/* DATE */}
              <Typography
                sx={{
                  fontSize: "0.76rem",
                  fontWeight: 700,
                  color: "#3a3c3f",
                  whiteSpace: "nowrap",
                  minWidth: "120px",
                  textAlign: "right",
                }}
              >
                {new Date(activity.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default ActivityTimeline;
