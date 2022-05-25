import React from "react";
import {
  Box,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "../../../components/Card";
import TablePivots from "./TablePivots";
import TotalSoldData from "./MarketDataGraphs";

const TotalSold = ({ data, isLoading }) => {
  return (
    <>
      <Card>
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
            <TablePivots data={data} />
          </Stack>
        </Box>
      </Card>
      <Box my={20} />
      <TotalSoldData data={data} />
    </>
  );
};

export default TotalSold;
