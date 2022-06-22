import React from "react";
import styles from "./Chart.module.sass";
import cn from "classnames";
import Card from "../../../../components/Card";
import Plot from "react-plotly.js";

import useDarkMode from "use-dark-mode";
import moment from "moment";
import { Box, Text, Select } from "@chakra-ui/react";

const QuaterlyGraph = ({ className, title, revenueStreamsQuarterly }) => {
  const darkMode = useDarkMode(false);
  const [sorting, setSorting] = React.useState("409000");
  const [year, setYear] = React.useState("2022");

  const uniqueAccount = [
    ...new Set(revenueStreamsQuarterly.map((item) => item.Account)),
  ];

  const uniqueYears = [
    ...new Set(revenueStreamsQuarterly.map((item) => item.Year)),
  ].sort((a, b) => b - a);

  const dataFilter = revenueStreamsQuarterly.filter(
    (d) => d?.Account === sorting
  );

  const dataFilterYear = dataFilter.filter((d) => d?.Year === year);

  // function to remove underscores from the account name
  const removeUnderscore = (str) => {
    return str.replace(/_/g, " ");
  };

  var data = [
    {
      x: dataFilterYear.map((d) => d.Quarter),
      y: dataFilterYear.map((d) =>
        (d.Account === sorting) & (d.Company === "Beckett_Collectables")
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
      x: dataFilterYear.map((d) => d.Quarter),
      y: dataFilterYear.map((d) =>
        (d.Account === sorting) &
        (d.Company === "Comic_Book_Certification_Service_LLC")
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
      x: dataFilterYear.map((d) => d.Quarter),
      y: dataFilterYear.map((d) =>
        (d.Account === sorting) & (d.Company === "Arcane_Tinmen_ApS")
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
      x: dataFilterYear.map((d) => d.Quarter),
      y: dataFilterYear.map((d) =>
        (d.Account === sorting) &
        (d.Company === "Southern_Hobby_Distribution_LLC")
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
  ];
  var layout = {
    xaxis: {
      title: `Balance Sheet for account type: ${removeUnderscore(sorting)}`,
      showgrid: false,
      zeroline: false,
      showline: true,
      showticklabels: true,
      tickcolor: "#e5eaf0",
    },

    yaxis: {
      title: "Revenue",
      showgrid: true,
      zeroline: false,
      showline: true,
      showticklabels: true,
    },

    autosize: true,
    width: 809,
    height: 500,
    display: "flex",
    margin: {
      l: 100,
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

      traceorder: "reversed",

      font: {
        color: darkMode.value ? "#ffffff" : "#1A1D1F",
      },
    },
  };

  return (
    <Card
      classTitle="title-blue"
      title={"Revenue Streams Quarterly"}
      description={`description if neeeded`}
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
            _focusVisible={{
              borderColor: "#272B30",
              boxShadow: "0 0 0 2px #272B30",
            }}
            fontSize={12}
          >
            {uniqueAccount.map((d) => (
              <option value={d}>{removeUnderscore(d)}</option>
            ))}
          </Select>
          <Box width={"10%"}>
            <Text flex={1}>Year</Text>
          </Box>
          <Select
            colorScheme={darkMode.value ? "dark" : "light"}
            borderRadius={14}
            boxShadow="sm"
            color={"#6F767E"}
            size="md"
            variant="outline"
            borderColor="#272B30"
            onChange={(e) => setYear(e.target.value)}
            _focusVisible={{
              borderColor: "#272B30",
              boxShadow: "0 0 0 2px #272B30",
            }}
            fontSize={12}
          >
            {uniqueYears.map((d) => (
              <option value={d}>{removeUnderscore(d)}</option>
            ))}
          </Select>
        </Box>
      }
    >
      <Box justifyItems={"center"} alignCenter={"center"} display={"flex"}>
        <Plot
          data={data}
          layout={layout}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
    </Card>
  );
};

export default QuaterlyGraph;
