export const isTaskOverdue = (task) => {
  if (!task?.dueDate) return false;
  const dueDate = new Date(task.dueDate);
  dueDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return dueDate < today && !["done", "rejected"].includes(task.status);
};
