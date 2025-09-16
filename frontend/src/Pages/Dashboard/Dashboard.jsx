import Paper from "@mui/material/Paper";
import { Box, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import Axios from "../../api/Axios";
import { useState } from "react";
const Dashboard = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(-1);

  const handleClick = () => {
    setCount(count + 1);
    // console.log("Count", count);

    if (count == 0) {
      console.log("Future Month", count);
      setCount("Future Month");
    } else if (count == 1) {
      console.log("Open Month", count);
      setCount("Open Month");
    } else if (count == 2) {
      console.log("Closed Month", count);
      setCount("Closed Month");
    } else {
      setCount(0);
    }
  };

  return (
    <Box sx={{}}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
        <Box sx={{ display: "flex", p: 2 }}>
          <HomeIcon onClick={() => navigate("/")} />
          <Typography sx={{ ml: 1, fontSize: "18px" }}>Dashboard</Typography>
        </Box>
        <Button onClick={handleClick}>Click for Increment</Button>
        {count}
      </Paper>
    </Box>
  );
};

export default Dashboard;
