import { Box } from "@mui/material";
import StatsCards from "../components/dashboard/StatsCards";
import TaskTable from "../components/dashboard/RecentTasks";
import RecentActivityTimeline from "../components/dashboard/RecentActivityTimeline";

const Dashboard = () => {
  return (
    <Box>
      <StatsCards />
      <TaskTable />
      <RecentActivityTimeline />
    </Box>
  );
};

export default Dashboard;
