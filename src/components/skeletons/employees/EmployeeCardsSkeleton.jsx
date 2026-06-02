import { Box, Card, Skeleton } from "@mui/material";

const EmployeeCardsSkeleton = () => {
  return (
    <Box
      sx={{
        display: "grid",

        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(2,1fr)",
          lg: "repeat(3,1fr)",
        },

        gap: 2.2,
      }}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          elevation={0}
          sx={{
            borderRadius: "22px",

            border: "1px solid #dbe3ef",

            background: "#ffffff",

            p: 2.2,
          }}
        >
          {/* PROFILE */}

          <Box
            sx={{
              display: "flex",

              flexDirection: "column",

              alignItems: "center",

              textAlign: "center",

              mb: 2.4,
            }}
          >
            {/* AVATAR */}

            <Skeleton
              variant="circular"
              width={56}
              height={56}
              sx={{
                mb: 1.4,
              }}
            />

            {/* NAME */}

            <Skeleton
              variant="text"
              width={140}
              height={28}
              sx={{
                borderRadius: "8px",
              }}
            />

            {/* EMP CODE */}

            <Skeleton
              variant="text"
              width={80}
              height={20}
              sx={{
                mt: 0.3,

                borderRadius: "8px",
              }}
            />

            {/* EMAIL */}

            <Skeleton
              variant="text"
              width={220}
              height={20}
              sx={{
                mt: 0.6,

                borderRadius: "8px",
              }}
            />
          </Box>

          {/* METRICS */}

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: "repeat(2,1fr)",

              gap: 1.2,

              mb: 2.3,
            }}
          >
            {Array.from({ length: 4 }).map((_, idx) => (
              <Box
                key={idx}
                sx={{
                  height: "64px",

                  display: "flex",

                  flexDirection: "column",

                  alignItems: "center",

                  justifyContent: "center",
                }}
              >
                <Skeleton
                  variant="text"
                  width={40}
                  height={30}
                  sx={{
                    borderRadius: "8px",
                  }}
                />

                <Skeleton
                  variant="text"
                  width={70}
                  height={18}
                  sx={{
                    mt: 0.4,

                    borderRadius: "8px",
                  }}
                />
              </Box>
            ))}
          </Box>

          {/* BUTTONS */}

          <Box
            sx={{
              display: "flex",

              gap: 1,
            }}
          >
            <Skeleton
              variant="rounded"
              width="100%"
              height={38}
              sx={{
                borderRadius: "11px",
              }}
            />

            <Skeleton
              variant="rounded"
              width="100%"
              height={38}
              sx={{
                borderRadius: "11px",
              }}
            />
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default EmployeeCardsSkeleton;
