import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getOverdueTasksCountService,
  getOverdueTasksService,
} from "../../services/overdueTasks/overdueTasksService";
import { minDelay } from "../../utils/minDelay";

export const fetchOverdueTasks = createAsyncThunk(
  "overdue/fetchOverdueTasks",

  async ({ page = 1, limit = 20 } = {}, thunkAPI) => {
    try {
      const start = Date.now();

      const res = await getOverdueTasksService({ page, limit });

      await minDelay(start);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to get overdue tasks",
      );
    }
  },
);

export const fetchOverdueTasksCount = createAsyncThunk(
  "overdue/fetchOverdueTasksCount",

  async (_, thunkAPI) => {
    try {
      const start = Date.now();

      const res = await getOverdueTasksCountService();

      await minDelay(start);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to get overdue tasks count",
      );
    }
  },
);

const initialState = {
  overdueTasks: [],
  count: 0,
  overdueTasksLoading: false,
  overdueTasksError: null,
  pagination: {},
  page: 1,
  limit: 20,
  totalOverdueTasks: 0,
  hasNextPage: true,
  loadingMore: false,
};

const overdueTasksSlice = createSlice({
  name: "overdueTask",
  initialState,
  reducers: {
    resetOverdueTasks: () => initialState,
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchOverdueTasks.pending, (state, action) => {
        const page = action.meta.arg?.page || 1;

        if (page === 1) {
          state.overdueTasksLoading = true;
        } else {
          state.loadingMore = true;
        }
        state.overdueTasksError = null;
      })
      .addCase(fetchOverdueTasks.fulfilled, (state, action) => {
        state.overdueTasksLoading = false;
        state.loadingMore = false;
        const page = action.meta.arg?.page || 1;

        if (page === 1) {
          state.overdueTasks = action.payload.overdueTasks;
        } else {
          state.overdueTasks.push(...action.payload.overdueTasks);
        }

        state.page = action.payload.pagination.page;
        state.hasNextPage = action.payload.pagination.hasNextPage;

        state.totalOverdueTasks = action.payload.pagination.totalOverdueTasks;
      })
      .addCase(fetchOverdueTasks.rejected, (state, action) => {
        state.overdueTasksLoading = false;
        state.loadingMore = false;
        state.overdueTasksError = action.payload;
      })
      .addCase(fetchOverdueTasksCount.fulfilled, (state, action) => {
        state.count = action.payload.count;
      });
  },
});

export const { resetOverdueTasks } = overdueTasksSlice.actions;
export default overdueTasksSlice.reducer;
