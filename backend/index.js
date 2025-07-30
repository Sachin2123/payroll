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
    console.error(err.message);
    res.json({ message: "Error in inserting data" });
  }
});

// Get EMPLOYEE Master Details

app.get("/api/employeedetails", async (req, res) => {
  try {
    await sql.connect(config);

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

    // const result = await sql.query`select e.Employee_Code, e.Employee_ID, e.Employee_Name, e.Joining_Date, e.Department, e.Grade, e.Confirmation_Date,
    // e.Branch, e.Company_Name from employee as e inner join company as c on `;
    // console.log("Employee Master Details :- ", result.recordset);

    res.json(result.recordset);
  } catch (err) {
    console.error("Error while fetching Company Master Details");
    res.json("Error while fetching Employee Master Details");
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

  if (Branch_Name.trim() === "" || !Branch_Name) {
    res.send("Branch Name is required");
  } else {
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

  if (Department_Name.trim() === "" || !Department_Name) {
    res.json("Department is required");
  } else {
    try {
      const result =
        await sql.query`INSERT INTO DEPARTMENT(Department_Name, Created_By,Created_Time) values(${Department_Name}, ${Created_By}, ${Created_Time})`;

      res.json({ message: "Department Added successfully" });
    } catch (err) {
      res.send("Error in inserting Department Name");
    }
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

// Add Grade
app.post("/api/addgrade", async (req, res) => {
  await sql.connect(config);
  const { Grade_Name } = req.body;
  const Created_By = 1;
  const Created_Time = new Date();

  if (Grade_Name.trim() === "" || !Grade_Name) {
    res.json("Grade is required");
  } else {
    try {
      const result =
        await sql.query`INSERT INTO GRADE (Grade_Name, Created_By, Created_Time) 
    VALUES (${Grade_Name}, ${Created_By}, ${Created_Time})`;

      res.json({ message: "Grade Master Created Successfully" });
    } catch (err) {
      res.json({ message: "Error in inserting Grade Master" });
    }
  }
});

// Grade Details
app.get("/api/gradedetails", async (req, res) => {
  await sql.connect(config);

  try {
    const result = await sql.query`SELECT * FROM GRADE`;

    res.send(result.recordset);
  } catch (err) {
    res.send({ message: "Error in fetching Grade Master" });
  }
});

// Add Designation
app.post("/api/adddesignation", async (req, res) => {
  await sql.connect(config);

  const { Designation_Name } = req.body;
  // console.log("Designation_Name:- ", Designation_Name);
  const Created_By = 1;
  const Created_Time = new Date();

  try {
    const result =
      await sql.query`INSERT INTO DESIGNATION (Designation_Name, Created_By,Created_Time) 
    VALUES (${Designation_Name}, ${Created_By}, ${Created_Time}) `;
    res.send({ message: "Designation Created Successfully" });
  } catch (err) {
    res.send({ message: "Error in inserting Designation Master" });
  }
});

// Add Designation
app.get("/api/designationdetails", async (req, res) => {
  await sql.connect(config);

  try {
    const result = await sql.query`SELECT * FROM DESIGNATION`;

    res.json(result.recordset);
  } catch (err) {
    res.json({ err });
  }
});

// Add Salary Structure
app.post("/api/add-salary-structure", async (req, res) => {
  await sql.connect(config);

  const {
    Employee_ID,
    Basic,
    HRA,
    Special_Allowance,
    Conveyance,
    Effective_From,
  } = req.body;
  const Created_By = 1;
  const Created_Time = new Date();

  console.log("req.body:- ", req.body);

  try {
    const result =
      await sql.query`INSERT INTO SALARYSTRUCTURE (Employee_ID,Basic,HRA,Special_Allowance,Conveyance,Effective_From,Created_By,Created_Time)
    values (${Employee_ID},${Basic},${HRA},${Special_Allowance},${Conveyance},${Effective_From},${Created_By},${Created_Time})`;
    res.send({ message: "Salary Structure Created Successfully" });
  } catch (err) {
    res.send({ message: "Error in Salary Structue creation", err });
  }
});

// Salary Structure Details
app.get("/api/salary-structure-details", async (req, res) => {
  await sql.connect(config);

  try {
    const result =
      await sql.query`Select e.Employee_Code, e.Employee_ID, e.Employee_Name, S.Basic, S.HRA, S.Conveyance, S.Special_Allowance, S.Effective_From, S.Created_By, S.Created_Time from employee as e 
      Inner Join SalaryStructure as s on s.Employee_ID = e.Employee_ID
`;
    // console.log(result.recordset);
    res.json(result.recordset);
  } catch (err) {
    res.json({ message: "Error in fetching Salary Structure Details" });
  }
});

// Add Payhead
app.post("/api/addpayheads", async (req, res) => {
  const {
    Payhead_Code,
    Payhead_Name,
    Payhead_Formula,
    Payhead_Type,
    Company_ID,
    Grade_ID,
    IS_PF,
    IS_ESIC,
    IS_PT,
    IS_Attendance,
    IS_Formula_Type,
  } = req.body;

  // console.log("", req.body);

  await sql.connect(config);
  Created_Time = new Date();
  Created_By = 1;

  try {
    const result =
      await sql.query`INSERT INTO PAYHEADS (Payhead_Code, Payhead_Name, Payhead_Formula, Payhead_Type, Created_Time, Created_By, 
      Company_ID, Grade_ID, IS_PF, IS_ESIC, IS_PT, IS_Attendance)
      VALUES (${Payhead_Code}, ${Payhead_Name}, ${Payhead_Formula},${Payhead_Type}, ${Created_Time}, ${Created_By}, ${Company_ID},
      ${Grade_ID}, ${IS_PF}, ${IS_ESIC}, ${IS_PT}, ${IS_Attendance}, ${IS_Formula_Type})`;

    res.send({ message: "Payhead created successfully" });
  } catch (err) {
    res.send({ message: "Error in payhead creation", err });
  }
});

// Payhead Details Fetch
app.get("/api/payheaddetails", async (req, res) => {
  await sql.connect(config);

  try {
    const result = await sql.query`select * from Payheads`;
    // console.log(result);
    res.json(result.recordset);
  } catch (err) {
    res.json("Error in fetching payhead details");
  }
});

app.get("/api/payheaddetails/:Payhead_ID", async (req, res) => {
  const { Payhead_ID } = req.params;
  const id = Number(Payhead_ID);
  // console.log("Backend Payhead_ID :- ", Payhead_ID);
  await sql.connect(config);
  try {
    const result =
      await sql.query`  SELECT  G.Grade_ID, G.Grade_Name,C.Company_Name, C.Company_ID, P.Payhead_Code, P.Payhead_Name, P.Payhead_Type,
      P.IS_PF, P.IS_ESIC, P.IS_PT, P.IS_Attendance, P.Payhead_Formula
      FROM Payheads AS P inner JOIN Grade G ON G.Grade_ID = P.Grade_ID
      inner JOIN Company C ON C.Company_ID = P.Company_ID where P.Payhead_ID = ${id}`;
    // console.log("Backend result:- ", result.recordset);
    res.json(result.recordset);
  } catch (err) {
    res.json({ message: "Error in fetching payheads" });
  }
});

app.put("/api/edit-payheaddetails/:Payhead_ID", async (req, res) => {
  const {
    Payhead_Name,
    Payhead_Type,
    Payhead_Formula,
    Company_ID,
    Grade_ID,
    IS_PF,
    IS_ESIC,
    IS_PT,
    IS_Attendance,
  } = req.body;
  // console.log(req.body);
  const { Payhead_ID } = req.params;
  const Created_By = 1;
  const Created_Time = new Date();
  // console.log("edit-payheaddetails:- ", Payhead_ID);
  await sql.connect(config);

  try {
    const result =
      await sql.query`UPDATE PAYHEADS SET Payhead_Name = ${Payhead_Name}, Payhead_Type = ${Payhead_Type}, Payhead_Formula = ${Payhead_Formula},
    Company_ID = ${Company_ID}, Grade_ID = ${Grade_ID}, IS_PF = ${IS_PF}, IS_ESIC = ${IS_ESIC}, IS_PT = ${IS_PT}, IS_Attendance = ${IS_Attendance},
    Created_By = ${Created_By}, Created_Time = ${Created_Time} where Payhead_ID = ${Payhead_ID}`;

    res.send({ message: "Payhead Updated Successfully" });
  } catch (err) {
    res.send({ message: "Error in updating Payhead details" });
  }
});

app.get("/api/grade-company", async (req, res) => {
  await sql.connect(config);

  try {
    const Grade = await sql.query`SELECT * FROM GRADE`;
    const Company = await sql.query`SELECT * FROM COMPANY`;
    const Payheads = await sql.query`SELECT * FROM PAYHEADS`;
    res.json({
      Grade: Grade.recordset,
      Company: Company.recordset,
      Payheads: Payheads.recordset,
    });
  } catch (err) {
    res.json({ message: "Error in fetching Grade" });
  }
});

app.post("/api/Exec-Procedure", async (req, res) => {
  await sql.connect(config);
  console.log(req.body);
  const { monthlyCTC, totalWorkingDays, dayspaid } = req.body;
  try {
    const result =
      await sql.query`EXEC OT_Calc ${monthlyCTC}, ${totalWorkingDays}, ${dayspaid}`;
    console.log("result.recordset:- ", result.recordset);
    res.json(result.recordset);
  } catch (err) {
    res.json("Error in executing employeedetails procedure");
  }
});

app.listen(5000, () => {
  console.log("Server is running on 5000");
});
