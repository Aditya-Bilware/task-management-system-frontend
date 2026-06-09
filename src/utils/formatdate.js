export const formatDate = (date) => {
  if (!date) return "Not Set";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
