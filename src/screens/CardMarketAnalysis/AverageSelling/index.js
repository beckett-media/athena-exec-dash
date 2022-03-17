import React from "react";
import {
  Box,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "../../../components/Card";
import TablePivots from "./TablePivots";

const TableMarket = () => {
  return (
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
          <TablePivots />
        </Stack>
      </Box>
    </Card>
  );
};

export default TableMarket;
