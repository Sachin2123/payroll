import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

const Employee = () => {
  return (
    <Box>
      <Paper
        sx={{
          width: "50%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Employee
      </Paper>
    </Box>
  );
};

export default Employee;
