import { Box, Card, Skeleton, Stack, Divider } from "@mui/material";

const CreateTaskSkeleton = () => {
  return (
    <Box
      sx={{
        px: {
          xs: 2,
          sm: 3,
          md: 3,
          lg: 7,
        },

        py: {
          xs: 2,
          md: 3,
        },

        background: "#f8fafc",

        minHeight: "100vh",
      }}
    >
      {/* PAGE HEADER */}
      <Box sx={{ mb: 3 }}>
        <Skeleton
          variant="text"
          width={220}
          height={50}
          sx={{
            borderRadius: "8px",
          }}
        />
      </Box>

      {/* MAIN GRID */}
      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            xl: "1.8fr 0.9fr",
          },

          gap: 3,

          alignItems: "start",
        }}
      >
        {/* LEFT CARD */}
        <Card
          elevation={0}
          sx={{
            borderRadius: "24px",

            border: "1px solid #e2e8f0",

            overflow: "hidden",
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              px: 3,
              py: 2.2,

              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <Skeleton
              variant="text"
              width={240}
              height={40}
              sx={{
                borderRadius: "8px",
              }}
            />

            <Skeleton
              variant="text"
              width={320}
              height={24}
              sx={{
                borderRadius: "8px",
                mt: 0.5,
              }}
            />
          </Box>

          {/* FORM */}
          <Box
            sx={{
              p: {
                xs: 2,
                md: 3,
              },
            }}
          >
            <Stack spacing={3}>
              {/* TITLE */}
              <Box>
                <Skeleton
                  variant="text"
                  width={110}
                  height={24}
                  sx={{ mb: 1 }}
                />

                <Skeleton
                  variant="rounded"
                  height={56}
                  sx={{
                    borderRadius: "14px",
                  }}
                />
              </Box>

              {/* DESCRIPTION */}
              <Box>
                <Skeleton
                  variant="text"
                  width={120}
                  height={24}
                  sx={{ mb: 1 }}
                />

                <Skeleton
                  variant="rounded"
                  height={140}
                  sx={{
                    borderRadius: "14px",
                  }}
                />
              </Box>

              {/* PRIORITY + STATUS */}
              <Box
                sx={{
                  display: "grid",

                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr 1fr",
                  },

                  gap: 2,
                }}
              >
                {[1, 2].map((item) => (
                  <Box key={item}>
                    <Skeleton
                      variant="text"
                      width={90}
                      height={24}
                      sx={{ mb: 1 }}
                    />

                    <Skeleton
                      variant="rounded"
                      height={56}
                      sx={{
                        borderRadius: "14px",
                      }}
                    />
                  </Box>
                ))}
              </Box>

              {/* ASSIGN + DATE */}
              <Box
                sx={{
                  display: "grid",

                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr 1fr",
                  },

                  gap: 2,
                }}
              >
                {[1, 2].map((item) => (
                  <Box key={item}>
                    <Skeleton
                      variant="text"
                      width={110}
                      height={24}
                      sx={{ mb: 1 }}
                    />

                    <Skeleton
                      variant="rounded"
                      height={56}
                      sx={{
                        borderRadius: "14px",
                      }}
                    />
                  </Box>
                ))}
              </Box>

              <Divider />

              {/* BUTTON */}
              <Box
                sx={{
                  display: "flex",

                  justifyContent: "flex-end",
                }}
              >
                <Skeleton
                  variant="rounded"
                  width={160}
                  height={48}
                  sx={{
                    borderRadius: "12px",
                  }}
                />
              </Box>
            </Stack>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default CreateTaskSkeleton;
