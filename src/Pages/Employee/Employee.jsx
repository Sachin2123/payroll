import Paper from "@mui/material/Paper";
import { Box, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const Employee = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{}}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
        <Box sx={{ display: "flex", p: 2, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <HomeIcon onClick={() => navigate("/")} />
            <Typography sx={{ ml: 1, fontSize: "18px" }}>Employee</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              className="addemployee"
              onClick={() => navigate("/addemployee")}
              sx={{ color: "white", background: "red", padding: "8px 14px" }}
            >
              Add Employee
            </Button>
            <Button
              className="upload"
              onClick={() => navigate("upload")}
              sx={{ color: "white", background: "green", padding: "8px 14px" }}
            >
              Upload
            </Button>
            <Button
              className="addemployee"
              onClick={() => navigate("/export")}
              sx={{ color: "white", background: "black", padding: "8px 14px" }}
            >
              Export
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Employee;
