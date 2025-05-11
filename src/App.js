import Sidebar from "./component/Sidebar/Sidebar";
import Header from "./component/Header/Header";
import Employee from "./Pages/Employee/Employee";
import Leave from "./Pages/Leave/Leave";
import Attendance from "./Pages/Attendance/Attendance";
import Payroll from "./Pages/Payroll/Payroll";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/employee" element={<Employee />}></Route>
          <Route path="/leave" element={<Leave />}></Route>
          <Route path="/attendance" element={<Attendance />}></Route>
          <Route path="/payroll" element={<Payroll />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
