import { Box, Skeleton } from "@mui/material";

const TasksHistoryRowSkeleton = () => {
  return (
    <>
      {Array.from({
        length: 8,
      }).map((_, index) => (
        <Box
          key={index}
          sx={{
            display: "grid",

            gridTemplateColumns: "2.3fr 1fr 1fr 1.3fr 1.3fr 1fr",

            minWidth: "950px",

            alignItems: "center",

            px: 3,

            py: 2.1,

            borderBottom: index !== 7 ? "1px solid #f1f5f9" : "none",
          }}
        >
          {/* TITLE */}

          <Skeleton
            variant="text"
            width="85%"
            height={28}
            sx={{
              borderRadius: "6px",
            }}
          />

          {/* PRIORITY */}

          <Skeleton
            variant="rounded"
            width={80}
            height={28}
            sx={{
              borderRadius: "8px",
            }}
          />

          {/* STATUS */}

          <Skeleton
            variant="rounded"
            width={90}
            height={28}
            sx={{
              borderRadius: "8px",
            }}
          />

          {/* ASSIGNED TO */}

          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              gap: 1,
            }}
          >
            <Skeleton variant="circular" width={32} height={32} />

            <Skeleton variant="text" width={100} height={24} />
          </Box>

          {/* PERFORMED BY */}

          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              gap: 1,
            }}
          >
            <Skeleton variant="circular" width={32} height={32} />

            <Skeleton variant="text" width={100} height={24} />
          </Box>

          {/* ACTION DATE */}

          <Skeleton variant="text" width={90} height={24} />
        </Box>
      ))}
    </>
  );
};

export default TasksHistoryRowSkeleton;
