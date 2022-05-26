import React from "react";
import {
  useGlobalFilter,
  useTable,
  useFilters,
  useSortBy,
  usePagination,
} from "react-table";
import ColumnFilter from "./ColumnFilter";
import cn from "classnames";
import styles from "./Table.module.sass";
import {
  Badge,
  Box,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tfoot,
  Tr,
  Table,
  Button,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
import Card from "../../../components/Card";
import GlobalFilter from "./GlobalFilter";

export default function FilterTable({ columns, data, className }) {
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: ColumnFilter,
    }),
    []
  );

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    footerGroups,
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    page, // fetch the current page
    nextPage,
    setGlobalFilter,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    gotoPage,
    pageOptions,
    setPageSize,
    state,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        sortBy: [
          {
            id: "grader",
            desc: false,
          },
        ],
        pageSize: 20,
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                  {/* <Text color={"#2A85FF"}>
                    {column.canFilter ? column.render("Filter") : null}
                  </Text> */}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          {footerGroups.map((group) => (
            <Tr {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                <Td {...column.getFooterProps()}>{column.render("Footer")}</Td>
              ))}
            </Tr>
          ))}
        </Tfoot>
      </Table>
      <Box
        my={5}
        spacing={5}
        direction="row"
        display={"flex"}
        justifyItems={"center"}
        alignItems={"center"}
      >
        <Text fontSize="md" mr={2}>
          Page
        </Text>
        <Badge fontWeight="bold" mr={2} p={2} px={1}>
          <Text fontSize="md">
            {pageIndex + 1} of {pageOptions.length}
          </Text>
        </Badge>
        <Select
          w={"10%"}
          ml={6}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
      </Box>
      <Stack className="pagination" direction="row" spacing={8} mt={10}>
        <Button
          colorScheme="blue"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </Button>{" "}
        <Button
          colorScheme="blue"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </Button>{" "}
        <Button
          colorScheme="blue"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </Button>{" "}
        <Button
          colorScheme="green"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </Button>{" "}
      </Stack>
    </>
  );
}
