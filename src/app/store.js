import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import taskReducer from "../features/tasks/taskSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import employeeReducer from "../features/users/employeeSlice";
import taskHistoryReducer from "../features/tasks/taskHistorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    tasks: taskReducer,
    employee: employeeReducer,
    taskHistory: taskHistoryReducer,
  },
});
