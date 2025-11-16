import Paper from "@mui/material/Paper";
import { Box, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";

const paginationModel = { page: 0, pageSize: 5 };

const dateFormat = "dd-MMM-yyyy";

const columns = [
  {
    icons: <EditIcon />,
    field: "Employee_Code",
    headerName: "Employee Code",
    width: 200,
  },
  {
    icons: <EditIcon />,
    field: "Employee_Name",
    headerName: "Employee Name",
    width: 300,
  },
  {
    field: "Month",
    headerName: "Month",
    width: 130,
  },

  {
    field: "Effective_From",
    headerName: "Effective From",
    width: 200,
    renderCell: (params) =>
      params.value ? format(new Date(params.value), dateFormat) : "-",
  },
  {
    field: "Created_By",
    headerName: "Created By",
    width: 150,
  },
  {
    field: "Created_Time",
    headerName: "Created Time",
    width: 200,
    renderCell: (params) =>
      params.value ? format(new Date(params.value), dateFormat) : "-",
  },
];

const fetchSalaryStructrueDetails = async () => {
  const result = await fetch(
    "http://localhost:5000/api/salary-structure-details"
  );
  if (!result.ok) throw new Error("error in fetching salary structure data");
  // console.log(result);
  return result.json();
};

const SalaryStructureDetails = () => {
  const navigate = useNavigate();

  const { error, isLoading, data } = useQuery({
    queryKey: ["fetchSalaryStructrueDetails"],
    queryFn: fetchSalaryStructrueDetails,
  });

  if (isLoading) return <div>...Loading</div>;
  if (error) return <div>...Error</div>;
  // console.log(data);

  return (
    <Box sx={{}}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
        <Box sx={{ display: "flex", p: 2, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <HomeIcon onClick={() => navigate("/")} />
            <Typography sx={{ ml: 1, fontSize: "18px" }}>Payroll</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              className="btn-addgrade"
              onClick={() => navigate("/attendance/AddAttendance")}
              sx={{
                boxShadow: "2px 2px 2px 1px rgba(0, 0, 255, .2)",
                color: "white",
                background: "black",
                padding: "8px 14px",
              }}
            >
              Monthly Attendance
            </Button>
            <Button
              className="btn-addgrade"
              onClick={() => navigate("/payroll/VariableMasterDetails")}
              sx={{
                boxShadow: "2px 2px 2px 1px rgba(0, 0, 255, .2)",
                color: "white",
                background: "black",
                padding: "8px 14px",
              }}
            >
              Variable
            </Button>

            <Button
              className="btn-addgrade"
              onClick={() => navigate("/payroll/add-salary-structure")}
              sx={{
                boxShadow: "2px 2px 2px 1px rgba(0, 0, 255, .2)",
                color: "white",
                background: "black",
                padding: "8px 14px",
              }}
            >
              Salary Structure
            </Button>
            <Button
              className="btn-process-salary"
              onClick={() => navigate("/payroll/process-salary")}
              sx={{
                boxShadow: "2px 2px 2px 1px rgba(0, 0, 255, .2)",
                color: "white",
                background: "black",
                padding: "8px 14px",
              }}
            >
              Process Salary
            </Button>
            <Button
              className="btn-process-salary"
              onClick={() => navigate("/payroll/payheaddetails")}
              sx={{
                boxShadow: "2px 2px 2px 1px rgba(0, 0, 255, .2)",
                color: "white",
                background: "black",
                padding: "8px 14px",
                // textTransform: "none",
              }}
            >
              Payheads
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: 8, mb: 1, display: "flex", justifyContent: "center" }}>
          {/* <Table /> */}

          <DataGrid
            rows={
              data ? data.map((row) => ({ ...row, id: row.Structure_ID })) : []
            }
            // rows={data}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default SalaryStructureDetails;
