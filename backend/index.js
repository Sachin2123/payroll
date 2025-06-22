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
  server: "192.168.0.103",
  database: "payroll",
  options: {
    trustServerCertificate: true,
  },
};

app.get("/", async (req, res) => {
  try {
    await sql.connect(config);
    res.send("Server connected successfully");
  } catch (err) {
    res.send("Connection Failed", err.msg);
  }
});

app.listen(5000, () => {
  console.log("Server is running on 5000");
});
