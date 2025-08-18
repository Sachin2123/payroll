import Paper from "@mui/material/Paper";
import { Box, Typography, TextField, Divider, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchEmp = async () => {
  const result = await fetch("http://localhost:5000/api/employeedetails");

  if (!result.ok) throw Error("Error in fetching employee name");
  // console.log("result:- ", result);
  return result.json();
};

const AddSalaryStructure = () => {
  const [form, setForm] = useState({
    Employee_ID: "",
    Basic: "",
    HRA: "",
    Bonus: "",
    Special_Allowance: "",
    Effective_From: "",
    Created_By: "",
    Created_Time: "",
    MonthlyCTC: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log("form data :-", JSON.stringify(form));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("form:- ", form);
    // console.log("Grade Name :-", JSON.stringify(form));

    if (
      !form.Basic ||
      !form.HRA ||
      !form.Bonus ||
      !form.Special_Allowance ||
      !form.Effective_From
    ) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/add-manual-salary-structure",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form), // Convert JS object to JSON string
        }
      );

      const result = await res.json(); // Read server response
      //   console.log("result.message:- ", result.message);

      if (res.ok) {
        alert(result.message); // Success message
        setTimeout(() => {
          navigate("/payroll/salary-structure-details");
        }, 300);
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      //   console.log("Fetch failed:", err);
      alert("Something went wrong. Check console.");
    }
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["fetchEmp"],
    queryFn: fetchEmp,
  });

  // console.log("data:- ", data ? data[0] : "No Data");

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      MonthlyCTC:
        Number(form.Basic) +
        Number(form.HRA) +
        Number(form.Bonus) +
        Number(form.Special_Allowance),
    }));
  }, [form.Basic, form.HRA, form.Bonus, form.Special_Allowance]);

  if (isLoading) <div>..Loading</div>;
  if (error) <div>..Error</div>;

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

              {data?.map((val, index) => (
                <option
                  style={{ fontSize: "14px" }}
                  key={val.Employee_ID}
                  value={val.Employee_ID}
                >
                  {val.Employee_Name} - ({val.Employee_Code})
                </option>
              ))}
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
            // backgroundColor: "#E6E6FA",
            // pt: 5,
            // pb: 5,
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
            <label style={{ fontSize: "14px", mr: 12 }}>Basic</label>
            <label style={{ fontSize: "14px", mr: 12 }}>HRA</label>
            <label style={{ fontSize: "14px", mr: 12 }}>
              Special Allowance
            </label>
            <label style={{ fontSize: "14px", mr: 12 }}>Bonus</label>
            <label style={{ fontSize: "14px", mr: 12 }}>MonthlyCTC</label>
          </Box>
          {/* Payhead Amount */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            {/* Basic */}
            <TextField
              required
              onChange={handleChange}
              name="Basic"
              value={form.Basic}
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
            {/* HRA */}
            <TextField
              required
              onChange={handleChange}
              name="HRA"
              value={form.HRA}
              placeholder="0"
              id="outlined-basic"
              label=""
              variant="outlined"
              size="small"
              type="number"
              sx={{
                ml: 0,
                backgroundColor: "#E6E6FA",
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
            {/* Special Allowance */}
            <TextField
              required
              onChange={handleChange}
              name="Special_Allowance"
              value={form.Special_Allowance}
              placeholder="0"
              id="outlined-basic"
              label=""
              variant="outlined"
              size="small"
              type="number"
              sx={{
                ml: 0,
                backgroundColor: "#E6E6FA",
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
            {/* Bonus */}
            <TextField
              required
              onChange={handleChange}
              name="Bonus"
              value={form.Bonus}
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
            />{" "}
            {/* MonthltyCTC */}
            <TextField
              // disabled
              // onChange={(e) => handleMonthlyCTC(e)}
              name="MonthlyCTC"
              value={form.MonthlyCTC}
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
            />{" "}
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
