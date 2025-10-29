import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorFallback } from "./component/Fallback/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { APIProvider } from "./Context/APIContext";

const Sidebar = lazy(() => import("./component/Sidebar/Sidebar"));
const Header = lazy(() => import("./component/Header/Header"));
const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));

const AddEmployee = lazy(() => import("./Pages/Employee/AddEmployee"));
const EmployeeDetails = lazy(() => import("./Pages/Employee/EmployeeDetails"));

const AddWithdrawal = lazy(() => import("./Pages/Withdrawal/AddWithdrawal"));
const WithdrawalDetails = lazy(() =>
  import("./Pages/Withdrawal/WithdrawalDetails")
);

const Leave = lazy(() => import("./Pages/Leave/Leave"));

const AddAttendance = lazy(() => import("./Pages/Attendance/AddAttendance"));
const AttendanceDetails = lazy(() =>
  import("./Pages/Attendance/AttendanceDetails")
);

const AddCompany = lazy(() => import("./Pages/Company/AddCompany"));
const CompanyDetails = lazy(() => import("./Pages/Company/CompanyDetails"));

const AddBranch = lazy(() => import("./Pages/Masters/Branch/AddBranch"));
const BranchDetails = lazy(() =>
  import("./Pages/Masters/Branch/BranchDetails")
);

const AddDepartment = lazy(() =>
  import("./Pages/Masters/Department/AddDepartment")
);
const DepartmentDetails = lazy(() =>
  import("./Pages/Masters/Department/DepartmentDetails")
);

const AddDesignation = lazy(() =>
  import("./Pages/Masters/Designation/AddDesignation")
);
const DesignationDetails = lazy(() =>
  import("./Pages/Masters/Designation/DesignationDetails")
);

const AddGrade = lazy(() => import("./Pages/Masters/Grade/AddGrade"));
const GradeDetails = lazy(() => import("./Pages/Masters/Grade/GradeDetails"));

const Payroll = lazy(() => import("./Pages/Payroll/Payroll"));
const AddSalaryStructure = lazy(() =>
  import("./Pages/Payroll/AddSalaryStructure")
);
const SalaryStructureDetails = lazy(() =>
  import("./Pages/Payroll/SalaryStructureDetails")
);

const AddPayheads = lazy(() => import("./Pages/Payroll/Payheads/AddPayheads"));
const PayheadsDetails = lazy(() =>
  import("./Pages/Payroll/Payheads/PayheadsDetails")
);
const UpdatePayheads = lazy(() =>
  import("./Pages/Payroll/Payheads/UpdatePayheads")
);

const ProcessSalary = lazy(() => import("./Pages/Payroll/ProcessSalary"));

const queryClient = new QueryClient();

function App() {
  return (
    <APIProvider>
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
              <Box
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                <Header /> {/* Fixed header on top */}
                <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route
                      path="/companydetails"
                      element={<CompanyDetails />}
                    />
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
                    <Route
                      path="/adddesignation"
                      element={<AddDesignation />}
                    />
                    <Route
                      path="/designationdetails"
                      element={<DesignationDetails />}
                    />
                    <Route path="/addemployee" element={<AddEmployee />} />
                    <Route
                      path="/employeedetails"
                      element={<EmployeeDetails />}
                    />
                    <Route path="/addWithdrawal" element={<AddWithdrawal />} />
                    <Route
                      path="/WithdrawalDetails"
                      element={<WithdrawalDetails />}
                    />
                    <Route path="/leave" element={<Leave />} />
                    <Route
                      path="/attendance/attendancedetails"
                      element={<AttendanceDetails />}
                    />
                    <Route
                      path="/attendance/AddAttendance"
                      element={<AddAttendance />}
                    />
                    <Route path="/payroll" element={<Payroll />} />
                    <Route
                      path="/payroll/add-salary-structure"
                      element={<AddSalaryStructure />}
                    />
                    <Route
                      path="/payroll/salary-structure-details"
                      element={<SalaryStructureDetails />}
                    />
                    <Route
                      path="/payroll/process-salary"
                      element={<ProcessSalary />}
                    />
                    <Route
                      path="/payroll/addpayhead"
                      element={<AddPayheads />}
                    ></Route>
                    <Route
                      path="/payroll/payheaddetails"
                      element={<PayheadsDetails />}
                    ></Route>
                    <Route
                      path="/payroll/UpdatePayheads/:Payhead_ID"
                      element={<UpdatePayheads />}
                    ></Route>
                  </Routes>
                </Box>
              </Box>
            </Box>
          </Router>
        </QueryClientProvider>
      </ErrorBoundary>
    </APIProvider>
  );
}

export default App;
