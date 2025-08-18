import Paper from "@mui/material/Paper";
import { Box, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import Axios from "../../api/Axios";
import { useState } from "react";
const Dashboard = () => {
  const navigate = useNavigate();
  const [hey, setHey] = useState();

  const handleClick = async (e) => {
    const t = [{ MonthlyCTC: 60000 }];
    e.preventDefault();
    const res = await Axios.post("/Exec-Procedure", JSON.stringify(t));

    const result = res.data;
    setHey(result);
    console.log("result:- ", result);
    // console.log("result:- ", res.stringify());
  };

  return (
    <Box sx={{}}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        {" "}
        <Box sx={{ display: "flex", p: 2 }}>
          <HomeIcon onClick={() => navigate("/")} />
          <Typography sx={{ ml: 1, fontSize: "18px" }}>Dashboard</Typography>
        </Box>
        <Button onClick={handleClick}>Calculate Overtime</Button>
        {
          <>
            {hey?.map((ele, index) => (
              <div key={index}>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "space-between",
                    padding: "20px",
                  }}
                >
                  <h6>{ele.Payhead_ID}</h6>

                  <h6>{ele.Payhead_CODE} </h6>
                  <h6>{ele.Payhead_FORMULA}</h6>
                </div>
              </div>
            ))}
          </>
        }
      </Paper>
    </Box>
  );
};

export default Dashboard;
