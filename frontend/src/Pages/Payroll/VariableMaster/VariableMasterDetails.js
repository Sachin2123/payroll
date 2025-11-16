import Paper from "@mui/material/Paper";
import { Box, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import Axios from "../../../api/Axios";

const paginationModel = { page: 0, pageSize: 5 };

const columns = [
  {
    icons: <EditIcon />,
    field: "Employee_Code",
    headerName: "Employee Code",
    width: 150,
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
    width: 80,
  },

  {
    field: "Year",
    headerName: "Year",
    width: 80,
  },
  {
    field: "Payhead_Name",
    headerName: "Pay Component",
    width: 200,
  },
  {
    field: "Amount",
    headerName: "Amount",
    width: 150,
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
  },
];

const fetchVariableMasterDetails = async () => {
  const result = await Axios.get("/FetchVariableMasterDetails");
  if (!result.data) {
    throw new Error("Error in fetching Variable Master Details");
  }

  return result.data;
};

const VariableMasterDetails = () => {
  const navigate = useNavigate();

  const { error, isLoading, data } = useQuery({
    queryKey: ["fetchVariableMasterDetails"],
    queryFn: fetchVariableMasterDetails,
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
            <Typography sx={{ ml: 1, fontSize: "18px" }}>
              Variable Master
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              className="btn-addgrade"
              onClick={() => navigate("/payroll/AddVariableMaster")}
              sx={{
                boxShadow: "2px 2px 2px 1px rgba(0, 0, 255, .2)",
                color: "white",
                background: "black",
                padding: "8px 14px",
              }}
            >
              Add Variable
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: 8, mb: 1, display: "flex", justifyContent: "center" }}>
          {/* <Table /> */}

          <DataGrid
            rows={
              data ? data.map((row) => ({ ...row, id: row.VarPay_ID })) : []
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

export default VariableMasterDetails;
