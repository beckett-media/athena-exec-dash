import { Badge, Text } from "@chakra-ui/react";
import React from "react";
import FilterTable from "./FilterTable";

export default function TableWithAPI({ cells }) {
  console.log(cells);
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
        accessor: "company",
      },
      {
        Header: "Tuesday",
        accessor: "grade",
      },
      {
        Header: "Wednesday",
        accessor: "gradeStat",
      },
      {
        Header: "Thursday",
        accessor: "test-0",
      },
      {
        Header: "Friday",
        accessor: "test-1",
      },
      {
        Header: "Includes Saturday",
        accessor: "test-2",
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
