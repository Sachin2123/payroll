import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import {
  CircleUser,
  CalendarDays,
  Banknote,
  IndianRupee,
  Clock,
  Settings,
  Users,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const menus = [
    {
      name: "Configuration",
      path: "/configuration",
      submenu: "",
      icons: <Settings />,
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
      path: "/attendance",
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
      path: "/payroll",
      submenu: "",
      icons: <Banknote />,
    },
    {
      name: "Recruitment",
      path: "/recruitment",
      submenu: "",
      icons: <Users />,
    },
    {
      name: "Expense",
      path: "/Expense",
      submenu: "",
      icons: <IndianRupee />,
    },
    {
      name: "PMS",
      path: "/pms",
      submenu: "",
      icons: <EmojiEventsIcon />,
    },
  ];

  // console.log(menus[1].submenu[1].name);

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
