import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { useQuery } from "@tanstack/react-query";

const columns = [
  {
    icons: <EditIcon />,
    field: "Employee_Code",
    headerName: "Employee Code",
    width: 130,
  },
  {
    field: "Employee_Name",
    headerName: "Employee Name",
    width: 130,
  },
  // {
  //   field: "Birth_Date",
  //   headerName: "Birth Date",
  //   width: 130,
  //   // valueGetter: (value, row) => `${value}.format("yyyy-MM-dd")`,
  // },
  // {
  //   field: "Joining_Date",
  //   headerName: "Joining Date",
  //   width: 130,
  // },
  // { field: "firstName", headerName: "First name", width: 130 },
  // { field: "lastName", headerName: "Last name", width: 130 },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  // },
  // {
  //   field: "age",
  //   headerName: "Age",
  //   type: "number",
  //   width: 90,
  // },
  // {
  //   field: "grade",
  //   headerName: "Grade",
  //   type: "string",
  //   width: 130,
  // },
  // {
  //   field: "branch",
  //   headerName: "Branch",
  //   type: "string",
  //   width: 130,
  // },
  // {
  //   field: "desig",
  //   headerName: "Designation",
  //   type: "string",
  //   width: 150,
  // },
  { field: "Company_Name", headerName: "Company Name", width: 130 },
];

// const rows = [
//   {
//     id: "M001",
//     lastName: "Vishwakarma",
//     firstName: "Sachin",
//     age: 23,
//     branch: "Mumbai",
//     grade: "Spine II",
//     desig: "Assitant Manager",
//   },
//   // {
//   //   id: "M002",
//   //   lastName: "Kumar",
//   //   firstName: "Vinay",
//   //   age: 24,
//   //   branch: "Mumbai",
//   //   grade: "Spine II",
//   //   desig: "Python Developer",
//   // },
//   // {
//   //   id: "M003",
//   //   lastName: "Yadav",
//   //   firstName: "Pooja",
//   //   age: 45,
//   //   branch: "Lucknow",
//   //   grade: "Spine I",
//   // },
//   // {
//   //   id: "M004",
//   //   lastName: "Nirmal",
//   //   firstName: "Atul",
//   //   age: 16,
//   //   branch: "Mumbai",
//   //   grade: "Spine III",
//   // },
//   // {
//   //   id: "M005",
//   //   lastName: "Targaryen",
//   //   firstName: "Daenerys",
//   //   age: null,
//   //   branch: "Mumbai",
//   //   grade: "Spine II",
//   // },
//   // {
//   //   id: "M006",
//   //   lastName: "Melisandre",
//   //   firstName: null,
//   //   age: 150,
//   //   branch: "Mumbai",
//   //   grade: "Spine II",
//   // },
//   // {
//   //   id: 7,
//   //   lastName: "Clifford",
//   //   firstName: "Ferrara",
//   //   age: 44,
//   //   branch: "Mumbai",
//   //   grade: "Spine II",
//   // },
//   // {
//   //   id: 8,
//   //   lastName: "Frances",
//   //   firstName: "Rossini",
//   //   age: 36,
//   //   branch: "Mumbai",
//   //   grade: "Spine II",
//   // },
//   // {
//   //   id: 9,
//   //   lastName: "Roxie",
//   //   firstName: "Harvey",
//   //   age: 65,
//   //   branch: "Mumbai",
//   //   grade: "Spine II",
//   // },
// ];

const paginationModel = { page: 0, pageSize: 5 };

const fetchEmployee = async () => {
  const result = await fetch("http://localhost:5000/api/employeedetails");
  if (!result.ok) throw new Error("Error in fetching employee details");
  // console.log(result);
  return result.json();
};

export default function DataTable() {
  const { data } = useQuery({
    queryKey: ["Employee"],
    queryFn: fetchEmployee,
  });

  // console.log("data:- ", data);
  return (
    <Paper sx={{ height: 500, width: "98%" }}>
      <DataGrid
        rows={data ? data.map((row) => ({ ...row, id: row.Employee_ID })) : []}
        // rows={data}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
