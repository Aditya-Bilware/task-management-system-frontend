import API from "/src/api/axios.js";
export const getStats = async () => {
  try {
    const res = await API.get("/dashboard/stats");
    return res.data;
  } catch (err) {
    console.log("get stats service error", err);
    throw err.response?.data || "Failed to fetch stats";
  }
};

export const getRecentTasks = async () => {
  try {
    const res = await API.get("/dashboard/recent-tasks");
    return res.data;
  } catch (err) {
    console.log("recent tasks service error");
    throw err.response?.data || "Failed to fetch recent tasks";
  }
};
