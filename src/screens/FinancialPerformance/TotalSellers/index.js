import React from "react";
import {
  Box,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "../../../components/Card";
import TablePivots from "./TablePivots";
import TotalSellersData from "./MarketDataGraphs";

const TotalSellers = ({ data, isLoading }) => {
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
      <TotalSellersData data={data} />
    </>
  );
};

export default TotalSellers;
