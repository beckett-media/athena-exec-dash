import React from "react";
import styles from "./Chart.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Plot from "react-plotly.js";
import useDarkMode from "use-dark-mode";
import moment from "moment";
import useServiceLevel from "../../../hooks/data/useServiceLevel";
import { Box } from "@chakra-ui/react";

const RevenueGraph = ({ className, serviceLevel, isLoading }) => {
  const darkMode = useDarkMode(false);
  const { levels } = useServiceLevel();

  var dataG = [
    {
      x: levels.map((d) => moment(d.date).format("MMM DD YY")),
      y: levels.map((d) => d.revenueshipped),


      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: {
        color: darkMode.value ? "#2A85FF" : "#2A85FF",
        size: 10,
        opacity: 0.8,
      },
      line: {
        color: darkMode.value ? "#2A85FF" : "#2A85FF",
        width: 4,
        dash: "dot",
        shape: "spline",
        smoothing: 1,
      },
    },
  ];

  var layout = {
    xaxis: {
      title: "Days",
      showgrid: false,
      zeroline: false,
      showline: true,
      showticklabels: true,
      tickcolor: "#e5eaf0",
    },

    yaxis: {
      title: "Total Cards",
      showgrid: true,
      zeroline: false,
      showline: true,
      showticklabels: true,
      format: "$,.0f",
      tickcolor: "#e5eaf0",
      tickformat: "$,.0f",

    },
    autosize: true, 
    width: 910,
    height: 500,
    display: "flex",
    margin: {
      l: 120,
      r: 50,
      b: 100,
      t: 100,
      pad: 5,
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
      orientation: "h",
      font: {
        color: darkMode.value ? "#ffffff" : "#1A1D1F",
      },
    },
  };


  return (
    <Card
      title={"Revenue of Cards Shipped per Day, In Dollars ($)"}
      className={cn(styles.card, className)}
      classTitle={cn("title-darkblue", styles.cardTitle)}
    >
      <Box justifyItems={"center"} alignCenter={"center"} display={"flex"}>
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

export default RevenueGraph;
