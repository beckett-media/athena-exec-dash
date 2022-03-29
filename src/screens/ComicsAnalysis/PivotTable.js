import React from "react";

import TableWithAPI from "../../components/BasicReactTable/TableWithAPI";

function PivotTable({ dataCI }) {
  return <TableWithAPI cells={dataCI} />;
}

export default PivotTable;
