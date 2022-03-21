import React, { useState, useRef, PureComponent } from "react";
import styles from "./Chart.module.sass";
import cn from "classnames";
import Card from "../../../../components/Card";
import Plot from "react-plotly.js";

import useDarkMode from "use-dark-mode";
import { Box } from "@chakra-ui/react";

import { BGS, BVG, CSG, HGA, PSA, SGC } from "../graphdata";

const TotalSoldData = ({ className }) => {
  const darkMode = useDarkMode(false);

  var data = [
    {
      x: BGS.map((d) => d.month),
      y: BGS.map((d) => d.total),
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "#0066ff", size: 10, opacity: 0.8 },
      name: "BGS",
      line: {
        color: "#0066ff",
        width: 4,
        dash: "dot",
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: BVG.map((d) => d.month),
      y: BVG.map((d) => d.total),
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "#ff0000", size: 10, opacity: 0.8 },
      name: "BVG",
      line: {
        color: "#ff0000",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: CSG.map((d) => d.month),
      y: CSG.map((d) => d.total),
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "#ff9900", size: 10, opacity: 0.8 },
      name: "CSG",
      line: {
        color: "#ff9900",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: HGA.map((d) => d.month),
      y: HGA.map((d) => d.total),
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "#00cc00", size: 10, opacity: 0.8 },
      name: "HGA",
      line: {
        color: "#009900",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: PSA.map((d) => d.month),
      y: PSA.map((d) => d.total),
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "0000ff", size: 10, opacity: 0.8 },
      name: "PSA",
      line: {
        color: "#0000ff",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: SGC.map((d) => d.month),
      y: SGC.map((d) => d.total),
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "#ff00ff", size: 10, opacity: 0.8 },
      name: "SGC",
      line: {
        color: "#ff00ff",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
  ];

  var layout = {
    title: "Total Sold",
    xaxis: {
      title: "Month",
      showgrid: false,
      zeroline: false,
      showline: true,
      showticklabels: true,
      tickcolor: "#e5eaf0",
    },

    yaxis: {
      title: "Total Sold",
      showgrid: true,
      zeroline: false,
      showline: true,
      showticklabels: true,
    },
    autosize: true,
    width: 1120,
    height: 700,
    display: "flex",
    margin: {
      l: 70,
      r: 50,
      b: 100,
      t: 100,
      pad: 5,
    },

    paper_bgcolor: darkMode.value ? "#1A1D1F" : "#e5eaf0",
    plot_bgcolor: darkMode.value ? "#1A1D1F" : "#e5eaf0",
    showlegend: true,
    hovermode: "x",
    legend: {
      x: 0,
      y: 10,
      bgcolor: darkMode.value ? "#1A1D1F" : "#e5eaf0",
      bordercolor: darkMode.value ? "#1A1D1F" : "#e5eaf0",
      borderwidth: 6,
      orientation: "h",

      font: {
        color: darkMode.value ? "#ffffff" : "#1A1D1F",
      },
    },
  };

  return (
    <Card className={cn(styles.card, className)}>
      <Box
        justifyItems={"center"}
        alignCenter={"center"}
        bg={"red"}
        display={"flex"}
      >
        <Plot
          style={{
            width: "100%",
          }}
          data={data}
          layout={layout}
          useResizeHandler={true}
        />
      </Box>
    </Card>
  );
};

export default TotalSoldData;
