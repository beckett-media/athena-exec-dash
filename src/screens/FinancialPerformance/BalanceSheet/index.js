import React from "react";
import {
  Box,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import useDarkMode from "use-dark-mode";
import QuarterlyTable from "./QuarterlyTable";
import CompareTable from "../CommonComponents/CompareTable";
import TimeSeriesGraph from "../CommonComponents/TimeSeriesGraph";


const BalanceSheet = ({
  bs_monthly,
  bs_quarterly,
  // bs_pivoted_quarterly,
}) => {
  const darkMode = useDarkMode();

  const accountsToUse = [...new Set(bs_monthly.map((item) => item.Account))]

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
              _focus: { boxShadow: "none", outline: "none" },
              borderRadius: 15,
            }}
          >
            Monthly
          </Tab>
          <Tab
            color={darkMode.value ? "gray.100" : "gray.700"}
            borderRadius={15}
            _selected={{
              color: darkMode.value ? "white" : "white",
              bg: darkMode.value ? "#2A85FF" : "#2A85FF",
              _focus: { boxShadow: "none", outline: "none" },
              borderRadius: 15,
            }}
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
                <CompareTable 
                  data={bs_monthly} 
                  title={'Balance Sheet Comparison Table (Monthly)'}
                  timeUnit='m'
                />
              </Stack>

            </Box>

            <Box my={20} />
            <TimeSeriesGraph
              data={bs_monthly}
              title="Balance Sheet Monthly"
              accountsToUse={accountsToUse}
              timeUnit='m'
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
                <CompareTable 
                  data={bs_quarterly} 
                  title='Balance Sheet Comparison Table (Quarterly)'
                  timeUnit='q'
                />
              </Stack>

              {/* <Stack spacing="5">
                <QuarterlyTable
                  balancePivotQuarterly={bs_pivoted_quarterly}
                  balanceQuarterly={bs_quarterly}
                />
              </Stack> */}
            </Box>

            <Box my={20} />

            <TimeSeriesGraph
              data={bs_quarterly}
              title="Balance Sheet Quarterly"
              accountsToUse={accountsToUse}
              timeUnit='q'
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default BalanceSheet;
