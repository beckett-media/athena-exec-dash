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
import { data } from "./data";
import useDarkMode from "use-dark-mode";
import cn from "classnames";
import styles from "./Table.module.sass";
import { numberWithCommas } from "../../../utils.js";

const BadgeConponent = ({ state, darkMode }) => {
  return (
    <Text fontSize="lg">
      Grouped By:{" "}
      {state.groupBy.map((d) => (
        <Badge
          key={d}
          variantColor={darkMode.value ? "gray" : "blue"}
          variant="outline"
          marginRight="0.5rem"
        >
          {d.split(".")[0]}
        </Badge>
      ))}
    </Text>
  );
};

function useControlledState(state) {
  return React.useMemo(() => {
    if (state.groupBy.length) {
      return {
        ...state,
        hiddenColumns: [...state.hiddenColumns, ...state.groupBy].filter(
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
        groupBy: ["name", "year"],
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
                const column = allColumns.find((d) => d.id === columnId);

                return (
                  <span {...column.getHeaderProps()}>
                    {column.canGroupBy ? (
                      // If the column can be grouped, let's add a toggle
                      <span {...column.getGroupByToggleProps()}>
                        {column.isGrouped ? (
                          <Button
                            mr={5}
                            size={"sm"}
                            leftIcon={<AiOutlineUngroup />}
                            colorScheme="twitter"
                            variant="solid"
                          >
                            ungroup {column.Header}
                          </Button>
                        ) : (
                          <Button
                            size={"sm"}
                            leftIcon={<AiOutlineUngroup />}
                            colorScheme="twitter"
                            variant="solid"
                          >
                            ungroup {column.Header}
                          </Button>
                        )}
                      </span>
                    ) : null}
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
                        alignItems: "center",
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
                <Th
                  style={{ color: "transparent" }}
                  {...column.getHeaderProps()}
                >
                  {column.canGroupBy ? (
                    // If the column can be grouped, let's add a toggle

                    <Box {...column.getGroupByToggleProps()}>
                      {column.isGrouped ? (
                        <p fontSize="md">
                          <Text fontSize="md">Grouped By: </Text>
                          {state.groupBy.map((d) => (
                            <Badge
                              key={d}
                              colorScheme="green"
                              marginRight="0.5rem"
                            >
                              {d}
                            </Badge>
                          ))}
                        </p>
                      ) : (
                        <Button
                          leftIcon={<AiOutlineGroup />}
                          colorScheme="twitter"
                          variant="solid"
                          size={"sm"}
                        >
                          group {column.render("Header")}
                        </Button>
                      )}
                    </Box>
                  ) : null}
                  {column.render("Header")}
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
      <div>Showing the first 100 results of {rows.length} rows</div>
    </>
  );
}

function TablePivots({ className }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        // Aggregate the average age of visitors
        aggregate: "uniqueCount",
        Aggregated: ({ value }) => `${value} Unique Names`,
      },
      {
        Header: "Selling Price",
        accessor: "average_selling_price",
        // Aggregate the sum of all visits
        aggregate: "sum",
        Aggregated: ({ value }) =>
          // chnage value with comma and 3 decimal places
          `${value.toLocaleString("en-US", {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          })} $ (USD) Total`,
      },
      {
        Header: "Month",
        accessor: "month",
        // Aggregate the unique count of all visits
        aggregate: "uniqueCount",
        Aggregated: ({ value }) => `${value} Months`,
      },
      {
        Header: "Year",
        accessor: "year",
        // Aggregate the unique count of all visits
        aggregate: "unique",
        Aggregated: ({ value }) => `${value}`,
      },
    ],
    []
  );

  const darkMode = useDarkMode();

  return (
    <Card
      className={cn(styles.card, className)}
      title="Total Sales"
      description={`February does have three fewer days, but overall sales dropped 18% MOM. Average sales per day dropped 9% from $2.7M to $2.4M. PSA is the runaway leader here at $48.8M (-18% MOM), with BGS a clearcut #2 at $13.4M (-21% MOM). BVG sales increased 7% to $482K, while CSG sales increased 15% to $639K.`}
      classTitle="title-blue"
    >
      <Box
        display={"flex"}
        alignItems={"center"}
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
          to drill down on the company,
        </Text>
        {AiOutlineUngroup()}
        <Text fontSize={"small"} fontStyle={"italic"}>
          to ungroup.
        </Text>
        <Text fontSize={"small"} fontStyle={"italic"}>
          and
        </Text>
        {AiOutlineGroup()}
        <Text fontSize={"small"} fontStyle={"italic"}>
          to group.
        </Text>
      </Box>
      <Tables columns={columns} data={data} />
    </Card>
  );
}

export default TablePivots;
