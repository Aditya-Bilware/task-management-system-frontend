import { Box, Skeleton } from "@mui/material";

const TaskRowSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((row) => (
        <Box
          key={row}
          sx={{
            display: "grid",
            gridTemplateColumns: "2.2fr 1fr 1fr 1fr 1fr 1fr",
            alignItems: "center",
            px: 3,
            py: 2.2,
            borderBottom: row !== 5 ? "1px solid #f8fafc" : "none",
          }}
        >
          {/* TITLE */}
          <Skeleton variant="text" width="70%" height={28} />

          {/* PRIORITY */}
          <Skeleton
            variant="rounded"
            width={90}
            height={28}
            sx={{ borderRadius: "8px" }}
          />

          {/* STATUS */}
          <Skeleton
            variant="rounded"
            width={110}
            height={28}
            sx={{ borderRadius: "8px" }}
          />

          {/* ASSIGNED */}
          <Skeleton variant="text" width="60%" height={26} />

          {/* DATE */}
          <Skeleton variant="text" width="70%" height={26} />

          {/* ACTIONS */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {[1, 2, 3].map((btn) => (
              <Skeleton key={btn} variant="circular" width={34} height={34} />
            ))}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default TaskRowSkeleton;
