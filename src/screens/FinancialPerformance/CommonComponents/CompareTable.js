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
import { formatMoneyWithCommas, formatMonthDate, getCorrectZeroOrNan } from "../../../utils.js";
import moment from "moment";
import RadioCard from "./RadioCard";
import DatePicker from "react-datepicker";
import "./datepicker-styles.css";
import "./react-select-styles.css";
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

function Tables({ columns, data,selectedCompanies }) {
  const allCompanies = selectedCompanies.map(d => d.value);
  
  let doGroupBy = true;
  if (allCompanies.length == 1 ) {
    if (allCompanies[0]!='*' ) {
      doGroupBy=false;
    }
  }

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
      initialState: (doGroupBy ? {
        groupBy: ["Account"],
      } : {}),
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

function combineCompaniesData(data, companies) {
  const companyCheck = {};

  for (const company of companies) {
    companyCheck[company.value] = true;
  }

  const combined = [];
  for (const row of data) {
    if (companyCheck[row.Company]) {
      combined.push(row);
    }
  }

  

  return combined;
}

function CompareTable({ className, data, title, timeUnit }) {
  const companies = React.useMemo(
    () => [...new Set(data.map((d) => d.Company))],
    [data]
  );
  // const [filteredCompany, setFilteredCompany] = React.useState(
  //   companies?.[1] || ""
  // );

  const [seriesDate1, setSeriesDate1] = React.useState("2020-12-31");
  const [seriesDate2, setSeriesDate2] = React.useState("2021-12-31");

  const [accountFilter, setAccountFilter] = React.useState([]);
  const [companyFilter, setCompanyFilter] = React.useState([]);

  const companyFilterValues = React.useMemo(() => companies.map(c => ({ value: c, label: c.replace("LLC", "").replace(",", "")})), [companies]);

  // const beckett = data.filter((d) => d?.Company === filteredCompany);
  // const beckett = combineCompaniesData(data, companyFilter);

  const filteredData = [...data];
  // const filteredData = data.filter(function(itm){
  //     return companies.indexOf(itm.Company) > -1;
  //   })

  // data={pl_monthly.filter(function(itm){
  //   return accountsToUse.indexOf(itm.Account) > -1;
  // })}

  // const defaultAccountsToShow = React.useMemo(
  //   () => [...new Set(filteredData.map((d) => d.Account))],
  //   [filteredData]
  // );

  let defaultAccountsToShow = filteredData.filter(
    (d) => d.default_show
  );
  defaultAccountsToShow = [...new Set(defaultAccountsToShow.map(c => c.Account))];
  React.useEffect(() => {
    setAccountFilter(defaultAccountsToShow);
  }, []);

  defaultAccountsToShow = defaultAccountsToShow.map(c => ({ value: c, label: c}));
  
  const [selectedOptionsCompanies, setSelectedOptionsCompanies] = React.useState([]);
  const [selectedOptionsAccounts, setSelectedOptionsAccounts] = React.useState(defaultAccountsToShow);
  
  

  let series1 = filteredData.filter((d) => d?.StrDate === seriesDate1);
  let series2 = filteredData.filter((d) => d?.StrDate === seriesDate2);

  const series1Exists = series1.length > 0;
  const series2Exists = series2.length > 0;


  let compareData = [];
  let availableAccounts = [];

  if (series1Exists || series2Exists) {
    series1 = series1Exists ? series1 : series2;
    series2 = series2Exists ? series2 : series1;

    // console.log('series1', series1)
    // console.log('series2', series2)

    /********************* START Faking an outer merge ********************/
    let s1AccountCompanies = [];
    // First, go through DF1
    for (var i = 0; i < series1.length; i++) {
      let thisObj = { ...series1[i] };
      thisObj["Balance1"] = getCorrectZeroOrNan(thisObj["Balance"]);
      thisObj["BudgetBalance1"] = getCorrectZeroOrNan(thisObj["BudgetBalance"]);
      thisObj["Balance2"] = NaN;
      thisObj["BudgetBalance2"] = NaN;
      thisObj['Series1'] = [];
      thisObj['Series2'] = [];
      thisObj['Series1']["Balance1"] = getCorrectZeroOrNan(thisObj["Balance"]);
      thisObj['Series1']["BudgetBalance1"] = getCorrectZeroOrNan(thisObj["BudgetBalance"]);

      let s1Account = series1[i]["Account"];
      let s1Company = series1[i]["Company"];
      let s1AccountCompany = series1[i]["Account"] + series1[i]["Company"];

      for (var j = 0; j < series2.length; j++) {
        if ((series2[j]["Account"] == s1Account) && (series2[j]["Company"] == s1Company)) {
          thisObj["Balance2"] = getCorrectZeroOrNan(series2[j]["Balance"]);
          thisObj["BudgetBalance2"] = getCorrectZeroOrNan(series2[j]["BudgetBalance"]);
          thisObj['Series2']["Balance2"] = getCorrectZeroOrNan(series2[j]["Balance"]);
          thisObj['Series2']["BudgetBalance2"] = getCorrectZeroOrNan(series2[j]["BudgetBalance"]);
        }
      }
      thisObj["Diff"] = thisObj["Balance2"] - thisObj["Balance1"];

      s1AccountCompanies.push(s1AccountCompany);
      compareData.push(thisObj);
    }

    // Second, go through DF2
    for (var i = 0; i < series2.length; i++) {
      let s2Account = series2[i]["Account"];
      let s2Company = series2[i]["Company"];
      let s2AccountCompany = s2Account+s2Company;
      if (s1AccountCompanies.indexOf(s2AccountCompany) === -1) {
        let thisObj = { ...series2[i] };
        // Let's set  the Balance1, BudgetBalance1 and Diff to null; since we know now that this
        // doesn't exist in DF1
        thisObj["Balance1"] = NaN;
        thisObj["BudgetBalance1"] = NaN;
        thisObj["Series1"] = [];
        thisObj["Diff"] = NaN;
        thisObj["Balance2"] = getCorrectZeroOrNan(thisObj["Balance"]);
        thisObj["BudgetBalance2"] = getCorrectZeroOrNan(thisObj["BudgetBalance"]);
        thisObj['Series2'] = [];
        thisObj['Series2']["Balance2"] = getCorrectZeroOrNan(thisObj["Balance"]);
        thisObj['Series2']["BudgetBalance2"] = getCorrectZeroOrNan(thisObj["BudgetBalance"]  );

        compareData.push(thisObj);
      }
    }
    /********************* END Faking an outer merge ********************/
    
    compareData.sort((a, b) => (a.order > b.order) ? 1 : -1);
    // console.log('seriesCompreData', compareData)
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

    
  /* START Logic for Company Selector */
  
  if (companyFilter.length > 0) {
    const companiesToFilter = companyFilter.map((d) => d.value);
    compareData = compareData.filter(
      (d) => companiesToFilter.indexOf(d.Company) > -1
    );
  }
  /* END Logic for Company Selector */

  
  

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
      {
        Header: "Company",
        accessor: "Company",
        aggregate: "uniqueCount",
        Cell: ({ value }) => (
          <Text
            fontSize={11}
            px={2}
            mx={3}
            borderRadius={14}
            colorScheme={"blue"}
          >
            {value}
          </Text>
        ),
      },
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
            // accessor: ({d}) => {
            //   console.log('nqBrokeValue-d', d);
            //   return ([d.Balance1, d.BudgetBalance1]);
            // },
            accessor: "Series1",
            aggregate: d => {
              return {
                // 'Balance1':d.map(item => item.Balance1).reduce((prev, curr) => (prev ? prev : 0) + (curr ? curr :0) , 0),
                // 'BudgetBalance1':  d.map(item => item.BudgetBalance1).reduce((prev, curr) => (prev ? prev : 0)  + (curr ? curr :0), 0) 
                'Balance1':d.map(item => item.Balance1).reduce((prev, curr) => prev + curr , 0),
                'BudgetBalance1':  d.map(item => item.BudgetBalance1).reduce((prev, curr) => prev  + curr , 0) 
              }
            }, 
            Aggregated: ({ value }) => {

              return (
                <Text
                  fontSize={13}
                  textAlign="right"
                  color={value.Balance1 >= 0 ? "#48BB78" : "#F56565"}
                >
                  {formatMoneyWithCommas(value.Balance1)}
                </Text>
              ) 
            },
                  
            // aggregate: vals => vals[0],
            Cell: ({ value }) =>  {
              return (
                <span>
                <Text
                  fontSize={13}
                  textAlign="right"
                  color={value.Balance1 >= 0 ? "#48BB78" : "#F56565"}
                >
                  {formatMoneyWithCommas(value.Balance1)}
                </Text>
                <Text
                  fontSize={13}
                  textAlign="right"
                  color={"gray"}
                >
                  {formatMoneyWithCommas(value.BudgetBalance1)}
                </Text>
              </span>
              )
            },
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
          // accessor: ({d}) => {
          //   console.log('nqBrokeValue-d', d);
          //   return ([d.Balance1, d.BudgetBalance1]);
          // },
          accessor: "Series2",
          aggregate: d => {
            const sumBalance =d.map(item => item.Balance2).reduce((prev, curr) => prev + curr, 0);
            const sumBudget =d.map(item => item.BudgetBalance2).reduce((prev, curr) => prev + curr, 0);
            return {
              'Balance2':sumBalance,
              'BudgetBalance2': sumBudget
            }
          }, 
          Aggregated: ({ value }) => {
            
            return (
              <Text
                fontSize={13}
                textAlign="right"
                color={value.Balance2 >= 0 ? "#48BB78" : "#F56565"}
              >
                {formatMoneyWithCommas(value.Balance2)}
              </Text>
            ) 
          },
                
          // aggregate: vals => vals[0],
          Cell: ({ value }) =>  {
            
            return (
              <span>
              <Text
                fontSize={13}
                textAlign="right"
                color={value.Balance2 >= 0 ? "#48BB78" : "#F56565"}
              >
                {formatMoneyWithCommas(value.Balance2)}
              </Text>
              <Text
                fontSize={13}
                textAlign="right"
                color={"gray"}
              >
                {formatMoneyWithCommas(value.BudgetBalance2)}
              </Text>
            </span>
            )
          },
        },
          // {
          //   Header: () => (
          //     <div
          //       style={{
          //         textAlign: "right",
          //       }}
          //     >
          //       Series 2
          //     </div>
          //   ),
          //   id: "Series 2",
          //   // fomatted date with moment to get the month
          //   accessor: (d) => [d.Balance2, d.BudgetBalance2],
          //   Cell: ({ value }) => (
          //     <span>
          //       <Text
          //         fontSize={13}
          //         textAlign="right"
          //         // color={value[0] >= 0 ? "#48BB78" : "#F56565"}
          //       >
          //         {/* {formatMoneyWithCommas(value[0])} */}
          //       </Text>
          //       <Text
          //         fontSize={13}
          //         textAlign="right"
          //         color={"gray"}
          //         marginTop={2}
          //       >
          //         {/* {formatMoneyWithCommas(value[1])} */}
          //       </Text>
          //     </span>
          //   ),
          // },
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
            aggregate: "sum",
            Cell: ({ value }) => (
              <Text
                fontSize={13}
                textAlign="right"
                color={value >= 0 ? "#48BB78" : "#F56565"}
              >
                {formatMoneyWithCommas(value)}
                {/* {value} */}
              </Text>
            ),
          },
        ]
      : []),
  ];
  const darkMode = useDarkMode();

  // const { getRootProps, getRadioProps } = useRadioGroup({
  //   name: "company",
  //   defaultValue: "Beckett Collectables",
  //   onChange: setFilteredCompany,
  // });
  // const group = getRootProps();

  // function handleSelectChange(data) {
  //   setAccountFilter(data);
  // }

  // const [startDate, setStartDate] = React.useState(new Date());
  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <Button
      onClick={onClick}
      bg={"none"}
      _hover={{ bg: "none" }}
      ref={ref}
      fontSize="sm"
      px={1}
    >
      {value}
    </Button>
  ));

  // const multiSelectStyles = {
  //   menu: (provided, state) => ({
  //     ...provided,
  //     borderBottom: "1px dotted pink",
  //     color: state.selectProps.menuColor,
  //     padding: 20,
  //   }),

  //   control: (_, { selectProps: { width } }) => ({
  //     width: width,
  //   }),

  //   singleValue: (provided, state) => {
  //     const opacity = state.isDisabled ? 0.5 : 1;
  //     const transition = "opacity 300ms";

  //     return { ...provided, opacity, transition };
  //   },
  // };

  //console.log('availableAccounts', availableAccounts, defaultAccountsToShow);

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
        {/* <Box width={"100%"}>
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
        </Box> */}

        <MultiSelectAll
          className={"react-select-container"}
          classNamePrefix={"react-select"}
          options={companyFilterValues}
          placeholderButtonLabel="Companies"
          setValue={setCompanyFilter}
          selectedOptions={selectedOptionsCompanies}
          setSelectedOptions={setSelectedOptionsCompanies}
        />

        <MultiSelectAll
          className={"react-select-container"}
          classNamePrefix={"react-select"}
          options={availableAccounts}
          placeholderButtonLabel="Accounts"
          setValue={setAccountFilter}
          selectedOptions={selectedOptionsAccounts}
          setSelectedOptions={setSelectedOptionsAccounts}
        />

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
      <Box marginBottom={15} />

      <Box
        // className={'directions-container'}
        padding={3}
        borderRadius={8}
        marginTop={10}
        marginBottom={10}
        bg={darkMode.value ? "#272B30" : "#CBD5E0"}
        textAlign={'left'}
        color={'#a0aec0'}
      >
        
        <Text marginBottom={3}>
          Use the controls above to filter the data.
        </Text>

        <Text>Click on the {BsArrowRightSquareFill()}   to drill down on the account. Actual values are shown in 
        <Text color='#48BB78' as='span'> green (positive)</Text>, and <Text as='span'  color='#F56565'>red (negative)</Text>. 
        Budget values are in <Text color='gray' as='span' >gray</Text>.
         
         </Text>
      </Box>

      <Tables columns={columns} data={compareData} selectedCompanies={selectedOptionsCompanies} />
    </Card>
  );
}

export default CompareTable;
