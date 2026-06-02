export const getStatusColor = (status) => {
  status = status.toLowerCase();
  switch (status) {
    case "done":
      return {
        color: "#1B5E20 ",
        bg: "#E8F5E9  ",
      };

    case "in-progress":
      return {
        color: "#0D47A1 ",
        bg: "#E3F2FD ",
      };
    case "next":
      return {
        color: "#006064  ",
        bg: "#E0F7FA  ",
      };
    case "on-hold":
      return {
        color: "#E65100  ",
        bg: "#FFF3E0  ",
      };
    case "backlog":
      return {
        color: "#2a3438   ",
        bg: "#ECEFF1   ",
      };
    case "rejected":
      return {
        color: "#e73838   ",
        bg: "#E0E0E0   ",
      };
    default:
      return {
        color: "#d97706",
        bg: "#fef3c7",
      };
  }
};
