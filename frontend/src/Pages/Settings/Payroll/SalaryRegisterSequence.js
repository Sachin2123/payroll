import Paper from "@mui/material/Paper";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Axios from "../../../api/Axios";
import { useState } from "react";
import { useAPIContext } from "../../../Context/APIContext";

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

const SalaryRegisterSequence = ({ children }) => {
  const { components } = useAPIContext();
  const { ButtonComp, DividerComp, TypographyComp, TextFieldComp, BoxComp } =
    components;

  const [company, setCompany] = useState();
  const [form, setForm] = useState({
    Company_ID: "",
    OrderNo: "",
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
  // console.log(data);

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
            <option value="" disabled>
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
        {company === "Selected" && (
          <>
            {/* Header Row */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                gap: 10,
                py: 2,
              }}
            >
              <Typography variant="h6">Payhead Name</Typography>
              <Typography variant="h6">Payhead Type</Typography>
              <Typography variant="h6">Order No</Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Data Rows */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pl: 15,
                mb: 5,
              }}
            >
              {/* Payhead Name Column */}
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6.5,
                }}
              >
                {data?.Payheads?.map((val, index) => (
                  <Typography key={index}>{val.Payhead_Name}</Typography>
                ))}
              </Box>

              {/* Payhead Type Column */}
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6.5,
                }}
              >
                {data?.Payheads?.map((val, index) => (
                  <Typography key={index}>{val.Payhead_Type}</Typography>
                ))}
              </Box>

              {/* Order No Column */}
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {data?.Payheads?.map((val, index) => (
                  <TextField
                    key={index}
                    sx={{ width: "50%" }}
                    name="OrderNo"
                    value={form.OrderNo}
                    placeholder="0"
                  />
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                m: 3,
                mr: 14.5,
              }}
            >
              <Button
                sx={{
                  backgroundColor: "#111827",
                  color: "white",
                  px: 4.2,
                  py: 1.3,
                }}
              >
                Save
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default SalaryRegisterSequence;
