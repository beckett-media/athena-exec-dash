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
  const isMobile = useBreakpointValue({ base: true, md: false });

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

          <Box
            px={{
              base: "4",
              md: "6",
            }}
            pb="5"
          ></Box>
        </Stack>
      </Box>
    </Card>
  );
};

export default TableMarket;
