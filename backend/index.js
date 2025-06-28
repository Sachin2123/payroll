const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const config = {
  user: "sa",
  password: "Sachin@123",
  server: "localhost",
  database: "payroll",
  options: {
    trustServerCertificate: true,
  },
};

app.get("/", async (req, res) => {
  try {
    await sql.connect(config);
    res.send("✅ Connected to SQL Server successfully");
  } catch (err) {
    console.error("❌ SQL Connection Error:", err);
    res.status(500).send("❌ Connection failed: " + err.message);
  }
});

// Add Employee Master

app.post("/api/addemployee", async (req, res) => {
  const {
    Employee_Code,
    Employee_Name,
    Birth_Date,
    Confirmation_Date,
    Probation_Month,
    Company_Name,
    Joining_Date,
  } = req.body;

  // console.log("Company_Name:- ", Company_Name);
  // console.log("req.body:- ", req.body);
  try {
    await sql.connect(config);

    const Created_By = 1;
    const Created_Time = new Date();

    const result = await sql.query`INSERT INTO EMPLOYEE
  (Employee_Code,
  Employee_Name,
  Birth_Date,
  Joining_Date,
  Confirmation_Date,
  Probation_Month,
  Created_By,
  Created_Time,
  Company_Name
  )
  VALUES (${Employee_Code},${Employee_Name},
  ${Birth_Date},${Joining_Date},${Confirmation_Date},
  ${Probation_Month},
  ${Created_By},${Created_Time},${Company_Name})`;

    res.json({ message: "Success" });
  } catch (err) {
    console.error(err.message);
    res.json({ message: "Error in inserting data" });
  }
});

app.get("/api/employeedetails", async (req, res) => {
  try {
    sql.connect(config);

    const result = await sql.query`select * from employee`;
    console.log("Employee Master Details :- ", result.recordset);

    res.json(result.recordset);
  } catch (err) {
    console.error("Error while fetching Employee Master Details");
    res.json("Error while fetching Employee Master Details");
  }
});

// Get Employee Master Details
app.get("/api/employeemaster", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM EMPLOYEE`;
    res.json(result);
    console.log("result:- ", result.recordsets);
  } catch (err) {
    res.send("Error while fetching employee master details", err.message);
  }
});

app.listen(5000, () => {
  console.log("Server is running on 5000");
});
