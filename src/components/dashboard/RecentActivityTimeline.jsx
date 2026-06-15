import { Box, Card, Typography } from "@mui/material";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchRecentActivities } from "../../features/dashboard/dashboardSlice";
import EmptyState from "../common/EmptyState";

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

  // FORMAT DUE DATE
  if (fieldChanged === "dueDate") {
    return new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  // NORMAL STRING FORMAT
  return String(value)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const renderActivityText = (activity) => {
  // TASK CREATED
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

        {" created task "}

        <Box
          component="span"
          sx={{
            fontWeight: 700,
          }}
        >
          {activity.taskId?.title}
        </Box>
      </>
    );
  }

  // TASK DELETED
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

        {" deleted task "}

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

  // TASK UPDATED
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
        {formatValue(activity.oldValue, activity.fieldChanged)}
      </Box>

      {" to "}

      <Box
        component="span"
        sx={{
          fontWeight: 700,
          color: "#16a34a",
        }}
      >
        {formatValue(activity.newValue, activity.fieldChanged)}
      </Box>

      {" in "}

      <Box
        component="span"
        sx={{
          fontWeight: 700,
        }}
      >
        {activity.taskId?.title}
      </Box>
    </>
  );
};

const RecentActivityTimeline = () => {
  const dispatch = useDispatch();

  const {
    recentActivities,

    recentActivitiesError,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchRecentActivities());
  }, [dispatch]);

  if (recentActivitiesError) {
    return <Typography color="error">{recentActivitiesError}</Typography>;
  }
  // console.log(recentActivities);

  return (
    <Card
      elevation={0}
      sx={{
        mt: 3,

        borderRadius: "14px",

        border: "1px solid #eef2f7",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          px: 3,
          py: 2,

          borderBottom: "1px solid #f1f5f9",

          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,

            color: "#111827",

            fontSize: "1rem",
          }}
        >
          Recent Activity
        </Typography>
      </Box>

      {!recentActivities?.length && (
        <Card>
          <EmptyState
            title="No Recent Activity"
            subtitle="Recent activity related to task creation, updates, and all changes will appear here."
          ></EmptyState>
        </Card>
      )}

      {/* ACTIVITIES */}
      <Box sx={{ p: 3 }}>
        {recentActivities?.map((activity, index) => (
          <Box
            key={activity._id}
            sx={{
              display: "flex",

              gap: 2,

              pb: index !== recentActivities.length - 1 ? 3 : 0,
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

                  bgcolor:
                    activity.action === "deleted"
                      ? "#dc2626"
                      : getActivityColor(activity.fieldChanged),
                  mt: "6px",
                }}
              />

              {/* CONNECTOR */}
              {index !== recentActivities.length - 1 && (
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
              {/* ACTIVITY TEXT */}
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

                  color: "#9ca3af",

                  whiteSpace: "nowrap",

                  minWidth: "85px",

                  textAlign: "right",
                }}
              >
                {new Date(activity.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",

                  month: "short",
                })}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default RecentActivityTimeline;
