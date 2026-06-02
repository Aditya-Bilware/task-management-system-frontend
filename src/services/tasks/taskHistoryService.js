import API from "/src/api/axios.js";

export const getTaskHistoryService = async (params) => {
  try {
    const res = await API.get("/tasks/history", { params });
    return res.data;
  } catch (err) {
    console.log("get task history service error");
    throw err?.response?.data || err;
  }
};
