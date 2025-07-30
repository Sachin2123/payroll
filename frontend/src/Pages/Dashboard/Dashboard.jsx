import Paper from "@mui/material/Paper";
import { Box, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import Axios from "../../api/Axios";
import { useState } from "react";
const Dashboard = () => {
  const navigate = useNavigate();
  const [Clicked, setClicked] = useState();

  const handleClick = async (e) => {
    setClicked(!Clicked);
    const t = [
      { monthlyCTC: 15000, totalWorkingDays: 31, dayspaid: 29 },
      { monthlyCTC: 16000, totalWorkingDays: 31, dayspaid: 30 },
      { monthlyCTC: 17000, totalWorkingDays: 31, dayspaid: 31 },
    ];
    e.preventDefault();
    const res = await Axios.post("/Exec-Procedure", JSON.stringify(t));

    const result = res.data;
    // console.log("result:- ", result);
    // console.log("result:- ", res.stringify());
  };

  const data = [
    { monthlyCTC: 15000, totalWorkingDays: 31, dayspaid: 31 },
    { monthlyCTC: 16000, totalWorkingDays: 31, dayspaid: 30 },
    // { monthlyCTC: 17000, totalWorkingDays: 31, dayspaid: 31 },
  ];

  return (
    <Box sx={{}}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
        <Box sx={{ display: "flex", p: 2 }}>
          <HomeIcon onClick={() => navigate("/")} />
          <Typography sx={{ ml: 1, fontSize: "18px" }}>Dashboard</Typography>
        </Box>
        <Button onClick={handleClick}>Calculate Overtime</Button>
        {Clicked ? (
          <>
            {data.map((ele, index) => (
              // console.log((ele.monthlyCTC / ele.totalWorkingDays) * ele.dayspaid);
              <ul key={index}>
                <li>
                  {(ele.monthlyCTC / ele.totalWorkingDays).toFixed(1) *
                    ele.dayspaid}
                </li>
              </ul>
            ))}
          </>
        ) : (
          ""
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;
