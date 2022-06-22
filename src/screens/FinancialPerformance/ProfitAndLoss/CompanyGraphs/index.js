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

const CompanyGraphs = ({ className, title, monthly }) => {
  const darkMode = useDarkMode(false);
  const [sorting, setSorting] = React.useState("Net_Income");
  const [year, setYear] = React.useState("2022");

  //const uniqueAccount = [...new Set(monthly.map((item) => item.Account))];
  const uniqueAccount = ["Net_Income", "GAAP_EBITDA", "Management_EBITDA"];

  const uniqueYear = [...new Set(monthly.map((item) => item.Year))].sort(
    (a, b) => b - a
  );

  const dataFilter = monthly.filter((d) => d?.Account === sorting);

  const dataFilterYear = dataFilter.filter((d) => d?.Year === year);

  // function to remove underscores from the account name
  const removeUnderscore = (str) => {
    return str.replace(/_/g, " ");
  };

  var data = [
    {
      x: dataFilterYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
      y: dataFilterYear.map((d) =>
        (d.Account === sorting) & (d.Company === "Beckett_Collectables")
          ? d.Balance
          : null
      ),

      type: "bar",
      marker: { color: "#2A85FF", size: 10, opacity: 0.8 },
      name: "Beckett Collectables",
    },
    {
      x: dataFilterYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
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
      x: dataFilterYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
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
      x: dataFilterYear.map((d) => moment(d.StrDate).format("MMM YYYY")),
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
      title: `Profit & lost for account type: ${removeUnderscore(sorting)}`,
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
    width: 350,
    height: 400,
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
            value={console.log(year)}
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
      <Accordion allowMultiple allowToggle defaultIndex={[0]}>
        <AccordionItem>
          <h2>
            <AccordionButton bg="gray.700">
              <Box flex="1" textAlign="center">
                Beckett Collectables
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Box
              justifyItems={"center"}
              alignCenter={"center"}
              display={"flex"}
            >
              <Plot
                style={{
                  width: "33%",
                }}
                data={data}
                layout={layout}
                useResizeHandler={true}
              />
              <Plot
                style={{
                  width: "33%",
                }}
                data={data}
                layout={layout}
                useResizeHandler={true}
              />
              <Plot
                style={{
                  width: "33%",
                }}
                data={data}
                layout={layout}
                useResizeHandler={true}
              />
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton bg="gray.700">
              <Box flex="1" textAlign="center">
                Arcance Tinmen
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default CompanyGraphs;
