import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTaskService,
  deleteTaskService,
  getRecentActivities,
  getTaskById,
  getTasks,
  updateTaskService,
} from "../../services/tasks/taskService";
import { minDelay } from "../../utils/minDelay";
import { resetAppState } from "../../app/appActions.js";

export const createTask = createAsyncThunk(
  "tasks/createTask",

  async (details, thunkAPI) => {
    try {
      const start = new Date();

      const res = await createTaskService(details);

      await minDelay(start);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",

  async (_, thunkAPI) => {
    try {
      const start = Date.now();

      const state = thunkAPI.getState();

      const filters = state.tasks.filters;

      const updatedFilters = {
        ...filters,
        status: filters.status === "overdue" ? "" : filters.status,
      };

      const res = await getTasks(updatedFilters);

      await minDelay(start);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch tasks");
    }
  },
);

export const fetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (id, thunkAPI) => {
    try {
      const start = Date.now();

      const res = await getTaskById(id);

      await minDelay(start);

      return res.task;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch task details",
      );
    }
  },
);

export const fetchTaskActivities = createAsyncThunk(
  "tasks/fetchTaskActivities",

  async (id, thunkAPI) => {
    try {
      const res = await getRecentActivities(id);

      return res.logs;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch task activities",
      );
    }
  },
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",

  async ({ id, details }, thunkAPI) => {
    try {
      const start = new Date();
      const res = await updateTaskService(id, details);
      await minDelay(start);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message || "Failed to update task",
      );
    }
  },
);

export const deleteTask = createAsyncThunk(
  "/tasks/deleteTask",

  async (id, thunkAPI) => {
    try {
      const start = new Date();
      const res = await deleteTaskService(id);
      await minDelay(start);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

const initialState = {
  tasks: [],
  pagination: {},
  initialLoading: false,
  tasksLoading: false,
  loadingType: null,
  tasksError: null,

  filters: {
    page: 1,
    limit: 10,
    search: "",
    status: "",
    priority: "",
    assignedTo: "",
  },

  createTaskLoading: false,

  selectedTask: null,
  selectedTaskLoading: true,
  selectedTaskError: null,

  activities: [],
  activitiesLoading: false,
  activitiesError: null,

  updateTaskLoading: false,
  updateTaskError: null,
  updatingTaskId: null,

  deleteTaskLoading: null,
  deletingTaskId: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.filters.page = action.payload;
    },
    setSearch: (state, action) => {
      state.filters.search = action.payload;
    },
    setStatus: (state, action) => {
      state.filters.status = action.payload;
    },
    setPriority: (state, action) => {
      state.filters.priority = action.payload;
    },
    setAssignedTo: (state, action) => {
      state.filters.assignedTo = action.payload;
    },
    setLoadingType: (state, action) => {
      state.loadingType = action.payload;
    },
    setUpdatingTaskId: (state, action) => {
      state.updatingTaskId = action.payload;
    },
    clearUpdatingTaskId: (state) => {
      state.updatingTaskId = null;
    },
    setDeletingTaskId: (state, action) => {
      state.deletingTaskId = action.payload;
    },
    clearDeletingTaskId: (state) => {
      state.deletingTaskId = null;
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    resetTaskFilters: (state) => {
      state.filters = {
        search: "",
        priority: "",
        status: "",
        assignedTo: "",
        page: 1,
      };
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(createTask.pending, (state) => {
        state.createTaskLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.createTaskLoading = false;
        console.log(action.payload);
        state.tasks.unshift(action.payload.task);
      })
      .addCase(createTask.rejected, (state) => {
        state.createTaskLoading = false;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.tasksLoading = true;
        if (state.loadingType === "page") {
          state.initialLoading = true;
        }

        state.tasksError = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.initialLoading = false;
        state.tasksLoading = false;
        state.loadingType = null;
        state.tasks = action.payload.tasks;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.initialLoading = false;
        state.tasksLoading = false;
        state.loadingType = null;
        state.tasksError = action.payload;
      })

      .addCase(fetchTaskById.pending, (state) => {
        state.selectedTaskLoading = true;
        state.selectedTaskError = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.selectedTaskLoading = false;
        state.selectedTask = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.selectedTaskLoading = false;
        state.selectedTaskError = action.payload;
      })

      .addCase(fetchTaskActivities.pending, (state) => {
        state.activitiesLoading = true;
        state.activitiesError = null;
      })
      .addCase(fetchTaskActivities.fulfilled, (state, action) => {
        state.activitiesLoading = false;
        state.activities = action.payload;
      })
      .addCase(fetchTaskActivities.rejected, (state, action) => {
        state.activitiesLoading = false;
        state.activitiesError = action.payload;
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        state.updateTaskLoading = false;
        state.updatingTaskId = null;

        const updatedTask = action.payload?.updatedTask;
        if (!updatedTask) return;
        state.tasks = state.tasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task,
        );

        state.selectedTask = updatedTask;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.updateTaskLoading = false;
        state.updateTaskError = action.payload;
        state.updatingTaskId = null;
      })

      .addCase(deleteTask.pending, (state, action) => {
        state.deleteTaskLoading = true;
        state.deletingTaskId = action.meta.arg;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.deleteTaskLoading = false;
        const deleteTaskId = action.payload.task._id;

        state.tasks = state.tasks.filter((task) => task._id !== deleteTaskId);
        const currentPage = state.pagination.currentPage;
        if (state.tasks.length === 0 && currentPage > 1) {
          state.filters.page = currentPage - 1;
        }
        // state.deletingTaskId = null;
      })
      .addCase(deleteTask.rejected, (state) => {
        state.deleteTaskLoading = false;
        state.deletingTaskId = null;
      })
      .addCase(resetAppState, () => initialState);
  },
});

export const {
  setPage,
  setSearch,
  setStatus,
  setPriority,
  setAssignedTo,
  setFilters,
  setLoadingType,
  setUpdatingTaskId,
  clearUpdatingTaskId,
  setDeletingTaskId,
  clearDeletingTaskId,
  resetTaskFilters,
} = taskSlice.actions;

export default taskSlice.reducer;
