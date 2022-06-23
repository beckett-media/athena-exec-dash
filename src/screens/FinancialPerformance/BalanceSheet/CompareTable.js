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
import * as dfd from "danfojs";


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

function CompareTable({ className, data }) {
  console.log('comptable', data);
  const beckett = data.filter((d) => d?.Company === "Beckett Collectables");
  const series1 = beckett.filter((d) => d?.StrDate === "2021-12-31");
  const series2 = beckett.filter((d) => d?.StrDate === "2020-12-31");
  
  let df1 = new dfd.DataFrame(series1);
  let df2 = new dfd.DataFrame(series2);
  df1.rename({ "Balance":"Balance1", "BudgetBalance":"BudgetBalance1"}, {inplace: true});
  df2.rename({ "Balance":"Balance2", "BudgetBalance":"BudgetBalance2"}, {inplace: true});
  
  let df_merged = dfd.merge({ "left": df1, "right": df2, "on": ["Account"], how: "outer" })
  
  df_merged.addColumn("Diff", df_merged['Balance1'].sub(df_merged['Balance2']), { inplace: true });
  
  const compareData = dfd.toJSON(df_merged,{format:'column'});

  console.log('compareData', compareData)
  
  const columns = React.useMemo(() => [   
    {
      Header: "Account",
      // fomatted date with moment to get the month
      accessor: d => [d.Account, d.order],
      Cell: ({ value }) => (
        <Text fontSize="md" color="gray.500">
          {value[0]}
        </Text>
      ),
    },
    
    {
      Header: "Series 1",
      // fomatted date with moment to get the month
      accessor: d => [d.Balance1, d.BudgetBalance1],
      Cell: ({ value }) => (
        <span>
          <Badge fontSize={13} colorScheme={value[0] >= 0 ? "green" : "red"}>
            {/*value === 0 ? "0" : numberWithCommas(value.toFixed(0)) */}  {value[0]}
          </Badge>
          <Badge fontSize={13} colorScheme={"gray"}>
            ({value[1]})
          </Badge>
        </span>
      ),
    },
    {
      Header: "Series 2",
      // fomatted date with moment to get the month
      accessor: d => [d.Balance2, d.BudgetBalance2],
      Cell: ({ value }) => (
        <span>
          <Badge fontSize={13} colorScheme={value[0] >= 0 ? "green" : "red"}>
            {/*value === 0 ? "0" : numberWithCommas(value.toFixed(0)) */}  {value[0]}
          </Badge>
          <Badge fontSize={13} colorScheme={"gray"}>
            ({value[1]})
          </Badge>
        </span>
      ),
    },
    {
      Header: "Variance",
      // fomatted date with moment to get the month
      // accessor: "Diff",
      accessor: "Diff",
      Cell: ({ value }) => (
        <Badge fontSize={13} colorScheme={value >= 0 ? "green" : "red"}>
          {/* {value === 0 ? "0" : numberWithCommas(value.toFixed(0))} */ value}
        </Badge>
      ),
    }
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
      </Box>
      <Tables columns={columns} data={compareData} />
    </Card>
  );
}

export default CompareTable;
