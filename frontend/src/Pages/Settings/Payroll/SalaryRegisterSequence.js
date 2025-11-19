import Paper from "@mui/material/Paper";
import { Box, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import Axios from "../../../api/Axios";
import { useState } from "react";

const paginationModel = { page: 0, pageSize: 5 };

const columns = [
  {
    icons: <EditIcon />,
    field: "Company_ID",
    headerName: "Company ID",
    width: 130,
  },
  {
    field: "Company_Name",
    headerName: "Company Name",
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
  },
];

const fetchCompany = async () => {
  const result = await Axios.get("/companydetails");
  //   console.log(result.data);
  return result.data;
};

const fetchPayheads = async () => {
  const result = await Axios.get("/payheaddetails");
  if (!result.data) throw new Error("Error in fetching payhead details");
  return result.data;
};

const SalaryRegisterSequence = () => {
  const [company, setCompany] = useState();
  const [form, setForm] = useState({
    Company_ID: "",
  });
  const navigate = useNavigate();
  const { error, isLoading, data } = useQuery({
    queryKey: ["companyAndPayheads"],
    queryFn: async () => {
      const Company = await fetchCompany();
      const Payheads = await fetchPayheads();

      return { Company, Payheads };
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setCompany("Selected");
    console.log(form);
  };

  if (isLoading) return <div>...Loading</div>;
  if (error) return <div>...Error</div>;
  //   console.log(data);

  return (
    <Box sx={{}}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
        <Box sx={{ display: "flex", p: 2, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <HomeIcon onClick={() => navigate("/")} />
            <Typography sx={{ ml: 1, fontSize: "18px" }}>
              Salary Register Sequence
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <select
            style={{
              padding: "10.5px",
              paddingRight: "25px",
              paddingLeft: "25px",
            }}
            onChange={handleChange}
            name="Company_ID"
            value={form.Company_ID}
          >
            <option selected disabled>
              Select Company
            </option>
            {data.Company?.map((val, index) => (
              <option
                style={{ fontSize: "14px" }}
                key={val.Company_ID}
                value={val.Company_ID}
              >
                {val.Company_Name} {val.Company_ID}
              </option>
            ))}
          </select>
        </Box>
        <Divider sx={{ mt: 5 }} />
        <Box sx={{ mt: 8, mb: 1, display: "flex", justifyContent: "center" }}>
          {/* <Table /> */}

          {/* <DataGrid
            rows={
              data ? data.map((row) => ({ ...row, id: row.Company_ID })) : []
            }
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          /> */}

          {company === "Selected" ? "Render" : ""}
        </Box>
      </Paper>
    </Box>
  );
};

export default SalaryRegisterSequence;
