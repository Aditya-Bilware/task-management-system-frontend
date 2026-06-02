export const getPriorityColor = (priority) => {
  priority = priority.toLowerCase();
  switch (priority) {
    case "critical":
      return {
        color: "#dc2626",
        bg: "#fee2e2",
      };

    case "minor":
      return {
        color: "#2E7D32  ",
        bg: "#C8E6C9 ",
      };
    case "major":
      return {
        color: "#F57F17 ",
        bg: "#FFF9C4 ",
      };
    case "medium":
      return {
        color: "#4A148C ",
        bg: "#E1BEE7 ",
      };

    default:
      return {
        color: "#616161 ",
        bg: "#F5F5F5 ",
      };
  }
};
