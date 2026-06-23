import { Box, Skeleton, Stack } from "@mui/material";

const NotificationDrawerSkeleton = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 3,
        p: 2,
        mb: 2,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start">
        {/* Icon */}
        <Skeleton
          variant="circular"
          width={48}
          height={48}
          sx={{
            bgcolor: "rgba(255,255,255,0.08)",
          }}
        />

        <Box flex={1}>
          {/* Action Title */}
          <Skeleton
            variant="text"
            width="45%"
            height={30}
            sx={{
              bgcolor: "rgba(255,255,255,0.08)",
            }}
          />

          {/* Task Title */}
          <Skeleton
            variant="text"
            width="75%"
            height={24}
            sx={{
              bgcolor: "rgba(255,255,255,0.08)",
            }}
          />

          {/* Old → New Value */}
          <Skeleton
            variant="text"
            width="55%"
            height={22}
            sx={{
              bgcolor: "rgba(255,255,255,0.08)",
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1.5,
            }}
          >
            {/* By */}
            <Skeleton
              variant="text"
              width={100}
              height={20}
              sx={{
                bgcolor: "rgba(255,255,255,0.08)",
              }}
            />

            {/* Time */}
            <Skeleton
              variant="text"
              width={70}
              height={20}
              sx={{
                bgcolor: "rgba(255,255,255,0.08)",
              }}
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default NotificationDrawerSkeleton;
