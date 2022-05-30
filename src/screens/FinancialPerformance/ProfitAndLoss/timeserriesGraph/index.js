import React from "react";
import styles from "./Chart.module.sass";
import cn from "classnames";
import Card from "../../../../components/Card";
import Plot from "react-plotly.js";

import useDarkMode from "use-dark-mode";
import moment from "moment";
import { Box, Text } from "@chakra-ui/react";
import Dropdown from "../../../../components/Dropdown";

const TimeserriesGraph = ({ className, netIncome, title, monthly }) => {
  const darkMode = useDarkMode(false);
  const [sorting, setSorting] = React.useState("Beckett_Collectables");
  const [sortingYear, setSortingYear] = React.useState("2022");

  // get unique values from netIncome array on Year column sort descending
  // const uniqueYears = [...new Set(quarterly.map((item) => item.Year))].sort(
  //   (a, b) => b - a
  // );

  const years = ["2022", "2021", "2020", "2019", "2018", "2017"];
  const uniqueCompanies = [
    ...new Set(monthly.map((item) => item.Company)),
  ].sort((a, b) => b - a);

  const dataFilter = monthly.filter((d) => d?.Company === sorting);

  const dataFilterbyYear = dataFilter.filter((d) => d?.Year === sortingYear);

  var data = [
    {
      x: dataFilterbyYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
      y: dataFilterbyYear.map((d) =>
        (d.Company === sorting || sortingYear) &
        (d.Account === "Management_EBITDA")
          ? d.Balance
          : null
      ),

      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#2A85FF", size: 10, opacity: 0.8 },
      name: "Management EBITDA",
      line: {
        color: "#2A85FF",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: dataFilterbyYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
      y: dataFilterbyYear.map((d) =>
        (d.Company === sorting) & (d.Account === "409000") ? d.Balance : null
      ),
      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#68D391", size: 10, opacity: 0.8 },
      name: "409000",
      line: {
        color: "#68D391",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },

    {
      x: dataFilterbyYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
      y: dataFilterbyYear.map((d) =>
        (d.Company === sorting) & (d.Account === "GAAP_EBITDA")
          ? d.Balance
          : null
      ),
      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#DCF341", size: 10, opacity: 0.8 },
      name: "GAAP EBITDA",
      line: {
        color: "#DCF341",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: dataFilterbyYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
      y: dataFilterbyYear.map((d) =>
        (d.Company === sorting) & (d.Account === "Total_Revenue")
          ? d.Balance
          : null
      ),
      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#8E59FF", size: 10, opacity: 0.8 },
      name: "Total Revenue",
      line: {
        color: "#8E59FF",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
    {
      x: dataFilterbyYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
      y: dataFilterbyYear.map((d) =>
        (d.Company === sorting) & (d.Account === "Net_Income")
          ? d.Balance
          : null
      ),
      type: "scatter",
      mode: "lines+markers",
      connectgaps: true,
      marker: { color: "#ff9900", size: 10, opacity: 0.8 },
      name: "Net Income",
      line: {
        color: "#ff9900",
        width: 4,
        shape: "spline",
        smoothing: 1,
      },
    },
  ];
  var layout = {
    xaxis: {
      title: "Timeseries",
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
    width: 999,
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
          <Text mr={3}>Filter by Company</Text>
          <Dropdown
            className={styles.dropdown}
            classDropdownHead={styles.dropdownHead}
            value={sorting}
            setValue={setSorting}
            options={uniqueCompanies}
            small
          />
          <Text mr={3}>Filter by Year</Text>
          <Dropdown
            className={styles.dropdown}
            classDropdownHead={styles.dropdownHead}
            value={sortingYear}
            setValue={setSortingYear}
            options={years}
            small
          />
        </Box>
      }
    >
      <Box justifyItems={"center"} alignCenter={"center"} display={"flex"}>
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

export default TimeserriesGraph;
