import Paper from "@mui/material/Paper";
import { Box, Typography, TextField, Divider, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Axios from "../../../api/Axios";

const fetchEmployee = async () => {
  try {
    const result = await Axios.get("/employeedetails");
    // console.log(result);

    return result.data;
  } catch (err) {
    console.log("Error in fetching Employee Master Details");
  }
};

const fetchMonths = async () => {
  try {
    const result = await Axios.get("/fetchMonths");
    // console.log(result);
    return result.data;
  } catch (err) {
    console.log("Error in fetching Months");
  }
};

const fetchPayhead = async () => {
  try {
    const result = await Axios.get("/payheaddetails");
    // console.log(result.data);
    return result.data;
  } catch (err) {
    console.log("Error in fetching Payhead Details");
  }
};

const AddVariableMaster = () => {
  const [form, setForm] = useState({
    Employee_ID: "",
    Month: "",
    Payhead_ID: "",
    Amount: "",
    Remark: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log("handleSubmit: -", form);
      const res = await Axios.post("/add-variable-master", form);
      const result = res.data;
      // console.log("result:- ", result);

      if (result.statusText === "OK") {
        Swal.fire({
          icon: "success",
          text: "Variable Added Successfully",
          title: "Variable Master",
        });

        setTimeout(() => {
          navigate("/payroll/VariableMasterDetails");
        }, 1000);
      } else if (result.statusText === "!OK") {
        Swal.fire({
          icon: "error",
          text: result.message || "Variable not added",
          title: "Variable Master",
        });
      }
    } catch (err) {
      // alert("Something went wrong. Check console.", err);
      console.log("err:-", err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // console.log("handleChange:- ", form);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["fetchEmployee"],
    queryFn: async () => {
      const Months = await fetchMonths();
      const Employees = await fetchEmployee();
      const Payhead = await fetchPayhead();

      return { Months: Months, Employees: Employees, Payhead: Payhead };
    },
  });

  //   console.log("data:- ", data ? data.Payhead : "");

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
        <Box sx={{ display: "flex", p: 2 }}>
          <HomeIcon onClick={() => navigate("/")} />
          <Typography sx={{ ml: 1, fontSize: "18px" }}>
            Add Variable{" "}
          </Typography>
        </Box>
        <Box
          sx={{
            p: 2,
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "grey",
          }}
        ></Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            gap: 20,
            mt: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* First Column */}
          {/* Select Employee, Pay Component*/}
          <Box sx={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                gap: 7,
                flexDirection: "column",
              }}
            >
              <Typography>Select Employee </Typography>
              <Typography>Pay Component</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 5,
                flexDirection: "column",
              }}
            >
              {/* Select Employee */}
              <select
                required
                style={{
                  padding: "10.5px",
                  paddingRight: "25px",
                  paddingLeft: "25px",
                }}
                onChange={handleChange}
                name="Employee_ID"
                value={form.Employee_ID}
              >
                <option selected value="" disabled>
                  Select{" "}
                </option>

                {data
                  ? data.Employees.map((val, index) => (
                      <option
                        style={{ fontSize: "14px" }}
                        key={val.Employee_ID}
                        value={val.Employee_ID}
                      >
                        {val.Employee_Name} ({val.Employee_Code})
                      </option>
                    ))
                  : ""}
              </select>

              {/*Pay Component  */}
              <select
                required
                style={{
                  padding: "10.5px",
                  paddingRight: "25px",
                  paddingLeft: "25px",
                  // paddingTop: "10px",
                }}
                onChange={handleChange}
                name="Payhead_ID"
                value={form.Payhead_ID}
              >
                <option selected value="" disabled>
                  Select{" "}
                </option>

                {data
                  ? data.Payhead.filter(
                      (val) => val.FormulaType_Name === "Variable"
                    ).map((val, index) => (
                      <option
                        style={{ fontSize: "14px" }}
                        key={val.Payhead_ID}
                        value={val.Payhead_ID}
                      >
                        {val.Payhead_Name}
                      </option>
                    ))
                  : ""}
              </select>
            </Box>
          </Box>
          {/* Second Column */}
          {/* Month, Amount*/}
          <Box sx={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                gap: 7,
                //   alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography>Select Month </Typography>
              <Typography>Amount</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 5,
                flexDirection: "column",
              }}
            >
              {/* Select Month */}
              <select
                style={{
                  padding: "10.5px",
                  paddingRight: "25px",
                  paddingLeft: "25px",
                }}
                onChange={handleChange}
                name="Month"
                value={form.Month}
              >
                <option selected value="" disabled>
                  Select{" "}
                </option>

                {data
                  ? data.Months.map((val, index) => (
                      <option
                        style={{ fontSize: "14px" }}
                        key={val.MonthYear}
                        value={[
                          JSON.stringify({
                            Month: val.Month,
                            Year: val.Year,
                          }),
                        ]}
                      >
                        {val.MonthYear}
                      </option>
                    ))
                  : ""}
              </select>

              {/* Amount */}
              <TextField
                required
                onChange={handleChange}
                name="Amount"
                value={form.Amount}
                placeholder="0"
                id="outlined-basic"
                label=""
                variant="outlined"
                size="small"
                type="number"
                sx={{
                  //   backgroundColor: "#E6E6FA",

                  ml: 0,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black", // default border color
                    },
                    "&:hover fieldset": {
                      borderColor: "black", // on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black", // on focus
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 5,
            display: "flex",
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Remark </Typography>
          <textarea
            style={{
              width: "50%",
              height: "100px",
              backgroundColor: "#E6E6FA",
            }}
            type="text"
            onChange={handleChange}
            name="Remark"
            value={form.Remark}
          ></textarea>
        </Box>
        <Divider sx={{ mt: 5 }} />
        {/* Save Button */}
        <Box
          sx={{
            p: 1.5,
            display: "flex",
            gap: 5,
            justifyContent: "center",
            mt: 1,
          }}
        >
          <Button
            type="submit"
            onChange={handleSubmit}
            className="btn-empsave"
            sx={{ px: 3, py: 1, bgcolor: "#111827", color: "white" }}
          >
            Add
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddVariableMaster;
