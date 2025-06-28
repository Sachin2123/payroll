import Sidebar from "./component/Sidebar/Sidebar";
import Header from "./component/Header/Header";
import Employee from "./Pages/Employee/Employee";
import AddEmployee from "./Pages/Employee/AddEmployee";
import Leave from "./Pages/Leave/Leave";
import Attendance from "./Pages/Attendance/Attendance";
import Payroll from "./Pages/Payroll/Payroll";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Configuration from "./Pages/Configuration/Configuration";
import { ErrorFallback } from "./component/Fallback/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    // <ErrorBoundary
    //   FallbackComponent={ErrorFallback}
    //   onReset={() => {
    //     // Optionally reset any state here
    //     window.location.reload(); // or your custom reset logic
    //     <div>Set Error Boundary</div>;
    //   }}
    // >

    <QueryClientProvider client={queryClient}>
      <Router>
        <Box sx={{ display: "flex", height: "100vh" }}>
          {/* Fixed width sidebar on the left */}
          <Sidebar />
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
            <Header /> {/* Fixed header on top */}
            <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/configuration" element={<Configuration />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/addemployee" element={<AddEmployee />} />
                <Route path="/leave" element={<Leave />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/payroll" element={<Payroll />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </QueryClientProvider>
    // </ErrorBoundary>
  );
}

export default App;
