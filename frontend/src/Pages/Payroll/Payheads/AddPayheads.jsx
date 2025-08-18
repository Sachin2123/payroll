import Paper from "@mui/material/Paper";
import { Box, Typography, TextField, Divider, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const fetchGradeCompany = async () => {
  const result = await fetch("http://localhost:5000/api/grade-company");

  if (!result.ok) throw Error("Error in fetching");
  // console.log("result:- ", result);
  return result.json();
};

const AddPayheads = () => {
  const [form, setForm] = useState({
    Payhead_Code: "",
    Payhead_Name: "",
    Payhead_Type: "",
    Payhead_Formula: "",
    Company_ID: "",
    Grade_ID: "",
    IS_PF: "",
    IS_ESIC: "",
    IS_PT: "",
    IS_Attendance: "",
    IS_Formula_Type: "",
    Created_By: "",
    Created_Time: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
   
    // console.log("formulaType:- ", formulaType.IS_Formula_Type);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // console.log("form data :-", JSON.stringify(form));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("form:- ", JSON.stringify(form));

    try {
      const res = await fetch("http://localhost:5000/api/addpayheads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form), // Convert JS object to JSON string
      });

      const result = await res.json(); // Read server response
        console.log("result.message:- ", result.message);

      if (res.ok) {
        // alert(result.message); // Success message

        Swal.fire({
          title: ` ${form.Payhead_Name} Payhead Created Successfully`,
          icon: "success",
        });
        setTimeout(() => {
          navigate("/payroll/payheaddetails");
        }, 300);
      } else {
        // alert("Error: " + result.error);
        Swal.fire({
          title: "Error in Payhead Creation",
          icon: "Error",
        });
      }
    } catch (err) {
      //   console.log("Fetch failed:", err);
      alert("Something went wrong. Check console.");
    }
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["fetchGradeCompany"],
    queryFn: fetchGradeCompany,
  });
  // console.log(data ? data.Payheads : "");

  if (isLoading) <div>..Loading</div>;
  if (error) <div>..Error</div>;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
        <Box sx={{ display: "flex", p: 2 }}>
          <HomeIcon onClick={() => navigate("/")} />
          <Typography sx={{ ml: 1, fontSize: "18px" }}>Add Payhead </Typography>
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
          {/* Company, Payhead Name, PF, ESIC, Payhead Type */}
          <Box sx={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                gap: 7,
                flexDirection: "column",
              }}
            >
              <Typography>Select Company </Typography>
              <Typography>Payhead Name</Typography>
              <Typography>PF</Typography>
              <Typography>ESIC</Typography>
              <Typography>Payhead Type</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 5,
                flexDirection: "column",
              }}
            >
              {/* Select Company */}
              <select
                required
                style={{
                  padding: "10.5px",
                  paddingRight: "25px",
                  paddingLeft: "25px",
                  // paddingTop: "10px",
                }}
                onChange={handleChange}
                name="Company_ID"
                value={form.Company_ID}
              >
                <option selected value="" disabled>
                  Select{" "}
                </option>

                {data
                  ? data.Company.map((val, index) => (
                      <option
                        style={{ fontSize: "14px" }}
                        key={val.Company_ID}
                        value={val.Company_ID}
                      >
                        {val.Company_Name}
                      </option>
                    ))
                  : ""}
              </select>

              {/*Payhead_Name  */}
              <TextField
                required
                onChange={handleChange}
                name="Payhead_Name"
                value={form.Payhead_Name}
                placeholder="Payhead Name"
                id="outlined-basic"
                label=""
                variant="outlined"
                size="small"
                type="text"
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

              {/* PF */}
              <select
                required
                style={{
                  padding: "10.5px",
                  paddingRight: "25px",
                  paddingLeft: "25px",
                  // paddingTop: "10px",
                }}
                onChange={handleChange}
                value={form.IS_PF}
                name="IS_PF"
              >
                <option>Select</option>

                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>

              {/* ESIC */}
              <select
                required
                style={{
                  padding: "10.5px",
                  paddingRight: "25px",
                  paddingLeft: "25px",
                }}
                name="IS_ESIC"
                value={form.IS_ESIC}
                onChange={handleChange}
              >
                <option>Select</option>

                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>

              {/* Payhead_Type */}
              <select
                required
                style={{
                  padding: "10.5px",
                  paddingRight: "25px",
                  paddingLeft: "25px",
                }}
                name="Payhead_Type"
                value={form.Payhead_Type}
                onChange={handleChange}
              >
                <option>Select</option>

                <option value="Allowance">Allowance</option>
                <option value="Deduction">Deduction</option>
              </select>
            </Box>
          </Box>
          {/* Second Column */}
          {/* Grade, Payhead Code, Attendance, PT */}
          <Box sx={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                gap: 7,
                //   alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography>Select Grade </Typography>
              <Typography>Payhead Code</Typography>
              <Typography>PT</Typography>
              <Typography>Attendance</Typography>
              <Typography>Formula Type</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 5,
                flexDirection: "column",
              }}
            >
              {/* Select Grade */}
              <select
                style={{
                  padding: "10.5px",
                  paddingRight: "25px",
                  paddingLeft: "25px",
                }}
                onChange={handleChange}
                name="Grade_ID"
                value={form.Grade_ID}
              >
                <option selected value="" disabled>
                  Select{" "}
                </option>

                {data
                  ? data.Grade.map((val, index) => (
                      <option
                        style={{ fontSize: "14px" }}
                        key={val.Grade_ID}
                        value={val.Grade_ID}
                      >
                        {val.Grade_Name}
                      </option>
                    ))
                  : ""}
              </select>

              {/* Payhead_Code */}
              <TextField
                required
                onChange={handleChange}
                name="Payhead_Code"
                value={form.Payhead_Code}
                placeholder="Payhead_Code"
                id="outlined-basic"
                label=""
                variant="outlined"
                size="small"
                type="text"
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

              {/* PT */}
              <select
                style={{
                  padding: "10.5px",
                  paddingRight: "25px",
                  paddingLeft: "25px",
                }}
                name="IS_PT"
                value={form.IS_PT}
                onChange={handleChange}
              >
                <option>Select</option>

                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
              {/* Attendance */}
              <select
                style={{
                  padding: "10.5px",
                  paddingRight: "25px",
                  paddingLeft: "25px",
                }}
                onChange={handleChange}
                name="IS_Attendance"
                value={form.IS_Attendance}
              >
                <option>Select</option>

                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>

              {/* Is_Formula_Type */}
              <select
                style={{
                  padding: "10.5px",
                  paddingRight: "25px",
                  paddingLeft: "25px",
                }}
                onChange={handleChange}
                name="IS_Formula_Type"
                value={form.IS_Formula_Type}
              >
                <option disabled>Select</option>

                <option value="1">Flag</option>
                <option value="0">Formula</option>
              </select>
            </Box>
          </Box>
        </Box>
        {/* Formula */}
        <Box
          sx={{
            mt: 6,
            display: "flex",
            justifyContent: "center",
            gap: 10,
            alignItems: "center",
          }}
        >
          {/* {formulaType.IS_Formula_Type == 1 ? (
            ""
          ) : ( */}
          <>
            <Typography sx={{ ml: 0 }}>Formula </Typography>
            <textarea
              style={{
                width: "68%",
                height: "100px",
                backgroundColor: "#E6E6FA",
              }}
              type="text"
              onChange={handleChange}
              name="Payhead_Formula"
              value={form.Payhead_Formula}
            ></textarea>
          </>
          {/* )} */}
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
            Create
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddPayheads;
