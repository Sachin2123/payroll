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
    // console.error("❌ SQL Connection Error:", err);
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
    Grade,
    Branch,
    Designation,
    Department,
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
  Company_Name,
  Grade,
  Department,
  Designation,
  Branch
  )
  VALUES (${Employee_Code},${Employee_Name},
  ${Birth_Date},${Joining_Date},${Confirmation_Date},
  ${Probation_Month},
  ${Created_By},${Created_Time},${Company_Name},${Grade},${Department},${Designation},${Branch})`;

    res.json({ message: "Success" });
  } catch (err) {
    // console.error(err.message);
    res.json({ message: "Error in inserting data" });
  }
});

// Get EMPLOYEE Master Details

app.get("/api/employeedetails", async (req, res) => {
  try {
    sql.connect(config);

    const result = await sql.query`SELECT 
  e.Employee_Code,
  e.Employee_ID,
  e.Employee_Name,
  e.Joining_Date,
  e.Birth_Date,
  e.Department,
  e.Grade,
  e.Confirmation_Date,
  e.Branch,
  c.Company_Name
FROM 
  Employee e
JOIN 
  Company c ON e.Company_Name = c.Company_id;`;
    // console.log("Company Master Details :- ", result.recordset);

    res.json(result.recordset);
  } catch (err) {
    // console.error("Error while fetching Company Master Details");
    res.json("Error while fetching Company Master Details");
  }
});

app.post("/api/addcompany", async (req, res) => {
  const { Company_Name } = req.body;
  // console.log("Company_Name:- ", Company_Name);

  try {
    await sql.connect(config);
    const Created_By = 1;
    const Created_Time = new Date();

    const result = await sql.query`INSERT INTO COMPANY (
    Company_Name, Created_By, Created_Time
    ) values (${Company_Name}, ${Created_By}, ${Created_Time})`;

    res.json({ message: "Company Created Successfully" });
  } catch (err) {
    res.json({ err: "Error in inserting Company data" });
  }
});

// Get COMPANY Master Details
app.get("/api/companydetails", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM COMPANY`;
    res.json(result.recordset);
    // console.log("result:- ", result.recordsets);
  } catch (err) {
    res.send("Error while fetching employee master details", err.message);
  }
});

app.post("/api/addbranch", async (req, res) => {
  const { Branch_Name } = req.body;
  console.log(Branch_Name);
  const Created_By = 1;
  const Created_Time = new Date();

  try {
    await sql.connect(config);
    const result = await sql.query`INSERT INTO BRANCH 
  (Branch_Name, Created_By, Created_Time)
  values (${Branch_Name}, ${Created_By}, ${Created_Time})`;

    res.json({ message: "Branch added successfully" });
  } catch (err) {
    // console.log(err);
    res.send("Error in inserting Branch detail.");
  }
});

app.get("/api/branchdetails", async (req, res) => {
  await sql.connect(config);

  try {
    const result = await sql.query`SELECT * FROM BRANCH`;

    res.json(result.recordset);
  } catch (err) {
    res.json({ message: "Error in fetching Branch Master" });
  }
});

// Department Add
app.post("/api/adddepartment", async (req, res) => {
  await sql.connect(config);
  const { Department_Name } = req.body;
  const Created_By = 1;
  const Created_Time = new Date();
  try {
    const result =
      await sql.query`INSERT INTO DEPARTMENT(Department_Name, Created_By,Created_Time) values(${Department_Name}, ${Created_By}, ${Created_Time})`;

    res.json({ message: "Department Added successfully" });
  } catch (err) {
    res.send("Error in inserting Department Name");
  }
});

// Department Detail

app.get("/api/departmentdetails", async (req, res) => {
  await sql.connect(config);

  try {
    const result = await sql.query`SELECT * FROM DEPARTMENT`;
    // console.log(result);
    res.json(result.recordset);
  } catch (err) {
    res.send("Error in fetching Department Master");
  }
});

app.post("/api/addgrade", async (req, res) => {
  await sql.connect(config);
  const { Grade_Name } = req.body;
  const Created_By = 1;
  const Created_Time = new Date();

  try {
    const result =
      await sql.query`INSERT INTO GRADE (Grade_Name, Created_By, Created_Time) 
    VALUES (${Grade_Name}, ${Created_By}, ${Created_Time})`;

    res.json({ message: "Grade Master Created Successfully" });
  } catch (err) {
    res.json({ message: "Error in inserting Grade Master" });
  }
});

app.get("/api/gradedetails", async (req, res) => {
  await sql.connect(config);

  try {
    const result = await sql.query`SELECT * FROM GRADE`;

    res.send(result.recordset);
  } catch (err) {
    res.send({ message: "Error in fetching Grade Master" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on 5000");
});
