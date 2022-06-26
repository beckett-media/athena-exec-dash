import React from "react";
import Plot from "react-plotly.js";
import "../chart-styles.css";
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
      
    const budgetData = dataFilterYear.map((d) =>
      (d.Account === type) & (d.Company === company)
        ? d.BudgetBalance
        : null
    );
    const actualsData = dataFilterYear.map((d) =>
      (d.Account === type) & (d.Company === company) ? d.Balance : null
    );

    const hasBudgetData = !budgetData.every(element => element === null);
    const hasActualsData = !actualsData.every(element => element === null);

    const chartData =  [
      {
        x: dataFilterYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
        y: budgetData,

        type: "bar",
        marker: { color: "#2A85FF", size: 9, opacity: 0.8 },
        name: "Budget",
      },
      {
        x: dataFilterYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
        y: actualsData,
        type: "scatter",
        mode: "lines+markers",
        connectgaps: true,
        marker: { color: "#FF6A55", size: 9, opacity: 0.8 },
        name: "Actual",
        line: {
          color: "#FF6A55",
          width: 4,
          shape: "spline",
          smoothing: 1,
        },
      },
    ];
    
    return {
      chartData: chartData,
      hasData: (hasBudgetData || hasActualsData)
    };
  }

  const getLayout = (account) => {
  return {
    xaxis: {
      // title: `Month`,
      showgrid: false,
      zeroline: false,
      showline: true,
      showticklabels: true,
      tickcolor: "#e5eaf0",
    },

    yaxis: {
      title: "USD",
      showgrid: true,
      zeroline: false,
      showline: true,
      showticklabels: true,
      tickformat: "s",
    },
    autosize: true,
    width: accountsToUse.length < 5 ? 500 : 320,
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
    title: {
      text:account,
      font: {
        color:darkMode.value ? "#ffffff" : "#1A1D1F",
        //family: 'Courier New, monospace',
        //size: 24
      },
      xref: 'paper',
      x: 0.5,
    },  
    //title: account,
    legend: {
      
      x: 0.5,
      y: 10,
      bgcolor: darkMode.value ? "#1A1D1F" : "#e5eaf0",
      bordercolor: darkMode.value ? "#1A1D1F" : "#e5eaf0",
      borderwidth: 6,
      orientation: "h",
      xanchor:'center',

      font: {
        color: darkMode.value ? "#ffffff" : "#1A1D1F",
        size: 11,
        weight:100
      },
    },
  };
}

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
          accountsToUse.map((account) => (
            <Box
              display={"flex"}
              // width={"min-content"}
              width={'100%'}
              flexDirection={"column"}
              position={"relative"}
            >
              {
                (!sortByType(account)['hasData'] ? 
                  <Box
                    display={'flex'}
                    height={'100%'}
                    width={'100%'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    color={'gray.500'}
                    fontSize={'sm'}
                    >{`No data available for ${account}`}
                  </Box> : 
                  <Plot
                    data={sortByType(account)['chartData']}
                    layout={getLayout(account)}
                    useResizeHandler={true}
                    //config={{ displayModeBar: false }}
                  />
                )
              }
            </Box>
          ))}
      </Grid>
    </>
  );
};

export default PlotRow;
