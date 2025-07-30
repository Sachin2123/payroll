import Paper from "@mui/material/Paper";
import { Box, Typography, TextField, Divider, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const UpdatePayheads = () => {
  const { Payhead_ID } = useParams();
  const navigate = useNavigate();

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
    Created_By: "",
    Created_Time: "",
  });

  const fetchGradeCompany = async () => {
    const result = await fetch("http://localhost:5000/api/grade-company");
    // console.log(result);
    if (!result.ok) throw new Error("Error in fetching");
    return result.json();
  };

  // API: fetch single payhead details
  const fetchSinglePayheadDetails = async (Payhead_ID) => {
    const result = await fetch(
      `http://localhost:5000/api/payheaddetails/${Payhead_ID}`
    );
    if (!result.ok) throw new Error("Error in fetching payhead details");
    return result.json();
  };

  // Fetch and set payhead data
  const fetchedPayhead = async () => {
    try {
      const result = await fetchSinglePayheadDetails(Payhead_ID);
      const data = result[0];
      // console.log("data", data/\);
      // Pre-fill form state
      setForm({
        Payhead_Code: data.Payhead_Code || "",
        Payhead_Name: data.Payhead_Name || "",
        Payhead_Type: data.Payhead_Type || "",
        Payhead_Formula: data.Payhead_Formula,
        Company_ID: data.Company_ID || "",
        Grade_ID: data.Grade_ID || "",
        IS_PF: data.IS_PF,
        IS_ESIC: data.IS_ESIC,
        IS_PT: data.IS_PT,
        IS_Attendance: data.IS_Attendance,
        Created_By: data.Created_By || "",
        Created_Time: data.Created_Time || "",
      });
      // console.log(data.IS_ESIC);
      // console.log(data.IS_PF);
    } catch (err) {
      console.error("Error in fetching payhead details:", err);
    }
  };

  useEffect(() => {
    if (Payhead_ID) {
      fetchedPayhead();
    }
  }, [Payhead_ID]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // console.log("Update HandleChange :- ", {
    //   ...form,
    //   [e.target.name]: e.target.value,
    // });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("handleSubmit JSOn :- ", JSON.stringify(form));
    // console.log("handleSubmit Normal:- ", form);
    try {
      const res = await fetch(
        `http://localhost:5000/api/edit-payheaddetails/${Payhead_ID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form, Payhead_ID),
        }
      );

      const result = await res.json();
      // console.log(result);

      if (res.ok) {
        alert(result.message);
        setTimeout(() => {
          navigate("/payroll/payheaddetails");
        }, 300);
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      alert("Something went wrong. Check console.");
      console.error("Error during submit:", err);
    }
  };

  const { data, error } = useQuery({
    queryKey: ["fetchGradeCompany"],
    queryFn: fetchGradeCompany,
  });
  // console.log(data);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
        <Box sx={{ display: "flex", p: 2 }}>
          <HomeIcon onClick={() => navigate("/")} />
          <Typography sx={{ ml: 1, fontSize: "18px" }}>
            Edit Payhead{" "}
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
                  // fontSize: "12px",
                  backgroundColor: "#E6E6FA",

                  ml: 0,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black", // default border color
                      // fontSize: "12px",
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
            Update
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UpdatePayheads;
