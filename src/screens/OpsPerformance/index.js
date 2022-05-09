import React from "react";
import styles from "./CardsMetric.module.sass";
import { Box } from "@chakra-ui/react";
import KPI from "./KPI";
import CardForm from "./CardForm";
import MarketData from "./TimelineGraph";
import ServicesGraph from "./ServicesGraph";
import RevenueGraph from "./RevenueGraph";
import GradingGraph from "./GradingGraph";

const OpsPerformance = () => {
  return (
    <>
      <div className={styles.col}>
        <KPI className={styles.card} />
        <Box my={"2rem"} />
        <MarketData />
        <Box my={"2rem"} />
        <ServicesGraph />
        <Box my={"2rem"} />
        <RevenueGraph />
        <Box my={"2rem"} />
        <GradingGraph />
        <Box my={"2rem"} />
        {/* <CardForm /> */}
        <Box my={"2rem"} />
      </div>
    </>
  );
};

export default OpsPerformance;
