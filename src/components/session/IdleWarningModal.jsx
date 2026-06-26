import {
  Dialog,
  DialogContent,
  Button,
  Fade,
  Box,
  Typography,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

const IdleWarningModal = ({ open, countdown, onStayLoggedIn, onLogout }) => {
  const mins = Math.floor(countdown / 60);
  const sec = countdown % 60;

  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      fullWidth
      maxWidth="xs"
      TransitionComponent={Fade}
      transitionDuration={{
        enter: 250,
        exit: 180,
      }}
      PaperProps={{
        sx: {
          borderRadius: "24px",
          overflow: "hidden",
          background: "#ffffff",
          boxShadow: "0 20px 60px rgba(15,23,42,0.18)",
          border: "1px solid rgba(15,23,42,0.08)",
        },
      }}
      BackdropProps={{
        sx: {
          background: "rgba(15,23,42,0.55)",
          backdropFilter: "blur(6px)",
        },
      }}
    >
      <DialogContent
        sx={{
          p: 0,
        }}
      >
        <Box
          sx={{
            height: "5px",

            position: "relative",

            overflow: "hidden",

            "@keyframes flowAccent": {
              "0%": {
                backgroundPosition: "-200% 0",
              },

              "100%": {
                backgroundPosition: "200% 0",
              },
            },

            "&::before": {
              content: '""',

              position: "absolute",

              top: 0,

              left: 0,

              width: "100%",

              height: "100%",

              background: `
        linear-gradient(
          90deg,
          transparent 0%,
          #f59e0b  20%,
          #f59e0b  50%,
          transparent 100%
        )
      `,

              backgroundSize: "200% 100%",

              animation: "flowAccent 3s linear infinite",

              boxShadow: "0 0 12px #f59e0b ",
            },
          }}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 3,
            py: 2.3,
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(245,158,11,0.12)",
            }}
          >
            <WarningAmberRoundedIcon
              sx={{
                color: "#f59e0b",
                fontSize: 22,
              }}
            />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Session Expiring
            </Typography>
            <Typography
              sx={{
                fontSize: "0.88rem",
                fontWeight: 700,
                color: "#64748b",
                mt: 0.2,
              }}
            >
              Your session is about to expire
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            px: 3,
            py: 3,
          }}
        >
          <Box
            sx={{
              p: 2,
              borderRadius: "16px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Session Status
            </Typography>
            <Typography
              sx={{
                mt: 1,
                color: "#334155",
                fontSize: ".9rem",
                lineHeight: 1.7,
              }}
            >
              No activity has been detected.
            </Typography>

            <Box
              sx={{
                mt: 2.5,
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: ".75rem",
                  color: "#64748b",
                  mb: 0.5,
                }}
              >
                Your session will expires in
              </Typography>

              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#f59e0b",
                  letterSpacing: ".08em",
                }}
              >
                {String(mins).padStart(2, "0")}:{String(sec).padStart(2, "0")}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1.5,
              mt: 4,
            }}
          >
            <Button
              variant="outlined"
              onClick={onLogout}
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                px: 2.8,
                py: 1,
                fontWeight: 600,
                borderColor: "#dbe3ec",
                color: "#334155",

                "&:hover": {
                  borderColor: "#cbd5e1",
                  background: "#f8fafc",
                },
              }}
            >
              Logout
            </Button>

            <Button
              variant="contained"
              onClick={onStayLoggedIn}
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                px: 3,
                py: 1,
                fontWeight: 700,
                boxShadow: "none",
                background: "#f59e0b",

                "&:hover": {
                  background: "#d97706",
                  boxShadow: "none",
                },
              }}
            >
              Stay Logged In
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default IdleWarningModal;
