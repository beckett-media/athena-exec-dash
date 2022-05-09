import React from "react";
import styles from "./FinancialPerformance.module.sass";
import { Box } from "@chakra-ui/react";
// import KPI from "./KPI";
// import CardForm from "./CardForm";
// import MarketData from "./TimelineGraph";
// import ServicesGraph from "./ServicesGraph";

const FinancialPerformance = () => {
  return (
    <>
      <div className={styles.col}>
        {/* <KPI className={styles.card} /> */}
        <Box my={"2rem"} />
        {/* <MarketData /> */}
        <Box my={"2rem"} />
        {/* <ServicesGraph /> */}
        <Box my={"2rem"} />
        {/* <CardForm /> */}
        <Box my={"2rem"} />
      </div>
    </>
  );
};

export default FinancialPerformance;
