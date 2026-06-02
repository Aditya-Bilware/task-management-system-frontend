import { Box, Card, Skeleton } from "@mui/material";

const TasksTableSkeleton = () => {
  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",

          mb: 3,
        }}
      >
        {/* LEFT */}
        <Box>
          <Skeleton variant="text" width={120} height={40} />

          <Skeleton variant="text" width={260} height={24} />
        </Box>

        {/* BUTTON */}
        <Skeleton
          variant="rounded"
          width={140}
          height={42}
          sx={{
            borderRadius: "10px",
          }}
        />
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
            alignItems: "center",
          }}
        >
          {/* SEARCH */}
          <Skeleton
            variant="rounded"
            width={320}
            height={40}
            sx={{
              borderRadius: "10px",
            }}
          />

          {/* FILTERS */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            {[1, 2, 3].map((item) => (
              <Skeleton
                key={item}
                variant="rounded"
                width={150}
                height={40}
                sx={{
                  borderRadius: "10px",
                }}
              />
            ))}
          </Box>
        </Box>
      </Card>

      {/* TABLE */}
      <Card
        elevation={0}
        sx={{
          borderRadius: "14px",
          border: "1px solid #eef2f7",
          overflow: "hidden",
        }}
      >
        {/* TABLE HEAD */}
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: "2.2fr 1fr 1fr 1fr 1fr 1fr",

            px: 3,
            py: 1.8,

            backgroundColor: "#f8fafc",

            borderBottom: "1px solid #eef2f7",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Skeleton key={item} variant="text" width={90} height={25} />
          ))}
        </Box>

        {/* ROWS */}
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
            <Skeleton variant="text" width={180} height={28} />

            {/* PRIORITY */}
            <Skeleton
              variant="rounded"
              width={90}
              height={28}
              sx={{
                borderRadius: "8px",
              }}
            />

            {/* STATUS */}
            <Skeleton
              variant="rounded"
              width={110}
              height={28}
              sx={{
                borderRadius: "8px",
              }}
            />

            {/* ASSIGNED */}
            <Skeleton variant="text" width={90} height={26} />

            {/* DATE */}
            <Skeleton variant="text" width={100} height={26} />

            {/* ACTIONS */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",

                gap: 1,
              }}
            >
              {[1, 2, 3].map((btn) => (
                <Skeleton key={btn} variant="circular" width={34} height={34} />
              ))}
            </Box>
          </Box>
        ))}

        {/* PAGINATION */}
        <Box
          sx={{
            px: 3,
            py: 2,

            borderTop: "1px solid #f1f5f9",

            display: "flex",
            justifyContent: "space-between",

            alignItems: "center",
          }}
        >
          {/* LEFT TEXT */}
          <Skeleton variant="text" width={180} height={28} />

          {/* PAGINATION */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton
                key={item}
                variant="rounded"
                width={34}
                height={34}
                sx={{
                  borderRadius: "8px",
                }}
              />
            ))}
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default TasksTableSkeleton;
