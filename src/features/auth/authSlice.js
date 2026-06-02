import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: user || null,
  token: token || null,
  role: user?.role || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("lastLogin", new Date().toISOString());
    },

    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");

      localStorage.removeItem("user");
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, setLoading, setError } =
  authSlice.actions;

export default authSlice.reducer;
