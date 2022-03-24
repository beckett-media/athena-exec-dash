import React from "react";

import styles from "./MarketAnalysis.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import PriceTicker from "./Products/PriceTicker";
import ComingSoon from "../CominSoon/ComingSoon";
import TablePivots from "./PivotTable";

const ComicAnalysis = () => {
  return (
    <>
      <div className={styles.section}>
        {/* <PriceTicker /> */}
        <TablePivots />
        {/* <ComingSoon /> */}
      </div>
      <TooltipGlodal />
    </>
  );
};

export default ComicAnalysis;
