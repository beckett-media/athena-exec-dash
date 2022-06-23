import React from "react";
import styles from "./Chart.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Plot from "react-plotly.js";

import useDarkMode from "use-dark-mode";
import moment from "moment";
import { Box, Text, Select } from "@chakra-ui/react";
import Dropdown from "../../../components/Dropdown";

const TimeSeriesGraph = ({ 
  className,
  title, 
  data, 
  accountsToUse
}) => {
  const darkMode = useDarkMode(false);
  const [sorting, setSorting] = React.useState(accountsToUse[0]);
  const [year, setYear] = React.useState([...new Set(data.map((item) => item.Year))].at(-1));
  //const uniqueAccount = [...new Set(monthly.map((item) => item.Account))];
  
  const uniqueYear = [...new Set(data.map((item) => item.Year))].sort(
    (a, b) => b - a
  );
  
  const dataFilter = data.filter((d) => d?.Account === sorting);

  const dataFilterYear = dataFilter.filter((d) => d?.Year === year);

  // function to remove underscores from the account name
  
  var graphData = [
    {
      x: dataFilterYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
      y: dataFilterYear.map((d) =>
        (d.Account === sorting) & (d.Company === "Beckett Collectables")
          ? d.Balance
          : null
      ),

      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#2A85FF", size: 10, opacity: 0.8 },
      name: "Beckett Collectables",
      line: {
        color: "#2A85FF",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: dataFilterYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
      y: dataFilterYear.map((d) =>
        (d.Account === sorting) & (d.Company === "Beckett Collectables")
          ? d.BudgetBalance
          : null
      ),

      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#2A85FF", size: 10, opacity: 0.8 },
      name: "Budget Balance",
      line: {
        color: "#2A85FF",
        width: 4,
        shape: "spline",
        smoothing: 1,
        dash: "dot",
      },
    },
    {
      x: dataFilterYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
      y: dataFilterYear.map((d) =>
        (d.Account === sorting) &
        (d.Company === "Comic Book Certification Service LLC")
          ? d.Balance
          : null
      ),
      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#FF6A55", size: 10, opacity: 0.8 },
      name: "Comic Book Certification Service LLC",
      line: {
        color: "#FF6A55",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: dataFilterYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
      y: dataFilterYear.map((d) =>
        (d.Account === sorting) &
        (d.Company === "Comic Book Certification Service LLC")
          ? d.BudgetBalance
          : null
      ),
      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#FF6A55", size: 10, opacity: 0.8 },
      name: "Budget Balance",
      line: {
        color: "#FF6A55",
        width: 4,
        shape: "spline",
        smoothing: 1,
        dash: "dot",
      },
    },
    {
      x: dataFilterYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
      y: dataFilterYear.map((d) =>
        (d.Account === sorting) & (d.Company === "Arcane Tinmen ApS")
          ? d.Balance
          : null
      ),
      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#FFD700", size: 10, opacity: 0.8 },
      name: "Arcane Tinmen ApS",
      line: {
        color: "#FFD700",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: dataFilterYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
      y: dataFilterYear.map((d) =>
        (d.Account === sorting) & (d.Company === "Arcane Tinmen ApS")
          ? d.BudgetBalance
          : null
      ),
      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#FFD700", size: 10, opacity: 0.8 },
      name: "Budget Balance",
      line: {
        color: "#FFD700",
        width: 4,
        shape: "spline",
        smoothing: 1,
        dash: "dot",
      },
    },
    {
      x: dataFilterYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
      y: dataFilterYear.map((d) =>
        (d.Account === sorting) &
        (d.Company === "Southern Hobby Distribution,LLC")
          ? d.Balance
          : null
      ),
      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#8E59FF", size: 10, opacity: 0.8 },
      name: "Southern Hobby Distribution, LLC",
      line: {
        color: "#8E59FF",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: dataFilterYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
      y: dataFilterYear.map((d) =>
        (d.Account === sorting) &
        (d.Company === "Southern Hobby Distribution,LLC")
          ? d.BudgetBalance
          : null
      ),
      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#8E59FF", size: 10, opacity: 0.8 },
      name: "Budget Balance",
      line: {
        color: "#8E59FF",
        width: 4,
        shape: "spline",
        smoothing: 1,
        dash: "dot",
      },
    },
  ];


  
  var layout = {
    xaxis: {
      title: '',
      showgrid: false,
      zeroline: false,
      showline: true,
      showticklabels: true,
      tickcolor: "#e5eaf0",
    },

    yaxis: {
      title: `${sorting}`,
      showgrid: true,
      zeroline: false,
      showline: true,
      showticklabels: true,
      tickformat: "s",
    },

      autosize: true,
    width: 809,
    height: 500,
    display: "flex",
    margin: {
      l: 70,
      r: 50,
      b: 100,
      t: 0,
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
      // hide the legend when the graph is empty (no data)
      // this is done by adding the "trace" to the legend

      //traceorder: "reversed",

      font: {
        color: darkMode.value ? "#ffffff" : "#1A1D1F",
      },
    },
  };

  return (
    <Card
      classTitle="title-blue"
      title={title}
      // description={`BGS sell through has dropped under 10% for the first time. It peaked at 33.2% in March 2021.`}
      className={cn(styles.card, className)}
      head={
        <Box
          flexDirection={"row"}
          display={"flex"}
          gap={3}
          justifyItems={"center"}
          alignItems={"center"}
        >
          <Box width={"100%"}>
            <Text flex={1}>Select Account</Text>
          </Box>
          <Select
            colorScheme={darkMode.value ? "dark" : "light"}
            borderRadius={14}
            boxShadow="sm"
            color={"#6F767E"}
            size="md"
            variant="outline"
            borderColor="#272B30"
            onChange={(e) => setSorting(e.target.value)}
            // value={console.log(sorting)}
            _focusVisible={{
              borderColor: "#272B30",
              boxShadow: "0 0 0 2px #272B30",
            }}
            fontSize={14}
          >
            {accountsToUse.map((d) => (
              <option value={d}>{d}</option>
            ))}
          </Select>
          <Text mr={3}>Year</Text>
          <Select
            colorScheme={darkMode.value ? "dark" : "light"}
            borderRadius={14}
            boxShadow="sm"
            color={"#6F767E"}
            size="md"
            variant="outline"
            borderColor="#272B30"
            onChange={(e) => setYear(e.target.value)}
            // value={console.log(year)}
            _focusVisible={{
              borderColor: "#272B30",
              boxShadow: "0 0 0 2px #272B30",
            }}
            fontSize={14}
          >
            {uniqueYear.map((d) => (
              <option value={d}>{d}</option>
            ))}
          </Select>
        </Box>
      }
    >
      <Box justifyItems={"center"} alignCenter={"center"} display={"flex"}>
        <Plot
          style={{
            width: "100%",
            height: "100%",
          }}
          data={graphData}
          layout={layout}
          useResizeHandler={true}
        />
      </Box>

      
    </Card>
  );
};

export default TimeSeriesGraph;
