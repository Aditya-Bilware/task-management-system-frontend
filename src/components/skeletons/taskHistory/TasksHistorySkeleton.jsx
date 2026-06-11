import { Box, Card, Skeleton } from "@mui/material";

const TasksHistorySkeleton = () => {
  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 3,
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
            xs: "flex-start",
            md: "center",
          },

          flexDirection: {
            xs: "column",
            md: "row",
          },

          gap: 2,

          mb: 3,
        }}
      >
        <Box>
          <Skeleton
            variant="text"
            width={240}
            height={45}
            sx={{
              borderRadius: "8px",
            }}
          />

          <Skeleton
            variant="text"
            width={320}
            height={25}
            sx={{
              borderRadius: "8px",

              mt: 0.5,
            }}
          />
        </Box>

        <Skeleton
          variant="rounded"
          width={190}
          height={40}
          sx={{
            borderRadius: "12px",
          }}
        />
      </Box>

      {/* FILTER BAR */}

      <Card
        elevation={0}
        sx={{
          mb: 3,

          borderRadius: "18px",

          border: "1px solid #e2e8f0",

          p: 2.2,
        }}
      >
        <Box
          sx={{
            display: "flex",

            flexDirection: {
              xs: "column",
              md: "row",
            },

            gap: 2,

            justifyContent: "space-between",

            alignItems: {
              xs: "stretch",
              md: "center",
            },
          }}
        >
          <Skeleton
            variant="rounded"
            height={42}
            sx={{
              width: {
                xs: "100%",
                md: 320,
              },

              borderRadius: "12px",
            }}
          />

          <Skeleton
            variant="rounded"
            height={42}
            sx={{
              width: {
                xs: "100%",
                sm: 220,
              },

              borderRadius: "12px",
            }}
          />
        </Box>
      </Card>

      {/* TABLE */}

      <Card
        elevation={0}
        sx={{
          borderRadius: "18px",

          border: "1px solid #e2e8f0",

          overflow: "hidden",

          overflowX: "auto",
        }}
      >
        {/* TABLE HEADER */}

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: "2.3fr 1fr 1fr 1.3fr 1.3fr 1fr",

            minWidth: "950px",

            px: 3,

            py: 1.8,

            background: "#f8fafc",

            borderBottom: "1px solid #eef2f7",
          }}
        >
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <Skeleton key={index} variant="text" width={90} height={24} />
          ))}
        </Box>

        {/* TABLE ROWS */}

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

        {/* PAGINATION */}

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
          <Skeleton variant="text" width={220} height={28} />

          <Skeleton
            variant="rounded"
            width={220}
            height={36}
            sx={{
              borderRadius: "10px",
            }}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default TasksHistorySkeleton;
