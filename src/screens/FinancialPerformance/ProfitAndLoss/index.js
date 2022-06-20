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

import TimeSeriesGraph from "./timeserriesGraph";
import QuaterlyGraph from "./QuaterlyGraph";
import TablePivots from "./TablePivots";
import TimeserriesTable from "./TimeseriesTable";

const ProfitAndLoss = ({
  data,
  isLoading,
  netIncome,
  quartly,
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
                <TimeserriesTable data={netIncome} monthly={monthly} />
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
                  <TablePivots data={data} quartly={quartly} />
                </Stack>
              </Stack>
            </Box>

            <Box my={20} />
            <QuaterlyGraph
              quarterly={quarterly}
              isLoading={isLoading}
              netIncome={netIncome}
              monthly={monthly}
              quartly={quartly}
              title="Quarterly Profit & Loss"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ProfitAndLoss;
