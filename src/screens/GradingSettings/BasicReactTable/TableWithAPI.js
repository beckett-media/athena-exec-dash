import { Badge, Text } from "@chakra-ui/react";
import React from "react";
import FilterTable from "./FilterTable";

export default function TableWithAPI({ cells }) {
  // console.log(cells);
  const columns = React.useMemo(
    () => [
      // {
      //   Header: "Image",
      //   accessor: "imgSrc",
      //   Cell: ({ cell: { value } }) => (
      //     <img src={value} alt={`${value}`} style={{ width: "30%" }} />
      //   ),
      // },
      {
        Header: "Grader Name",
        accessor: "grader",
        Footer: "TOTAL",
      },
      {
        Header: "Monday",
        accessor: "monday",
        Footer: (info) => {
          // Only calculate total visits if rows change
          const total = React.useMemo(
            () => info.rows.reduce((sum, row) => row.values.monday + sum, 0),
            [info.rows]
          );

          return <>{total}</>;
        },
      },
      {
        Header: "Tuesday",
        accessor: "tuesday",
        Footer: (info) => {
          // Only calculate total visits if rows change
          const total = React.useMemo(
            () => info.rows.reduce((sum, row) => row.values.tuesday + sum, 0),
            [info.rows]
          );

          return <>{total}</>;
        },
      },
      {
        Header: "Wednesday",
        accessor: "wednesday",
        Footer: (info) => {
          // Only calculate total visits if rows change
          const total = React.useMemo(
            () => info.rows.reduce((sum, row) => row.values.wednesday + sum, 0),
            [info.rows]
          );

          return <>{total}</>;
        },
      },
      {
        Header: "Thursday",
        accessor: "thursday",
        Footer: (info) => {
          // Only calculate total visits if rows change
          const total = React.useMemo(
            () => info.rows.reduce((sum, row) => row.values.thursday + sum, 0),
            [info.rows]
          );

          return <>{total}</>;
        },
      },
      {
        Header: "Friday",
        accessor: "friday",
        Footer: (info) => {
          // Only calculate total visits if rows change
          const total = React.useMemo(
            () => info.rows.reduce((sum, row) => row.values.friday + sum, 0),
            [info.rows]
          );

          return <>{total}</>;
        },
      },
      {
        Header: "Includes Saturday",
        accessor: (row) => row.includesSaturday.toString(),
        Cell: ({ cell: { value } }) => {
          return (
            <Badge size="lg" colorScheme={value === "true" ? "yellow" : ""}>
              {value}
            </Badge>
          );
        },
        Footer: "",
      },
      // {
      //   Header: "Grade Level",
      //   accessor: "gradeRank",
      //   Cell: ({ cell: { value } }) => {
      //     return (
      //       <Badge
      //         size="lg"
      //         colorScheme={value === "2ND HIGHEST GRADED" ? "red" : "green"}
      //       >
      //         {value}
      //       </Badge>
      //     );
      //   },
      // },
    ],
    []
  );
  const data = React.useMemo(() => cells, [cells]);

  return <>{cells && <FilterTable columns={columns} data={data} />}</>;
}
