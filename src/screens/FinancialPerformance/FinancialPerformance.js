import React from "react";
import styles from "./FinancialPerformance.module.sass";
import { Box } from "@chakra-ui/react";
import BudgetGraph from "./BudgetGraph";
import RevenueGraph from "./RevenueGraph";
import PnLGraph from "./PnLGraph";
import ComingSoon from "../CominSoon/ComingSoon";

const OpsPerformance = () => {
  return (
    <>
      <div className={styles.col}>
        {/* <PnLGraph />
        <Box my={"2rem"} />
        <BudgetGraph />
        <Box my={"2rem"} />
        <RevenueGraph />
        <Box my={"2rem"} /> */}
        <ComingSoon />
      </div>
    </>
  );
};

export default OpsPerformance;
