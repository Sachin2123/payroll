import Paper from "@mui/material/Paper";
import { Box, Typography, TextField, Divider, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
// import { useQuery } from "@tanstack/react-query";

const AddCompany = () => {
  const [form, setForm] = useState({
    Company_Name: "",
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
    console.log(form.Company_Name);
    console.log("Company Name :-", JSON.stringify(form));

    try {
      const res = await fetch("http://localhost:5000/api/addcompany", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form), // Convert JS object to JSON string
      });

      const result = await res.json(); // Read server response
      //   console.log("result.message:- ", result.message);

      if (res.ok) {
        // alert(result.message); // Success message

        Swal.fire({
          title: "Company ",
          text: "Added Successfully!",
          icon: "success",
        });
        setTimeout(() => {
          navigate("/companydetails");
        }, 300);
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      //   console.log("Fetch failed:", err);
      // alert("Something went wrong. Check console.");
      Swal.fire({
        title: "Company ",
        text: "Something went wrong. Check console.",
        icon: "error",
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
        <Box sx={{ display: "flex", p: 2 }}>
          <HomeIcon onClick={() => navigate("/")} />
          <Typography sx={{ ml: 1, fontSize: "18px" }}>Add Company </Typography>
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
          {/* Upload Company Logo */}

          {/* <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mr: -9 }}
          >
            <label style={{ marginRight: "0px" }}>Company Logo</label>
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
                alt="Upload Company Logo"
                style={{
                  width: 100,
                  height: 100,
                  border: "1px solid #ccc",
                  borderRadius: "10%",
                }}
              />
              <input type="file" />
            </Box>
          </Box> */}

          {/* Create Company Name */}
          <label style={{ fontSize: "14px", mr: 12 }}>Company Name</label>
          <TextField
            required
            onChange={handleChange}
            name="Company_Name"
            value={form.Company_Name}
            placeholder="Enter Company Name"
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
            Create Company
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddCompany;
