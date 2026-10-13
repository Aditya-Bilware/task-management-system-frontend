import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  Fade,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
// import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import { enqueueSnackbar } from "notistack";

import { createWorkLogService } from "../../services/tasks/taskWorkLogService";
import { formatDateForApi } from "../../utils/formatDateForWorkLog";

const initialForm = {
  hours: "",
  minutes: "",
  description: "",
  workLogDate: new Date(),
};

const LogWorkModal = ({ open, onClose, taskId, taskCreatedAt, onSuccess }) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm({ ...initialForm, workLogDate: new Date() });
      setError("");
    }
  }, [open]);

  const handleClose = () => {
    if (loading) return;

    setForm(initialForm);
    setError("");
    onClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const hours = Number(form.hours || 0);
    const minutes = Number(form.minutes || 0);
    const description = form.description.trim();

    if (
      !Number.isSafeInteger(hours) ||
      !Number.isSafeInteger(minutes) ||
      hours < 0 ||
      minutes < 0 ||
      minutes > 59
    ) {
      setError(
        "Enter valid hours and minutes. Minutes must be between 0 and 59.",
      );
      return;
    }

    const totalMinutes = hours * 60 + minutes;

    if (!Number.isSafeInteger(totalMinutes) || totalMinutes <= 0) {
      setError("Time spent must be greater than zero.");
      return;
    }

    if (!description) {
      setError("Please enter a description of the work performed.");
      return;
    }

    if (description.length > 1000) {
      setError("Description cannot exceed 1000 characters.");
      return;
    }

    if (!form.workLogDate || Number.isNaN(form.workLogDate.getTime())) {
      setError("Please select a valid work log date");
      return;
    }

    try {
      setLoading(true);

      await createWorkLogService(taskId, {
        hours,
        minutes,
        description,
        workLogDate: formatDateForApi(form.workLogDate),
      });

      enqueueSnackbar("Work log added successfully.", {
        variant: "success",
      });

      setForm(initialForm);
      onClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const message =
        err?.message ||
        err?.response?.data?.message ||
        "Failed to add work log. Please try again.";

      setError(message);

      enqueueSnackbar(message, {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
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
        <DialogContent sx={{ p: 0 }}>
          <Box
            sx={{
              height: "5px",
              background: "linear-gradient(90deg, #93c5fd, #2563eb, #60a5fa)",
              backgroundSize: "200% 100%",
              animation: "flowAccent 3s linear infinite",
              "@keyframes flowAccent": {
                "0%": { backgroundPosition: "-200% 0" },
                "100%": { backgroundPosition: "200% 0" },
              },
            }}
          />

          {/* HEADER */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              py: 2.2,
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  flexShrink: 0,
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(37,99,235,0.10)",
                }}
              >
                <AccessTimeRoundedIcon
                  sx={{ color: "#2563eb", fontSize: 23 }}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  Log Work
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.78rem",
                    color: "#64748b",
                    mt: 0.2,
                  }}
                >
                  Record time spent on this task
                </Typography>
              </Box>
            </Box>

            <IconButton
              onClick={handleClose}
              disabled={loading}
              size="small"
              aria-label="Close log work modal"
            >
              <CloseRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          {/* FORM */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ px: 3, py: 3 }}
          >
            <Typography
              sx={{
                fontSize: "0.92rem",
                fontWeight: 700,
                color: "#334155",
                mb: 2,
              }}
            >
              Time Spent
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Typography
                sx={{
                  fontSize: "0.92rem",
                  fontWeight: 700,
                  color: "#334155",
                  mb: 1.5,
                }}
              >
                Work Date
              </Typography>

              <DatePicker
                format="dd-MM-yyyy"
                value={form.workLogDate}
                minDate={taskCreatedAt ? new Date(taskCreatedAt) : new Date()}
                maxDate={new Date()}
                onChange={(newValue) => {
                  setForm((prev) => ({
                    ...prev,
                    workLogDate: newValue,
                  }));
                  setError("");
                }}
                disabled={loading}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        background: "#ffffff",
                        fontSize: "0.875rem",
                        color: "#0f172a",
                        "& fieldset": {
                          borderColor: "#cbd5e1",
                        },
                        "&:hover fieldset": {
                          borderColor: "#94a3b8",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#2563eb",
                          borderWidth: "1.5px",
                          boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
                        },
                      },
                    },
                  },
                }}
              />
            </Box>
            <br />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr 1fr",
                  sm: "1fr 1fr",
                },
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                label="Hours"
                name="hours"
                type="number"
                value={form.hours}
                onChange={handleChange}
                disabled={loading}
                placeholder="0"
                inputProps={{ min: 0, step: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">hr</InputAdornment>
                  ),
                }}
                sx={fieldStyles}
              />

              <TextField
                fullWidth
                label="Minutes"
                name="minutes"
                type="number"
                value={form.minutes}
                onChange={handleChange}
                disabled={loading}
                placeholder="0"
                inputProps={{ min: 0, max: 59, step: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">min</InputAdornment>
                  ),
                }}
                sx={fieldStyles}
              />
            </Box>

            <Box
              sx={{
                mt: 3,
                mb: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {/* <EditNoteRoundedIcon sx={{ color: "#64748b", fontSize: 22 }} /> */}

              <Typography
                sx={{
                  fontSize: "0.92rem",
                  fontWeight: 700,
                  color: "#334155",
                }}
              >
                Work Description
              </Typography>
            </Box>

            <TextField
              fullWidth
              multiline
              minRows={4}
              maxRows={8}
              name="description"
              value={form.description}
              onChange={handleChange}
              disabled={loading}
              placeholder="Describe the work you completed..."
              error={Boolean(error)}
              helperText={`${form.description.length}/1000 characters`}
              inputProps={{ maxLength: 1000 }}
              sx={{
                ...fieldStyles,
                "& .MuiOutlinedInput-root": {
                  ...fieldStyles["& .MuiOutlinedInput-root"],
                  alignItems: "flex-start",
                },
                "& .MuiFormHelperText-root": {
                  textAlign: "right",
                  color: "#64748b",
                  mx: 0.5,
                },
              }}
            />

            {error && (
              <Box
                role="alert"
                sx={{
                  mt: 2,
                  p: 1.5,
                  borderRadius: "12px",
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.84rem",
                    color: "#b91c1c",
                    fontWeight: 500,
                  }}
                >
                  {error}
                </Typography>
              </Box>
            )}

            {/* ACTIONS */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                flexWrap: "wrap",
                gap: 1.5,
                mt: 4,
              }}
            >
              <Button
                onClick={handleClose}
                disabled={loading}
                variant="outlined"
                sx={secondaryButtonStyles}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
                variant="contained"
                startIcon={
                  loading ? (
                    <CircularProgress size={17} color="inherit" />
                  ) : // <AccessTimeRoundedIcon />
                  null
                }
                sx={primaryButtonStyles}
              >
                {loading ? "Saving..." : "Save Log"}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
};

const fieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f8fafc",
    fontSize: "0.9rem",
    "& fieldset": {
      borderColor: "#e2e8f0",
    },
    "&:hover fieldset": {
      borderColor: "#cbd5e1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2563eb",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.9rem",
  },
};

const secondaryButtonStyles = {
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
};

const primaryButtonStyles = {
  borderRadius: "12px",
  textTransform: "none",
  px: 3,
  py: 1,
  fontWeight: 700,
  boxShadow: "none",
  background: "#2563eb",
  "&:hover": {
    background: "#1d4ed8",
    boxShadow: "none",
  },
};

export default LogWorkModal;
