import { Box, Typography } from "@mui/material";

import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

const EmptyState = ({
  title,

  subtitle,
}) => {
  return (
    <Box
      sx={{
        py: 10,

        px: 2,

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        justifyContent: "center",

        textAlign: "center",
      }}
    >
      <InboxOutlinedIcon
        sx={{
          fontSize: 64,

          color: "#cbd5e1",

          mb: 2,
        }}
      />

      <Typography
        sx={{
          fontSize: "1rem",

          fontWeight: 700,

          color: "#334155",

          mb: 1,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontSize: "0.92rem",

          color: "#64748b",

          maxWidth: 400,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default EmptyState;
