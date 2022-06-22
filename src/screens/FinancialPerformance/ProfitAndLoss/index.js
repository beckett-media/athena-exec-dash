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

import TimeSeriesGraph from "./TimeSeriesGraph";
import QuarterlyGraph from "./QuarterlyGraph";
import TablePivots from "./TablePivots";
import TimeSeriesTable from "./TimeSeriesTable";
import CompanyGraphs from "./CompanyGraphs";

const ProfitAndLoss = ({
  data,
  isLoading,
  netIncome,
  pivot_quarterly,
  monthly,
  quarterly,
}) => {
  const darkMode = useDarkMode();
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
              isLoading={isLoading}
              netIncome={netIncome}
              monthly={monthly}
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
                <TimeSeriesTable data={netIncome} monthly={monthly} />
              </Stack>
            </Box>

            <Box my={20} />
            <TimeSeriesGraph
              isLoading={isLoading}
              netIncome={netIncome}
              monthly={monthly}
              title="Timeseries Profit / Loss"
            />
          </TabPanel>
          <TabPanel>
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
                  <TablePivots data={data} pivot_quarterly={pivot_quarterly} />
                </Stack>
              </Stack>
            </Box>

            <Box my={20} />
            <QuarterlyGraph
              quarterly={quarterly}
              isLoading={isLoading}
              netIncome={netIncome}
              monthly={monthly}
              pivot_quarterly={pivot_quarterly}
              title="Quarterly Profit & Loss"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ProfitAndLoss;
