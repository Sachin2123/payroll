import Paper from "@mui/material/Paper";
import { Box, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import { Edit } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// import { format } from "date-fns";

const paginationModel = { page: 0, pageSize: 10 };

// const dateFormat = "dd-MMM-yyyy";

const fetchPayheadDetails = async () => {
  const result = await fetch("http://localhost:5000/api/payheaddetails");
  if (!result.ok) throw new Error("error in fetching payheads");
  // console.log(result);
  return result.json();
};

const PayheadsDetails = () => {
  const columns = [
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => {
              navigate(`/payroll/UpdatePayheads/${params.row.Payhead_ID}`);
              // console.log(params.row.Payhead_ID);
            }}
          >
            <Edit sx={{ color: "black" }} />
          </IconButton>
          <IconButton>
            <DeleteIcon
              // onClick={() => console.log(params.row.Payhead_ID)}
              sx={{ color: "red" }}
            />
          </IconButton>
          {/* <IconButton>
            <VisibilityIcon sx={{ color: "blue" }} />
          </IconButton> */}
        </Box>
      ),
    },
    {
      icons: "",
      field: "Payhead_Code",
      headerName: "Payhead Code",
      width: 160,
    },
    {
      icons: "",
      field: "Payhead_Name",
      headerName: "Payhead Name",
      width: 200,
    },
    {
      field: "Payhead_Type",
      headerName: "Payhead Type",
      width: 200,
    },

    //   {
    //     field: "Effective_From",
    //     headerName: "Effective From",
    //     width: 110,
    //     renderCell: (params) =>
    //       params.value ? format(new Date(params.value), dateFormat) : "-",
    //   },
    {
      field: "Payhead_Formula",
      headerName: "Payhead Formula",
      width: 500,
    },
  ];
  const navigate = useNavigate();

  const { error, isLoading, data } = useQuery({
    queryKey: ["fetchPayheadDetails"],
    queryFn: fetchPayheadDetails,
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
            <Typography sx={{ ml: 1, fontSize: "18px" }}>Payhead</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              className="btn-process-salary"
              onClick={() => navigate("/payroll/addpayhead")}
              sx={{
                boxShadow: "2px 2px 2px 1px rgba(0, 0, 255, .2)",
                color: "white",
                background: "black",
                padding: "8px 14px",
                // textTransform: "none",
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: 8, mb: 1, display: "flex", justifyContent: "center" }}>
          {/* <Table /> */}

          <DataGrid
            rows={
              data ? data.map((row) => ({ ...row, id: row.Payhead_ID })) : []
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

export default PayheadsDetails;
