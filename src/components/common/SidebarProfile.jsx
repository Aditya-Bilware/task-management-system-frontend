import { Avatar, Box, Divider, Typography } from "@mui/material";

import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";

import { useSelector } from "react-redux";

import ClickAwayListener from "@mui/material/ClickAwayListener";

const SidebarProfile = ({ profileOpen, setProfileOpen, profileButtonRef }) => {
  const { user } = useSelector((state) => state.auth);

  const lastLogin = localStorage.getItem("lastLogin");

  const formattedLastLogin = lastLogin
    ? new Date(lastLogin).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "N/A";

  const handleClickAway = (e) => {
    if (profileButtonRef?.current?.contains(e.target)) return;
    setProfileOpen(false);
  };

  return (
    <Box
      sx={{
        mt: "auto",

        p: 1.5,
      }}
    >
      {/* EXPANDED PROFILE */}
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box
          sx={{
            position: "absolute",

            bottom: "130px",

            left: "10px",

            right: "10px",

            zIndex: 2000,

            opacity: profileOpen ? 1 : 0,

            visibility: profileOpen ? "visible" : "hidden",

            transform: profileOpen ? "translateY(0)" : "translateY(10px)",

            transition: "all .25s ease",
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(180deg,#13203b 0%, #0f172a 100%)",

              border: "1px solid rgba(255,255,255,0.08)",

              borderRadius: "22px",

              boxShadow: "0 20px 50px rgba(0,0,0,.45)",

              backdropFilter: "blur(12px)",

              p: 2,
            }}
          >
            {/* TOP */}

            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                gap: 1.5,
              }}
            >
              <Avatar
                sx={{
                  width: 52,

                  height: 52,

                  bgcolor: "#2563eb",

                  fontSize: "1.2rem",

                  fontWeight: 700,
                }}
              >
                {user?.name?.charAt(0)}
              </Avatar>

              <Box
                sx={{
                  overflow: "hidden",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",

                    fontSize: "1rem",

                    fontWeight: 700,
                  }}
                >
                  {user?.name}
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.65)",

                    fontSize: "0.82rem",

                    whiteSpace: "nowrap",

                    overflow: "hidden",

                    textOverflow: "ellipsis",
                  }}
                >
                  {user?.employeeCode}
                </Typography>
              </Box>
            </Box>

            {/* ONLINE */}

            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                gap: 0.7,

                mt: 1.8,
              }}
            >
              <FiberManualRecordRoundedIcon
                sx={{
                  color: "#22c55e",

                  fontSize: "0.75rem",
                }}
              />

              <Typography
                sx={{
                  color: "#fff",

                  fontSize: "0.82rem",
                }}
              >
                Online
              </Typography>
            </Box>

            <Divider
              sx={{
                my: 2,

                borderColor: "rgba(255,255,255,0.08)",
              }}
            />

            {/* INFO */}

            <Box
              sx={{
                display: "flex",

                flexDirection: "column",

                gap: 1.5,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.5)",

                    fontSize: "0.75rem",
                  }}
                >
                  Role
                </Typography>

                <Typography
                  sx={{
                    color: "#fff",

                    fontSize: "0.9rem",

                    fontWeight: 600,

                    textTransform: "capitalize",
                  }}
                >
                  {user?.role}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.5)",

                    fontSize: "0.75rem",
                  }}
                >
                  Employee ID
                </Typography>

                <Typography
                  sx={{
                    color: "#fff",

                    fontSize: "0.9rem",

                    fontWeight: 600,
                  }}
                >
                  {user?.employeeCode}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.5)",

                    fontSize: "0.75rem",
                  }}
                >
                  Email
                </Typography>

                <Typography
                  sx={{
                    color: "#fff",

                    fontSize: "0.9rem",

                    fontWeight: 600,
                  }}
                >
                  {user?.email}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.5)",

                    fontSize: "0.75rem",
                  }}
                >
                  Last Login
                </Typography>

                <Typography
                  sx={{
                    color: "#fff",

                    fontSize: "0.9rem",

                    fontWeight: 600,
                  }}
                >
                  {formattedLastLogin}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

export default SidebarProfile;
