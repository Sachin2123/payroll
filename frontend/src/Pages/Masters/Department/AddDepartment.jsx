import Paper from "@mui/material/Paper";
import { Box, Typography, TextField, Divider, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";

const AddDepartment = () => {
  const [error, setError] = useState();
  const [form, setForm] = useState({
    Department: "",
    Created_By: "",
    Created_Time: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // console.log("form data :-", JSON.stringify(form));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form.Department_Name);
    // console.log("Department :-", JSON.stringify(form));

    if (!form.Department_Name || form.Department_Name.trim() === "") {
      setError("Department is required");
      // alert(error);
      return;
    }
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/adddepartment", {
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
          navigate("/departmentdetails");
        }, 300);
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
            Add Department{" "}
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
          component="form"
          sx={{
            mt: 8,
            p: 3,
            display: "flex",
            gap: 5,
            justifyContent: "center",
            alignItems: "center",
            mb: 8,
          }}
        >
          {/* Create Department Name */}
          <label style={{ fontSize: "14px", mr: 12 }}>Department Name</label>
          <TextField
            required
            onChange={handleChange}
            name="Department_Name"
            value={form.Department_Name}
            placeholder="Enter Department Name"
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
          {error ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                color: "red",
                // mb: 5,
              }}
            >
              {error}
            </Box>
          ) : (
            ""
          )}
        </Box>
        <Divider />
        {/* Save Button */}
        <Box
          sx={{
            p: 1.5,
            display: "flex",
            gap: 5,
            justifyContent: "center",
            mt: 10,
          }}
        >
          <Button
            type="submit"
            onChange={handleSubmit}
            className="btn-empsave"
            sx={{ px: 3, py: 1, bgcolor: "#111827", color: "white" }}
          >
            Create Department
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddDepartment;
