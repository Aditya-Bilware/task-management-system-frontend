import { Box, Card, Skeleton } from "@mui/material";

const StatsCardsSkeleton = () => {
  return (
    <Box
      sx={{
        display: "grid",

        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)",
        },

        gap: 2,
      }}
    >
      {[1, 2, 3, 4, 5].map((item) => (
        <Card
          key={item}
          elevation={0}
          sx={{
            borderRadius: "14px",
            width: "100%",

            minHeight: "140px",
            border: "1px solid #eef2f7",
            p: 2.5,
            backgroundColor: "#fff",
          }}
        >
          {/* TOP SECTION */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            {/* TITLE + COUNT */}
            <Box sx={{ width: "70%" }}>
              {/* TITLE */}
              <Skeleton
                variant="text"
                width="65%"
                height={24}
                sx={{
                  borderRadius: "6px",
                }}
              />

              {/* COUNT */}
              <Skeleton
                variant="text"
                width="40%"
                height={52}
                sx={{
                  mt: 1,
                  borderRadius: "6px",
                }}
              />
            </Box>

            {/* ICON / AVATAR */}
            <Skeleton variant="circular" width={46} height={46} />
          </Box>

          {/* SUBTITLE */}
          <Skeleton
            variant="text"
            width="80%"
            height={22}
            sx={{
              mt: 2,
              borderRadius: "6px",
            }}
          />
        </Card>
      ))}
    </Box>
  );
};

export default StatsCardsSkeleton;
