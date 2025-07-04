import Paper from "@mui/material/Paper";
import { Box, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
// import Table from "../../component/Tables/Table";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";

const paginationModel = { page: 0, pageSize: 5 };

const dateFormat = "dd MMM yyyy";

const columns = [
  {
    icons: <EditIcon />,
    field: "Employee_Code",
    headerName: "Employee Code",
    width: 130,
  },
  {
    field: "Employee_Name",
    headerName: "Employee Name",
    width: 180,
  },
  {
    field: "Grade",
    headerName: "Grade",
    width: 130,
  },
  {
    field: "Branch",
    headerName: "Branch",
    width: 130,
  },
  {
    field: "Department",
    headerName: "Department",
    width: 130,
  },
  {
    field: "Joining_Date",
    headerName: "Joining Date",
    width: 130,
    renderCell: (params) =>
      params.value ? format(new Date(params.value), dateFormat) : "-",
  },
  {
    field: "Confirmation_Date",
    headerName: "Confirmation_Date",
    width: 130,
    renderCell: (params) =>
      params.value ? format(new Date(params.value), dateFormat) : "-",
  },

  { field: "Company_Name", headerName: "Company Name", width: 200 },
];

const fetchEmployee = async () => {
  const result = await fetch("http://localhost:5000/api/employeedetails");
  if (!result.ok) throw new Error("error in fetching data");
  // console.log(result.recordset);
  return result.json();
};

const Employee = () => {
  const navigate = useNavigate();

  const { error, isLoading, data } = useQuery({
    queryKey: ["employeesdetails"],
    queryFn: fetchEmployee,
  });

  console.log(data);

  if (isLoading) return <div>...Loading</div>;
  if (error) return <div>...Error</div>;

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
          {/* <Table /> */}

          <DataGrid
            rows={
              data ? data.map((row) => ({ ...row, id: row.Employee_ID })) : []
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

export default Employee;
