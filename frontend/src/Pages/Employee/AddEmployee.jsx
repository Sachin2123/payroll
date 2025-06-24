import Paper from "@mui/material/Paper";
import { Box, Typography, TextField, Divider, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddEmployee = () => {
  const [form, setForm] = useState({
    Employee_Code: "",
    Employee_Name: "",
    Birth_Date: "",
    Confirmation_Date: "",
    Probation_Month: "",
    Company_Name: "",
    Joining_Date: "",
  });
  const navigate = useNavigate();

  // const tabs = [
  //   { name: "Basic Information" },
  //   { name: "Statutory", path: "/statutory" },
  //   { name: "Contact", path: "/contact" },
  //   { name: "Document", path: "/document" },
  //   { name: "Nominee", path: "/nominee" },
  //   { name: "Asset", path: "/asset" },
  // ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // console.log("form data :-", JSON.stringify(form));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(form.Company_Name);
    // console.log("form data :-", JSON.stringify(form));

    try {
      const res = await fetch("http://localhost:5000/api/addemployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form), // Convert JS object to JSON string
      });

      const result = await res.json(); // Read server response
      //   console.log("result.message:- ", result.message);

      if (res.ok) {
        alert(result.message); // Success message
        setTimeout(() => {
          navigate("/employee");
        }, 800);
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      //   console.log("Fetch failed:", err);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
        <Box sx={{ display: "flex", p: 2 }}>
          <HomeIcon onClick={() => navigate("/")} />
          <Typography sx={{ ml: 1, fontSize: "18px" }}>
            Add Employee{" "}
          </Typography>
        </Box>
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            gap: 3,
          }}
        >
          {tabs.map((menu) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  gap: 5,
                  justifyContent: "space-between",
                }}
              >
                <Button
                  className="btn-addemployee"
                  onClick={() => navigate("/addemployee")}
                  sx={{
                    color: "grey",
                  }}
                >
                  {menu.name}
                </Button>
              </Box>
            );
          })}{" "}
        </Box> */}
        {/* Basic Information */}
        <Box
          sx={{
            p: 2,
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "grey",
          }}
        >
          Basic Information{" "}
        </Box>
        <Divider />
        {/* First Row */}
        <Box
          sx={{
            mt: 1,
            p: 3,
            display: "flex",
            gap: 5,
            justifyContent: "space-between",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mr: -9 }}
          >
            {/* <label style={{ marginRight: "0px" }}>Profile Photo</label> */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: 2,
                gap: 2,
              }}
            >
              <image
                src=""
                alt="Upload Profile Photo"
                style={{
                  width: 100,
                  height: 100,
                  border: "1px solid #ccc",
                  borderRadius: "10%",
                }}
              />
              <input type="file" />
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <label style={{ fontSize: "14px" }}>Employee Code</label>
            <TextField
              onChange={handleChange}
              name="Employee_Code"
              value={form.Employee_Code}
              placeholder="Enter Employee Code"
              id="outlined-basic"
              label=""
              variant="outlined"
              size="small"
              type="text"
              sx={{
                ml: 0,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ccc", // default border color
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
          <Box display="flex" justifyContent="center" alignItems="center">
            <label style={{ fontSize: "14px" }}>Employee Name</label>
            <TextField
              onChange={handleChange}
              name="Employee_Name"
              value={form.Employee_Name}
              placeholder="Enter Employee Name"
              id="outlined-basic"
              label=""
              variant="outlined"
              size="small"
              type="text"
              sx={{
                ml: 0,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ccc", // default border color
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
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Company Name</label>
            <select
              style={{ padding: "10px 14px", fontSize: "14px", color: "grey" }}
              onChange={handleChange}
              value={form.Company_Name}
              name="Company_Name"
            >
              {/* <option value="">Select Company</option> */}

              <option value="1">Beehive Software Pvt Ltd</option>
              <option value="2">Spine Technologies Pvt Ltd</option>
            </select>
          </Box>
        </Box>
        <Divider />
        {/* Fourth Row */}
        <Box
          sx={{
            mt: 0,
            p: 3,
            display: "flex",
            // flexDirection: "column",
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Birth Date</label>
            <TextField
              name="Birth_Date"
              onChange={handleChange}
              value={form.Birth_Date}
              type="date"
              size="small"
            ></TextField>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Joining Date</label>

            <TextField
              name="Joining_Date"
              onChange={handleChange}
              value={form.Joining_Date}
              type="date"
              size="small"
            ></TextField>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Confirmation Date</label>
            <TextField
              onChange={handleChange}
              name="Confirmation_Date"
              value={form.Confirmation_Date}
              type="date"
              size="small"
            />{" "}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Probation Month</label>
            <TextField
              name="Probation_Month"
              onChange={handleChange}
              value={form.Probation_Month}
              sx={{ width: "100px" }}
              placeholder="0"
              type="number"
              size="small"
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
            mt: 12,
          }}
        >
          <Button
            type="submit"
            onChange={handleSubmit}
            className="btn-empsave"
            sx={{ px: 3, py: 1, bgcolor: "#111827", color: "white" }}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddEmployee;
