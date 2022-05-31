import React from "react";
import styles from "./CardsMetric.module.sass";
import { Box } from "@chakra-ui/react";
import KPI from "./KPI";
import CardForm from "./CardForm";
import MarketData from "./TimelineGraph";
import ServicesGraph from "./ServicesGraph";
import RevenueGraph from "./RevenueGraph";
import GradingGraph from "./GradingGraph";
import Backlog from "./Backlog";
import Loading from "../../components/LottieAnimation/Loading";
import useTimeseries from "../../hooks/data/useTimeseries";
import useServiceLevel from "../../hooks/data/useServiceLevel";

const OpsPerformance = () => {
  const { isLoading: timeseriesLoading } = useTimeseries();
  const { isLoading: levelsLoading } = useServiceLevel();

  if (timeseriesLoading || levelsLoading) {
    return <Loading loadingG={"loadingG"} marginTop={0} width={"15rem"} />;
  }

  return (
    <>
      <div className={styles.col}>
        <KPI className={styles.card} />
        <Box my={"2rem"} />
        <Backlog />
        <Box my={"2rem"} />
        <MarketData />
        <Box my={"2rem"} />
        <ServicesGraph />
        <Box my={"2rem"} />
        <RevenueGraph />
        <Box my={"2rem"} />
        {/* <GradingGraph /> */}
        <Box my={"2rem"} />
        {/* <CardForm /> */}
        <Box my={"2rem"} />
      </div>
    </>
  );
};

export default OpsPerformance;
