import { formatDate } from "./formatdate";
import { getTimeAgo } from "./getTimeAgo";

export const getNotificationDetails = (activity) => {
  const { action, fieldChanged, newValue, oldValue, taskId } = activity;

  const performedByName = activity?.performedBy?.name || "system";

  const timeAgo = getTimeAgo(activity.createdAt);

  if (action === "created") {
    return {
      type: "assigned",
      title: "Task Assigned",
      description: `${taskId?.title}`,
      performedBy: performedByName,
      timeAgo,
    };
  }

  if (action === "deleted") {
    return {
      type: "deleted",
      title: "Task Deleted",
      description: `${taskId?.title}`,
      performedBy: performedByName,
      timeAgo,
    };
  }

  if (action === "updated" && fieldChanged === "status") {
    if (newValue?.toLowerCase() === "done") {
      return {
        type: "completed",
        title: "Task Completed",
        description: `${taskId?.title}`,
        performedBy: performedByName,
        timeAgo,
      };
    }

    if (newValue?.toLowerCase() === "rejected") {
      return {
        type: "rejected",
        title: "Task Rejected",
        description: `${taskId?.title}`,
        performedBy: performedByName,
        timeAgo,
      };
    }
    return {
      type: "status",
      title: "Status Updated",
      description: `${taskId?.title}`,
      subDescription: `${oldValue} → ${newValue}`,
      performedBy: performedByName,
      timeAgo,
    };
  }

  if (action === "updated" && fieldChanged === "priority") {
    return {
      type: "priority",
      title: "Priority Updated",
      description: `${taskId?.title}`,
      subDescription: `${oldValue} → ${newValue}`,
      performedBy: performedByName,
      timeAgo,
    };
  }

  if (action === "updated" && fieldChanged === "assignedTo") {
    return {
      type: "reassigned",
      title: "Task Reassigned",
      description: `${taskId?.title}`,
      subDescription: `${oldValue} → ${newValue}`,
      performedBy: performedByName,
      timeAgo,
    };
  }

  if (action === "updated" && fieldChanged === "dueDate") {
    const oldDate = new Date(oldValue).toLocaleDateString();

    const newDate = new Date(newValue).toLocaleDateString();
    return {
      type: "dueDate",
      title: "Due Date Updated",
      description: `${taskId?.title}`,
      subDescription: `${formatDate(oldDate)} → ${formatDate(newDate)}`,
      performedBy: performedByName,
      timeAgo,
    };
  }
  if (action === "updated" && fieldChanged === "title") {
    return {
      type: "title",
      title: "Task Renamed",
      description: `${taskId?.title}`,
      subDescription: `${oldValue} → ${newValue}`,
      performedBy: performedByName,
      timeAgo,
    };
  }

  if (action === "updated" && fieldChanged === "description") {
    return {
      type: "description",
      title: "Description Updated",
      description: `${taskId?.title}`,
      performedBy: performedByName,
      timeAgo,
    };
  }

  return {
    type: "default",
    title: "Task Updated",
    description: taskId?.title || "Task",
  };
};
