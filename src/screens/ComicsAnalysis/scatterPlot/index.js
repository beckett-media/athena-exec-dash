import React from "react";
import styles from "./Chart.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Plot from "react-plotly.js";
import moment from "moment";

import useDarkMode from "use-dark-mode";
import { Box } from "@chakra-ui/react";

const ComicsGraphs = ({ className, data }) => {
  const darkMode = useDarkMode(false);

  var dataG = [
    {
      //convert 3/11/2022 8:00:00 PM ET to 3/11/2022 with moment library for the x axis
      x: data.map((d) => d.company),
      y: data?.map((d) => d?.title),

      mode: "markers+text",
      type: "histogram",
      connectgaps: true,
      marker: { color: "#2A85FF", size: 10, opacity: 0.8 },
      name: "CGC",

      line: {
        color: "#2A85FF",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: data.map((d) => d.company),
      // filter the y values to only include marketPlayer = "BGS"
      // y: data?.map((d) => (d?.grade === "CGC" ? d?.totalSold : null)),
      // compare the first 3 charaters of the grade to "CGC"

      y: data?.map((d) => d?.title),
      mode: "markers+text",
      type: "scatter",
      connectgaps: true,
      marker: { color: "#FF6A55", size: 10, opacity: 0.8 },
      name: "CBCS",
      line: {
        color: "#FF6A55",
        width: 4,
        shape: "spline",
        smoothing: 1,
        dash: "dot",
      },
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
    <Card
      classTitle="title-blue"
      // title="Scatter Plot"
      // description={`SGC continues to gain on BGS in this area. We had a +4,302 lead here in January, now it’s +302. It’s very likely that SGC moves into the number two spot in March.`}
      className={cn(styles.card, className)}
    >
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
          data={dataG}
          layout={layout}
          useResizeHandler={true}
        />
      </Box>
    </Card>
  );
};

export default ComicsGraphs;
