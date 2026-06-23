import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
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

const initialState = {
  stats: null,
  statsLoading: true,
  statsError: null,

  recentTasks: [],
  recentTasksLoading: true,
  recentTasksError: null,
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

      .addCase(resetAppState, () => initialState);
  },
});

export default dashboardSlice.reducer;
