import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import {
  CircleUser,
  CalendarDays,
  Banknote,
  IndianRupee,
  Clock,
  Users,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const menus = [
    {
      name: "Employee",
      path: "/employee",
      icons: <CircleUser />,
    },
    {
      name: "Attendance",
      path: "/attendance",
      icons: <Clock />,
    },
    {
      name: "Leave",
      path: "/leave",
      icons: <CalendarDays />,
    },
    {
      name: "Payroll",
      path: "/payroll",
      icons: <Banknote />,
    },
    {
      name: "Recruitment",
      path: "/recruitment",
      icons: <Users />,
    },
    {
      name: "Expense",
      path: "/Expense",
      icons: <IndianRupee />,
    },
    {
      name: "PMS",
      path: "/pms",
      icons: <EmojiEventsIcon />,
    },
  ];

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
      <Box sx={{}}>
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
