import React from "react";
import Plot from "react-plotly.js";

import useDarkMode from "use-dark-mode";
import moment from "moment";
import { Box, Text, Grid } from "@chakra-ui/react";

const PlotRow = ({
  className,
  title,
  data,
  company,
  dataFilteredByYear,
  accountsToUse,
}) => {
  const darkMode = useDarkMode(false);

  const uniqueYear = [...new Set(data.map((item) => item.Year))].sort(
    (a, b) => b - a
  );

  // function to remove underscores from the account name
  const removeUnderscore = (str) => {
    return str.replace(/_/g, " ");
  };

  function sortByType(type) {
    const dataFilterYear = dataFilteredByYear.filter((d) => d?.Account === type);

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
    width: 280,
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
    <>
      <Grid
        width={"100%"}
        templateColumns={
          accountsToUse.length < 5 ? "repeat(2, 1fr)" : "repeat(3, 1fr)"
        }
        gap={6}
        justifyItems={"center"}
      >
        {accountsToUse &&
          accountsToUse.map((item) => (
            <Box
              display={"flex"}
              width={"min-content"}
              flexDirection={"column"}
              position={"relative"}
            >
              <Text
                whiteSpace={"nowrap"}
                fontSize={"xs"}
                width={"min-content"}
                position={"absolute"}
                top={"4"}
                left={"50%"}
                transform={"auto"}
                translateX={"-50%"}
                zIndex={"1"}
              >
                {item}
              </Text>
              <Plot
                data={sortByType(item)}
                layout={layout}
                useResizeHandler={true}
                config={{ displayModeBar: false }}
              />
            </Box>
          ))}
      </Grid>
    </>
  );
};

export default PlotRow;
