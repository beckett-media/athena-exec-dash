import React from "react";
import Plot from "react-plotly.js";
import useDarkMode from "use-dark-mode";
import { Box } from "@chakra-ui/react";

const BarChart = ({ data }) => {
  const darkMode = useDarkMode(false);

  var dataG = [
    {
      x: data.map((d) => d.numberOfUsers),
      y: data.map((d) => d.countries),
      type: "bar",
      orientation: "h",
      marker: { color: "#2A85FF", size: 10, opacity: 0.8 },
    },
  ];

  var layout = {
    xaxis: {
      showgrid: false,
      zeroline: false,
      showline: true,
      showticklabels: true,
      tickcolor: "#e5eaf0",
    },

    yaxis: {
      showgrid: true,
      zeroline: false,
      showline: true,
      showticklabels: true,
    },
    autosize: true,
    margin: {
      l: 100,
      r: 0,
      b: 30,
      t: 10,
    },

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
