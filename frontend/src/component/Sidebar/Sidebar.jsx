import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import CreateIcon from "@mui/icons-material/Create";
import { CircleUser, CalendarDays, Banknote, Clock } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  // const [click, setClick] = useState(false);
  const menus = [
    {
      name: "Grade",
      path: "/gradedetails",
      submenu: "",
      icons: <CreateIcon />,
    },
    {
      name: "Department",
      path: "/departmentdetails",
      submenu: "",
      icons: <CreateIcon />,
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
      icons: <CorporateFareIcon />,
    },
    {
      name: "Company",
      path: "/companydetails",
      submenu: "",
      icons: <CorporateFareIcon />,
    },
    {
      name: "Employee",
      path: "/employee",
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
  ];

  // console.log(menus[0].submenu);

  const handleClick = (path) => {
    // console.log(path);
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
          style={{ width: "200px" }}
          src="./CompanyLogo.jpg"
          alt="logo"
        ></img>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box
          sx={{
            // mt: 2,
            display: "flex",
            padding: 2,
            flexDirection: "column",
            gap: 1,
          }}
        >
          {menus.map((menu, id) => {
            return (
              <Button
                onClick={() => handleClick(menu.path)}
                key={id}
                sx={{
                  padding: 1,
                  width: "100%",
                  color: "grey",
                  textTransform: "none",
                  justifyContent: "flex-start",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {menu.icons} {menu.name}
                </Box>
              </Button>
            );
          })}
        </Box>
      </Box>
    </div>
  );
};

export default Sidebar;
