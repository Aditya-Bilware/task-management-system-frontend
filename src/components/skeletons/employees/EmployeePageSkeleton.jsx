import { Box, Card, Skeleton } from "@mui/material";

const EmployeesPageSkeleton = () => {
  return (
    <Box
      sx={{
        p: {
          xs: 2,
          sm: 3,
          md: 4,
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

          alignItems: "center",

          mb: 3,
        }}
      >
        <Box>
          <Skeleton
            variant="text"
            width={220}
            height={50}
            sx={{
              borderRadius: "8px",
            }}
          />

          <Skeleton
            variant="text"
            width={340}
            height={26}
            sx={{
              mt: 0.5,

              borderRadius: "8px",
            }}
          />
        </Box>

        <Skeleton
          variant="rounded"
          width={180}
          height={44}
          sx={{
            borderRadius: "14px",
          }}
        />
      </Box>

      {/* SEARCH BAR */}

      <Card
        elevation={0}
        sx={{
          mb: 3,

          p: 2,

          borderRadius: "20px",

          border: "1px solid #dbe3ef",
        }}
      >
        <Skeleton
          variant="rounded"
          width="100%"
          height={50}
          sx={{
            borderRadius: "16px",
          }}
        />
      </Card>

      {/* CARDS */}

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
              <Skeleton
                variant="circular"
                width={56}
                height={56}
                sx={{
                  mb: 1.4,
                }}
              />

              <Skeleton variant="text" width={150} height={30} />

              <Skeleton
                variant="text"
                width={80}
                height={20}
                sx={{
                  mt: 0.3,
                }}
              />

              <Skeleton
                variant="text"
                width={200}
                height={20}
                sx={{
                  mt: 0.6,
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
              {Array.from({
                length: 4,
              }).map((_, idx) => (
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
                  <Skeleton variant="text" width={40} height={30} />

                  <Skeleton
                    variant="text"
                    width={70}
                    height={18}
                    sx={{
                      mt: 0.4,
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
    </Box>
  );
};

export default EmployeesPageSkeleton;
