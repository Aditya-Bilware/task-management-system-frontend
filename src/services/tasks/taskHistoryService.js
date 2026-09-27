import { format } from "date-fns";

import API from "/src/api/axios.js";

export const getTaskHistoryService = async (params) => {
  try {
    const res = await API.get("/tasks/history", { params });
    return res.data;
  } catch (err) {
    // console.log("get task history service error");
    throw err?.response?.data || err;
  }
};

export const exportCompletedTasksService = async (fromDate, toDate) => {
  try {
    const formattedFromDate = format(fromDate, "yyyy-MM-dd");
    const formattedToDate = format(toDate, "yyyy-MM-dd");

    console.log("FROM DATE:", formattedFromDate);
    console.log("TO DATE:", formattedToDate);

    const res = await API.post(
      "/reports/task-history",
      {
        fromDate: formattedFromDate,
        toDate: formattedToDate,
      },
      {
        responseType: "blob",
      },
    );
    return res;
  } catch (err) {
    // console.log(err);
    // console.log("get completed task report error");

    if (err?.response?.data || err) {
      const text = await err.response.data.text();

      const errorData = JSON.parse(text);

      throw errorData;
    }
    throw err?.response?.data || err;
  }
};
