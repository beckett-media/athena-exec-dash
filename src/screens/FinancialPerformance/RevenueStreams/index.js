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
import TimeSeriesGraph from "../CommonComponents/TimeSeriesGraph";
import CompanyGraphs from "./CompanyGraphs";

const RevenueStreams = ({
  pl_quarterly,
  pl_pivot_quarterly,
  pl_monthly,
  isLoading,
}) => {
  const removeAccounts = ["GAAP EBITDA", "Management EBITDA", "Net Income"];

  const accountsToUse = [
    ...new Set(
      pl_monthly
        .filter(function (itm) {
          return removeAccounts.indexOf(itm.Account) == -1;
        })
        .map((item) => item.Account)
    ),
  ];

  const companies = [
    "Beckett Collectables",
    "Arcane Tinmen ApS",
    "Comic Book Certification Service LLC",
    "Southern Hobby Distribution,LLC",
  ];

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
            <CompanyGraphs
              isLoading={isLoading}
              monthly={pl_monthly}
              accountsToUse={accountsToUse}
              companies={companies}
              title="Revenue Streams Company Graphs"
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
                <TablePivots revenueStreams={pl_monthly} />
              </Stack>
            </Box>

            <Box my={20} />

            <TimeSeriesGraph
              data={pl_monthly}
              title="Revenue Sheet Monthly"
              accountsToUse={accountsToUse}
            />
          </TabPanel>
          <TabPanel>
            <CompanyGraphs
              isLoading={isLoading}
              monthly={pl_quarterly}
              accountsToUse={accountsToUse}
              companies={companies}
              title="Revenue Streams Company Graphs"
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
                <QuarterlyTable
                  revenueStreamsPivotQuarterly={pl_pivot_quarterly}
                />
              </Stack>
            </Box>

            <Box my={20} />

            <TimeSeriesGraph
              data={pl_quarterly}
              title="Revenue Sheet Quarterly"
              accountsToUse={accountsToUse}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default RevenueStreams;
