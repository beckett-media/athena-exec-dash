import React from "react";
import Plot from "react-plotly.js";
import useDarkMode from "use-dark-mode";
import { Box } from "@chakra-ui/react";
import moment from "moment";

const ChartLine = ({ data }) => {
  const darkMode = useDarkMode(false);

  var dataG = [
    {
      x: data.map((d) => moment(d?.date).format("MMM Do")),
      // map the number of post to the date and on click to marker the date
      y: data.map((d) => d?.positive),
      name: "positive",
      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: {
        color: "#83BF6E",
        size: 10,
        opacity: 0.8,
      },

      line: {
        color: "#83BF6E",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: data.map((d) => moment(d?.date).format("MMM Do")),
      // map the number of post to the date and on click to marker the date
      y: data.map((d) => d?.negative),
      name: "negative",
      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: {
        color: "#FF6A55",
        size: 10,
        opacity: 0.8,
      },

      line: {
        color: "#FF6A55",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: data.map((d) => moment(d?.date).format("MMM Do")),
      // map the number of post to the date and on click to marker the date
      y: data.map((d) => d?.neutral),
      name: "neutral",
      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: {
        color: "#2A85FF",
        size: 10,
        opacity: 0.8,
      },

      line: {
        color: "#2A85FF",
        width: 4,
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
