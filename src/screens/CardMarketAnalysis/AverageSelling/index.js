import React from "react";
import {
  Box,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "../../../components/Card";
import TablePivots from "./TablePivots";
import MarketData from "./MarketDataGraphs";
import { API } from "aws-amplify";

const TableMarket = () => {


  const riOntology =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const typeObject = "CompetitorMetric";
  const url = `competitormetric/${riOntology}/${typeObject}`; /// URL to fetch from API

  function getData() {
    const apiName = "palentirApi";
    const path = `/${url}`;

    return API.get(apiName, path);
  }

  const [dataTable, setDataTable] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    isLoading &&
      getData().then((res) => {
        setDataTable(res?.data);
        setIsLoading(false);
      });
  }, [isLoading]);

  const data = dataTable.map((d) => {
    const { rid, ...rest } = d;
    console.log(rest?.properties);
    return {
      ...rest?.properties,
    };
  });




  
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
      <MarketData data={data} />
    </>
  );
};

export default TableMarket;
