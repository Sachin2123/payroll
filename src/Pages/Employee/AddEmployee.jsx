import Paper from "@mui/material/Paper";
import { Box, Typography, TextField, Divider, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();

  const handlechange = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
  };

  const tabs = [
    { name: "Basic Information" },
    { name: "Statutory" },
    { name: "Contact" },
    { name: "Document" },
    { name: "Nominee" },
    { name: "Asset" },
  ];
  return (
    <Box sx={{}}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
        <Box sx={{ display: "flex", p: 2 }}>
          <HomeIcon onClick={() => navigate("/")} />
          <Typography sx={{ ml: 1, fontSize: "18px" }}>
            Add Employee{" "}
          </Typography>
        </Box>
        <Box
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
                    // boxShadow: "2px 2px 2px 1px rgba(0, 0, 255, .2)",
                    color: "grey",
                    // background: "red",
                    // padding: "8px 14px",
                  }}
                >
                  {menu.name}
                </Button>
                <label style={{ borderRight: "1px solid grey" }}></label>
              </Box>
            );
          })}{" "}
        </Box>
        <Divider />
        {/* First Row */}
        <Box
          sx={{
            mt: 1,
            p: 3,
            display: "flex",
            gap: 5,
            justifyContent: "center",
          }}
        >
          {/* <Box display="flex" justifyContent="center" alignItems="center">
            <label style={{ marginRight: "0px" }}>Profile Photo</label>
            <Box sx={{ display: "flex", flexDirection: "column", ml: 5 }}>
              <img
                src=""
                alt="Upload Profile Photo"
                style={{
                  width: 100,
                  height: 100,
                  border: "1px solid #ccc",
                  borderRadius: "50%",
                }}
              />
              <input type="file" />
            </Box>
          </Box> */}
          <Box display="flex" justifyContent="center" alignItems="center">
            <label style={{ fontSize: "14px" }}>Employee Code</label>
            <TextField
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
              onChange={(e) => {
                handlechange(e);
              }}
            >
              <option value="">Select Company</option>

              <option value="1">Beehive Software Pvt Ltd</option>
              <option value="2">Spine Technologies Pvt Ltd</option>
            </select>
          </Box>
        </Box>
        <Divider />
        {/* Second Row */}
        <Box
          sx={{
            mt: 0,
            p: 3,
            display: "flex",
            gap: 5,
            justifyContent: "center",
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Grade</label>
            <select
              style={{ padding: "10px 14px", fontSize: "14px", color: "grey" }}
              onChange={(e) => {
                handlechange(e);
              }}
            >
              <option disabled value="">
                Select Grade
              </option>

              <option value="1">I</option>
              <option value="2">II</option>
            </select>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Branch</label>
            <select
              style={{ padding: "10px 14px", fontSize: "14px", color: "grey" }}
              onChange={(e) => {
                handlechange(e);
              }}
            >
              <option disabled value="">
                Select Branch
              </option>

              <option value="1">Mumbai</option>
              <option value="2">Lucknow</option>
            </select>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Department</label>
            <select
              style={{ padding: "10px 14px", fontSize: "14px", color: "grey" }}
              onChange={(e) => {
                handlechange(e);
              }}
            >
              <option disabled value="">
                Select Department
              </option>

              <option value="1">Development</option>
              <option value="2">SQL </option>
            </select>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Designation</label>
            <select
              style={{ padding: "10px 14px", fontSize: "14px", color: "grey" }}
              onChange={(e) => {
                handlechange(e);
              }}
            >
              <option disabled value="">
                Select Designation
              </option>

              <option value="1">Assistant Manager</option>
              <option value="2">Implementation Engineer</option>
            </select>
          </Box>
        </Box>
        <Divider />
        {/* Third Row */}
        <Box
          sx={{
            mt: 0,
            p: 3,
            display: "flex",
            gap: 5,
            justifyContent: "center",
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Unit</label>
            <select
              style={{ padding: "10px 14px", fontSize: "14px", color: "grey" }}
              onChange={(e) => {
                handlechange(e);
              }}
            >
              <option disabled value="">
                Select Unit
              </option>

              <option value="1">I</option>
              <option value="2">II</option>
            </select>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Category</label>
            <select
              style={{ padding: "10px 14px", fontSize: "14px", color: "grey" }}
              onChange={(e) => {
                handlechange(e);
              }}
            >
              <option disabled value="">
                Select Category
              </option>

              <option value="1">Mumbai</option>
              <option value="2">Lucknow</option>
            </select>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Project</label>
            <select
              style={{ padding: "10px 14px", fontSize: "14px", color: "grey" }}
              onChange={(e) => {
                handlechange(e);
              }}
            >
              <option disabled value="">
                Select Project
              </option>

              <option value="1">Development</option>
              <option value="2">SQL </option>
            </select>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Work Location</label>
            <select
              style={{ padding: "10px 14px", fontSize: "14px", color: "grey" }}
              onChange={(e) => {
                handlechange(e);
              }}
            >
              <option disabled value="">
                Select Work Location
              </option>

              <option value="1">Assistant Manager</option>
              <option value="2">Implementation Engineer</option>
            </select>
          </Box>
        </Box>
        <Divider />
      </Paper>
    </Box>
  );
};

export default AddEmployee;
