import Paper from "@mui/material/Paper";
import { Box, Typography, TextField, Divider, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Axios from "../../api/Axios";
import { format } from "date-fns";

const AddWithdrawal = () => {
  const [doj, SetDoj] = useState("");
  const [ConfirmDate, SetConfirmDate] = useState("");

  const [form, setForm] = useState({
    Employee_ID: "",
    Resignation_Date: "",
    Last_Working_Date: "",
    Notice_Period_Days: 0,
    Reason: "",
    ProcessType: "",
    Withdrawal_Type_Name: "",
    Remark: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "Employee_ID") {
      const empId = e.target.value;
      // console.log("Selected Employee ID", e.target.value);

      // This will find the selected employee id in EmpDetails
      const SelectedEmployee = data.EmpDetails.find(
        (item) => item.Employee_ID === parseInt(empId)
      );
      // console.log("SelectedEmployee:- ", SelectedEmployee.Joining_Date);

      // Date_Of_Joining in required date format "yyyy-MM-dd"
      const dojFormatted = format(
        new Date(SelectedEmployee.Joining_Date),
        "yyyy-MM-dd"
      );
      SetDoj(dojFormatted);

      // Confirmation_Date in required date format
      const confirmDateFormatted = format(
        new Date(SelectedEmployee.Confirmation_Date),
        "yyyy-MM-dd"
      );
      SetConfirmDate(confirmDateFormatted);
    }

    const { value, name } = e.target;

    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [name]: value };

      // Auto-calculate notice period if both dates exist
      if (updatedForm.Resignation_Date && updatedForm.Last_Working_Date) {
        const date1 = new Date(updatedForm.Last_Working_Date);
        const date2 = new Date(updatedForm.Resignation_Date);

        if (!isNaN(date1) && !isNaN(date2)) {
          const diffInDays = Math.round(
            (date1 - date2) / (1000 * 60 * 60 * 24) + 1
          );
          updatedForm.Notice_Period_Days = diffInDays;
        }
      }

      return updatedForm;
    });

    // console.log("form data :-", JSON.stringify(form));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form.Company_Name);
    // console.log("form data :-", JSON.stringify(form));

    try {
      const res = await Axios.post("addwithdrawal", JSON.stringify(form));

      const result = await res.data; // Read server response
      // console.log("result.message:- ", result);

      if (result.statusText === "OK") {
        // alert(result.message); // Success message

        Swal.fire({
          title: "Withdrawal",
          text: result.message,
          icon: "success",
        });
        setTimeout(() => {
          navigate("/WithdrawalDetails");
        }, 300);
      } else if (result.statusText === "!OK") {
        Swal.fire({
          title: "Withdrawal",
          text: result.message,
          icon: "error",
        });
      }
    } catch (err) {
      //   console.log("Fetch failed:", err);
      // alert("Something went wrong. Check console.");
      Swal.fire({
        icon: "error",
        text: `Something went wrong check console.`,
        title: "Employee",
      });
    }
  };

  const { data } = useQuery({
    queryKey: ["DropDownData"],
    queryFn: async () => {
      const res1 = await Axios.get("/employeedetails");
      const res2 = await Axios.get("/withdrawal-type");
      const res3 = await Axios.get("/reason");
      const res4 = await Axios.get("/process-type");

      return {
        EmpDetails: res1.data,
        Withdrawal_Type: res2.data,
        Reason: res3.data,
        ProcessType: res4.data,
      };
    },
  });

  // console.log("data:- ", data);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
        <Box sx={{ display: "flex", p: 2 }}>
          <HomeIcon onClick={() => navigate("/")} />
          <Typography sx={{ ml: 1, fontSize: "18px" }}>
            Add Withdrawal{" "}
          </Typography>
        </Box>
        {/* First Row */}
        <Box
          sx={{
            mt: 8,
            p: 3,
            display: "flex",
            // gap: 8,
            justifyContent: "space-between",
          }}
        >
          {/* Select Employee Name  */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <label style={{ fontSize: "14px" }}>Employee Name</label>
            <select
              style={{ padding: "10px 14px", fontSize: "14px", color: "black" }}
              onChange={handleChange}
              value={form.Employee_ID}
              name="Employee_ID"
            >
              <option disabled value="" selected>
                Select Employee
              </option>
              {data?.EmpDetails.map((val, index) => (
                <option key={val.Employee_ID} value={val.Employee_ID}>
                  {val.Employee_ID} ({val.Employee_Code}) - {val.Employee_Name}
                </option>
              ))}
            </select>
          </Box>

          {/* Joining Date */}
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Joining Date</label>

            <TextField
              name="doj"
              onChange={handleChange}
              value={doj}
              type="date"
              size="small"
              disabled
              sx={{
                "& .MuiInputBase-input": {
                  color: "black", // Input text color
                },
                "& .Mui-disabled": {
                  WebkitTextFillColor: "black", // For disabled input text
                },
              }}
            ></TextField>
          </Box>
          {/* Confirmation Date */}
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px", color: "black" }}>
              Confirmation Date
            </label>
            <TextField
              onChange={handleChange}
              name="ConfirmDate"
              value={ConfirmDate}
              type="date"
              size="small"
              disabled
              sx={{
                "& .MuiInputBase-input": {
                  color: "black", // Input text color
                },
                "& .Mui-disabled": {
                  WebkitTextFillColor: "black", // For disabled input text
                },
              }}
            />{" "}
          </Box>
        </Box>
        <Divider />
        {/* second Row */}
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
          {/* Select Resignation Date */}
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Resignation Date</label>
            <TextField
              name="Resignation_Date"
              onChange={handleChange}
              value={form.Resignation_Date}
              type="date"
              size="small"
            ></TextField>
          </Box>

          {/* Select Last Working Date Date */}
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Last Working Date</label>
            <TextField
              name="Last_Working_Date"
              onChange={handleChange}
              value={form.Last_Working_Date}
              type="date"
              size="small"
            ></TextField>
          </Box>
          {/* Notice Period (Days) */}
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Notice Period (Days)</label>
            <TextField
              name="Notice_Period_Days"
              // onChange={handleChange}
              value={form.Notice_Period_Days}
              sx={{ width: "100px", color: "black" }}
              placeholder="0"
              size="small"
              disabled
            />{" "}
          </Box>
        </Box>
        <Divider />
        {/* Third Row */}
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
            <label style={{ fontSize: "14px" }}>Reason</label>
            <select
              name="Reason"
              value={form.Reason}
              style={{ padding: "10px 14px", fontSize: "14px", color: "black" }}
              onChange={handleChange}
            >
              <option disabled value="" selected>
                Select Reason
              </option>
              {data?.Reason.map((val, index) => (
                <option key={val.Reason_ID}>{val.Reason_Name}</option>
              ))}
            </select>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Withdrawal type</label>
            <select
              name="Withdrawal_Type_Name"
              value={form.Withdrawal_Type_Name}
              style={{ padding: "10px 14px", fontSize: "14px", color: "black" }}
              onChange={handleChange}
            >
              <option disabled value="" selected>
                Select Withdrawal Type
              </option>

              {data?.Withdrawal_Type.map((val, index) => (
                <option key={val.Withdrawal_Type_ID}>
                  {val.Withdrawal_Type_Name}
                </option>
              ))}
            </select>
          </Box>

          {/* Select Process Type */}
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <label style={{ fontSize: "14px" }}>Salary Process Type</label>
            <select
              name="ProcessType"
              value={form.ProcessType}
              style={{ padding: "10px 14px", fontSize: "14px", color: "black" }}
              onChange={handleChange}
            >
              <option disabled value="" selected>
                Select Process Type
              </option>

              {data?.ProcessType.map((val, index) => (
                <option key={val.Process_Type_ID}>
                  {val.Process_Type_Name}
                </option>
              ))}
            </select>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            mt: 0,
            p: 3,
            display: "flex",
            // flexDirection: "column",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {/* Remark */}
          <Box
            display="flex"
            flexDirection="flex"
            alignItems="center"
            gap={2}
            width="100%"
          >
            <label style={{ fontSize: "14px" }}>Remark</label>
            <textarea
              name="Remark"
              value={form.Remark || ""}
              onChange={handleChange}
              rows={4}
              cols={50}
              style={{
                resize: "vertical",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "14px",
                outline: "none",
                width: "100%",
              }}
            />
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
            mt: 1.8,
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

export default AddWithdrawal;
