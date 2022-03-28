import React from "react";
import Plot from "react-plotly.js";
import useDarkMode from "use-dark-mode";
import { Box } from "@chakra-ui/react";
import moment from "moment";

const ChartLine = ({ data }) => {
  const darkMode = useDarkMode(false);

  var dataG = [
    {
      x: data?.map((d) => moment(d?.date).format("MMM Do")),
      // map the number of post to the date and on click to marker the date
      y: data?.map((d) => d?.numposts),

      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: {
        color: darkMode.value ? "#FFD88D" : " #FFBC99",
        size: 10,
        opacity: 0.8,
      },
      line: {
        color: darkMode.value ? "#FFD88D" : " #FFBC99",
        width: 4,
        dash: "dot",
        shape: "spline",
        smoothing: 1,
      },
    },
  ];

  var layout = {
    xaxis: {
      showgrid: true,
      zeroline: false,
      showline: true,
      showticklabels: true,
      tickcolor: "transparent",
      tickfont: {
        family: "Arial",
        size: 12,
        color: darkMode.value ? "gray" : "#000",
      },
    },

    yaxis: {
      showgrid: true,
      zeroline: false,
      showline: false,
      showticklabels: true,
      tickcolor: "transparent",
      tickfont: {
        family: "Arial",
        size: 12,
        color: darkMode.value ? "gray" : "#000",
      },
    },
    autosize: true,

    height: "150%",

    margin: {
      l: 50,
      r: 80,
      b: 110,
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

export default ChartLine;
