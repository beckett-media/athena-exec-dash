import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import Card from "../../../components/Card";
import TablePivots from "./TablePivots";
import MarketData from "./MarketDataGraphs";

const TableMarket = ({ data, isLoading }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Card>
          <Stack spacing="5">
            <TablePivots data={data} />
          </Stack>
        </Card>
        <Box my={20} />
        <MarketData data={data} />
      </>
    );
  }
};

export default TableMarket;
