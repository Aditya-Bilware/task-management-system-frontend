import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
  IconButton,
  Fade,
} from "@mui/material";

import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  setDeletingTaskId,
  clearDeletingTaskId,
} from "../../features/tasks/taskSlice";
import { enqueueSnackbar } from "notistack";

const DeleteTaskModal = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tasks, deleteTaskLoading } = useSelector((state) => state.tasks);

  const selectedTask = tasks.find((tasks) => tasks._id === id);

  const handleClose = () => {
    navigate("/tasks");
  };

  const handleDelete = async () => {
    navigate("/tasks");

    dispatch(setDeletingTaskId(id));

    const res = await dispatch(deleteTask(id));

    if (deleteTask.rejected.match(res)) {
      dispatch(clearDeletingTaskId());
      enqueueSnackbar(res.payload, {
        variant: "error",
      });
      return;
    }

    setTimeout(() => {
      dispatch(clearDeletingTaskId());
    }, 500);

    enqueueSnackbar(res.payload.message, {
      variant: "success",
    });
  };

  return (
    <Dialog
      open={Boolean(id)}
      onClose={handleClose}
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
          #dc2626 20%,
          #dc2626 50%,
          transparent 100%
        )
      `,

              backgroundSize: "200% 100%",

              animation: "flowAccent 3s linear infinite",

              boxShadow: "0 0 12px #dc2626",
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

                background: "rgba(239,68,68,0.12)",
              }}
            >
              <WarningAmberRoundedIcon
                sx={{
                  color: "#dc2626",
                  fontSize: 22,
                }}
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
                Delete Task
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.78rem",
                  color: "#64748b",
                  mt: 0.2,
                }}
              >
                This action cannot be undone
              </Typography>
            </Box>
          </Box>

          <IconButton onClick={handleClose} size="small">
            <CloseRoundedIcon
              sx={{
                fontSize: 20,
              }}
            />
          </IconButton>
        </Box>

        {/* BODY */}
        <Box
          sx={{
            px: 3,
            py: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: "0.92rem",
              fontWeight: 700,
              color: "#334155",
              lineHeight: 1.7,
            }}
          >
            Are you sure you want to delete this task?
          </Typography>

          <Box
            sx={{
              mt: 2.2,

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

                mb: 0.7,

                textTransform: "uppercase",

                letterSpacing: "0.04em",
              }}
            >
              Task
            </Typography>

            <Typography
              sx={{
                fontSize: "0.93rem",
                fontWeight: 600,
                color: "#0f172a",
              }}
            >
              {selectedTask?.title}
            </Typography>
          </Box>

          {/* ACTIONS */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",

              gap: 1.5,

              mt: 4,
            }}
          >
            <Button
              onClick={handleClose}
              disabled={deleteTaskLoading}
              variant="outlined"
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
              Cancel
            </Button>

            <Button
              onClick={handleDelete}
              disabled={deleteTaskLoading}
              variant="contained"
              startIcon={<DeleteOutlineRoundedIcon />}
              sx={{
                borderRadius: "12px",

                textTransform: "none",

                px: 3,
                py: 1,

                fontWeight: 700,

                boxShadow: "none",

                background: "#dc2626",

                "&:hover": {
                  background: "#b91c1c",

                  boxShadow: "none",
                },
              }}
            >
              {deleteTaskLoading ? "Deleting..." : "Delete Task"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTaskModal;
