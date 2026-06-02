import { Box, Card, Skeleton, Typography } from "@mui/material";

const RecentTaskTableSkeleton = () => {
  return (
    <Card
      elevation={0}
      sx={{
        mt: 3,
        borderRadius: "14px",
        border: "1px solid #eef2f7",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      {/* <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: "1px solid #f1f5f9",

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Skeleton variant="text" width={140} height={32} animation="wave" />

        <Skeleton
          variant="rounded"
          width={80}
          height={30}
          animation="wave"
          sx={{
            borderRadius: "8px",
          }}
        />
      </Box> */}
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
        {" "}
        <Typography
          sx={{
            fontWeight: 700,
            color: "#111827",
            fontSize: "1rem",
          }}
        >
          Recent Tasks
        </Typography>
        <Skeleton variant="text" width={70} height={32} animation="wave" />
      </Box>

      {/* TABLE HEAD */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",

          px: 3,
          py: 1.5,

          backgroundColor: "#f8fafc",

          borderBottom: "1px solid #eef2f7",
        }}
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton
            key={item}
            variant="text"
            width={80}
            height={24}
            animation="wave"
          />
        ))}
      </Box>

      {/* TABLE ROWS */}
      {[1, 2, 3, 4, 5].map((row) => (
        <Box
          key={row}
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",

            alignItems: "center",

            px: 3,
            py: 1.8,

            borderBottom: row !== 5 ? "1px solid #f8fafc" : "none",
          }}
        >
          {/* TASK TITLE */}
          <Skeleton variant="text" width="80%" height={26} animation="wave" />

          {/* PRIORITY */}
          <Skeleton
            variant="rounded"
            width={70}
            height={28}
            animation="wave"
            sx={{
              borderRadius: "20px",
            }}
          />

          {/* STATUS */}
          <Skeleton
            variant="rounded"
            width={90}
            height={28}
            animation="wave"
            sx={{
              borderRadius: "20px",
            }}
          />

          {/* ASSIGNED TO */}
          <Skeleton variant="text" width={65} height={24} animation="wave" />

          {/* DUE DATE */}
          <Skeleton variant="text" width={90} height={24} animation="wave" />
        </Box>
      ))}
    </Card>
  );
};

export default RecentTaskTableSkeleton;
