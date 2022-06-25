import React from "react";
import {
  Box,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "../../../components/Card";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import useDarkMode from "use-dark-mode";

import TimeSeriesGraph from "../CommonComponents/TimeSeriesGraph";
import TablePivots from "./TablePivots";
import TimeSeriesTable from "./TimeSeriesTable";
import CompanyGraphs from "../CommonComponents/CompanyGraphs";

const ProfitAndLoss = ({
  data,
  isLoading,
  netIncome,
  pl_pivot_quarterly,
  pl_monthly,
  pl_quarterly,
}) => {
  const darkMode = useDarkMode();

  const companies = [
    "Beckett Collectables",
    "Arcane Tinmen ApS",
    "Comic Book Certification Service LLC",
    "Southern Hobby Distribution,LLC",
  ];

  const accountsToUse = [
    "Net Income",
    "GAAP EBITDA",
    "Management EBITDA",
    "Total Revenue",
  ];

  return (
    <>
      <Tabs
        isManual
        variant="unstyled"
        isFitted={false}
        borderRadius={0}
        align={"center"}
        mt={20}
      >
        <TabList my={8}>
          <Tab
            color={darkMode.value ? "gray.100" : "gray.700"}
            borderRadius={15}
            _selected={{
              color: darkMode.value ? "white" : "white",
              bg: darkMode.value ? "#2A85FF" : "#2A85FF",
              borderRadius: 15,
              _focus: { boxShadow: "none", outline: "none" },
            }}
          >
            Monthly
          </Tab>
          <Tab
            color={darkMode.value ? "gray.100" : "gray.700"}
            _selected={{
              color: darkMode.value ? "white" : "white",
              bg: darkMode.value ? "#2A85FF" : "#2A85FF",
              borderRadius: 15,
              _focus: { boxShadow: "none", outline: "none" },
            }}
            borderRadius={15}
          >
            Quarterly
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CompanyGraphs
              companies={companies}
              accountsToUse={accountsToUse}
              isLoading={isLoading}
              netIncome={netIncome}
              data={pl_monthly}
              title="Profit & Loss Company Graphs"
            />
            <Box my={20} />
            <Box
              bg="bg-surface"
              boxShadow={{
                base: "none",
                md: useColorModeValue("sm", "sm-dark"),
              }}
              borderRadius={useBreakpointValue({
                base: "none",
                md: "lg",
              })}
            >
              <Stack spacing="5">
                <TimeSeriesTable data={netIncome} monthly={pl_monthly} />
              </Stack>
            </Box>

            <Box my={20} />
            <TimeSeriesGraph
              isLoading={isLoading}
              data={pl_monthly}
              title="Profit and Loss Monthly"
              accountsToUse={["Net Income", "GAAP EBITDA", "Management EBITDA"]}
            />
          </TabPanel>
          <TabPanel>
            <CompanyGraphs
              companies={companies}
              accountsToUse={accountsToUse}
              isLoading={isLoading}
              netIncome={netIncome}
              data={pl_quarterly}
              title="Profit & Loss Company Graphs"
            />
            <Box my={20} />
            <Box
              bg="bg-surface"
              boxShadow={{
                base: "none",
                md: useColorModeValue("sm", "sm-dark"),
              }}
              borderRadius={useBreakpointValue({
                base: "none",
                md: "lg",
              })}
            >
              <Stack spacing="5">
                <Stack spacing="5">
                  <TablePivots
                    data={data}
                    pivot_quarterly={pl_pivot_quarterly}
                  />
                </Stack>
              </Stack>
            </Box>

            <Box my={20} />

            <TimeSeriesGraph
              isLoading={isLoading}
              data={pl_quarterly}
              title="Profit and Loss Quarterly"
              accountsToUse={["Net Income", "GAAP EBITDA", "Management EBITDA"]}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ProfitAndLoss;
