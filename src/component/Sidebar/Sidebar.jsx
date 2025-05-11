import { Box, Button } from "@mui/material";

const Sidebar = () => {
  const menus = [
    {
      name: "Employee",
      path: "/employee",
    },
    {
      name: "Attendance",
      path: "/attendance",
    },
    {
      name: "Leave",
      path: "/leave",
    },
    {
      name: "Payroll",
      path: "/payroll",
    },
  ];

  return (
    <div
      style={{
        color: "white",
        width: "230px",
        height: "100vh",
        backgroundColor: "black",
        // display: "flex",
        justifyContent: "center",
        // padding: "5px",
      }}
    >
      <Box
        sx={{
          //   mt: 7,
          display: "flex",
          alignItems: "start",
          flexDirection: "column",
        }}
      >
        {menus.map((menu, id) => {
          return (
            <Button sx={{ padding: "0px 6pxs" }} key={id}>
              {menu.name}
            </Button>
          );
        })}
      </Box>
    </div>
  );
};

export default Sidebar;
