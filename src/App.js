import Sidebar from "./component/Sidebar/Sidebar";
import Header from "./component/Header/Header";
import Employee from "./Pages/Employee/Employee";
import AddEmployee from "./Pages/Employee/AddEmployee";
import Leave from "./Pages/Leave/Leave";
import Attendance from "./Pages/Attendance/Attendance";
import Payroll from "./Pages/Payroll/Payroll";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Configuration from "./Pages/Configuration/Configuration";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

function App() {
  return (
    <Router>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar /> {/* Fixed width sidebar on the left */}
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
  );
}

export default App;
