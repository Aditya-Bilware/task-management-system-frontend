import API from "/src/api/axios.js";

export const getNotificationsService = async (params) => {
  try {
    const res = await API.get("/notifications/", { params });
    return res.data;
  } catch (err) {
    console.log("notifications service error");
    // throw new Error(
    //   err.response?.data?.message || "Failed to load notifications",
    // );

    throw err.response?.data?.message || "Failed to load notifications";
  }
};

export const getUnreadCountService = async () => {
  try {
    const res = await API.get("/notifications/unread-count");
    return res.data;
  } catch (err) {
    console.log("unread notifications service error");
    throw err.response?.data?.message || "Failed to count unread notifications";
  }
};

export const markNotificationReadService = async (id) => {
  try {
    if (!id) {
      throw "Notification ID is required";
    }
    const res = await API.patch(`/notifications/${id}/read`);
    return res.data;
  } catch (err) {
    console.log("mark notification read service error");
    throw err.response?.data?.message || "Failed to mark notification read";
  }
};

export const clearAllNotificationsService = async () => {
  try {
    const res = await API.patch(`/notifications/clear-all`);
    return res.data;
  } catch (err) {
    console.log("mark notification read service error");
    throw err.response?.data?.message || "Failed to clear all notifications";
  }
};
