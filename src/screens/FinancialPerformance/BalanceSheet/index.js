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
import QuaterlyTable from "./QuaterlyTable";
import BalanceGraph from "./BalanceGraph/index";
import QuaterlyGraph from "./QuaterlyGraph";
import TablePivots from "./TablePivots";

const BalanceSheet = ({
  balanceSheet,
  className,
  balanceQuarterly,
  balancePivotQuarterly,
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
              _focus: { boxShadow: "none", outline: "none" },
              borderRadius: 15,
            }}
          >
            Balance Sheet
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
            Quaterly
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
                <TablePivots balanceSheet={balanceSheet} />
              </Stack>
            </Box>

            <Box my={20} />

            <Stack spacing="5">
              <BalanceGraph balanceSheet={balanceSheet} />
            </Stack>
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
                <QuaterlyTable
                  balancePivotQuarterly={balancePivotQuarterly}
                  balanceQuarterly={balanceQuarterly}
                />
              </Stack>
            </Box>

            <Box my={20} />
            <QuaterlyGraph
              balanceSheet={balanceSheet}
              balancePivotQuarterly={balancePivotQuarterly}
              balanceQuarterly={balanceQuarterly}
              title="Quaterly Balance Sheet"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default BalanceSheet;
