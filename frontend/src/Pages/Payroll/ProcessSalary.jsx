import Paper from "@mui/material/Paper";
import { Box, Typography, Divider, MenuItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Axios from "../../api/Axios";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { useAPIContext } from "../../Context/APIContext";

const fetchEmployee = async () => {
  try {
    const result = await Axios.get("/Defined-SalaryStructure-Employee");
    // console.log(result);

    return result.data;
  } catch (err) {
    console.log("Error in fetching Employee Master Details");
  }
};

const fetchMonths = async () => {
  try {
    const result = await Axios.get("/fetchMonths");
    // console.log(result);
    return result.data;
  } catch (err) {
    console.log("Error in fetching Months");
  }
};

const ProcessSalary = ({ children }) => {
  const [employee, SelectedEmployee] = useState();
  const [month, SelectedMonth] = useState();
  const [personName, setPersonName] = useState([]);

  const { components } = useAPIContext();
  const { ButtonComponent, DividerComponent } = components;

  const [form, setForm] = useState({
    Employee_ID: [],
    Month: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Clicked");
    try {
      // console.log("handleSubmit: -", form);
      const res = await Axios.post("/process-Salary", form);
      const result = res.data;
      // console.log("result:- ", result);

      if (result.statusText === "OK") {
        Swal.fire({
          icon: "success",
          text: "Salary Processed Successfully!",
          title: "Salary Process",
        });

        setTimeout(() => {
          navigate("");
        }, 200);
      } else if (result.statusText === "!OK") {
        Swal.fire({
          icon: "error",
          text: result.message || "Error in Salary Process",
          title: "Salary Process",
        });
      }
    } catch (err) {
      // alert("Something went wrong. Check console.", err);
      console.log("err:-", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, multiple, selectedOptions } = e.target;

    // ✅ If it's a multiple select (like Employee_ID)
    if (multiple) {
      const selectedValues = Array.from(selectedOptions, (option) =>
        isNaN(option.value) ? option.value : Number(option.value)
      );

      setForm((prev) => ({
        ...prev,
        [name]: selectedValues,
      }));

      if (name === "Employee_ID") {
        SelectedEmployee(selectedValues); // Optional callback
      }
    }
    // ✅ For normal single select or input field
    else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (name === "Month") {
        SelectedMonth(value); // Optional callback
      }
    }
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

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
        <Box sx={{ display: "flex", p: 2 }}>
          <HomeIcon onClick={() => navigate("/")} />
          <Typography sx={{ ml: 1, fontSize: "18px" }}>
            Process Salary{" "}
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            // mb: 2,
            p: 2,
            backgroundColor: "#111827",
          }}
        >
          <Typography
            sx={{
              color: "#555",
              fontWeight: 500,
              fontSize: "1rem",
              backgroundColor: "#FFF8E1",
              borderLeft: "4px solid red",
              borderRight: "4px solid red",
              padding: "8px 12px",
              borderRadius: "8px",
              display: "inline-block",
            }}
          >
            <strong>Note:</strong> Only employees with a defined salary
            structure will be displayed.
          </Typography>
        </Box>
        <DividerComponent />
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
          {/* Select Employee*/}
          <Box sx={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                gap: 7,
                flexDirection: "column",
              }}
            >
              <Typography>Select Employee </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 5,
                flexDirection: "column",
              }}
            >
              {/* Select Employee */}
              {/* <select
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
                        {val.Employee_Name} - ({val.Employee_Code})
                      </option>
                    ))
                  : ""}
              </select> */}
              <Select
                sx={{
                  minWidth: "150%",
                  height: "40px",
                  fontSize: "15px",
                  padding: "10px 15px",
                  borderRadius: "2px",
                  // backgroundColor: "#f8f9fa",
                }}
                multiple
                name="Employee_ID"
                value={form.Employee_ID}
                onChange={handleChange}
                // renderValue={(selected) =>
                //   selected
                //     .map(
                //       (id) =>
                //         data?.Employees?.find((emp) => emp.Employee_ID === id)
                //           ?.Employee_Name
                //     )
                //     .join(", ")
                // }
              >
                {data?.Employees?.map((emp) => (
                  <MenuItem key={emp.Employee_ID} value={emp.Employee_ID}>
                    <Checkbox
                      checked={form.Employee_ID.includes(emp.Employee_ID)}
                    />
                    <ListItemText
                      primary={`${emp.Employee_Name} (${emp.Employee_Code})`}
                    />
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
          {/* Second Column */}
          {/* Month*/}
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
                        key={index}
                        name="Month"
                        // value={val.Month}
                        value={[
                          JSON.stringify({
                            Month: val.Month,
                            Year: val.Year,
                          }),
                        ]}
                      >
                        {val.MonthYear}
                        {/* {val.Month} - {val.Year} */}
                      </option>
                    ))
                  : ""}
              </select>
            </Box>
          </Box>
        </Box>
        <DividerComponent sx={{ mt: 5 }} />
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
          {/* <Button
            // type="submit"
            // onChange={handleSubmit}
            className="btn-empsave"
            sx={{ px: 3, py: 1, bgcolor: "#111827", color: "white" }}
          >
            Process
          </Button> */}

          <ButtonComponent
            type="submit"
            onChange={handleSubmit}
            sx={{ px: 3, py: 1 }}
          >
            Process
          </ButtonComponent>
        </Box>
        {employee} - {month}
      </Paper>
    </Box>
  );
};

export default ProcessSalary;
