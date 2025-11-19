import Paper from "@mui/material/Paper";
import { Box, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Grid from "@mui/material/Grid";

import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Axios from "../../api/Axios";
import * as XLSX from "xlsx";

const fetchEmployee = async () => {
  const result = await Axios.get("withdrawaldetails");
  //   console.log("result.data:- ", result.data);
  return result.data;
};

const Settings = () => {
  const navigate = useNavigate();

  const { error, isLoading, data } = useQuery({
    queryKey: ["employeesdetails"],
    queryFn: fetchEmployee,
  });

  // console.log(data);

  const DashbordaButton = [
    { id: 1, title: "HRMS", link: "/settings/HRMSSetting" },
    { id: 2, title: "Payroll", link: "/settings/Payroll/Dashboard" },
    { id: 3, title: "Leave", link: "/settings/AttendanceSetting" },
    { id: 4, title: "Attendance", link: "/settings/AttendanceSetting" },
    { id: 5, title: "Dashboard", link: "/settings/DashboardSetting" },
    { id: 6, title: "Master", link: "/settings/MasterSetting" },
  ];

  const handleClick = (Value) => {
    navigate(Value.link);
    // console.log(Value.link);
  };

  if (isLoading) return <div>...Loading </div>;
  if (error) return <div>...Error</div>;

  return (
    <Box>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
        <Box sx={{ display: "flex", p: 2, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <HomeIcon onClick={() => navigate("/")} />
            <Typography sx={{ ml: 1, fontSize: "18px" }}>Settings</Typography>
          </Box>
        </Box>
        {/* Main Button Grid */}
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          <Grid
            container
            spacing={10}
            sx={{
              mt: 5,
              px: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {DashbordaButton.map((btn) => (
              <Grid item xs={12} sm={6} md={4} key={btn.id}>
                <Button
                  fullWidth
                  onClick={() => handleClick(btn)}
                  sx={{
                    width: 280, // 👈 FIXED WIDTH (same for all buttons)
                    height: 140,
                    borderRadius: 2,
                    backgroundColor: "#609CE6",
                    color: "white",
                    fontSize: "1.6rem",
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "#497EC2",
                      transform: "translateY(-4px)",
                      boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
                    },
                  }}
                >
                  {btn.title}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;
