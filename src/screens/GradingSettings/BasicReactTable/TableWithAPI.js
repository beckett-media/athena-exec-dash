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
      },
      {
        Header: "Monday",
        accessor: "monday",
      },
      {
        Header: "Tuesday",
        accessor: "tuesday",
      },
      {
        Header: "Wednesday",
        accessor: "wednesday",
      },
      {
        Header: "Thursday",
        accessor: "thursday",
      },
      {
        Header: "Friday",
        accessor: "friday",
      },
      {
        Header: "Includes Saturday",
        accessor: "includesSaturday",
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
