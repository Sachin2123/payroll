import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { useAPIContext } from "../../Context/APIContext";
import { useState, useEffect } from "react";

const Dashboard = ({ children }) => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState("true");
  const [hideData, setHideData] = useState("Show Data");

  const { components } = useAPIContext();
  const { EmployeeMasterDetailsAPI } = useAPIContext();
  const { ButtonComponent } = components;

  useEffect(() => {
    const fetchData = async () => {
      const res = await EmployeeMasterDetailsAPI();
      setData(res);
      // console.log("res:- ", res);
      return res;
    };
    fetchData();
  }, []);

  // console.log(data)

  const handleShow = () => {
    setShow(!show);
    setHideData(!hideData);
    // console.log("show:- ", show);
    // console.log("Clicked");
  };

  return (
    <Box sx={{}}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        <Box>
          {/* {data.map((val, index) => (
            <ol key={val.Employee_ID}>
              <li>
                {val.Employee_ID} - {val.Employee_Name}
              </li>
            </ol>
          ))} */}

          <ButtonComponent onClick={handleShow} sx={{ m: 3 }}>
            {!hideData ? "Hide Data" : "Show Data"}
          </ButtonComponent>

          {!show
            ? data.map((val, index) => (
                <ol key={val.Employee_ID}>
                  <li>
                    {val.Employee_ID} - {val.Employee_Name}
                  </li>
                </ol>
              ))
            : ""}
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
