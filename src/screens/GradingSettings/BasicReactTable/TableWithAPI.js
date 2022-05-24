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
        Footer: "TOTAL",
      },
      {
        Header: "Tuesday",
        accessor: "tuesday",
        Footer: "TOTAL",
      },
      {
        Header: "Wednesday",
        accessor: "wednesday",
        Footer: "TOTAL",
      },
      {
        Header: "Thursday",
        accessor: "thursday",
        Footer: "TOTAL",
      },
      {
        Header: "Friday",
        accessor: "friday",
        Footer: "TOTAL",
      },
      {
        Header: "Includes Saturday",
        accessor: "includesSaturday",
        Footer: "TOTAL",
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
