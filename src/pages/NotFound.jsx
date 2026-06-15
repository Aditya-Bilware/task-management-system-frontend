import { Box, Button, Card, Typography, Stack } from "@mui/material";

import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { useNavigate, useLocation } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        minHeight: "90vh",
        background: "#f8fafc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Card
        elevation={0}
        sx={{
          maxWidth: 650,
          width: "100%",
          borderRadius: "24px",
          border: "1px solid #e2e8f0",
          p: {
            xs: 4,
            md: 6,
          },
          textAlign: "center",
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: "#eff6ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
          }}
        >
          <SearchOffRoundedIcon
            sx={{
              fontSize: 48,
              color: "#2563eb",
            }}
          />
        </Box>

        {/* 404 */}
        <Typography
          sx={{
            fontSize: {
              xs: "3rem",
              md: "5rem",
            },
            fontWeight: 800,
            color: "#2563eb",
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        {/* Title */}
        <Typography
          sx={{
            mt: 2,
            fontSize: {
              xs: "1.4rem",
              md: "1.8rem",
            },
            fontWeight: 700,
            color: "#0f172a",
          }}
        >
          Page Not Found
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            mt: 1.5,
            color: "#64748b",
            fontSize: "0.95rem",
            maxWidth: 500,
            mx: "auto",
          }}
        >
          The page you are looking for does not exist, may have been moved, or
          the URL may be incorrect.
        </Typography>

        {/* Requested URL */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: "12px",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "#94a3b8",
              mb: 0.5,
            }}
          >
            Requested URL
          </Typography>

          <Typography
            sx={{
              fontFamily: "monospace",
              color: "#334155",
              fontWeight: 600,
            }}
          >
            {location.pathname}
          </Typography>
        </Box>

        {/* Actions */}
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          justifyContent="center"
          sx={{
            mt: 4,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            startIcon={<DashboardOutlinedIcon />}
            onClick={() => navigate("/dashboard")}
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              py: 1,
              boxShadow: "none",
            }}
          >
            Go to Dashboard
          </Button>

          <Button
            variant="outlined"
            startIcon={<ArrowBackOutlinedIcon />}
            onClick={() => navigate(-1)}
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              py: 1,
            }}
          >
            Go Back
          </Button>
        </Stack>

        {/* Footer Note */}
        <Typography
          sx={{
            mt: 4,
            fontSize: "0.85rem",
            color: "#94a3b8",
          }}
        >
          If you believe this is an error, please contact your administrator.
        </Typography>
      </Card>
    </Box>
  );
};

export default NotFound;
