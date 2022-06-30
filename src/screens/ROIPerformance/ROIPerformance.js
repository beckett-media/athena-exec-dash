import React from "react";
import styles from "./ROIPerformance.module.sass";
import { Box } from "@chakra-ui/react";
import ComingSoon from "../CominSoon/ComingSoon";
import Card from "../../components/Card";
import cn from "classnames";
import TablePivots from "./PivotTable";
import { roiData } from "../../mocks/roiData";

const ROIPerformance = (dataCI) => {
  return (
    <>
      <div className={styles.col}>
        {/* <Card
          className={styles.card}
          classCardHead={styles.head}
          title="ROI Table"
          classTitle={cn("title-purple", styles.title)}
        >
          <TablePivots dataCI={roiData} />
        </Card> */}
        <ComingSoon />
      </div>
    </>
  );
};

export default ROIPerformance;
