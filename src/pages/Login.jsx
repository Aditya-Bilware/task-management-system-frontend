import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setCredentials,
  setLoading,
  setError,
} from "../features/auth/authSlice";

import { loginUser } from "../features/auth/authAPI";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, loading } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    dispatch(setError(null));
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      if (password.length < 6) return;

      const data = await loginUser({
        email,
        password,
      });

      dispatch(
        setCredentials({
          user: data.user,
          token: data.token,
          role: data.role,
        }),
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Login Failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        height: "100vh",
        overflow: "hidden",
        bgcolor: "#eef1f7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Main UI Card */}
      <Box
        sx={{
          width: { xs: "95%", md: "950px" },
          height: "550px",
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          backgroundImage: `url("./LoginImage.png")`,
          backgroundSize: "cover",
          backgroundPosition: "right center",
        }}
      >
        {/* Floating Form Panel */}
        <Paper
          elevation={12}
          sx={{
            position: "absolute",
            // Floating
            left: { xs: "0", md: "24px" },
            top: { xs: "0", md: "24px" },
            height: { xs: "100%", md: "calc(100% - 48px)" },
            width: { xs: "100%", md: "380px" },

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",

            px: 4,
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(12px)",

            borderRadius: { xs: "0px", md: "16px" },
            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",

            animation: "floatUp 0.6s ease-out forwards",
            "@keyframes floatUp": {
              "0%": { transform: "translateY(15px)", opacity: 0 },
              "100%": { transform: "translateY(0)", opacity: 1 },
            },
          }}
        >
          {/* Logo + Branding */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mb: 2,
            }}
          >
            <Avatar
              // src={"./logo.jpg"}
              sx={{
                width: 68,
                height: 68,
                mb: 1.8,
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
              }}
            />

            <Typography
              sx={{
                fontSize: "13px",
                color: "#6b7280",
                fontWeight: 500,
                mb: 2,
                letterSpacing: "0.2px",
                // textDecoration: "underline",
                textDecoration: "underline gray 1px",
              }}
            >
              {/* \Orchestrating a brighter world */}
              \From to-do to done, effortlessly
            </Typography>

            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#111827",
                lineHeight: 1.15,
                letterSpacing: "-0.6px",
                // mt: 1,
              }}
            >
              Task Management System
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: "15px",
              color: "#374151",
              fontWeight: 500,
              // lineHeight: 1,
              mb: 2,
              textAlign: "center",
            }}
          >
            Sign in to continue managing tasks
          </Typography>
          <Typography variant="body2" fontWeight="500" color="text.secondary">
            Work Email
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter your email"
            required
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) {
                dispatch(setError(null));
              }
            }}
            sx={{
              mb: 2,
              mt: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                },
                "&.Mui-focused": {
                  boxShadow: "0 0 0 4px rgba(90, 85, 234, 0.15)", // Active focus glow
                },
              },
            }}
          />

          <Typography variant="body2" fontWeight="500" color="text.secondary">
            Password
          </Typography>
          <TextField
            fullWidth
            required
            size="small"
            type="password"
            placeholder="Enter your password"
            name="password"
            label="Password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);

              if (error) {
                dispatch(setError(null));
              }
            }}
            sx={{
              mb: 3,
              mt: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                },
                "&.Mui-focused": {
                  boxShadow: "0 0 0 4px rgba(90, 85, 234, 0.15)", // Active focus glow
                },
              },
            }}
          />

          {error && (
            <Typography
              sx={{
                color: "#dc2626",
                fontSize: "15px",
                mb: 2,
                fontWeight: 500,
              }}
            >
              {error}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{
              py: 1.3,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: "bold",
              background: "linear-gradient(90deg, #3f51b5, #5a55ea)",
              transition:
                "transform 0.1s ease, box-shadow 0.2s ease, background 0.2s ease",
              boxShadow: "0 4px 12px rgba(90, 85, 234, 0.3)",
              ":hover": {
                background: "linear-gradient(90deg, #334296, #4c47d1)",
                boxShadow: "0 6px 20px rgba(90, 85, 234, 0.4)",
                transform: "translateY(-1px)", // Subtle hover lifting movement
              },
              ":active": {
                transform: "translateY(1px)", // Tactile press feedback
                boxShadow: "0 2px 6px rgba(90, 85, 234, 0.2)",
              },
            }}
          >
            {loading ? (
              <CircularProgress
                size={22}
                sx={{
                  color: "#fff",
                }}
              />
            ) : (
              "Login"
            )}
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginPage;
