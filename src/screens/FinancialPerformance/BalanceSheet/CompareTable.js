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
  Select,
  Radio,
  RadioGroup,
  Input,
  useRadio,
  HStack,
  useRadioGroup
} from "@chakra-ui/react";
import { useTable, useGroupBy, useExpanded } from "react-table";
import { BsArrowRightSquareFill, BsArrowDownSquareFill } from "react-icons/bs";
import Card from "../../../components/Card";
import useDarkMode from "use-dark-mode";
import cn from "classnames";
import styles from "./Table.module.sass";
import { formatMoneyWithCommas } from "../../../utils.js";
import moment from "moment";
import * as dfd from "danfojs";
import RadioCard from '../CommonComponents/RadioCard'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

function padLeadingZeros(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}


function formatMonthDate(date) {
  const tempDate = new Date(date.setDate(date.getDate(date.setMonth(date.getMonth()+1))-1))
  console.log(tempDate);
  let newDateString = String(tempDate.getFullYear()) + '-' 
                    + padLeadingZeros(String(tempDate.getMonth()+1),2) + '-' 
                    + String(tempDate.getDate());
  console.log(newDateString);
  return newDateString
}

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
                        padding:'4px 24px'
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
  const companies = React.useMemo(() => [...new Set(data.map(d => d.Company))], [data]);
  const [filteredCompany, setFilteredCompany] = React.useState(companies?.[1] || "");
  console.log('comptable', companies);
  const [seriesDate1, setSeriesDate1] = React.useState("2020-12-31");
  const [seriesDate2, setSeriesDate2] = React.useState("2021-12-31");

  const beckett = data.filter((d) => d?.Company === filteredCompany);
  let series1 = beckett.filter((d) => d?.StrDate === seriesDate1);
  let series2 = beckett.filter((d) => d?.StrDate === seriesDate2);
  
  const series1Exists = (series1.length > 0);
  const series2Exists = (series2.length > 0);
  
  console.log('series1Exists', series1Exists);
  console.log('series2Exists', series2Exists);
  let compareData = {};
  if (series1Exists || series2Exists) {
    series1 = (series1Exists ? series1 : series2);
    series2 = (series2Exists ? series2 : series1);
    
    console.log('series1', series1);
    console.log('series2', series2)
    
    let df1 = new dfd.DataFrame(series1);
    let df2 = new dfd.DataFrame(series2);
    
    df1.rename({ "Balance":"Balance1", "BudgetBalance":"BudgetBalance1"}, {inplace: true});
    df2.rename({ "Balance":"Balance2", "BudgetBalance":"BudgetBalance2"}, {inplace: true});
    
    // Create merged column
    let df_merged = dfd.merge({ "left": df1, "right": df2, "on": ["Account"], how: "outer" })
    df_merged.addColumn("Diff", df_merged['Balance1'].sub(df_merged['Balance2']), { inplace: true });
    
    compareData = dfd.toJSON(df_merged,{format:'column'});
    
  } 
  console.log('compareData', compareData)
  
  const columns =  [   
    ...(series1Exists || series2Exists ? [{
      Header: "Account",
      accessor: d => [d.Account, d.order],
      Cell: ({ value }) => (
        <Text fontSize="md" color="gray.500">
          {value[0]}
        </Text>
      ),
    }] : []),
    ...(series1Exists ? [{
      Header: () => (
        <div
          style={{
            textAlign:"right"
          }}
        >Series 1</div>),
      id: "Series 1",
        accessor: d => [d.Balance1, d.BudgetBalance1],
        Cell: ({ value }) => (
          <span>
            <Text fontSize={13} textAlign='right' color={value[0] >= 0 ? "#48BB78" : "#F56565"}>
              {formatMoneyWithCommas(value[0])}
            </Text>
            <Text fontSize={13} textAlign='right' color={"gray"} marginTop={2}>
              {formatMoneyWithCommas(value[1])}
            </Text>
          </span>
        ),
      }] : []),
    
    ...(series2Exists ? [{
      Header: () => (
        <div
          style={{
            textAlign:"right"
          }}
        >Series 2</div>),
      id: "Series 2",
      // fomatted date with moment to get the month
      accessor: d => [d.Balance2, d.BudgetBalance2],
      Cell: ({ value }) => (
        <span>
          <Text fontSize={13} textAlign='right' color={value[0] >= 0 ? "#48BB78" : "#F56565"}>
              {formatMoneyWithCommas(value[0])}
          </Text>
          <Text fontSize={13} textAlign='right' color={"gray"} marginTop={2}>
            {formatMoneyWithCommas(value[1])}
          </Text>
        </span>
      ),
    }] : []),
    ...(series2Exists && series1Exists ? [{
      accessor: "Diff",
      Header: () => (
        <div
          style={{
            textAlign:"right"
          }}
        >Variance</div>),
      Cell: ({ value }) => (
        <Text fontSize={13} textAlign='right' color={value[0] >= 0 ? "#48BB78" : "#F56565"}>
              {formatMoneyWithCommas(value)}
          </Text>
      ),
    }] : [])
  ];
  console.log('columns', columns);
  const darkMode = useDarkMode();

  // const handleCompanyChange = (value) => {
  //   setFilteredCompany(value);
  // }
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'company',
    defaultValue: 'Beckett Collectables',
    onChange: setFilteredCompany,
  })
  const group = getRootProps()


  const [startDate, setStartDate] = React.useState(new Date());
      const ExampleCustomInput =  React.forwardRef(({ value, onClick }, ref) => (
        <Button onClick={onClick} ref={ref} fontSize='sm' px={1}>
          {value}
        </Button>
      ));


  

  return (
    <Card
      className={cn(styles.card, className)}
      classTitle="title-blue"
      title="Balance Sheets Comparison Table"
      head={
        <Box
          flexDirection={"row"}
          display={"flex"}
          gap={3}
          justifyItems={"center"}
          alignItems={"center"}
        >
        </Box>
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
              const radio = getRadioProps({ value })
              return (
                <RadioCard key={value} {...radio}>
                  {value.replace('LLC', '').replace(',','')}
                </RadioCard>
              )
            })}
          </HStack>
              
             
            </Box>
            
            <Text fontSize='xs' mr={2} ml={2} as="div" width='100%' textAlign={'right'}>Series 1 Date:</Text>
              
            <DatePicker
                selected={new Date(seriesDate1)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                onChange={(date) => setSeriesDate1(formatMonthDate(date))}
                customInput={<ExampleCustomInput />}
              />


              {/* <Input type="month" name="series1-date"
              fontSize='sm' 
              value={seriesDate1} onChange={e => {
                setSeriesDate1(e.target.value);
              }}
              min="2018-01-01" max="2022-12-31" /> */}
            <Text fontSize='xs' mr={2} ml={2} as="div" width='100%' textAlign={'right'}>Series 2 Date:</Text>
            
            <DatePicker
                selected={new Date(seriesDate2)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                onChange={(date) => setSeriesDate2(formatMonthDate(date))}
                customInput={<ExampleCustomInput />}
              />
            {/* <Input 
              fontSize='sm' type="month" name="series2-date"
              value={seriesDate2} onChange={e => {
                console.log(e.target.value);
              }}
              min="2018-01-01" max="2022-12-31" /> */}
              

      </Box>

      
     
       
      <Box
        marginBottom={10}
      />


     

      <Tables columns={columns} data={compareData} />
    </Card>
  );
}

export default CompareTable;
