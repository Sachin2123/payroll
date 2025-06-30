import Sidebar from "./component/Sidebar/Sidebar";
import Header from "./component/Header/Header";
import Employee from "./Pages/Employee/Employee";
import AddEmployee from "./Pages/Employee/AddEmployee";
import Leave from "./Pages/Leave/Leave";
import Attendance from "./Pages/Attendance/Attendance";
import Payroll from "./Pages/Payroll/Payroll";
import Dashboard from "./Pages/Dashboard/Dashboard";
import CompanyDetails from "./Pages/Company/CompanyDetails";
import AddCompany from "./Pages/Company/AddCompany";
import BranchDetails from "./Pages/Masters/Branch/BranchDetails";
import AddBranch from "./Pages/Masters/Branch/AddBranch";
import AddDepartment from "./Pages/Masters/Department/AddDepartment";
import DepartmentDetails from "./Pages/Masters/Department/DepartmentDetails";
import AddDesignation from "./Pages/Masters/Designation/AddDesignation";
import DesignationDetails from "./Pages/Masters/Designation/DesignationDetails";
import AddGrade from "./Pages/Masters/Grade/AddGrade";
import GradeDetails from "./Pages/Masters/Grade/GradeDetails";
import AddSalaryStructure from "./Pages/Payroll/AddSalaryStructure";
import ProcessSalary from "./Pages/Payroll/ProcessSalary";
import { ErrorFallback } from "./component/Fallback/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import {
  // useQuery,
  // useMutation,
  // useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import SalaryStructureDetails from "./Pages/Payroll/SalaryStructureDetails";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Optionally reset any state here
        window.location.reload(); // or your custom reset logic
        <div>Set Error Boundary</div>;
      }}
    >
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
                  <Route path="/companydetails" element={<CompanyDetails />} />
                  <Route path="/addcompany" element={<AddCompany />} />
                  <Route path="/gradedetails" element={<GradeDetails />} />
                  <Route path="/addgrade" element={<AddGrade />} />
                  <Route path="/branchdetails" element={<BranchDetails />} />
                  <Route path="/addbranch" element={<AddBranch />} />
                  <Route path="/adddepartment" element={<AddDepartment />} />
                  <Route
                    path="/departmentdetails"
                    element={<DepartmentDetails />}
                  />
                  <Route path="/adddesignation" element={<AddDesignation />} />
                  <Route
                    path="/designationdetails"
                    element={<DesignationDetails />}
                  />
                  <Route path="/employee" element={<Employee />} />
                  <Route path="/addemployee" element={<AddEmployee />} />
                  <Route path="/leave" element={<Leave />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/payroll" element={<Payroll />} />
                  <Route
                    path="/add-salary-structure"
                    element={<AddSalaryStructure />}
                  />
                  <Route
                    path="/salary-structure-details"
                    element={<SalaryStructureDetails />}
                  />
                  <Route path="/process-salary" element={<ProcessSalary />} />
                </Routes>
              </Box>
            </Box>
          </Box>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
