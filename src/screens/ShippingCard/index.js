import React from "react";
import styles from "./SocialMediaMetric.module.sass";
import { Box } from "@chakra-ui/react";
import GradedPerWeekGraph from "./Overview";
import SentimentAnalysis from "./Sentiment/SentimentAnalysis";
import TopCountry from "./TopCountry";
import SocialMessages from "./SocialMessage";
import KPI from "./KPI";
import ComingSoon from "../CominSoon/ComingSoon";
import TrafficChannel from "./CardGradedBarGraph";
import MarketData from "./MarketDataGraphs";
import CategoryAndAttibutes from "./CategoryAndAttibutes";


const FinancialScreen = ({  socialData, socialMessage }) => {
  return (
    <>
      <div className={styles.col}>
        {/* <KPI className={styles.card}  /> */}
        <Box my={"2rem"} />
        <CategoryAndAttibutes />
        <Box my={"2rem"} />
      </div>
    </>
  );
};

export default FinancialScreen;
