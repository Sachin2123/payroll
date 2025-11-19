import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import CreateIcon from "@mui/icons-material/Create";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { CircleUser, CalendarDays, Banknote, Clock, Award } from "lucide-react";
import { useLocation } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  // const [click, setClick] = useState(false);

  const Location = useLocation();
  // console.log("Location:- ", Location.pathname);
  const menus = [
    {
      name: "Company",
      path: "/companydetails",
      submenu: "",
      icons: <CorporateFareIcon />,
    },
    {
      name: "Employee",
      path: "/employeedetails",
      submenu: [
        { name: "Employee Master", path: "/employee/add" },
        { name: "CC Master", path: "/cc" },
        { name: "Attrition", path: "/attrition" },
        { name: "Reports", path: "/reports" },
      ],
      icons: <CircleUser />,
    },
    {
      name: "Attendance",
      path: "/attendance/attendancedetails",
      submenu: "",
      icons: <Clock />,
    },
    {
      name: "Leave",
      path: "/leave",
      submenu: "",
      icons: <CalendarDays />,
    },
    {
      name: "Payroll",
      path: "/payroll/salary-structure-details",
      submenu: "",
      icons: <Banknote />,
    },
    {
      name: "Reports",
      path: "/reports",
      submenu: "",
      icons: <DescriptionIcon />,
    },
    {
      name: "Grade",
      path: "/gradedetails",
      submenu: "",
      icons: <Award />,
    },
    {
      name: "Department",
      path: "/departmentdetails",
      submenu: "",
      icons: <PeopleAltIcon />,
    },
    {
      name: "Designation",
      path: "/designationdetails",
      submenu: "",
      icons: <CreateIcon />,
    },
    {
      name: "Branch",
      path: "/branchdetails",
      submenu: "",
      icons: <LocationCityIcon />,
    },
  ];

  const payrollSettingMenus = [
    {
      id: 1,
      name: "Salary Register Sequence",
      path: "/settings/Payroll/SalaryRegisterSequence",
    },
  ];

  // console.log(menus[0].submenu);

  const handleClick = (path) => {
    // console.log("handleSubmit :- ", path);
    navigate(path);
  };

  return (
    <div
      style={{
        color: "white",
        width: "230px",
        height: "100vh",
        backgroundColor: "#111827",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        {/* <Typography variant="h6">Company Logo</Typography> */}
        <img
          onClick={() => navigate("/")}
          style={{ width: "150px", height: "150px" }}
          src="/CompanyLogo.jpg"
          alt="Company logo"
        ></img>
      </Box>
      <Box sx={{ mt: 0 }}>
        <Box
          sx={{
            // mt: 2,
            display: "flex",
            padding: 2,
            flexDirection: "column",
            gap: 1,
          }}
        >
          {Location.pathname === "/settings/Payroll/Dashboard" ||
          Location.pathname === "/settings/Payroll/SalaryRegisterSequence" ? (
            <>
              {payrollSettingMenus.map((menu, id) => {
                return (
                  <Button
                    onClick={() => handleClick(menu.path)}
                    key={id}
                    sx={{
                      padding: 1,
                      width: "100%",
                      // color: "White",
                      color: Location.pathname === menu.path ? "Black" : "Grey",
                      backgroundColor:
                        Location.pathname === menu.path
                          ? "#FAF9F6	"
                          : "transparent",
                      textTransform: "none",
                      justifyContent: "flex-start",
                      "&:hover": {
                        color:
                          Location.pathname === menu.path ? "black" : "white",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {menu.icons} {menu.name}
                    </Box>
                  </Button>
                );
              })}
            </>
          ) : (
            <>
              {menus.map((menu, id) => {
                return (
                  <Button
                    onClick={() => handleClick(menu.path)}
                    key={id}
                    sx={{
                      padding: 1,
                      width: "100%",
                      // color: "White",
                      color: Location.pathname === menu.path ? "Black" : "Grey",
                      backgroundColor:
                        Location.pathname === menu.path
                          ? "#FAF9F6	"
                          : "transparent",
                      textTransform: "none",
                      justifyContent: "flex-start",
                      "&:hover": {
                        color:
                          Location.pathname === menu.path ? "black" : "white",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {menu.icons} {menu.name}
                    </Box>
                  </Button>
                );
              })}
            </>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Sidebar;
