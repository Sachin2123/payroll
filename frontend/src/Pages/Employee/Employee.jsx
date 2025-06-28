import Paper from "@mui/material/Paper";
import { Box, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import Table from "../../component/Tables/Table";
import { useQuery } from "@tanstack/react-query";
// import { ErrorFallback } from "../../component/Fallback/ErrorFallback";
// import { ErrorBoundary } from "react-error-boundary";

const fetchEmployee = async () => {
  const result = await fetch("http://localhost:5000/api/employeedetails");
  if (!result.ok) throw new Error("error in fetching data");
  // console.log(result);
  return result.json();
};

const Employee = () => {
  const navigate = useNavigate();

  const { error, isLoading, data } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployee,
  });

  // console.log(data);

  // console.log(EmployeeList);

  if (isLoading) return <div>...Loading</div>;
  if (error) return <div>...Error</div>;
  // if (data) return <div>...data</div>;

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
              className="btn-addemployee"
              onClick={() => navigate("/addemployee")}
              sx={{
                boxShadow: "2px 2px 2px 1px rgba(0, 0, 255, .2)",
                color: "white",
                background: "black",
                padding: "8px 14px",
              }}
            >
              Add Employee
            </Button>
            <Button
              className="btn-upload"
              // onClick={() => navigate("upload")}
              sx={{
                boxShadow: "2px 2px 2px 1px rgba(0, 0, 255, .2)",
                color: "white",
                background: "black",
                padding: "8px 14px",
              }}
            >
              Upload
            </Button>
            <Button
              className="btn-export"
              // onClick={() => navigate("/export")}
              sx={{
                boxShadow: "2px 2px 2px 1px rgba(0, 0, 255, .2)",
                color: "white",
                background: "black",
                padding: "8px 14px",
              }}
            >
              Export
            </Button>
            <Button
              className="btn-utilities"
              // onClick={() => navigate("/export")}
              sx={{
                boxShadow: "2px 2px 2px 1px rgba(0, 0, 255, .2)",
                color: "white",
                background: "black",
                padding: "8px 14px",
              }}
            >
              Utilities
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: 8, mb: 1, display: "flex", justifyContent: "center" }}>
          {/* <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              // Optionally reset any state here
              window.location.reload(); // or your custom reset logic
              <div>Set Error Boundary</div>;
            }}
          >
            {" "} */}
          <Table />
          {/* </ErrorBoundary> */}
        </Box>
      </Paper>
    </Box>
  );
};

export default Employee;
