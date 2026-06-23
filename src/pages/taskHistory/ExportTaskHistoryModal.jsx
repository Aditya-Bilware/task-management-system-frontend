import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";

const LabelText = ({ children }) => (
  <Typography
    sx={{
      fontSize: "0.8rem",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      mb: 1,
      color: "#475569",
    }}
  >
    {children}
  </Typography>
);

const ExportTaskHistoryModal = ({ open, onClose, onExport, loading }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleClose = () => {
    setFromDate(null);
    setToDate(null);

    onClose();
  };

  const handleExport = async () => {
    await onExport({
      fromDate,
      toDate,
    });

    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={open}
        onClose={handleClose}
        // TransitionComponent={Fade}
        transitionDuration={{ enter: 240, exit: 180 }}
        maxWidth="xs"
        fullWidth
        BackdropProps={{
          sx: {
            background: "rgba(15, 23, 42, 0.62)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          },
        }}
        PaperProps={{
          sx: {
            width: "520px",
            borderRadius: "24px",
            overflow: "hidden",
            background: "#ffffff",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            border: "1px solid #e2e8f0",
            animation: "modalReveal 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
            "@keyframes modalReveal": {
              "0%": { opacity: 0, transform: "translateY(16px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
          },
        }}
      >
        <Box
          sx={{
            height: "6px",

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
          #2563eb 20%,
          #2563eb 50%,
          transparent 100%
        )
      `,

              backgroundSize: "200% 100%",

              animation: "flowAccent 3s linear infinite",

              boxShadow: "0 0 12px #2563eb",
            },
          }}
        />
        <Box
          sx={{
            px: 3,
            py: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#0f172a",
              }}
            >
              Export Task Report
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                color: "#64748b",
                fontSize: "0.85rem",
              }}
            >
              Select a date range to download completed tasks.
            </Typography>
          </Box>

          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              color: "#64748b",
              transition: "all 0.15s",

              "&:hover": {
                color: "#0f172a",
                background: "#f1f5f9",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        </Box>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
              background: "#fcfcfd",
              py: 3,
            }}
          >
            <Box>
              <LabelText>From Date</LabelText>

              <DatePicker
                format="dd-MM-yyyy"
                disableFuture
                value={fromDate}
                onChange={(newValue) => setFromDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
              />
            </Box>

            <Box>
              <LabelText>To Date</LabelText>

              <DatePicker
                format="dd-MM-yyyy"
                disableFuture
                value={toDate}
                onChange={(newValue) => setToDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            py: 2.2,
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
            borderTop: "1px solid #e2e8f0",
            background: "#ffffff",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            disabled={loading}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              minWidth: "100px",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disableElevation
            onClick={handleExport}
            disabled={!fromDate || !toDate || loading}
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              px: 3,
              fontSize: "0.875rem",
              fontWeight: 600,

              background: "#2563eb",

              "&:hover": {
                background: "#1d4ed8",
              },
            }}
          >
            {loading ? "Generating..." : "Export Report"}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default ExportTaskHistoryModal;
