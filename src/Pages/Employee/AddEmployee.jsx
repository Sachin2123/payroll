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
    { name: "Statutory", path: "/statutory" },
    { name: "Contact", path: "/contact" },
    { name: "Document", path: "/document" },
    { name: "Nominee", path: "/nominee" },
    { name: "Asset", path: "/asset" },
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
              <img
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
        {/* <Box
          sx={{
            mt: 0,
            p: 3,
            display: "flex",
            gap: 5,
            justifyContent: "space-between",
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
        </Box> */}
        <Divider />
        {/* Third Row */}
        {/* <Box
          sx={{
            mt: 0,
            p: 3,
            display: "flex",
            gap: 5,
            justifyContent: "space-between",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Unit</label>
            <select
              style={{
                padding: "10px 14px",
                // marginLeft: "10px",
                fontSize: "14px",
                color: "grey",
              }}
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
        </Box> */}
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
            <TextField type="date" size="small"></TextField>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Joining Date</label>

            <TextField type="date" size="small"></TextField>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Confirmation Date</label>
            <TextField type="date" size="small" />{" "}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Probation Month</label>
            <TextField
              sx={{ width: "100px" }}
              placeholder="0"
              type="number"
              size="small"
            />{" "}
          </Box>
        </Box>
        <Divider />
        {/* Fifth Row */}
        {/* <Box
          sx={{
            mt: 0,
            p: 3,
            display: "flex",
            gap: 5,
            justifyContent: "space-between",
          }}
        > */}
        {/* <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}> Employee Type</label>
            <select
              style={{
                padding: "10px 14px",
                fontSize: "14px",
                color: "grey",
                width: "200px",
              }}
              onChange={(e) => {
                handlechange(e);
              }}
            >
              <option value="1">Rest</option>
              <option value="0">Contract</option>
            </select>
          </Box> */}
        {/* 
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Employee Remark</label>
            <TextField
              placeholder="Enter Employee Remark"
              size="small"
            ></TextField>
          </Box> */}
        {/* Bank */}
        {/* <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Bank</label>
            <select
              style={{
                padding: "10px 14px",
                fontSize: "14px",
                color: "grey",
                width: "200px",
              }}
              onChange={(e) => {
                handlechange(e);
              }}
            >
              <option value="0">State Bank of India</option>
              <option value="1">ICICI</option>
            </select>{" "}
          </Box> */}
        {/* </Box> */}
        <Divider />
        {/* STATUTORY */}
        {/* <Box
          sx={{
            p: 2,
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "grey",
          }}
        >
          Statutory
        </Box> */}
        <Divider />
        {/* PF Row */}
        {/* <Box
          sx={{
            mt: 0,
            p: 3,
            display: "flex",
            gap: 5,
            justifyContent: "space-between",
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}> PF Applicable</label>
            <select
              style={{
                padding: "10px 14px",
                fontSize: "14px",
                color: "grey",
                width: "150px",
              }}
              onChange={(e) => {
                handlechange(e);
              }}
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
            sx={{ mr: 6 }}
          >
            <label style={{ fontSize: "14px" }}>PF Number</label>
            <TextField
              placeholder="Enter PF Number"
              size="small"
              limit={10}
            ></TextField>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>PF Join Date</label>
            <TextField type="date" size="small" />{" "}
          </Box>
        </Box> */}
        {/* <Divider /> */}
        {/* ESIC Row */}
        {/* <Box
          sx={{
            mt: 0,
            p: 3,
            display: "flex",
            gap: 5,
            justifyContent: "space-between",
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}> ESIC Applicable</label>
            <select
              style={{
                padding: "10px 14px",
                fontSize: "14px",
                color: "grey",
                width: "150px",
              }}
              onChange={(e) => {
                handlechange(e);
              }}
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>ESIC Number</label>
            <TextField
              placeholder="Enter ESIC Number"
              size="small"
              limit={10}
            ></TextField>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>ESIC Remarks</label>
            <select
              style={{
                padding: "10px 14px",
                fontSize: "14px",
                color: "grey",
                width: "230px",
              }}
              onChange={(e) => {
                handlechange(e);
              }}
            >
              <option value="0">0 - Without Reason</option>
              <option value="1">1 - On Leave</option>
              <option value="2">2 - Left Service</option>
              <option value="3">3 - Retired</option>
              <option value="4">4 - Out of Coverage</option>
              <option value="5">5 - Expired</option>
              <option value="6">6 - Not Implementaed Area</option>
              <option value="7">7 - Compliances by Immediate Employer</option>
              <option value="8">8 - Suspension of work</option>
              <option value="9">9 - Strike/ Lockout</option>
              <option value="10">10 - Retrenchment</option>
              <option value="11">11 - No Work</option>
            </select>
          </Box>
        </Box> */}
        {/* <Divider /> */}
        {/* PT Details */}
        {/* <Box
          sx={{
            mt: 0,
            p: 3,
            display: "flex",
            gap: 5,
            justifyContent: "space-between",
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}> PT Applicable</label>
            <select
              style={{
                padding: "10px 14px",
                fontSize: "14px",
                color: "grey",
                width: "150px",
              }}
              onChange={(e) => {
                handlechange(e);
              }}
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>{" "}
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>PT Number</label>
            <TextField placeholder="Enter PT Number" size="small"></TextField>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>PT Remark</label>
            <TextField placeholder="Enter Remark" size="small"></TextField>
          </Box>
        </Box> */}
        {/* <Divider /> */}
        {/* UAN/PAN Details */}
        {/* <Box
          sx={{
            mt: 0,
            p: 3,
            display: "flex",
            gap: 5,
            justifyContent: "space-between",
            // flexWrap: "wrap",
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}> PAN Number</label>
            <TextField placeholder="Enter Pan Number" size="small"></TextField>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Aadhar Number</label>
            <TextField
              placeholder="Enter Aadhar Number"
              size="small"
            ></TextField>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>UAN Number</label>
            <TextField placeholder="Enter UAN Number" size="small"></TextField>
          </Box>
        </Box> */}
        {/* <Divider /> */}
        {/* Bank Details */}
        {/* <Box
          sx={{
            mt: 0,
            p: 3,
            display: "flex",
            gap: 5,
            justifyContent: "space-between",
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}> Bank</label>
            <select
              style={{
                padding: "10px 14px",
                fontSize: "14px",
                color: "grey",
                width: "200px",
              }}
              onChange={(e) => {
                handlechange(e);
              }}
            >
              <option value="0">SBI</option>
              <option value="1">ICICI</option>
              <option value="2">HDFC</option>
            </select>{" "}
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>A/C No. 1</label>
            <TextField
              placeholder="Enter A/C No. 1 Number"
              size="small"
            ></TextField>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>A/C No. 2</label>
            <TextField
              placeholder="Enter A/C No. 2 Number"
              size="small"
            ></TextField>
          </Box>
        </Box> */}
        {/* Save Button */}
        <Box
          sx={{
            mt: 0,
            p: 1.5,
            display: "flex",
            gap: 5,
            justifyContent: "center",
            mt: 12,
          }}
        >
          <Button
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
