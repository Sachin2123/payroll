import Paper from "@mui/material/Paper";
import { Box, Typography, TextField, Divider, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Axios from "../../api/Axios";

const fetchEmp = async () => {
  const res = await Axios.get("employeedetails");
  const result = res.data;
  // console.log("result:- ", result);
  return result;
};

const Payheads = async () => {
  const res = await Axios.get("FetchPayheadsforSalaStructure");
  const result = res.data;
  console.log("FetchPayheadsforSalaStructure:- ", result);
  return result;
};

const AddSalaryStructure = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log("Payhead_ID :- ", name, "Value :- ", value);
    // console.log("form data :-", JSON.stringify(form));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Employee_ID, Effective_From, ...Payheads } = form;

    const ConvertedData = Object.entries(Payheads).map(
      ([Payhead_ID, Amount]) => ({
        Employee_ID: Number(Employee_ID),
        Effective_From,
        Payhead_ID: Number(Payhead_ID),
        Amount: Number(Amount),
      }),
    );

    setForm(ConvertedData);

    // console.log("handleSubmit:- ", ConvertedData);
    try {
      const res = await Axios.post(
        "add-salary-structure",
        JSON.stringify(ConvertedData),
      );

      const result = await res.data; // Read server response
      console.log("result.message:- ", result);

      if ((result.statusText = "OK")) {
        // alert(result.message); // Success message

        Swal.fire({
          title: "Salary Structure",
          text: result.message,
          icon: "success",
        });
        setTimeout(() => {
          navigate("/payroll/salary-structure-details");
        }, 300);
      } else {
        Swal.fire({
          title: "Salary Structure",
          text: result.message,
          icon: "error",
        });
      }
    } catch (err) {
      //   console.log("Fetch failed:", err);
      Swal.fire({
        title: "Something went wrong",
        text: result.message,
        icon: "error",
      });
    }
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["fetchemp"],
    queryFn: async () => {
      const res1 = await fetchEmp();
      const res2 = await Payheads();

      return { fetchEmp: res1, Payheads: res2 };
    },
  });

  // console.log("data:- ", data ? data.Payheads[0] : "");

  if (isLoading) <div>..Loading</div>;
  if (error) <div>..Error</div>;

  useEffect(() => {
    if (data?.Payheads) {
      const initialForm = {};
      data.Payheads.map((val) => {
        // console.log(val.Payhead_Name);
        initialForm[val.Payhead_ID] = "0";
      });
      setForm(initialForm);
      // console.log(initialForm);
    }
  }, [data]);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
        <Box sx={{ display: "flex", p: 2 }}>
          <HomeIcon onClick={() => navigate("/")} />
          <Typography sx={{ ml: 1, fontSize: "18px" }}>
            Add Salary Structure{" "}
          </Typography>
        </Box>
        <Box
          sx={{
            // mt: 15,
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
          <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}>
            <Typography>Select Employee </Typography>

            <select
              style={{
                padding: "10.5px",
                paddingRight: "25px",
                paddingLeft: "25px",
                // paddingTop: "10px",
              }}
              onChange={handleChange}
              name="Employee_ID"
              value={form.Employee_ID}
            >
              <option selected value="" disabled>
                Select{" "}
              </option>

              {data
                ? data.fetchEmp.map((val, index) => (
                    <option
                      style={{ fontSize: "14px" }}
                      key={val.Employee_ID}
                      value={val.Employee_ID}
                    >
                      {val.Employee_Name} - ({val.Employee_Code})
                    </option>
                  ))
                : ""}
            </select>
          </Box>

          <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}>
            <Typography>Effective From </Typography>

            <TextField
              name="Effective_From"
              onChange={handleChange}
              value={form.Effective_From}
              type="date"
              size="small"
            ></TextField>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 30,
            mt: 5,
            mb: 5,

            p: 5,
          }}
        >
          {/* Payheads */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              justifyContent: "center",
            }}
          >
            {data
              ? data.Payheads.map((val, index) => (
                  <label
                    key={val.Payhead_ID}
                    style={{ fontSize: "14px", mr: 12 }}
                  >
                    {val.Payhead_Name}
                  </label>
                ))
              : ""}
          </Box>
          {/* Payhead Amount Field*/}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            {data
              ? data.Payheads.map((val, index) => (
                  <Typography>
                    {val.Payhead_Type === "Deduction" ||
                    val.FormulaType_Name === "Variable" ? (
                      <TextField
                        disabled
                        required
                        onChange={handleChange}
                        name={val.Payhead_ID}
                        value={form[val.Payhead_ID]}
                        placeholder="0"
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        size="small"
                        type="number"
                        sx={{
                          backgroundColor: "#E6E6FA",

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
                    ) : (
                      <TextField
                        required
                        onChange={handleChange}
                        name={val.Payhead_ID}
                        value={form[val.Payhead_ID]}
                        placeholder="0"
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        size="small"
                        type="number"
                        sx={{
                          backgroundColor: "#E6E6FA",

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
                    )}
                  </Typography>

                  // <TextField
                  //   required
                  //   onChange={handleChange}
                  //   name={val.Payhead_ID}
                  //   value={form[val.Payhead_ID]}
                  //   placeholder="0"
                  //   id="outlined-basic"
                  //   label=""
                  //   variant="outlined"
                  //   size="small"
                  //   type="number"
                  //   sx={{
                  //     backgroundColor: "#E6E6FA",

                  //     ml: 0,
                  //     "& .MuiOutlinedInput-root": {
                  //       "& fieldset": {
                  //         borderColor: "black", // default border color
                  //       },
                  //       "&:hover fieldset": {
                  //         borderColor: "black", // on hover
                  //       },
                  //       "&.Mui-focused fieldset": {
                  //         borderColor: "black", // on focus
                  //       },
                  //     },
                  //   }}
                  // />
                ))
              : ""}
          </Box>
        </Box>
        <Divider />
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
            Save Salary Structure
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddSalaryStructure;
