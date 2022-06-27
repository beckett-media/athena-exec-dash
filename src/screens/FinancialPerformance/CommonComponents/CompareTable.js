import React from "react";
import {
  Box,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Table,
  Button,
  HStack,
  useRadioGroup,
} from "@chakra-ui/react";
import { useTable, useGroupBy, useExpanded } from "react-table";
import { BsArrowRightSquareFill, BsArrowDownSquareFill } from "react-icons/bs";
import Card from "../../../components/Card";
import useDarkMode from "use-dark-mode";
import cn from "classnames";
import styles from "./Table.module.sass";
import { formatMoneyWithCommas, formatMonthDate } from "../../../utils.js";
import moment from "moment";
// import * as dfd from "danfojs";
import RadioCard from "./RadioCard";
import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-styles.css";
import "./react-select-styles.css";
// import Select from 'react-select';
import MultiSelectAll from "./MultiSelectAll";

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
                        padding: "4px 24px",
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

function CompareTable({ className, data, title, timeUnit }) {
  const companies = React.useMemo(
    () => [...new Set(data.map((d) => d.Company))],
    [data]
  );
  const [filteredCompany, setFilteredCompany] = React.useState(
    companies?.[1] || ""
  );

  const [seriesDate1, setSeriesDate1] = React.useState("2020-12-31");
  const [seriesDate2, setSeriesDate2] = React.useState("2021-12-31");

  const [accountFilter, setAccountFilter] = React.useState([]);

  const beckett = data.filter((d) => d?.Company === filteredCompany);

  // data={pl_monthly.filter(function(itm){
  //   return accountsToUse.indexOf(itm.Account) > -1;
  // })}

  let series1 = beckett.filter((d) => d?.StrDate === seriesDate1);
  let series2 = beckett.filter((d) => d?.StrDate === seriesDate2);

  const series1Exists = series1.length > 0;
  const series2Exists = series2.length > 0;

  // let compareData = {};
  // let availableAccounts = [];

  // if (series1Exists || series2Exists) {
  //   series1 = (series1Exists ? series1 : series2);
  //   series2 = (series2Exists ? series2 : series1);

  //   let df1 = new dfd.DataFrame(series1);
  //   let df2 = new dfd.DataFrame(series2);

  //   df1.rename({ "Balance":"Balance1", "BudgetBalance":"BudgetBalance1"}, {inplace: true});
  //   df2.rename({ "Balance":"Balance2", "BudgetBalance":"BudgetBalance2"}, {inplace: true});

  //   // Create merged column
  //   let df_merged = dfd.merge({ "left": df1, "right": df2, "on": ["Account"], how: "outer" })
  //   df_merged.addColumn("Diff", df_merged['Balance1'].sub(df_merged['Balance2']), { inplace: true });

  //   compareData = dfd.toJSON(df_merged,{format:'column'});
  //   console.log('compCompData', compareData)

  //   /* START Logic for Account Selector */
  //   const uniqueAccounts = [
  //     ...new Set(compareData.map(d => d.Account))
  //   ]

  //   availableAccounts = (uniqueAccounts.map(d => ({ value: d, label: d})))
  //   console.log('availableAccounts',availableAccounts);

  //   if (accountFilter.length > 0){
  //     const accountsToFilter = accountFilter.map(d => d.value);
  //     compareData = compareData.filter(
  //       (d) => accountsToFilter.indexOf(d.Account) > -1

  //       );
  //   }
  //   /* END Logic for Account Selector */
  // }

  let compareData = [];
  let availableAccounts = [];

  if (series1Exists || series2Exists) {
    series1 = series1Exists ? series1 : series2;
    series2 = series2Exists ? series2 : series1;

    /********************* START Faking an outer merge ********************/

    let s1Accounts = [];
    // First, go through DF1
    for (var i = 0; i < series1.length; i++) {
      let thisObj = { ...series1[i] };
      thisObj["Balance1"] = thisObj["Balance"];
      thisObj["BudgetBalance1"] = thisObj["BudgetBalance"];
      thisObj["Balance2"] = null;
      thisObj["BudgetBalance2"] = null;

      let s1Account = series1[i]["Account"];

      for (var j = 0; j < series2.length; j++) {
        if (series2[j]["Account"] == s1Account) {
          thisObj["Balance2"] = series2[j]["Balance"];
          thisObj["BudgetBalance2"] = series2[j]["BudgetBalance"];
        }
      }
      thisObj["Diff"] = thisObj["Balance1"] - thisObj["Balance2"];

      s1Accounts.push(s1Account);
      compareData.push(thisObj);
    }

    // Second, go through DF2
    for (var i = 0; i < series2.length; i++) {
      let s2Account = series2[i]["Account"];
      if (s1Accounts.indexOf(s2Account) === -1) {
        let thisObj = { ...series2[i] };
        // Let's set  the Balance1, BudgetBalance1 and Diff to null; since we know now that this
        // doesn't exist in DF1
        thisObj["Balance1"] = null;
        thisObj["BudgetBalance1"] = null;
        thisObj["Diff"] = null;
        thisObj["Balance2"] = thisObj["Balance"];
        thisObj["BudgetBalance2"] = thisObj["BudgetBalance"];

        compareData.push(thisObj);
      }
    }
    /********************* END Faking an outer merge ********************/

    /* START Logic for Account Selector */
    const uniqueAccounts = [...new Set(compareData.map((d) => d.Account))];

    availableAccounts = uniqueAccounts.map((d) => ({ value: d, label: d }));

    if (accountFilter.length > 0) {
      const accountsToFilter = accountFilter.map((d) => d.value);
      compareData = compareData.filter(
        (d) => accountsToFilter.indexOf(d.Account) > -1
      );
    }
    /* END Logic for Account Selector */
  }

  const columns = [
    ...(series1Exists || series2Exists
      ? [
          {
            Header: "Account",
            accessor: (d) => [d.Account, d.order],
            Cell: ({ value }) => (
              <Text fontSize="md" color="gray.500">
                {value[0]}
              </Text>
            ),
          },
        ]
      : []),
    ...(series1Exists
      ? [
          {
            Header: () => (
              <div
                style={{
                  textAlign: "right",
                }}
              >
                Series 1
              </div>
            ),
            id: "Series 1",
            accessor: (d) => [d.Balance1, d.BudgetBalance1],
            Cell: ({ value }) => (
              <span>
                <Text
                  fontSize={13}
                  textAlign="right"
                  color={value[0] >= 0 ? "#48BB78" : "#F56565"}
                >
                  {formatMoneyWithCommas(value[0])}
                </Text>
                <Text
                  fontSize={13}
                  textAlign="right"
                  color={"gray"}
                  marginTop={2}
                >
                  {formatMoneyWithCommas(value[1])}
                </Text>
              </span>
            ),
          },
        ]
      : []),

    ...(series2Exists
      ? [
          {
            Header: () => (
              <div
                style={{
                  textAlign: "right",
                }}
              >
                Series 2
              </div>
            ),
            id: "Series 2",
            // fomatted date with moment to get the month
            accessor: (d) => [d.Balance2, d.BudgetBalance2],
            Cell: ({ value }) => (
              <span>
                <Text
                  fontSize={13}
                  textAlign="right"
                  color={value[0] >= 0 ? "#48BB78" : "#F56565"}
                >
                  {formatMoneyWithCommas(value[0])}
                </Text>
                <Text
                  fontSize={13}
                  textAlign="right"
                  color={"gray"}
                  marginTop={2}
                >
                  {formatMoneyWithCommas(value[1])}
                </Text>
              </span>
            ),
          },
        ]
      : []),
    ...(series2Exists && series1Exists
      ? [
          {
            accessor: "Diff",
            Header: () => (
              <div
                style={{
                  textAlign: "right",
                }}
              >
                Variance
              </div>
            ),
            Cell: ({ value }) => (
              <Text
                fontSize={13}
                textAlign="right"
                color={value >= 0 ? "#48BB78" : "#F56565"}
              >
                {formatMoneyWithCommas(value)}
              </Text>
            ),
          },
        ]
      : []),
  ];
  const darkMode = useDarkMode();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "company",
    defaultValue: "Beckett Collectables",
    onChange: setFilteredCompany,
  });
  const group = getRootProps();

  // function handleSelectChange(data) {
  //   setAccountFilter(data);
  // }

  const [startDate, setStartDate] = React.useState(new Date());
  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <Button
      onClick={onClick}
      bg={"teal"}
      _hover={{ bg: "teal.500" }}
      ref={ref}
      fontSize="sm"
      px={1}
    >
      {value}
    </Button>
  ));

  const multiSelectStyles = {
    menu: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.selectProps.menuColor,
      padding: 20,
    }),

    control: (_, { selectProps: { width } }) => ({
      width: width,
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  return (
    <Card
      className={cn(styles.card, className)}
      classTitle="title-blue"
      title={title || "Comparison Table"}
      head={
        <Box
          flexDirection={"row"}
          display={"flex"}
          gap={3}
          justifyItems={"center"}
          alignItems={"center"}
        ></Box>
      }
    >
      <Box
        flexDirection={"row"}
        display={"flex"}
        gap={1}
        justifyItems={"center"}
        alignItems={"center"}
      >
        <Box width={"100%"}>
          <HStack {...group}>
            {companies.map((value) => {
              const radio = getRadioProps({ value });
              return (
                <RadioCard key={value} {...radio}>
                  {value.replace("LLC", "").replace(",", "")}
                </RadioCard>
              );
            })}
          </HStack>
        </Box>

        <Text mr={2} ml={2} as="div" width="100%" textAlign={"right"}>
          Series 1 Date:
        </Text>

        <DatePicker
          selected={new Date(seriesDate1)}
          dateFormat={timeUnit == "q" ? "yyyy QQQ" : "MM/yyyy"}
          minDate={new Date("01-01-2019")}
          maxDate={new Date("07-31-2022")}
          showMonthYearPicker={timeUnit == "m" ? true : false}
          showQuarterYearPicker={timeUnit == "q" ? true : false}
          onChange={(date) => setSeriesDate1(formatMonthDate(date, timeUnit))}
          customInput={<ExampleCustomInput />}
        />

        <Text mr={2} ml={2} as="div" width="100%" textAlign={"right"}>
          Series 2 Date:
        </Text>

        <DatePicker
          selected={new Date(seriesDate2)}
          dateFormat={timeUnit == "q" ? "yyyy QQQ" : "MM/yyyy"}
          minDate={new Date("01-01-2019")}
          maxDate={new Date("07-31-2022")}
          showMonthYearPicker={timeUnit == "m" ? true : false}
          showQuarterYearPicker={timeUnit == "q" ? true : false}
          onChange={(date) => setSeriesDate2(formatMonthDate(date, timeUnit))}
          customInput={<ExampleCustomInput />}
        />
      </Box>

      {/* <Box 
        flexDirection={"row"}
        display={"flex"}
        gap={1}
        mt={4}
        // justifyItems={"center"}
        alignItems={"center"}
      >
        <Text mr={2} ml={2} as="div" textAlign={'right'}>Accounts:</Text>
        <Select
              className={'react-select-container'}
              classNamePrefix={"react-select"}
              closeMenuOnSelect={false}
              defaultValue={availableAccounts}
              isMulti
              
              options={availableAccounts}
              onChange={(data) => handleSelectChange(data)}
          />        

      </Box> */}
      <Box marginBottom={5} />
      <Box
        flexDirection={"row"}
        display={"flex"}
        gap={1}
        width={"100%"}
        mt={4}
        // justifyItems={"center"}
        alignItems={"center"}
      >
        <MultiSelectAll
          className={"react-select-container"}
          classNamePrefix={"react-select"}
          options={availableAccounts}
          setAccountFilter={setAccountFilter}
        />
      </Box>

      <Box marginBottom={10} />

      <Tables columns={columns} data={compareData} />
    </Card>
  );
}

export default CompareTable;
