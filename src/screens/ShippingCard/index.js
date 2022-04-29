import React from "react";
import styles from "./SocialMediaMetric.module.sass";
import { Box } from "@chakra-ui/react";
import KPI from "./KPI";
import CategoryAndAttibutes from "./CategoryAndAttibutes";
import MarketData from "./MarketDataGraphs";

const FinancialScreen = () => {
  return (
    <>
      <div className={styles.col}>
        <KPI className={styles.card} />
        <Box my={"2rem"} />
        <MarketData />
        <Box my={"2rem"} />
        <CategoryAndAttibutes />
        <Box my={"2rem"} />
      </div>
    </>
  );
};

export default FinancialScreen;
