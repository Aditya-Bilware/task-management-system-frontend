import API from "/src/api/axios.js";

export const getOverdueTasksService = async (params) => {
  try {
    const res = await API.get("/overdue", { params });
    return res.data;
  } catch (err) {
    console.log("get overdue tasks service error");
    throw err.response?.data?.message || "Failed to get overdue tasks";
  }
};

export const getOverdueTasksCountService = async () => {
  try {
    const res = await API.get("/overdue/count");
    return res.data;
  } catch (err) {
    console.log(err);
    console.log("overdue tasks count service error");
    throw err.response?.data?.message || "Failed to get overdue tasks";
  }
};
