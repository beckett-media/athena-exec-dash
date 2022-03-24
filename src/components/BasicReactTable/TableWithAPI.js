import React from "react";
import FilterTable from "./FilterTable";

export default function TableWithAPI({ cells }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Image",
        accessor: "img_src",
        Cell: ({ cell: { value } }) => (
          <img src={value} alt="image" style={{ width: "30%" }} />
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
        accessor: "grade_rank",
      },
      {
        Header: "Current Bid",
        accessor: "current_bid",
      },
      {
        Header: "Bid Count",
        accessor: "bid_count",
      },
    ],
    []
  );
  const data = React.useMemo(() => cells, []);

  return <>{cells && <FilterTable columns={columns} data={data} />}</>;
}
