import React from "react";

import styles from "./MarketAnalysis.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import ComingSoon from "../CominSoon/ComingSoon";
import TablePivots from "./PivotTable";

const ComicAnalysis = ({ dataCI }) => {
  return (
    <>
      <div className={styles.section}>
        {/* <TablePivots dataCI={dataCI} /> */}
        <ComingSoon />
      </div>
      <TooltipGlodal />
    </>
  );
};

export default ComicAnalysis;
