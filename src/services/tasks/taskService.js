import API from "/src/api/axios.js";

export const createTaskService = async (details) => {
  try {
    const res = await API.post("/tasks", details);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const getTasks = async (params) => {
  try {
    const res = await API.get("/tasks", { params });
    return res.data;
  } catch (err) {
    console.log("get task service error");
    throw err.response?.data || err;
  }
};

export const getTaskById = async (id) => {
  try {
    const res = await API.get(`/tasks/${id}`);

    return res.data;
  } catch (err) {
    console.log("get task by id service error");

    throw err.response?.data || err;
  }
};

export const getRecentActivities = async (id) => {
  try {
    const res = await API.get(`/tasks/${id}/activity`);
    return res.data;
  } catch (err) {
    console.log("task activities service error");
    throw err.response?.data || err;
  }
};

export const updateTaskService = async (id, details) => {
  try {
    const res = await API.patch(`/tasks/${id}`, details);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const deleteTaskService = async (id) => {
  try {
    const res = await API.delete(`/tasks/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
