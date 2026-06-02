import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getRecentActivities,
  getRecentTasks,
  getStats,
} from "../../services/dashboard/dashBoardService";
import { resetAppState } from "../../app/appActions.js";
import { minDelay } from "../../utils/minDelay";

export const fetchStats = createAsyncThunk(
  "dashboard/fetchStats",

  async (_, thunkAPI) => {
    try {
      const start = Date.now();

      const res = await getStats();

      await minDelay(start);
      return res.stats;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch stats");
    }
  },
);

export const fetchRecentTasks = createAsyncThunk(
  "dashboard/fetchRecentTasks",

  async (_, thunkAPI) => {
    try {
      const start = Date.now();

      const res = await getRecentTasks();

      await minDelay(start);

      return res.recentTasks;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch recent tasks",
      );
    }
  },
);

export const fetchRecentActivities = createAsyncThunk(
  "dashboard/fetchRecentActivities",

  async (_, thunkAPI) => {
    try {
      const res = await getRecentActivities();

      return res.logs;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch recent activities",
      );
    }
  },
);

const initialState = {
  stats: null,
  statsLoading: true,
  statsError: null,

  recentTasks: [],
  recentTasksLoading: true,
  recentTasksError: null,

  recentActivities: [],
  recentActivitiesLoading: false,
  recentActivitiesError: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      //stats
      .addCase(fetchStats.pending, (state) => {
        state.statsLoading = true;

        state.statsError = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.statsError = action.payload;
      })

      //recent tasks
      .addCase(fetchRecentTasks.pending, (state) => {
        state.recentTasksLoading = true;
        state.recentTasksError = null;
      })
      .addCase(fetchRecentTasks.fulfilled, (state, action) => {
        state.recentTasksLoading = false;
        state.recentTasks = action.payload;
      })
      .addCase(fetchRecentTasks.rejected, (state, action) => {
        state.recentTasksLoading = false;
        state.recentTasksError = action.payload;
      })

      // recent activities
      .addCase(fetchRecentActivities.pending, (state) => {
        state.recentActivitiesLoading = true;
        state.recentActivitiesError = false;
      })
      .addCase(fetchRecentActivities.fulfilled, (state, action) => {
        state.recentActivitiesLoading = false;
        state.recentActivities = action.payload;
      })
      .addCase(fetchRecentActivities.rejected, (state, action) => {
        state.recentActivitiesLoading = false;
        state.recentActivitiesError = action.payload;
      })

      .addCase(resetAppState, () => initialState);
  },
});

export default dashboardSlice.reducer;
