import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUnreadNotificationsCount } from "../../features/notifications/notificationsSlice";
import { fetchOverdueTasksCount } from "../../features/overdueTasks/overdueTasksSlice";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchUnreadNotificationsCount());
      dispatch(fetchOverdueTasksCount());
    }
  }, [token, dispatch]);

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
