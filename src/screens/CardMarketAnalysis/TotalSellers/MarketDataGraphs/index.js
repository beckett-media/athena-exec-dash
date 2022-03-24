import React from "react";
import styles from "./Chart.module.sass";
import cn from "classnames";
import Card from "../../../../components/Card";
import Plot from "react-plotly.js";
import { API } from "aws-amplify";
import useDarkMode from "use-dark-mode";
import moment from "moment";
import { Box } from "@chakra-ui/react";

const TotalSellersData = ({ className }) => {
  const darkMode = useDarkMode(false);

  const riOntology =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const typeObject = "CompetitorMetric";
  const url = `competitormetric/${riOntology}/${typeObject}`; /// URL to fetch from API

  function getData() {
    const apiName = "palentirApi";
    const path = `/${url}`;

    return API.get(apiName, path);
  }

  const [dataTable, setDataTable] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    isLoading &&
      getData().then((res) => {
        setDataTable(res?.data);
        setIsLoading(false);
      });
  }, [isLoading]);

  const datas = dataTable.map((d) => {
    const { rid, ...rest } = d;
    return {
      ...rest?.properties,
    };
  });

  var data = [
    {
      x: datas.map((d) => moment(d.date).format("MMM YY")),
      // filter the y values to only include marketPlayer = "BGS"
      y: datas.map((d) => (d.marketPlayer === "BGS" ? d.totalSellers : null)),

      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#2A85FF", size: 10, opacity: 0.8 },
      name: "BGS",
      line: {
        color: "#2A85FF",
        width: 4,
        dash: "dot",
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: datas.map((d) => moment(d.date).format("MMM YY")),
      y: datas.map((d) => (d.marketPlayer === "BVG" ? d.totalSellers : null)),
      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#FF6A55", size: 10, opacity: 0.8 },
      name: "BVG",
      line: {
        color: "#FF6A55",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: datas.map((d) => moment(d.date).format("MMM YY")),
      y: datas.map((d) => (d.marketPlayer === "CSG" ? d.totalSellers : null)),
      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
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
      x: datas.map((d) => moment(d.date).format("MMM YY")),
      y: datas.map((d) => (d.marketPlayer === "HGA" ? d.totalSellers : null)),
      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#83BF6E", size: 10, opacity: 0.8 },
      name: "HGA",
      line: {
        color: "#83BF6E",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: datas.map((d) => moment(d.date).format("MMM YY")),
      y: datas.map((d) => (d.marketPlayer === "PSA" ? d.totalSellers : null)),
      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#CABDFF", size: 10, opacity: 0.8 },
      name: "PSA",
      line: {
        color: "#CABDFF",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: datas.map((d) => moment(d.date).format("MMM YY")),
      y: datas.map((d) => (d.marketPlayer === "SGC" ? d.totalSellers : null)),
      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#8E59FF", size: 10, opacity: 0.8 },
      name: "SGC",
      line: {
        color: "#8E59FF",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
  ];
  var layout = {
    xaxis: {
      title: "Month",
      showgrid: false,
      zeroline: false,
      showline: true,
      showticklabels: true,
      tickcolor: "#e5eaf0",
    },

    yaxis: {
      title: "Total Sellers",
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
      title="Total Sellers"
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
          data={data}
          layout={layout}
          useResizeHandler={true}
        />
      </Box>
    </Card>
  );
};

export default TotalSellersData;
