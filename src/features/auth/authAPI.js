import API from "../../api/Axios";

export const loginUser = async (userData) => {
  const res = await API.post("/auth/login", userData);
  return res.data;
};
