import React from "react";
import styles from "./Chart.module.sass";
import cn from "classnames";
import Card from "../../../../components/Card";
import Plot from "react-plotly.js";

import useDarkMode from "use-dark-mode";
import moment from "moment";
import {
  Box,
  Text,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import Dropdown from "../../../../components/Dropdown";

const PlotRow = ({ className, title, monthly, company, data }) => {
  const darkMode = useDarkMode(false);
  const [sorting, setSorting] = React.useState("Net Income");
  const [year, setYear] = React.useState("2022");

  //const uniqueAccount = [...new Set(monthly.map((item) => item.Account))];
  const uniqueAccount = ["Net Income", "GAAP EBITDA", "Management EBITDA"];

  const uniqueYear = [...new Set(monthly.map((item) => item.Year))].sort(
    (a, b) => b - a
  );

  // function to remove underscores from the account name
  const removeUnderscore = (str) => {
    return str.replace(/_/g, " ");
  };

  function sortByType(type) {
    const dataFilterYear = data.filter((d) => d?.Account === type);

    return [
      {
        x: dataFilterYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
        y: dataFilterYear.map((d) =>
          (d.Account === type) & (d.Company === company)
            ? d.BudgetBalance
            : null
        ),

        type: "bar",
        marker: { color: "#2A85FF", size: 10, opacity: 0.8 },
        name: "Budgeted",
      },
      {
        x: dataFilterYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
        y: dataFilterYear.map((d) =>
          (d.Account === type) & (d.Company === company) ? d.Balance : null
        ),
        type: "scatter",
        mode: "lines+markers",
        connectgaps: true,
        marker: { color: "#FF6A55", size: 10, opacity: 0.8 },
        name: "Actual",
        line: {
          color: "#FF6A55",
          width: 4,
          shape: "spline",
          smoothing: 1,
        },
      },
    ];
  }

  console.log(sortByType("Management EBITDA"));

  // var data = [
  //   {
  //     x: dataFilterYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
  //     y: dataFilterYear.map((d) =>
  //       (d.Account === sorting) & (d.Company === company) ? d.Balance : null
  //     ),

  //     type: "bar",
  //     marker: { color: "#2A85FF", size: 10, opacity: 0.8 },
  //     name: "Budgeted",
  //   },
  //   {
  //     x: dataFilterYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
  //     y: dataFilterYear.map((d) =>
  //       (d.Account === sorting) & (d.Company === company) ? d.Balance : null
  //     ),
  //     type: "scatter",
  //     mode: "lines+markers",
  //     connectgaps: true,
  //     marker: { color: "#FF6A55", size: 10, opacity: 0.8 },
  //     name: "Actual",
  //     line: {
  //       color: "#FF6A55",
  //       width: 4,
  //       shape: "spline",
  //       smoothing: 1,
  //     },
  //   },
  // ];
  var layout = {
    xaxis: {
      title: `Month`,
      showgrid: false,
      zeroline: false,
      showline: true,
      showticklabels: true,
      tickcolor: "#e5eaf0",
    },

    yaxis: {
      title: "Profit & Loss",
      showgrid: true,
      zeroline: false,
      showline: true,
      showticklabels: true,
      tickformat: "s",
    },
    autosize: true,
    width: 250,
    height: 350,
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
    <Box
      justifyItems={"center"}
      alignCenter={"center"}
      justifyContent={"center"}
      display={"flex"}
    >
      <Box
        display={"flex"}
        width={"25%"}
        flexDirection={"column"}
        position={"relative"}
      >
        <Text
          position={"absolute"}
          left={"50%"}
          top={"4"}
          transform={"auto"}
          // translateX={"-50%"}
          zIndex={"1"}
        >
          Net Income
        </Text>
        <Plot
          data={sortByType("Net Income")}
          layout={layout}
          useResizeHandler={true}
          config={{ displayModeBar: false }}
        />
      </Box>

      <Box
        display={"flex"}
        width={"25%"}
        flexDirection={"column"}
        position={"relative"}
      >
        <Text
          position={"absolute"}
          top={"4"}
          left={"50%"}
          transform={"auto"}
          // translateX={"-50%"}
          zIndex={"1"}
        >
          GAAP EBITDA
        </Text>
        <Plot
          data={sortByType("GAAP EBITDA")}
          layout={layout}
          useResizeHandler={true}
          config={{ displayModeBar: false }}
        />
      </Box>

      <Box
        width={"25%"}
        display={"flex"}
        flexDirection={"column"}
        position={"relative"}
      >
        <Text
          position={"absolute"}
          top={"4"}
          left={"50%"}
          transform={"auto"}
          // translateX={"-50%"}
          zIndex={"1"}
        >
          Management EBITDA
        </Text>
        <Plot
          data={sortByType("Management EBITDA")}
          layout={layout}
          useResizeHandler={true}
          config={{ displayModeBar: false }}
        />
      </Box>
      <Box
        width={"25%"}
        display={"flex"}
        flexDirection={"column"}
        position={"relative"}
      >
        <Text
          position={"absolute"}
          top={"4"}
          left={"50%"}
          transform={"auto"}
          // translateX={"-50%"}
          zIndex={"1"}
        >
          Total Revenue
        </Text>
        <Plot
          data={sortByType("Management EBITDA")}
          layout={layout}
          useResizeHandler={true}
          config={{ displayModeBar: false }}
        />
      </Box>
    </Box>
  );
};

export default PlotRow;
