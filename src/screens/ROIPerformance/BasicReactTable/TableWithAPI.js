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
        Header: "Company Name",
        accessor: "companyName",
      },
      {
        Header: "Total Shares Ownedge, % Owned",
        accessor: "percentageOwned",
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
