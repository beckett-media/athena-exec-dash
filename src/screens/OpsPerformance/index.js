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
import { useApiData } from "../../providers/apiData";
import Loading from "../../components/LottieAnimation/Loading";

const OpsPerformance = () => {
  const { isLoading, timeseries, serviceLevel, status } = useApiData();

  if (isLoading) {
    return <Loading loadingG={"loadingG"} marginTop={0} width={"15rem"} />;
  }

  return (
    <>
      <div className={styles.col}>
        <KPI className={styles.card} />
        <Box my={"2rem"} />
        <Backlog />
        <Box my={"2rem"} />
        <MarketData isLoading={isLoading} timeseries={timeseries} />
        <Box my={"2rem"} />
        <ServicesGraph isLoading={isLoading} serviceLevel={serviceLevel} />
        <Box my={"2rem"} />
        <RevenueGraph isLoading={isLoading} serviceLevel={serviceLevel} />
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
