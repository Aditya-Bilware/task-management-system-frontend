import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTaskHistoryService } from "../../services/tasks/taskHistoryService";

export const fetchTaskHistory = createAsyncThunk(
  "taskHistory/fetchTaskHistory",
  async (filters, thunkAPI) => {
    try {
      const start = new Date();
      const res = await getTaskHistoryService(filters);
      await minDelay(start);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

import { createSlice } from "@reduxjs/toolkit";
import { minDelay } from "../../utils/minDelay";

const initialState = {
  historyTasks: [],
  historyTasksLoading: false,
  historyTasksError: null,
  initialLoading: true,
  loadingType: null,
  pagination: {},

  filters: {
    page: 1,
    limit: 10,
    search: "",
    filter: "all-history",
    assignedTo: "",
  },
};

const taskHistorySlice = createSlice({
  name: "taskHistory",

  initialState,

  reducers: {
    setPage: (state, action) => {
      state.filters.page = action.payload;
    },

    setSearch: (state, action) => {
      state.filters.search = action.payload;
    },

    setFilter: (state, action) => {
      state.filters.filter = action.payload;
    },

    setLoadingType: (state, action) => {
      state.loadingType = action.payload;
    },

    setAssignedTo: (state, action) => {
      state.filters.assignedTo = action.payload;
    },

    resetTaskHistoryFilters: (state) => {
      state.filters = {
        page: 1,

        limit: 10,

        search: "",

        filter: "all-history",
      };

      state.initialLoading = true;

      state.historyTasks = [];

      state.pagination = {};
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchTaskHistory.pending, (state) => {
        state.historyTasksLoading = true;

        state.historyTasksError = null;
      })

      .addCase(fetchTaskHistory.fulfilled, (state, action) => {
        state.historyTasksLoading = false;
        state.loadingType = null;

        state.historyTasks = action.payload.tasks;

        state.pagination = action.payload.pagination;

        state.initialLoading = false;
      })

      .addCase(fetchTaskHistory.rejected, (state, action) => {
        state.historyTasksLoading = false;
        state.loadingType = null;

        state.historyTasksError = action.payload;

        state.initialLoading = false;
      });
  },
});

export const {
  setPage,
  setSearch,
  setFilter,
  setAssignedTo,
  setLoadingType,
  resetTaskHistoryFilters,
} = taskHistorySlice.actions;

export default taskHistorySlice.reducer;
