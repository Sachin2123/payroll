import Paper from "@mui/material/Paper";
import { Box, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import Axios from "../../api/Axios";

const paginationModel = { page: 0, pageSize: 5 };

const dateFormat = "dd-MMM-yyyy";

const columns = [
  {
    // field: "EMPLOYEE_CODE",
    headerName: "Action",
    width: 100,
    renderCell: (params) => (
      <Box>
        <IconButton>
          <EditIcon sx={{ color: "black" }} />
        </IconButton>

        <IconButton>
          <RemoveRedEyeIcon sx={{ color: "black" }} />
        </IconButton>
      </Box>
    ),
  },
  {
    icons: <EditIcon />,
    field: "EMPLOYEE_CODE",
    headerName: "Employee Code",
    width: 120,
  },
  {
    icons: <EditIcon />,
    field: "EMPLOYEE_NAME",
    headerName: "Employee Name",
    width: 200,
  },
  {
    field: "MONTH",
    headerName: "Month",
    width: 60,
  },
  {
    field: "YEAR",
    headerName: "Year",
    width: 60,
  },
  {
    field: "TOT_DAYS",
    headerName: "Total Days",
    width: 85,
  },
  {
    field: "WEEKLY_OFF",
    headerName: "WO",
    width: 50,
  },
  {
    field: "PAID_HOLIDAY",
    headerName: "PH",
    width: 50,
  },
  {
    field: "PRESENT",
    headerName: "Present",
    width: 80,
  },
  {
    field: "ABSENT_DAYS",
    headerName: "Absent",
    width: 80,
  },

  {
    field: "DAYS_PAID",
    headerName: "Days Paid",
    width: 100,
    // renderCell: (params) =>
    //   params.value ? format(new Date(params.value), dateFormat) : "-",
  },
  {
    field: "CREATED_BY",
    headerName: "Created By",
    width: 100,
  },
  {
    field: "CREATED_TIME",
    headerName: "Created Time",
    width: 120,
    renderCell: (params) =>
      params.value ? format(new Date(params.value), dateFormat) : "-",
  },
];

const FetchMonthlyAttendance = async () => {
  try {
    const result = await Axios.get("/FetchMonthlyAttendance");
    // console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error in fetching Monthly Attendance", err);
  }
};

const AttendanceDetails = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["FetchMonthlyAttendance"],
    queryFn: FetchMonthlyAttendance,
  });
  // console.log(data);

  return (
    <Box sx={{}}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
        <Box sx={{ display: "flex", p: 2, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <HomeIcon onClick={() => navigate("/")} />
            <Typography sx={{ ml: 1, fontSize: "18px" }}>Attendance</Typography>
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
              Add Attendance
            </Button>
            {/* <Button
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
            </Button> */}
          </Box>
        </Box>
        <Box sx={{ mt: 8, mb: 1, display: "flex", justifyContent: "center" }}>
          {/* <Table /> */}

          <DataGrid
            rows={
              data ? data.map((row) => ({ ...row, id: row.EMPLOYEE_ID })) : []
            }
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

export default AttendanceDetails;
