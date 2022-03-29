import { Badge, Text } from "@chakra-ui/react";
import React from "react";
import FilterTable from "./FilterTable";

export default function TableWithAPI({ cells }) {
  console.log(cells);
  const columns = React.useMemo(
    () => [
      {
        Header: "Image",
        accessor: "imgSrc",
        Cell: ({ cell: { value } }) => (
          <img src={value} alt={`${value}`} style={{ width: "30%" }} />
        ),
      },
      {
        Header: "Commic Name",
        accessor: "title",
      },
      {
        Header: "Grade",
        accessor: "grade",
      },
      {
        Header: "Grade Level",
        accessor: "gradeRank",
        Cell: ({ cell: { value } }) => {
          return (
            <Badge
              size="lg"
              colorScheme={value === "2ND HIGHEST GRADED" ? "red" : "green"}
            >
              {value}
            </Badge>
          );
        },
      },
      {
        Header: "Current Bid",
        accessor: "currentBid",
      },
      {
        Header: "Bid Count",
        accessor: "bidCount",
      },
    ],
    []
  );
  const data = React.useMemo(() => cells, [cells]);

  return <>{cells && <FilterTable columns={columns} data={data} />}</>;
}
