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
import TablePivots from "./TablePivots";
import QuarterlyTable from "./QuarterlyTable";
import QuarterlyGraph from "./QuarterlyGraph";
import TimeSeriesGraph from "../CommonComponents/TimeSeriesGraph";


const RevenueStreams = ({
  pl_quarterly,
  pl_pivot_quarterly,
  pl_monthly
}) => {
  
  const removeAccounts = ['GAAP EBITDA', 'Management EBITDA', 'Net Income']
  const filteredData = pl_monthly.filter(function(itm){
    return removeAccounts.indexOf(itm.Account) == -1;
  });
  console.log('nasfd', filteredData);

  const accountsToUse = [...new Set(filteredData.map((item) => item.Account))]

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
            borderRadius={15}
            _selected={{
              color: darkMode.value ? "white" : "white",
              bg: darkMode.value ? "#2A85FF" : "#2A85FF",
              borderRadius: 15,
              _focus: { boxShadow: "none", outline: "none" },
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
                <TablePivots revenueStreams={filteredData} />
              </Stack>
            </Box>

            <Box my={20} />
            
            <TimeSeriesGraph
              data={filteredData}
              title="Revenue Sheet Monthly"
              accountsToUse={accountsToUse}
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
                <QuarterlyTable
                  revenueStreamsPivotQuarterly={pl_pivot_quarterly}
                />
              </Stack>
            </Box>

            <Box my={20} />
            <QuarterlyGraph
              revenueStreamsQuarterly={pl_quarterly}
              revenueStreamsPivotQuarterly={pl_pivot_quarterly}
              title="Quarterly Balance Sheet"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default RevenueStreams;
