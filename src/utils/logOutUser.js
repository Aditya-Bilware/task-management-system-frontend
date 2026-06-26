import { resetAppState } from "../app/appActions";
import { clearCredentials } from "../features/auth/authSlice";
import { resetNotifications } from "../features/notifications/notificationsSlice";
import { resetOverdueTasks } from "../features/overdueTasks/overdueTasksSlice";

export const logoutUser = (dispatch, navigate) => {
  dispatch(clearCredentials());
  dispatch(resetAppState());
  dispatch(resetNotifications());
  dispatch(resetOverdueTasks());
  navigate("/", {
    replace: true,
  });
};
