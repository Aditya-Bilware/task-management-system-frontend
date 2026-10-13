import API from "../../api/axios";

export const createWorkLogService = async (taskId, workLogData) => {
  try {
    const res = await API.post(`/tasks/${taskId}/workLogs`, workLogData);

    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const getWorkLogsService = async (taskId, params = {}) => {
  try {
    const res = await API.get(`/tasks/${taskId}/workLogs`, { params });

    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
