import { Box, Skeleton, Stack } from "@mui/material";
import { useSelector } from "react-redux";

const SingleRowSkeleton = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Box
      sx={{
        display: "grid",

        gridTemplateColumns: "2.2fr 1fr 1fr 1fr 1fr 1fr",

        minWidth: "900px",
        minHeight: 78,

        alignItems: "center",

        px: 3,
        py: 2.2,

        borderBottom: "1px solid #f8fafc",
      }}
    >
      {/* TITLE */}
      <Skeleton variant="text" width={180} height={30} />

      {/* PRIORITY */}
      <Skeleton
        variant="rounded"
        width={70}
        height={28}
        sx={{
          borderRadius: "8px",
        }}
      />

      {/* STATUS */}
      <Skeleton
        variant="rounded"
        width={80}
        height={28}
        sx={{
          borderRadius: "8px",
        }}
      />

      {/* ASSIGNED */}
      <Skeleton variant="text" width={110} height={24} />

      {/* DATE */}
      <Skeleton variant="text" width={90} height={24} />

      {/* ACTIONS */}
      <Stack direction="row" spacing={1}>
        {user?.role === "manager" && (
          <Skeleton variant="circular" width={30} height={30} />
        )}

        <Skeleton variant="circular" width={30} height={30} />
        <Skeleton variant="circular" width={30} height={30} />
      </Stack>
    </Box>
  );
};

export default SingleRowSkeleton;
