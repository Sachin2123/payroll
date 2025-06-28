import Paper from "@mui/material/Paper";
import { Box, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";

const paginationModel = { page: 0, pageSize: 5 };

const dateFormat = "dd MMM yyyy";

const columns = [
  {
    icons: <EditIcon />,
    field: "Branch_ID",
    headerName: "Branch ID",
    width: 130,
  },
  {
    field: "Branch_Name",
    headerName: "Branch Name",
    width: 500,
  },
  {
    field: "Created_By",
    headerName: "Created By",
    width: 130,
  },
  {
    field: "Created_Time",
    headerName: "Created Time",
    width: 200,
    renderCell: (params) =>
      params.value ? format(new Date(params.value), dateFormat) : "-",
  },
];

const fetchBranch = async () => {
  const result = await fetch("http://localhost:5000/api/branchdetails");
  if (!result.ok) throw new Error("error in fetching branch data");
  // console.log(result);
  return result.json();
};

const BranchDetails = () => {
  const navigate = useNavigate();

  const { error, isLoading, data } = useQuery({
    queryKey: ["branch"],
    queryFn: fetchBranch,
  });

  if (isLoading) return <div>...Loading</div>;
  if (error) return <div>...Error</div>;

  return (
    <Box sx={{}}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
        <Box sx={{ display: "flex", p: 2, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <HomeIcon onClick={() => navigate("/")} />
            <Typography sx={{ ml: 1, fontSize: "18px" }}>Branch</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              className="btn-addBranch"
              onClick={() => navigate("/addbranch")}
              sx={{
                boxShadow: "2px 2px 2px 1px rgba(0, 0, 255, .2)",
                color: "white",
                background: "black",
                padding: "8px 14px",
              }}
            >
              Add Branch
            </Button>
            <Button
              className="btn-export"
              onClick={() => navigate("/export-branch")}
              sx={{
                boxShadow: "2px 2px 2px 1px rgba(0, 0, 255, .2)",
                color: "white",
                background: "black",
                padding: "8px 14px",
              }}
            >
              Export
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: 8, mb: 1, display: "flex", justifyContent: "center" }}>
          {/* <Table /> */}

          <DataGrid
            rows={
              data ? data.map((row) => ({ ...row, id: row.Branch_ID })) : []
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

export default BranchDetails;
