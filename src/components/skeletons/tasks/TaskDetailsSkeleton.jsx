import { Box, Card, Divider, Skeleton } from "@mui/material";

const TaskDetailsSkeleton = () => {
  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 2,
        },

        maxWidth: "1400px",

        mx: "auto",

        backgroundColor: "#f8fafc",

        minHeight: "100vh",
      }}
    >
      {/* PAGE TITLE */}

      <Box
        sx={{
          mb: 3,
        }}
      >
        <Skeleton
          variant="text"
          width={140}
          height={40}
          sx={{
            borderRadius: "8px",
          }}
        />
      </Box>

      {/* MAIN CARD */}

      <Card
        elevation={0}
        sx={{
          borderRadius: "10px",

          border: "1px solid #e2e8f0",

          overflow: "hidden",
        }}
      >
        {/* TOP SECTION */}

        <Box
          sx={{
            p: 3,

            display: "flex",

            flexDirection: {
              xs: "column",
              lg: "row",
            },

            justifyContent: "space-between",

            alignItems: "flex-start",

            gap: 4,
          }}
        >
          {/* LEFT */}

          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                flexWrap: "wrap",

                gap: 2,

                mb: 2,
              }}
            >
              <Skeleton
                variant="text"
                width={320}
                height={52}
                sx={{
                  borderRadius: "8px",
                }}
              />

              <Skeleton
                variant="rounded"
                width={90}
                height={30}
                sx={{
                  borderRadius: "8px",
                }}
              />
            </Box>

            <Skeleton
              variant="rounded"
              width={120}
              height={34}
              sx={{
                borderRadius: "8px",
              }}
            />
          </Box>

          {/* RIGHT CARD */}

          <Card
            elevation={0}
            sx={{
              width: {
                xs: "100%",
                lg: "auto",
              },

              borderRadius: "14px",

              border: "1px solid #e2e8f0",

              p: 2.5,

              backgroundColor: "#f8fafc",

              display: "flex",

              flexDirection: {
                xs: "column",
                sm: "row",
              },

              alignItems: "center",

              gap: 3,
            }}
          >
            {/* ASSIGNED */}

            <Box
              sx={{
                display: "flex",

                flexDirection: "column",

                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
            >
              <Skeleton
                variant="text"
                width={90}
                height={24}
                sx={{
                  mb: 1.5,
                }}
              />

              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",

                  gap: 2,
                }}
              >
                <Skeleton variant="circular" width={44} height={44} />

                <Box>
                  <Skeleton variant="text" width={130} height={26} />

                  <Skeleton variant="text" width={80} height={22} />
                </Box>
              </Box>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            />

            {/* DUE DATE */}

            <Box
              sx={{
                display: "flex",

                flexDirection: "column",

                minWidth: "120px",

                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
            >
              <Skeleton
                variant="text"
                width={80}
                height={24}
                sx={{
                  mb: 1.5,
                }}
              />

              <Skeleton variant="text" width={110} height={30} />
            </Box>
          </Card>
        </Box>

        <Divider />

        {/* DESCRIPTION */}

        <Box
          sx={{
            p: {
              xs: 2.5,
              md: 4,
            },
          }}
        >
          <Skeleton
            variant="text"
            width={120}
            height={34}
            sx={{
              mb: 2,
            }}
          />

          <Skeleton variant="text" width="100%" height={24} />

          <Skeleton variant="text" width="96%" height={24} />

          <Skeleton variant="text" width="92%" height={24} />

          <Skeleton variant="text" width="75%" height={24} />
        </Box>

        <Divider />

        {/* META INFO */}

        <Box
          sx={{
            p: {
              xs: 2.5,
              md: 4,
            },

            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },

            gap: 2,
          }}
        >
          {[1, 2, 3].map((item) => (
            <Box key={item}>
              <Skeleton
                variant="text"
                width={90}
                height={24}
                sx={{
                  mb: 1,
                }}
              />

              <Skeleton variant="text" width={150} height={28} />
            </Box>
          ))}
        </Box>

        <Divider />

        {/* TIMELINE */}

        <Box
          sx={{
            p: {
              xs: 2.5,
              md: 4,
            },
          }}
        >
          <Skeleton
            variant="text"
            width={170}
            height={36}
            sx={{
              mb: 3,
            }}
          />

          {[1, 2, 3].map((item) => (
            <Box
              key={item}
              sx={{
                display: "flex",

                gap: 2,

                mb: 3,
              }}
            >
              <Skeleton variant="circular" width={42} height={42} />

              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="40%" height={26} />

                <Skeleton variant="text" width="80%" height={22} />

                <Skeleton variant="text" width="25%" height={20} />
              </Box>
            </Box>
          ))}
        </Box>
      </Card>
    </Box>
  );
};

export default TaskDetailsSkeleton;
