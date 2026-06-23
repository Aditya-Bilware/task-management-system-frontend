import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  clearAllNotificationsService,
  getNotificationsService,
  getUnreadCountService,
  markNotificationReadService,
} from "../../services/notifications/notificationsService";
import { minDelay } from "../../utils/minDelay";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",

  async ({ page = 1, limit = 20 } = {}, thunkAPI) => {
    try {
      const start = Date.now();

      const res = await getNotificationsService({ page, limit });

      await minDelay(start);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch notifications",
      );
    }
  },
);

export const fetchUnreadNotificationsCount = createAsyncThunk(
  "notifications/fetchUnreadNotificationsCount",

  async (_, thunkAPI) => {
    try {
      const start = Date.now();

      const res = await getUnreadCountService();

      await minDelay(start);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch unread notifications count",
      );
    }
  },
);

export const markNotificationRead = createAsyncThunk(
  "notifications/markNotificationRead",

  async (id, thunkAPI) => {
    try {
      const start = Date.now();

      const res = await markNotificationReadService(id);

      await minDelay(start);

      return {
        id,
        ...res,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to mark notification read",
      );
    }
  },
);

export const clearAllNotifications = createAsyncThunk(
  "notifications/clearAllNotifications",

  async (_, thunkAPI) => {
    try {
      const start = Date.now();

      const res = await clearAllNotificationsService();

      await minDelay(start);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to clear all notifications",
      );
    }
  },
);

const initialState = {
  notifications: [],
  overdueTasks: [],
  unreadCount: 0,

  notificationsLoading: false,
  notificationsError: null,
  overdueTasksError: null,
  pagination: {},
  page: 1,
  limit: 20,
  totalNotifications: 0,
  hasNextPage: true,
  loadingMore: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    resetNotifications: () => initialState,
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchNotifications.pending, (state, action) => {
        const page = action.meta.arg?.page || 1;

        if (page === 1) {
          state.notificationsLoading = true;
        } else {
          state.loadingMore = true;
        }

        state.notificationsError = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notificationsLoading = false;
        state.loadingMore = false;
        const page = action.meta.arg?.page || 1;

        if (page === 1) {
          state.notifications = action.payload.notifications;
        } else {
          state.notifications.push(...action.payload.notifications);
        }

        state.page = action.payload.pagination.page;
        state.hasNextPage = action.payload.pagination.hasNextPage;

        state.totalNotifications = action.payload.pagination.totalNotifications;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.notificationsLoading = false;
        state.loadingMore = false;
        state.notificationsError = action.payload;
      })
      .addCase(fetchUnreadNotificationsCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload.count;
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter(
          (n) => n._id !== action.payload.id,
        );
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      })
      .addCase(clearAllNotifications.fulfilled, (state) => {
        state.notifications = [];
        state.unreadCount = 0;
      });
  },
});

export const { resetNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
