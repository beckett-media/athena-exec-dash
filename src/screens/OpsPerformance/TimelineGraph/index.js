import React, {useState} from "react";
import styles from "./Chart.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Loading from "../../../components/LottieAnimation/Loading";
import Plot from "react-plotly.js";
import useDarkMode from "use-dark-mode";
import moment from "moment";
import { Box } from "@chakra-ui/react";
import useServiceLevel from "../../../hooks/data/useServiceLevel";
import useTimeseries from "../../../hooks/data/useTimeseries";

const MarketData = ({ className }) => {
  const darkMode = useDarkMode(false);
  const { timeseries, isTimeseriesLoading } = useTimeseries();
  const { levels, isServiceLevelsLoading } = useServiceLevel();

  var dataG = [
    {
      x: timeseries.map((d) => moment(d.date).format("MMM DD YY")),
      y: timeseries.map((d) => d.cardsGradedToday),

      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: {
        color: darkMode.value ? "#B5E4CA" : "green",
        size: 10,
        opacity: 0.8,
      },
      name: "Cards Graded",
      line: {
        color: darkMode.value ? "#B5E4CA" : "green",
        width: 4,
        dash: "dot",
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: timeseries.map((d) => moment(d.date).format("MMM DD YY")),
      y: timeseries.map((d) => d.cardsShippedToday),

      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#2A85FF", size: 10, opacity: 0.8 },
      name: "Cards Shipped",
      line: {
        color: "#2A85FF",
        width: 4,
        dash: "dot",
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: timeseries.map((d) => moment(d.date).format("MMM DD YY")),
      y: timeseries.map((d) => d.cardsReceived),

      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#DCF341", size: 10, opacity: 0.8 },
      name: "Cards Received",
      line: {
        color: "#DCF341",
        width: 4,
        dash: "dot",
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: levels.map((d) => moment(d.date).format("MMM DD YY")),
      y: levels.map((d) => d.verified),
      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: {
        color: darkMode.value ? "purple" : "purple",
        size: 10,
        opacity: 0.8,
      },
      name: "Cards Verified",
      line: {
        color: darkMode.value ? "purple" : "purple",
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
      title: "Total",
      showgrid: true,
      zeroline: false,
      showline: true,
      showticklabels: true,
    },
    autosize: true,
    width: 900,
    height: 500,
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

  const loading = (isTimeseriesLoading || isServiceLevelsLoading);

  return (
    <Card
      title={"Cards Received, Graded, Verified, & Shipped Over Time"}
      className={cn(styles.card, className)}
      // description={`For the first time, SGC ($149.96) has surpassed PSA ($140.81)`}
      classTitle={cn("title-blue", styles.cardTitle)}
    >
      {loading && (
        <Loading loadingG={"loadingG"} marginTop={0} width={"15rem"} />
      )}

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

export default MarketData;
