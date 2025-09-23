import Paper from "@mui/material/Paper";
import { Box, Typography, TextField, Divider, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "../../api/Axios";

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
    console.log(result);
    return result.data;
  } catch (err) {
    console.log("Error in fetching Months");
  }
};

const AddAttendance = () => {
  const [form, setForm] = useState({
    Employee_ID: "",
    Month: "",
    Year: "2025",
    Tot_Days: "",
    Weekly_Off: "",
    Present: "",
    Paid_Holiday: "",
    Absent_Days: "",
    Days_Paid: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log("handleSubmit: -", form);
      const res = await Axios.post("/add-month-attendance", form);
      const result = res.data;
      // console.log("result:- ", result);

      if (result.statusText === "OK") {
        Swal.fire({
          icon: "success",
          text: "Attendance Added Successfully",
          title: "Monthly Attendance",
        });

        setTimeout(() => {
          navigate("/attendance/attendancedetails");
        }, 200);
      } else if (result.statusText === "!OK") {
        Swal.fire({
          icon: "error",
          text: result.message || "Attendance not added",
          title: "Monthly Attendance",
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

      return { Months: Months, Employees: Employees };
    },
  });

  // console.log("data:- ", data);

  useEffect(() => {
    const Cal_Days_Paid = form.Tot_Days - form.Absent_Days;
    const Calc_Present =
      form.Tot_Days - form.Weekly_Off - form.Paid_Holiday - form.Absent_Days;
    setForm((prevForm) => ({
      ...prevForm,
      Days_Paid: JSON.stringify(Cal_Days_Paid),
      Present: JSON.stringify(Calc_Present),
    }));
    // console.log("Cal_Days_Paid:- ", Cal_Days_Paid);
  }, [form.Tot_Days, form.Weekly_Off, form.Paid_Holiday, form.Absent_Days]);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
        <Box sx={{ display: "flex", p: 2 }}>
          <HomeIcon onClick={() => navigate("/")} />
          <Typography sx={{ ml: 1, fontSize: "18px" }}>
            Add Attendance{" "}
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
          {/* Select Employee, Tot Days, Absent, Days Paid*/}
          <Box sx={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                gap: 7,
                flexDirection: "column",
              }}
            >
              <Typography>Select Employee </Typography>
              <Typography>Total Days</Typography>
              <Typography>Absent</Typography>
              <Typography>Days Paid</Typography>
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
                  ? data.Employees.map((val, index) => (
                      <option
                        style={{ fontSize: "14px" }}
                        key={val.Employee_ID}
                        value={val.Employee_ID}
                      >
                        {val.Employee_Name}
                      </option>
                    ))
                  : ""}
              </select>

              {/*Tot_Days  */}
              <TextField
                required
                onChange={handleChange}
                name="Tot_Days"
                value={form.Tot_Days}
                placeholder="Total Days"
                id="outlined-basic"
                label=""
                variant="outlined"
                size="small"
                type="number  "
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

              {/* Absent Days*/}
              <TextField
                required
                onChange={handleChange}
                name="Absent_Days"
                value={form.Absent_Days}
                placeholder="Absent Days"
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

              {/* Days_Paid */}
              <TextField
                required
                onChange={handleChange}
                name="Days_Paid"
                value={form.Days_Paid}
                placeholder="Days Paid"
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
            </Box>
          </Box>
          {/* Second Column */}
          {/* Month, WO, PH, Present*/}
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
              <Typography>Present</Typography>
              <Typography>Weekly Off</Typography>
              <Typography>Paid Holiday</Typography>
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
                        key={val.Month}
                        value={val.Month}
                      >
                        {val.MonthYear}
                      </option>
                    ))
                  : ""}
              </select>

              {/* Present */}
              <TextField
                required
                onChange={handleChange}
                name="Present"
                value={form.Present}
                placeholder="Present"
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

              {/* Weekly Off */}
              <TextField
                required
                onChange={handleChange}
                name="Weekly_Off"
                value={form.Weekly_Off}
                placeholder="Weekly Off"
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

              {/* Paid Holiday */}
              <TextField
                required
                onChange={handleChange}
                name="Paid_Holiday"
                value={form.Paid_Holiday}
                placeholder="Paid Holiday"
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
            </Box>
          </Box>
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

export default AddAttendance;
