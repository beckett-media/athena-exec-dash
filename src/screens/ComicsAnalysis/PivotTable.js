import React from "react";

import data from "../../mocks/comic-data";

import TableWithAPI from "../../components/BasicReactTable/TableWithAPI";

function PivotTable() {
  const datas = data;

  return <TableWithAPI cells={datas} />;
}

export default PivotTable;
