import React from "react";
import {
  Badge,
  Box,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Table,
  Button,
} from "@chakra-ui/react";
import { useTable, useGroupBy, useExpanded } from "react-table";
import { BsArrowRightSquareFill, BsArrowDownSquareFill } from "react-icons/bs";
import { AiOutlineGroup, AiOutlineUngroup } from "react-icons/ai";
import Card from "../../../components/Card";
import useDarkMode from "use-dark-mode";
import cn from "classnames";
import styles from "../CommonComponents/Table.module.sass";
import { numberWithCommas } from "../../../utils.js";
import moment from "moment";

function useControlledState(state) {
  return React.useMemo(() => {
    if (state.groupBy.length) {
      return {
        ...state,
        hiddenColumns: [...state?.hiddenColumns, ...state?.groupBy].filter(
          (d, i, all) => all.indexOf(d) === i
        ),
      };
    }
    return state;
  }, [state]);
}

function Tables({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        groupBy: ["Year", "Company", "Account"],
      },
    },
    useGroupBy,
    useExpanded,
    // Our custom plugin to add the expander column
    (hooks) => {
      hooks.useControlledState.push(useControlledState);
      hooks.visibleColumns.push((columns, { instance }) => {
        if (!instance.state.groupBy.length) {
          return columns;
        }

        return [
          {
            id: "expander", // Make sure it has an ID
            // Build our expander column
            Header: ({ allColumns, state: { groupBy } }) => {
              return groupBy.map((columnId) => {
                const column = allColumns.find((d) => d?.id === columnId);

                return (
                  <span {...column.getHeaderProps()}>
                    {/* {column.canGroupBy ? (
                      // If the column can be grouped, let's add a toggle
                      <span {...column.getGroupByToggleProps()}>
                        {column.isGrouped ? (
                          <Button
                            mr={5}
                            size={"sm"}
                            leftIcon={<AiOutlineUngroup />}
                            colorScheme="twitter"
                            variant="outline"
                          >
                            ungroup {column.Header}
                          </Button>
                        ) : (
                          <Button
                            size={"sm"}
                            leftIcon={<AiOutlineUngroup />}
                            colorScheme="twitter"
                            variant="outline"
                          >
                            ungroup {column.Header}
                          </Button>
                        )}
                      </span>
                    ) : null} */}
                  </span>
                );
              });
            },
            Cell: ({ row }) => {
              if (row.canExpand) {
                const groupedCell = row.allCells.find((d) => d.isGrouped);

                return (
                  <span
                    {...row.getToggleRowExpandedProps({
                      style: {
                        paddingLeft: `${row.depth * 2}rem`,
                        display: "flex",
                        align$: "center",
                        gap: "0.2rem",
                      },
                    })}
                  >
                    {row.isExpanded ? (
                      <BsArrowDownSquareFill />
                    ) : (
                      <BsArrowRightSquareFill />
                    )}{" "}
                    {groupedCell.render("Cell")} ({row.subRows.length})
                  </span>
                );
              }

              return null;
            },
          },

          ...columns,
        ];
      });
    }
  );

  const firstPageRows = rows.slice(0, 100);
  const darkMode = useDarkMode();

  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <Text color={"#2A85FF"}>
                    {column.canFilter ? column.render("Filter") : null}
                  </Text>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td
                      {...cell.getCellProps()}
                      style={{
                        background: cell.isGrouped
                          ? "#0aff0082"
                          : cell.isAggregated
                          ? "auto"
                          : cell.isPlaceholder
                          ? "#ff000042"
                          : darkMode.value
                          ? "#272B30"
                          : "#CBD5E0",
                      }}
                    >
                      {cell.isAggregated
                        ? // If the cell is aggregated, use the Aggregated
                          // renderer for cell
                          cell.render("Aggregated")
                        : cell.isPlaceholder
                        ? null // For cells with repeated values, render null
                        : // Otherwise, just render the regular cell
                          cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <br />
    </>
  );
}

function QuarterlyTable({ className, balancePivotQuarterly }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Year",
        accessor: "Year",
        Cell: ({ value }) => (
          <Text fontSize={13} px={2} mx={1}>
            {value.replace(/_/g, " ")}
          </Text>
        ),
      },
      {
        Header: "Company",
        accessor: "Company",
        aggregate: "uniqueCount",
        Cell: ({ value }) => (
          <Badge
            fontSize={11}
            px={2}
            mx={3}
            borderRadius={14}
            colorScheme={"blue"}
          >
            {value.replace(/_/g, " ")}
          </Badge>
        ),
      },
      {
        Header: "Account",
        accessor: "Account",
        aggregate: "uniqueCount",
        Cell: ({ value }) => (
          <Badge
            fontSize={11}
            px={2}
            mx={3}
            borderRadius={14}
            colorScheme={"cyan"}
          >
            {value.replace(/_/g, " ")}
          </Badge>
        ),
      },
      {
        Header: "Q2",
        accessor: "Q2",
        aggregate: "sum",
        Aggregated: ({ value }) => (
          <Text fontSize={13} px={2} mx={1}>
            {numberWithCommas(value.toFixed(0))} Total
          </Text>
        ),
        Cell: ({ value }) => (
          <Badge fontSize={13} colorScheme={value >= 0 ? "green" : "red"}>
            {value === 0 ? "0" : numberWithCommas(value.toFixed(0))}
          </Badge>
        ),
      },
      {
        Header: "Budget Q2",
        accessor: "BudgetQ2",
        aggregate: "sum",
        Aggregated: ({ value }) => (
          <Text fontSize={13} px={2} mx={1}>
            {numberWithCommas(value.toFixed(0))} Total
          </Text>
        ),
        Cell: ({ value }) => (
          <Badge fontSize={13} colorScheme={value >= 0 ? "green" : "red"}>
            {value === 0 ? "0" : numberWithCommas(value.toFixed(0))}
          </Badge>
        ),
      },

      {
        Header: "Q4",
        accessor: "Q4",
        aggregate: "sum",
        Aggregated: ({ value }) => (
          <Text fontSize={13} px={2} mx={1}>
            {numberWithCommas(value.toFixed(0))} Total
          </Text>
        ),
        Cell: ({ value }) => (
          <Badge fontSize={13} colorScheme={value >= 0 ? "green" : "red"}>
            {value === 0 ? "0" : numberWithCommas(value.toFixed(0))}
          </Badge>
        ),
      },
      {
        Header: "Budget Q4",
        accessor: "BudgetQ4",
        aggregate: "sum",
        Aggregated: ({ value }) => (
          <Text fontSize={13} px={2} mx={1}>
            {numberWithCommas(value.toFixed(0))} Total
          </Text>
        ),
        Cell: ({ value }) => (
          <Badge fontSize={13} colorScheme={value >= 0 ? "green" : "red"}>
            {value === 0 ? "0" : numberWithCommas(value.toFixed(0))}
          </Badge>
        ),
      },
    ],
    []
  );

  const darkMode = useDarkMode();

  return (
    <Card
      className={cn(styles.card, className)}
      classTitle="title-blue"
      title="Quarterly Balance Sheet"
      // description={`if needed add description here ....`}
    >
      <Box
        display={"flex"}
        align$={"center"}
        gap="2"
        marginBottom={10}
        justifyContent={"center"}
        bg={darkMode.value ? "#272B30" : "#CBD5E0"}
      >
        <Text fontSize={"small"} fontStyle={"italic"}>
          Click on the
        </Text>
        {BsArrowRightSquareFill()}
        <Text fontSize={"small"} fontStyle={"italic"}>
          to drill down by Year for example
        </Text>
        {/* {AiOutlineUngroup()}
    <Text fontSize={"small"} fontStyle={"italic"}>
      to ungroup.
    </Text>
    <Text fontSize={"small"} fontStyle={"italic"}>
      and
    </Text>
    {AiOutlineGroup()}
    <Text fontSize={"small"} fontStyle={"italic"}>
      to group.
    </Text> */}
      </Box>
      <Tables columns={columns} data={balancePivotQuarterly} />
    </Card>
  );
}

export default QuarterlyTable;
