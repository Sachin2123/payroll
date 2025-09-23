import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { BarChart } from "@mui/x-charts/BarChart";
// import { PieChart } from "@mui/x-charts/PieChart";

const Dashboard = () => {

  return (
    <Box sx={{}}>
      <Paper elevation={3} sx={{ height: "85vh", overflowY: "auto" }}>
        <Box>
          {/* <BarChart
            xAxis={[{ data: ["group A", "group B", "group C"] }]}
            series={[
              { data: [4, 3, 5] },
              { data: [1, 6, 3] },
              { data: [2, 5, 6] },
            ]}
            height={300}
          /> */}
        </Box>

        <Box>
          {/* <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "series A" },
                  { id: 1, value: 15, label: "series B" },
                  { id: 2, value: 20, label: "series C" },
                ],
              },
            ]}
            width={200}
            height={200}
          /> */}
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
