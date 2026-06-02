import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/common/ProtectedRoute";
import MainLayout from "../layout/MainLayout";
import TaskDetails from "../pages/tasks/TaskDetails";
import CreateTask from "/src/pages/tasks/CreateTask.jsx";
import Employee from "../components/employees/Employees";
import CompletedTasks from "../components/completedTasks/CompletedTasks";
import ScrollToTop from "../components/common/ScrollToTop";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Layout Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/tasks/:id/edit" element={<Tasks />} />
          <Route path="/tasks/:id/delete" element={<Tasks />} />
          <Route path="/tasks/create" element={<CreateTask />} />
          <Route path="/employees" element={<Employee />} />
          <Route path="/completed" element={<CompletedTasks />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
