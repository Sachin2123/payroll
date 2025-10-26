const express = require("express");
const dbconfig = require("./Config/dbconfig");
const sql = require("mssql");
const cors = require("cors");
const bodyParser = require("body-parser");
const swagger = require("./swagger/swagger");

const app = express();
swagger(app);

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
    const result = await sql.query`SELECT * FROM EmployeeMasterDetails_View`;

    res.json(result.recordset);
  } catch (err) {
    console.error("Error while fetching Company Master Details");
    res.json("Error while fetching Employee Master Details");
  }
});

// Get Withdrawal Type for Withdrawal
app.get("/api/withdrawal-type", async (req, res) => {
  await sql.connect(config);

  try {
    const result = await sql.query`SELECT * FROM Withdrawal_Type_View`;
    // console.log("result.recordset:- ", result.recordset);
    return res.json(result.recordset);
  } catch (err) {
    return res.json({ message: "Error in fething Withdrawal_Type", err });
  }
});

/** Fetch Reaon for adding withdrawal API Documentation
 * @swagger
 * /api/Reason:
 *   get:
 *     summary: Fetch reason
 *     description: Will fetch the reasons while adding new employee withdrawal record (resignation/notice/exit/e-separation) to the database.
 *
 *
 *
 *     responses:
 *       200:
 *         description: Reasons fetched successfully !
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reasons fetched successfully !"
 *                 statusText:
 *                   type: string
 *                   example: "OK"
 *       400:
 *         description: Error in fetching reasons
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error in fetching reasons"
 *                 statusText:
 *                   type: string
 *                   example: "!OK"
 */

// Get reason for withdrawal
app.get("/api/Reason", async (req, res) => {
  await sql.connect(config);

  try {
    const result = await sql.query`SELECT * FROM Reason_View`;
    return res.json(result.recordset);
  } catch (err) {
    return res.json({ message: "Error in fetching Reason", err });
  }
});

// Get process Type for Withdrawal Entry
app.get("/api/process-type", async (req, res) => {
  await sql.connect(config);

  try {
    const result = await sql.query`SELECT * FROM ProcessType_View`;
    return res.json(result.recordset);
  } catch (err) {
    return res.json({ message: "Error in fetching ProcessType", err });
  }
});

/** AddWithdrawal API Documentation
 * @swagger
 * /api/addwithdrawal:
 *   post:
 *     summary: Add a new withdrawal request
 *     description: Adds a new employee withdrawal record (resignation/notice/exit/e-separation) to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Employee_ID:
 *                 type: integer
 *                 example: 27
 *               Resignation_Date:
 *                 type: string
 *                 format: date
 *                 example: "2025-10-01"
 *               Last_Working_Date:
 *                 type: string
 *                 format: date
 *                 example: "2025-10-31"
 *               Notice_Period_Days:
 *                 type: FLOAT
 *                 example: 30
 *               Withdrawal_Type_Name:
 *                 type: string
 *                 example: "Resignation"
 *               ProcessType:
 *                 type: string
 *                 example: "Process Salary"
 *               Reason:
 *                 type: string
 *                 example: "Better Opportunity"
 *               Remark:
 *                 type: string
 *                 example: "Handled by HR"
 *     responses:
 *       200:
 *         description: Withdrawal added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Withdrawal added successfully"
 *                 statusText:
 *                   type: string
 *                   example: "OK"
 *       400:
 *         description: Error in adding Withdrawal Entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error in adding Withdrawal Entry"
 *                 statusText:
 *                   type: string
 *                   example: "!OK"
 */

app.post("/api/addwithdrawal", async (req, res) => {
  console.log("req.body:- ", req.body);

  const {
    Employee_ID,
    Resignation_Date,
    Last_Working_Date,
    Notice_Period_Days,
    Withdrawal_Type_Name,
    ProcessType,
    Reason,
    Remark,
  } = req.body;

  const Created_By = 1;
  const Created_Time = new Date();

  await sql.connect(config);

  try {
    // const result = await sql.query`

    // EXEC Proc_AddWithdrawal
    // ${Employee_ID}, ${Resignation_Date}, ${Last_Working_Date},
    // ${Notice_Period_Days}, ${Withdrawal_Type_Name},
    // ${ProcessType}, ${Reason}, ${Remark}, ${Created_By}, ${Created_Time}
    // `;

    const result = await sql.query`
    IF EXISTS (SELECT 1 FROM ADDWITHDRAWAL WHERE Employee_ID =  ${Employee_ID})
    BEGIN
    THROW 50001,'Cannot insert duplicate entry',1
    END
    ELSE 
    BEGIN
    
    INSERT INTO AddWithdrawal 
(Employee_ID,Resignation_Date,Last_Working_Date,Notice_Period_Days,Withdrawal_Type_Name,ProcessType,Reason,Remark,Created_By,Created_Time)
VALUES
(${Employee_ID},
${Resignation_Date},
${Last_Working_Date},
${Notice_Period_Days},
${Withdrawal_Type_Name},
${ProcessType},
${Reason},
${Remark},
${Created_By},
${Created_Time})
END

`;
    return res.json({
      message: "Withdrawal added successfully",
      statusText: "OK",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: err.message || "Error in adding Withdrawal Entry",
      statusText: "!OK",
    });
  }
});

// Add Company
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
    const result = await sql.query`SELECT * FROM Company_View`;
    res.json(result.recordset);
    // console.log("result:- ", result.recordsets);
  } catch (err) {
    res.send("Error while fetching company master details", err.message);
  }
});

// Branch Add
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

// Branch Details
app.get("/api/branchdetails", async (req, res) => {
  await sql.connect(config);

  try {
    const result = await sql.query`SELECT * FROM Branch_View`;

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
    const result = await sql.query`SELECT * FROM Department_View`;
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
    const result = await sql.query`SELECT * FROM Grade_View`;

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
    const result = await sql.query`SELECT * FROM Designation_View`;

    res.json(result.recordset);
  } catch (err) {
    res.json({ err });
  }
});

// Add Auto Salary Structure
app.post("/api/add-salary-structure", async (req, res) => {
  await sql.connect(config);

  const Created_By = 1;
  const Created_Time = new Date();

  console.log("req.body:- ", req.body);
  // console.log("req.body.length:- ", req.body.length);

  // Created This function to achieve repetative Structure_ID
  const RepatativeStructure_ID =
    await sql.query`SELECT ISNULL(MAX(Structure_ID),0)+1 as NewID from SALARYSTRUCTURE`;
  const Structure_ID = RepatativeStructure_ID.recordset[0].NewID;
  // console.log("Structure_ID:- ", RepatativeStructure_ID.recordset[0].NewID);

  try {
    for (let i = 0; i < req.body.length; i++) {
      const { Employee_ID, Effective_From, Payhead_ID, Amount } = req.body[i];
      // console.log("Inserting Row Data:- ", req.body[i]);
      const result =
        await sql.query`EXEC Proc_AddSalaryStructure ${Structure_ID},
    ${Employee_ID},${Effective_From},${Payhead_ID},${Amount},${Created_By},${Created_Time}`;
    }
    console.log("Salary Structure inserted successfully");
    res.send({ message: "Salary Structure inserted successfully" });
  } catch (err) {
    // console.log("Error in inserting salary structure");
    res.send({ message: "Error in inserting salary structure", err });
  }
});

// Salary Structure Details
app.get("/api/salary-structure-details", async (req, res) => {
  await sql.connect(config);

  try {
    // const result = await sql.query`Proc_SalaryStructureDetails`;

    const result = await sql.query`EXEC Proc_SalaryStructureDetails`;
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

  // console.log("Payhead_Type:- ", req.body);

  await sql.connect(config);
  Created_Time = new Date();
  Created_By = 1;

  try {
    const result = await sql.query`EXEC Proc_AddPayheads    
   ${Payhead_Code},
   ${Payhead_Name},
   ${Payhead_Type},
   ${Created_Time},
   ${Created_By},
   ${IS_PF},
   ${IS_ESIC},
   ${IS_PT},
   ${IS_Attendance},
   ${Payhead_Formula},
   ${Company_ID},
   ${Grade_ID},
   ${IS_Formula_Type}`;

    res.send({ message: "Payhead created successfully" });
  } catch (err) {
    // console.log("Add Payhead :- ", err);
    res.send({ message: "Error in payhead creation", err });
  }
});

// Payhead Details will Fetch on the screen of created payheads
app.get("/api/payheaddetails", async (req, res) => {
  await sql.connect(config);

  try {
    const result =
      await sql.query`select * from Payheads order by payhead_id asc
`;
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
    // const result =
    //   await sql.query`  SELECT  G.Grade_ID, G.Grade_Name,C.Company_Name, C.Company_ID, P.Payhead_Code, P.Payhead_Name, P.Payhead_Type,
    //   P.IS_PF, P.IS_ESIC, P.IS_PT, P.IS_Attendance, P.Payhead_Formula, P.IS_Formula_Type
    //   FROM Payheads AS P inner JOIN Grade G ON G.Grade_ID = P.Grade_ID
    //   inner JOIN Company C ON C.Company_ID = P.Company_ID where P.Payhead_ID = ${id}`;

    const result = await sql.query`EXEC Proc_FetchPayhead ${Payhead_ID}`;
    // console.log("Backend result:- ", result.recordset);
    res.json(result.recordset);
  } catch (err) {
    res.json({ message: "Error in fetching payheads" });
  }
});

// Edit Payhead
app.put("/api/edit-payheaddetails/:Payhead_ID", async (req, res) => {
  const {
    Payhead_Code,
    Payhead_Name,
    Payhead_Type,
    Payhead_Formula,
    Company_ID,
    Grade_ID,
    IS_PF,
    IS_ESIC,
    IS_PT,
    IS_Formula_Type,
    IS_Attendance,
  } = req.body;
  // console.log(req.body);
  const { Payhead_ID } = req.params;
  const Created_By = 1;
  const Created_Time = new Date();
  // console.log("edit-payheaddetails:- ", Payhead_ID);
  await sql.connect(config);

  try {
    // const result =
    //   await sql.query`UPDATE PAYHEADS SET Payhead_Name = ${Payhead_Name}, Payhead_Type = ${Payhead_Type}, Payhead_Formula = ${Payhead_Formula},
    // Company_ID = ${Company_ID}, Grade_ID = ${Grade_ID}, IS_PF = ${IS_PF}, IS_ESIC = ${IS_ESIC}, IS_PT = ${IS_PT}, IS_Attendance = ${IS_Attendance},
    // IS_Formula_Type = ${IS_Formula_Type},
    // Created_By = ${Created_By}, Created_Time = ${Created_Time} where Payhead_ID = ${Payhead_ID}`;

    const result = await sql.query`EXEC Proc_EditPayhead 
    ${Payhead_Code},
    ${Payhead_Name},
    ${Payhead_Type},
    ${Created_Time},
    ${Created_By},
    ${IS_PF},
    ${IS_ESIC},
    ${IS_PT},
    ${IS_Attendance},
    ${Payhead_Formula},
    ${Company_ID},
    ${Grade_ID},
    ${IS_Formula_Type},
    ${Payhead_ID}`;
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

// Add Monthly Attendance
app.post("/api/add-month-attendance", async (req, res) => {
  const {
    Employee_ID,
    Month,
    Year,
    Tot_Days,
    Weekly_Off,
    Paid_Holiday,
    Absent_Days,
    Days_Paid,
    Present,
  } = req.body;
  const Created_By = 1;
  const Created_Time = new Date();
  await sql.query(config);

  // console.log("req.body:- ", req.body);

  try {
    const result = await sql.query`EXEC Proc_AddMonthlyAttendance
  ${Employee_ID},
  ${Month},
  ${Year},
  ${Tot_Days},
  ${Weekly_Off},
  ${Paid_Holiday},
  ${Absent_Days},
  ${Days_Paid},
  ${Present},
  ${Created_By},
  ${Created_Time}`;
    res.json({
      message: "MonthlyAttendance Added Successfully",
      statusText: "OK",
    });
  } catch (err) {
    console.log("Error in adding monthly attendance:- ", err);
    res.json({
      message: err.message || "Error in adding MonthlyAttendance",
      statusText: "!OK",
    });
  }
});

// Fetch Monthly Attendance
app.get("/api/FetchMonthlyAttendance", async (req, res) => {
  await sql.connect(config);

  try {
    const result = await sql.query`EXEC Proc_FetchMonthlyAttendance`;
    // console.log("result:- ", result.recordset);
    res.json(result.recordset);
  } catch (err) {
    // console.log("Error :-", err);
    res.json({ message: "Error in Fetching Monthly Attendance" });
  }
});

// During Salary Structure define payheads will fetch so that user can define the salary structure as per their requirements
app.get("/api/FetchPayheadsforSalaStructure", async (req, res) => {
  await sql.connect(config);

  try {
    const result = await sql.query`EXEC Proc_FetchPayheadsforSalaStructure`;
    // console.log("/api/FetchPayheadsforSalaStructure:- ", result.recordset);
    res.json(result.recordset);
  } catch (err) {
    res.json("Error while fetching payheads");
  }
});

// Fetch Months
// This Will fetch All the Months with Year in order to add Manual Attendance, Arrear, Variable Pay etc.
app.get("/api/FetchMonths", async (req, res) => {
  await sql.connect(config);

  try {
    const result = await sql.query`EXEC Proc_FetchMonths`;
    // console.log(result.recordset);
    res.json(result.recordset);
  } catch (err) {
    res.json("Error in fetching months");
  }
});

// Fetch only Defined Salary Structure Employees
app.get("/api/Defined-SalaryStructure-Employee", async (req, res) => {
  await sql.connect(config);

  try {
    const result = await sql.query`EXEC SalaryStructureEmployee`;
    // console.log(result.recordset);
    res.json(result.recordset);
  } catch (err) {
    json.send({ message: "Error in fetching Employees" });
  }
});

// Salary Porcess page logic
app.post("/api/process-Salary", async (req, res) => {
  await sql.connect(config);
  const { Employee_ID, Month } = req.body;
  const { Month: monthNumber, Year } = JSON.parse(Month);
  const Created_By = 1;
  const Created_Time = new Date();

  // console.log("req.body:- ", req.body);

  try {
    const result =
      await sql.query`EXEC Proc_MonthlySalaryCalculate ${Employee_ID}, ${monthNumber}, ${Year}`;
    console.log("Salary Processed Data:- ", result.recordset);
    res.send({ message: "Salary Processed Successfully!", statusText: "OK" });
  } catch (err) {
    console.log("Salary Process Eror:- ", err);
    res.send({
      statusText: "!OK",
      message: err.message || "Error in Salary Process",
    });
  }
});

app.listen(5000, () => {
  console.log("Server is running on 5000");
});
