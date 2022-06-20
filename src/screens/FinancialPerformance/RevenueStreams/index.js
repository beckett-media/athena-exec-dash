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
import QuaterlyTable from "./QuaterlyTable";
import RevenueGraph from "./RevenueGraph/index";
import QuaterlyGraph from "./QuaterlyGraph";

const RevenueStreams = ({
  revenueStreams,
  revenueStreamsQuarterly,
  revenueStreamsPivotQuarterly,
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
          {/* <Tab
            color={darkMode.value ? "gray.100" : "gray.700"}
            borderRadius={15}
            _selected={{
              color: darkMode.value ? "white" : "white",
              bg: darkMode.value ? "#2A85FF" : "#2A85FF",
              borderRadius: 15,
              _focus: { boxShadow: "none", outline: "none" },
            }}
          >
            Revenue Streams
          </Tab> */}
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
          {/* <TabPanel>
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
                <TablePivots revenueStreams={revenueStreams} />
              </Stack>
            </Box>

            <Box my={20} />

            <Stack spacing="5">
              <RevenueGraph revenueStreams={revenueStreams} />
            </Stack>
          </TabPanel> */}
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
                  revenueStreamsPivotQuarterly={revenueStreamsPivotQuarterly}
                />
              </Stack>
            </Box>

            <Box my={20} />
            <QuaterlyGraph
              revenueStreamsQuarterly={revenueStreamsQuarterly}
              revenueStreamsPivotQuarterly={revenueStreamsPivotQuarterly}
              title="Quarterly Balance Sheet"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default RevenueStreams;
