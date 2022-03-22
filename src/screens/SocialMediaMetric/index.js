import React, { Suspense, lazy } from "react";
import styles from "./SocialMediaMetric.module.sass";
import { Box } from "@chakra-ui/react";
import PostPerWeekGraph from "./Overview";
import SentimentAnalysis from "./Sentiment/SentimentAnalysis";
import TopCountry from "./TopCountry";
import SocialMessages from "./SocialMessage";
import KPI from "./KPI";

const SocialMediaMetric = () => {
  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <KPI className={styles.card} />
        <Box my={"2rem"} />
        <PostPerWeekGraph className={styles.card} />
        <Box my={"2rem"} />
        <SentimentAnalysis />
        <Box my={"2rem"} />
      </div>
      <div className={styles.col} style={{ marginLeft: 20 }}>
        <SocialMessages />
        <Box my={"2rem"} />
        <TopCountry className={styles.card} />
      </div>
    </div>
  );
};

export default SocialMediaMetric;
