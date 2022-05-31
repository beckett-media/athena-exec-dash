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
import styles from "./Table.module.sass";
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
        groupBy: ["Year", "Company", "YearMonth"],
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
                        gap: "0.8rem",
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
                // <Th
                //   style={{ color: "transparent" }}
                //   {...column.getHeaderProps()}

                // >
                //   {column.canGroupBy ? (
                //     // If the column can be grouped, let's add a toggle

                //     <Box {...column.getGroupByToggleProps()}>
                //       {column.isGrouped ? (
                //         <p fontSize="md">
                //           <Text fontSize="md">Grouped By: </Text>
                //           {state.groupBy.map((d) => (
                //             <Badge
                //               key={d}
                //               colorScheme="transparent"
                //               marginRight="0.5rem"
                //             >
                //               {d}
                //             </Badge>
                //           ))}
                //         </p>
                //       ) : (
                //         <Button
                //           leftIcon={<AiOutlineGroup />}
                //           colorScheme="twitter"
                //           variant="solid"
                //           size={"sm"}
                //         >
                //           group {column.render("Header")}
                //         </Button>
                //       )}
                //     </Box>
                //   ) : null}
                //   {column.render("Header")}
                // </Th>
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

function TablePivots({ className, data, balanceSheet }) {
  const columns = React.useMemo(() => [
    {
      Header: "Year",
      accessor: "Year",
      // Aggregate the average age of visitors
      // aggregate: "uniqueCount",
      // Aggregated: ({ value }) => `${value} Unique Names`,
    },
    {
      Header: "Company",
      accessor: "Company",
      Cell: ({ value }) => (
        <Text fontSize="md">{value.replace(/_/g, " ")}</Text>
      ),
    },
    {
      Header: "Account",
      // fomatted date with moment to get the month
      accessor: "Account",
      aggregate: "uniqueCount",
      Aggregated: ({ value }) => `${value} Account`,
      Cell: ({ value }) => (
        <Text fontSize="md" color="gray.500">
          {value.replace(/_/g, " ")}
        </Text>
      ),
    },
    {
      Header: "Balance",
      // fomatted date with moment to get the month
      accessor: "Balance",
      aggregate: "sum",
      Aggregated: ({ value }) => `${numberWithCommas(value.toFixed(0))} Total`,
      Cell: ({ value }) => (
        <Badge colorScheme={value > 0 ? "green" : "red"}>
          {numberWithCommas(value.toFixed(0))}
        </Badge>
      ),
    },
    {
      Header: "Year & Month",
      // fomatted date with moment to get the month
      accessor: "YearMonth",
      aggregate: "uniqueCount",
      Aggregated: ({ value }) => `${value} Total`,
    },
  ]);

  const darkMode = useDarkMode();

  return (
    <Card
      className={cn(styles.card, className)}
      classTitle="title-blue"
      title="Balance Sheets"
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
      <Tables columns={columns} data={balanceSheet} />
    </Card>
  );
}

export default TablePivots;
