import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";


const Leave = () => {
  return (
    <Box sx={{}}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
       <Box sx={{ display: "flex", p: 2 }}>
          <HomeIcon />
          <Typography sx={{ ml: 1, fontSize: "18px" }}>Leave</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Leave;
