import React from "react";
import Plot from "react-plotly.js";
import useDarkMode from "use-dark-mode";
import { Box } from "@chakra-ui/react";

const BarChart = ({ data }) => {
  const darkMode = useDarkMode(false);

  var dataG = [
    {
      value: data.map((d) => d.numberOfUsers),
      labels: data.map((d) => d.devicesType),
      type: "pie",
      textinfo: "label+percent",
      insidetextorientation: "radial",
    },
  ];

  var layout = {
    autosize: true,
    height: "250%",

    paper_bgcolor: darkMode.value ? "#1A1D1F" : "#e5eaf0",
    plot_bgcolor: darkMode.value ? "#1A1D1F" : "#e5eaf0",
    showlegend: false,
    hovermode: "x",
    legend: {
      x: 0,
      y: 10,
      bgcolor: darkMode.value ? "#1A1D1F" : "#e5eaf0",
      bordercolor: darkMode.value ? "#1A1D1F" : "#e5eaf0",
      borderwidth: 6,
      font: {
        color: "#ffffff",
        size: 10,
      },
    },
  };

  return (
    <Box>
      <Plot
        data={dataG}
        layout={layout}
        style={{ zIndex: 50 }}
        useResizeHandler={true}
      />
    </Box>
  );
};

export default BarChart;
