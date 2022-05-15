import React from "react";
import styles from "./ROIPerformance.module.sass";
import { Box } from "@chakra-ui/react";
import SharesGraph from "./SharesGraph";
import ComingSoon from "../CominSoon/ComingSoon";

const ROIPerformance = () => {
  return (
    <>
      <div className={styles.col}>
        {/* <SharesGraph />
        <Box my={"2rem"} /> */}
        <ComingSoon/>
      </div>
    </>
  );
};

export default ROIPerformance;
