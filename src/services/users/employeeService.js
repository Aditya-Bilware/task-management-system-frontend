import API from "/src/api/axios.js";

export const getEmployeesService = async () => {
  try {
    const res = await API.get("/users/employees");

    return res.data;
  } catch (err) {
    console.log("get employee service error", err);
    throw err.res?.data || err;
  }
};

export const getEmployeesStatsService = async (params) => {
  try {
    const res = await API.get("/users/employees/stats", { params });

    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
